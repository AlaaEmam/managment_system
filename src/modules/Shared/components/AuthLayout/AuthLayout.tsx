import React from 'react'
import logo from "../../../../assets/images/auth-logo.png"
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className='container-fluid auth-background'>
      <div className='row vh-100 justify-content-center align-items-center'>
        <div className='col-lg-5 col-md-6 rounded rounded-2'>
          <img className='project-logo' src={logo} alt="" />
          <Outlet/>
        </div>
      </div>
    </div>
  )
}
