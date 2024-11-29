import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom';
interface MasterLayoutProps {
  loginData: any; 
}
export default function MasterLayout({loginData}:MasterLayoutProps):any {
  return (
    <div className='d-flex'>
      <div className="w-100">
        <Navbar loginData={loginData}/>
        <Outlet/>
      
      </div>
    </div>
  )
}
