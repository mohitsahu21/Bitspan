// Filename - components/SubMenu.js

import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarLink = styled(Link)`
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 50px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    /* background: #f7f6ff;
    border-left: 4px solid #a697fa;
    cursor: pointer;
    color: #a697fa; */
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
`;

const DropdownLink = styled(Link)`
  background: #f7f6ff;
  height: 50px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #2c323f;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: #ddd8fd;
    cursor: pointer;
  }
`;


const SubMenu = ({ item, activeDropdown, handleDropdownClick, closeSidebar }) => {
  const isOpen = activeDropdown === item.title;

  const handleMainClick = () => {
    if (item.subNav) {
      handleDropdownClick(item.title);
    } else if (window.innerWidth <= 1024) {
      closeSidebar();
    }
  };

  const handleSubNavClick = () => {
    if (window.innerWidth <= 1024) {
      closeSidebar();
    }
  };

  return (
    <>
      <SidebarLink to={item.path || "#"} onClick={handleMainClick}>
        <div>
          <span className="icon">{item.icon}</span>
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav ? (isOpen ? item.iconOpened : item.iconClosed) : null}
        </div>
      </SidebarLink>

      {isOpen &&
        item.subNav?.map((subItem, index) => (
          <DropdownLink to={subItem.path} key={index} onClick={handleSubNavClick}>
            {subItem.icon}
            <SidebarLabel>{subItem.title}</SidebarLabel>
          </DropdownLink>
        ))}
    </>
  );
};

export default SubMenu;
// Hello Dev Branch
