import React from "react";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";
import Navbar from '../Navbar/Navbar'

export default function MasterLayout() {
  return (
    <>
      <div className=" d-flex ">
      <div className="w-100">
        {/* <Navbar/> */}

      </div>
        <div>
          <div className="position-sticky top-0 vh-100 bg-black">
            <SideBar />
          </div>
        </div>
        <div className="w-100">
          <Outlet />
        </div>
      </div>
    </>
  );
}
