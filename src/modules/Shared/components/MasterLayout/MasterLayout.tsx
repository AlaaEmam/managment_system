import React from "react";
import SideBar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";

export default function MasterLayout() {
  return (
    <>
      <div className=" d-flex ">
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
