import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

import Header from '../Header/Header'


export default function MasterLayout() {
  return (
    <div className="d-flex flex-column">
      <div className="w-100">
        <Navbar/>
      
      </div>

      <div className="d-flex border-0">
        <SideBar/>
        <div className="w-100">

          <Header/>

          <Outlet/>
        </div>
      </div>
    

  </div>  
  )
}

