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
    /* height: 70px; */
    border-bottom: 1px solid #eee;
    flex-shrink: 0;
    flex-direction: row;
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

  
  &:hover .icon, &:hover .sub-icon{
    opacity: 1;
  }

  .icon {
    height: 16px;
    width: 16px;
    padding: 0;
    margin: 0;
    opacity: 0.5;    
  }

  .sub-icon {
    position: absolute;
    right: 2px;
    top: 2px;
    height: 12px;
    width: 12px;
    padding: 0;
    margin: 0;
    opacity: 0.25;    
  }

`;

const ToolMenu = styled.div`
  
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 4px 8px;

  p{
    display: inline-block;
    margin: 0;
    flex-grow: 1;
    font-size: 1.25rem;
    height: 24px;
  }

  .rc-menu {
    position: absolute;
    top: 42px;
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

    &.selected {
      background-color: #e8e8e8;
    }
  }

  .rc-menu-item-active {
    background-color: #f4f4f4;

    &.danger {
      background-color: #ffe2e0;
    }
  }

`;

const EmptyDisplayContainer = styled.div`
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 120px;
  background-color: #f8f8f8;
  margin: 16px;
  border-radius: 16px;

  p {
    color: #888;
    font-size: 0.85rem;
  }

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
  const [filterModeDropdown, setFilterModeDropdown] = useState(false);
  const [displayMode, setDisplayMode] = useState(0);

  const filterMenuItems = [
    {
      name: '所有筆記',
      action: () => { setfilterMode(0) },
      icon: './icons/funnel.svg',
      emptyDisplayTip: '沒有筆記，請先新增筆記',
    },
    {
      name: '標記星號',
      action: () => { setfilterMode(1) },
      icon: './icons/star.svg',
      emptyDisplayTip: '目前沒有標記星號的筆記',
    },
  ];

  const displayItems = [
    {
      title: '卡片模式',
      icon: './icons/layout-split.svg',
    },
    {
      title: '條列模式',
      icon: './icons/layout-three-columns.svg',
    },
  ];

  const headerContainer = (<ToolMenu>

    <p>DRAFTY</p>

    <ToolMenuButton onClick={(e) => {
      const newDisplayMode = (displayMode + 1) % displayItems.length;
      setDisplayMode(newDisplayMode)
      e.nativeEvent.stopPropagation();
    }}>
      <img className='icon' src={displayItems[displayMode].icon} title={displayItems[displayMode].title} />
    </ToolMenuButton>

    <ToolMenuButton className={filterModeDropdown ? 'dropdown' : ''} onClick={(e) => {
      setFilterModeDropdown(!filterModeDropdown);
      e.nativeEvent.stopPropagation();
    }}>
      <img className='icon' src={filterMenuItems[filterMode].icon} />
      {filterMode === 0 || <img className='sub-icon' src='./icons/funnel.svg' />}
    </ToolMenuButton>

    {filterModeDropdown && (<Menu onClick={(e) => {
      setFilterModeDropdown(false);
    }}>
      {
        filterMenuItems.map((item, index) => (
          <MenuItem
            key={item.name}
            onClick={item.action}
            className={filterMode === index ? 'selected' : ''}
          >
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

  const emptyDisplay = (displayNotes.length === 0 && (
    <EmptyDisplayContainer>
      <p>{filterMenuItems[filterMode].emptyDisplayTip}</p>
    </EmptyDisplayContainer>
  ));

  return (
    <Container>
      <Header>
        {headerContainer}
      </Header>
      <NoteList>
        {
          displayNotes.map(([key, value]) => (<SideNote
            className={key === currentId ? 'selected' : ''}
            key={value.id}
            {...value}
            onClick={() => setIdHandler(key)}
            displayMode={displayMode}
            removeNoteHandler={removeNoteHandler}
            onToggleFavoriteHandler={onToggleFavoriteHandler}
          />))
        }
        {emptyDisplay}
      </NoteList>
      <AddButton onClick={addNoteHandler}>
        <img src={`/icons/plus-circle.svg`} />
        <span>新增筆記</span>
      </AddButton>
    </Container>
  );
}

export default SideBox;