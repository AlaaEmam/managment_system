import React, { useContext, useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import "./SideBar.css";
import { AuthContext } from "../../../../context/AuthContext";


export default function SideBar() {
  const [isCollapsed, setCollapsed] = useState(true);
  const loginData = useContext(AuthContext);

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

        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                color: "#EF9B28",
              },
              [`&`]: {
                color: "#ffffff",
              },
            },
          }}
        >
        
          <i
            onClick={() => {
              chage();
            }}
            className="fa-solid fa-chevron-left  rounded-start-3 z-3 position-absolute sidebar_icon"
          ></i>
      
          <MenuItem
            icon={<i className="fa-solid fa-house"></i>}
            className="my-2 h6 mt-3"
            component={<NavLink to="/dashboard" />}
          >
            Home
          </MenuItem>

     
          <MenuItem
            icon={<i className="fa-solid fa-diagram-project"></i>}
            component={<NavLink to="/dashboard/projects-list" />}
            className="my-2 h6"
          >
            Projects
          </MenuItem>

          {loginData?.loginData?.roles?.includes("Employee") && (
           <MenuItem
           active={window.location.pathname === "/task-employee"}
           icon={<i className="fa-regular fa-rectangle-list"></i>}
           component={<Link to="/dashboard/task-employee" />}
         >
           Tasks
         </MenuItem>
          )}


          {loginData?.loginData?.roles?.includes("Manager") && (
          <MenuItem
          active={window.location.pathname === "/tasks-list"}
          icon={<i className="fa-regular fa-rectangle-list"></i>}
          component={<Link to="tasks-list" />} 
          className="my-2"
        >
          Tasks
        </MenuItem>
        
          )}
          {loginData?.loginData?.roles?.includes("Manager") && (
              <MenuItem
              icon={<i className="fa-solid fa-users"></i>}
              component={<NavLink to="/dashboard/usersList" />}
              className="my-2 h6"
            >
              Users
            </MenuItem>
          
          )}
    
          

          <MenuItem
            icon={<i className="fa-solid fa-unlock"></i>}
            component={<NavLink to="/change-password" />}
            className="my-2 h6"
          >
            Change password
          </MenuItem>

          <MenuItem
            icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}
            onClick={logOut}
            className="my-2 h6"
          >
            logout
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
