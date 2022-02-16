import { useState, useEffect } from "react";
import styled from "styled-components";
import Menu, { SubMenu, MenuItem } from 'rc-menu';

const Container = styled.div`
    height: 80px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    background-color: #ffffff;
    padding: 8px;
    padding-left: 16px;
    box-sizing: border-box;
    position: relative;


    &:hover {
      background-color: #f8f8f8;
    }

    &.selected {
      background-color: #eeeeee;
    }

    h1 {
      font-size: 1.25rem;
      margin: 0;
      margin-right: 8px;
      height: 37px;
      line-height: 37px;
      font-weight: 500;
      overflow: hidden;
      text-overflow : ellipsis;
      white-space : nowrap;
      flex-grow: 1;
      color: #111;
    }

    p {
      font-size: 0.9rem;
      margin: 0;
      margin-right: 8px;
      height: 27px;
      /* line-height: 27px; */
      color: #888;
      overflow: hidden;
      text-overflow : ellipsis;
      white-space : nowrap;

    }


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



function SideNote(props) {

  const {
    id,
    title,
    isFavorite,
    peekContent,
    onClick,
    className,
    removeNoteHandler,
    onToggleFavoriteHandler,
  } = props;

  const [dropdown, setDropdown] = useState(false);

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   }
  // }, []);


  const menuItems = [
    {
      name: 'Star',
      action: () => { onToggleFavoriteHandler(id); },
      icon: './icons/star.svg',
    },
    {
      name: 'Delete',
      action: () => { removeNoteHandler(id); },
      className: 'danger',
      icon: './icons/trash3-fill.svg',
    },
  ];




  const toolMenuButton = (<ToolMenu>
    <ToolMenuButton className={dropdown ? 'dropdown' : ''} onClick={(e) => {
      setDropdown(!dropdown);
      e.nativeEvent.stopPropagation();
    }}>
      <img src='./icons/three-dots.svg' />
    </ToolMenuButton>

    {dropdown && (<Menu onClick={(e) => {
      setDropdown(false);
      // e.domEvent.stopPropagation();
    }}>
      {
        menuItems.map(item => (<MenuItem key={item.name} onClick={item.action} className={item.className}>
          <span>{item.name}</span>
          {item.icon && (<img src={item.icon} />)}
        </MenuItem>))
      }
    </Menu>)}

  </ToolMenu>);

  const favoriteButton = (<ToolMenuButton onClick={(e) => {
    onToggleFavoriteHandler(id);
    e.stopPropagation();
  }}>
    <img className="favorite" src={`./icons/${isFavorite ? 'star-fill' : 'star'}.svg`} />
  </ToolMenuButton>);

  return (
    <Container onClick={onClick} className={className}>
      <TitleRow>
        <h1>{title}</h1>
        {favoriteButton}
        {toolMenuButton}
      </TitleRow>
      <p>{peekContent}</p>
    </Container >
  );
}

export default SideNote;