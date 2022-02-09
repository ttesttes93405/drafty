import { useState, useEffect } from "react";
import styled from "styled-components";
import Menu, { SubMenu, MenuItem } from 'rc-menu';

const Container = styled.div`
    height: 80px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    background-color: #ffffff;
    padding: 8px;
    box-sizing: border-box;
    position: relative;


    &:hover {
      background-color: #f8f8f8;
    }

    &.selected {
      background-color: #eeeeee;
    }

    h1 {
      font-size: 1.35rem;
      margin: 0;
      height: 37px;
      line-height: 37px;
      font-weight: 500;
      overflow: hidden;
      text-overflow : ellipsis;
      white-space : nowrap;
    }

    p {
      font-size: 0.9rem;
      margin: 0;
      height: 27px;
      /* line-height: 27px; */
      color: #444;
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

  &:hover, &.dropdown {
    background-color: #d8d8d8;
  }

  img {
    height: 16px;
    width: 16px;
    padding: 0;
    margin: 0;
    opacity: 0.5;
    
    &:hover {
      opacity: 1;
    }
  }

`;

const ToolMenu = styled.div`
  
  position: absolute;
  top: 8px;
  right: 8px;

  .rc-menu {
    position: absolute;
    top: 38px;
    right: 0;
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
    padding: 0 4px;

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

  const handleClickOutside = (e) => {
    console.log(e)
    setDropdown(false);
  };

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
    },
    {
      name: 'Delete',
      action: () => { removeNoteHandler(id); },
      className: 'danger',
    },
  ]


  const toolMenu = (
    <ToolMenu>
      <ToolMenuButton className={dropdown ? 'dropdown' : ''} onClick={(e) => {
        e.nativeEvent.stopPropagation();
        setDropdown(!dropdown);
      }}>
        <img src='./icons/three-dots.svg' />
      </ToolMenuButton>

      {dropdown && (<Menu onClick={(e) => {
        e.domEvent.stopPropagation();
        setDropdown(false);
      }}>
        {
          menuItems.map(item => (<MenuItem key={item.name} onClick={item.action} className={item.className} itemIcon={item.icon}>
            {item.name}
          </MenuItem>))
        }
      </Menu>)}

    </ToolMenu>
  );

  return (
    <Container onClick={onClick} className={className}>
      <h1>{title}{isFavorite?'(<3)':''}</h1>
      <p>{peekContent}</p>
      {toolMenu}
    </Container >
  );
}

export default SideNote;