import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import "./SideBar.css";
export default function SideBar() {
  const [isCollapsed, setCollapsed] = useState(true);

  const chage = () => {
    console.log(isCollapsed);
    setCollapsed(!isCollapsed);
  };
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container-sidebar">
      <Sidebar
        collapsed={isCollapsed}
        className="pt-5 vh-100 sideBar_style pt-2 position-sticky top-0"
      >
        {/* <NavLink to={url} exact activeClassName="activeLink" >dd</NavLink> */}

        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                //   backgroundColor: '#13395e',
                color: "#EF9B28",
              },
              [`&`]: {
                //backgroundColor: '#13395e',
                color: "#ffffff",
              },
              //  ['i.active']:{                color: '#dd2121 !important',}
            },
          }}
        >
          {/* <MenuItem
            icon={
              <i
                className="fa-solid fa-angle-left position-absolute end-0 px-2 py-2   rounded-start-2 bg-warning"
                onClick={() => {
                  chage();
                }}
              ></i>
            }
            component={<NavLink to="/" />}
            className="position-  my-5 z-3 end-0  bg-transparent firstItem"
          ></MenuItem> */}
<i onClick={() => {
                  chage();
                }} className="fa-solid fa-chevron-left  rounded-start-3 z-3 position-absolute sidebar_icon"></i>
          {/* <MenuItem

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
          ></MenuItem> */}

          <MenuItem
                      icon={<i className="fa-solid fa-house"></i>}
            className="my-2 h6 mt-3"
            component={<NavLink to="/dashboard" />}
          >
            {" "}
            Home
          </MenuItem>

          <MenuItem
            icon={<i className="fa-solid fa-users"></i>}
            component={<NavLink to="/dashboard/users" />}
            className="my-2 h6"
          >
            Users
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-diagram-project"></i>}
            component={<NavLink to="/dashboard/projects-list" />}
            className="my-2 h6"
          >
            Projects
          </MenuItem>
          <MenuItem
            icon={<i className="fa-solid fa-list-check"></i>}
            component={<NavLink to="/dashboard/tasks-list" />}
            className="my-2 h6"
          >
            Tasks
          </MenuItem>


          <MenuItem
            icon={<i className="fa-solid fa-unlock"></i>}
            component={<NavLink to="/change-password" />}
            className="my-2 h6"
          >
            Change password
          </MenuItem>


          <MenuItem
            icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}
            //component={<NavLink to="/" />}
            onClick={logOut}
            className="my-2 h6"
          >
            logout
          </MenuItem>
        </Menu>
      </Sidebar>
      ;
    </div>
  );
}
