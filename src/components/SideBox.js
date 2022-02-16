import { useState, useEffect } from "react";
import styled from "styled-components";
import SideNote from "./SideNote";
import Menu, { SubMenu, MenuItem } from 'rc-menu';


const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 400px;
    border-right: 1px solid #bbb;
`;

const Header = styled.div`
    height: 70px;
    border-bottom: 1px solid #eee;
    flex-shrink: 0;
`;

const Space = styled.div`
    flex-grow: 1;
`;

const AddButton = styled.button`
  margin: 8px;
  height: 50px;
  border-style: none;
  background-color: #eee;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;


  &:hover {
    background-color: #ddd;
  }

  img {
    margin-left: -4px;
  }
  span {
    margin-left: 4px;
  }
`

const NoteList = styled.div`
    flex-grow: 1;
    overflow-y: auto;
`;

const ToolMenuButton = styled.button`
  position: relative;
  height: 36px;
  width: 36px;
  background-color: transparent;
  border-radius: 8px;
  border-style: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  flex-shrink: 0;

  &:hover, &.dropdown {
    background-color: #d8d8d8;
  }

  
  &:hover img{
    opacity: 1;
  }

  img {
    height: 16px;
    width: 16px;
    padding: 0;
    margin: 0;
    opacity: 0.5;    
  }

`;

const ToolMenu = styled.div`
  
  position: relative;

  display: flex;
  justify-content: flex-end;
  /* align-items: flex-end; */
  padding: 4px 8px;


  .rc-menu {
    position: absolute;
    top: 46px;
    right: 8px;
    width: 160px;
    border: rgba(0,0,0,0.1) solid 1px;
    background-color: #fff;
    padding: 0;
    margin: 0;
    z-index: 10;
    border-radius: 8px;
    box-shadow: 0 3px 5px 0 rgba(0,0,0,0.07);

  }

  .rc-menu-item {
    height: 36px;
    margin: 4px 4px 0;
    border-radius: 4px;
    list-style-type: none;
    line-height: 36px;
    padding: 0 4px 0 8px;
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
      flex-grow: 1;
    }

    img {
      flex-shrink: 0;
      width: 16px;
      height: 16px;
      margin-right: 8px; 
    }

    &:last-child {
      margin: 4px;
    }
    
    &.danger {
      color: #ff3f34;
    }
  }

  .rc-menu-item-active {
    background-color: #f4f4f4;

    &.danger {
      background-color: #ffe2e0;
    }
  }

`;

const TitleRow = styled.div`
  
  display: flex;
  flex-direction: row;
  align-items: center;

`;



function SideBox(props) {

  const {
    currentId,
    setIdHandler,
    notes,
    addNoteHandler,
    removeNoteHandler,
    onToggleFavoriteHandler,
  } = props;


  const [filterMode, setfilterMode] = useState(0);
  const [dropdown, setDropdown] = useState(false);

  const filterMenuItems = [
    {
      name: 'All',
      action: () => { setfilterMode(0) },
      icon: './icons/list-ul.svg',
    },
    {
      name: 'Favorite',
      action: () => { setfilterMode(1) },
      icon: './icons/star.svg',
    },
  ];

  const filterMenuButton = (<ToolMenu>
    <ToolMenuButton className={dropdown ? 'dropdown' : ''} onClick={(e) => {
      setDropdown(!dropdown);
      e.nativeEvent.stopPropagation();
    }}>
      <img src={filterMenuItems[filterMode].icon} />
    </ToolMenuButton>

    {dropdown && (<Menu onClick={(e) => {
      setDropdown(false);
    }}>
      {
        filterMenuItems.map(item => (<MenuItem key={item.name} onClick={item.action} className={item.className}>
          <span>{item.name}</span>
          {item.icon && (<img src={item.icon} />)}
        </MenuItem>))
      }
    </Menu>)}
  </ToolMenu>);



  useEffect(() => {

    const ids = Object.keys(notes);
    const aliveId = ids.includes(currentId);

    if (!aliveId) {
      const changeId = ids.filter(n => n !== currentId)[0];  //先拿到隨便一個存在ID
      setIdHandler(changeId);
    }

  }, [currentId, notes,])


  const displayNotes = Object.entries(notes)
    .filter(([key, value]) => {
      if (filterMode === 1) {
        return value.isFavorite;
      }
      return true;
    });

  return (
    <Container>
      <Header>DRAFTY</Header>
      {filterMenuButton}
      <NoteList>
        {
          displayNotes.map(([key, value]) => (<SideNote
            className={key === currentId ? 'selected' : ''}
            key={value.id}
            {...value}
            onClick={() => setIdHandler(key)}
            removeNoteHandler={removeNoteHandler}
            onToggleFavoriteHandler={onToggleFavoriteHandler}
          />))
        }
      </NoteList>
      <AddButton onClick={addNoteHandler}>
        <img src={`/icons/plus-circle.svg`} />
        <span>新增筆記</span>
      </AddButton>
    </Container>
  );
}

export default SideBox;