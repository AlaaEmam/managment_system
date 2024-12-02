import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, NavLink } from "react-router-dom";
import "./SideBar.css";
export default function SideBar() {
  const [isCollapsed, setCollapsed] = useState(true);

  const chage = () => {
    console.log(isCollapsed);
    setCollapsed(!isCollapsed);
  };
  return (
    <div className="container-sidebar">
      <Sidebar collapsed={isCollapsed} className="vh-100 sideBar_style pt-2">
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              // only apply styles on first level elements of the tree
              if (level === 0)
                return {
                  color: disabled ? "red" : "#ffffff",
                  backgroundColor: active ? " #1F263E" : " #1F263E",
                };
            },
          }}
        >
          <MenuItem
            icon={
              <i
                className="fa-solid fa-angle-left position-absolute end-0 px-2 py-2  fa-1x rounded-start-2 bg-warning"
                onClick={() => {
                  chage();
                }}
              ></i>
            }
            component={<NavLink to="/dashboard" />}
            className="my-2"
          ></MenuItem>

          <MenuItem
                      active={window.location.pathname === "/dashboard"}

            icon={
              <i
                className="fa-solid fa-display"
                onClick={() => {
                  chage();
                }}
              ></i>
            }
            component={<NavLink to="/dashboard" />}
            className="my-2"
          ></MenuItem>

          <MenuItem
            active={window.location.pathname === "/usersList"}
            icon={<i className="fa-regular fa-address-card"></i>}
            component={<NavLink to="usersList" />}
            className="my-2"
          >
            Users
          </MenuItem>
          <MenuItem
            active={window.location.pathname === "/ProjectsList"}
            icon={<i className="fa-regular fa-object-ungroup"></i>}
            component={<NavLink to="ProjectsList" />}
            className="my-2"
          >
            Projects
          </MenuItem>
          <MenuItem
            active={window.location.pathname === "/tasksList"}
            icon={<i className="fa-regular fa-rectangle-list"></i>}
            component={<Link to="tasksList" />}
            className="my-2"
          >
            Tasks
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
