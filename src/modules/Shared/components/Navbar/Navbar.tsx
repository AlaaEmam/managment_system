import React, { useContext, useState } from 'react'
import './Navbar.css'
import Logo from '../../../../assets/logo-dark.png';
import DefaultProfile from '../../../../assets/defaultavatar.jpg';
import { AuthContext } from '../../../../context/AuthContext';

// I changed this.

export default function Navbar() {
  const {LoginData}:any=useContext(AuthContext);
  console.log(LoginData?.userName)
  return (
    <>
<div className='d-flex justify-content-between align-items-center navbar'>
  <div className="d-flex align-items-center">
    <img className='dash-logo' src={Logo} alt="Logo" />

  </div>

  <div className='d-flex align-items-center px-4'>
  <div className='border-right '>   
    <div className="nav-item position-relative ms-3">
      <i className="fas fa-bell"></i>
      <span className="position-absolute top-0 start-100 translate-middle badge border border-light rounded-circle bg-danger p-1">
        <span className="visually-hidden">unread messages</span>
      </span>
      </div>
    </div>
    <img className="avatar-img mx-3" src={DefaultProfile} alt="User" />
    <div className='navbar-title'>
      <h5 className='fw-light mb-0'>Upskilling</h5>
      <p className='fw-lighter mt-2'>upskilling.eg1@gmail.com</p>
    </div>
  </div>
</div>

       
    </>
  )
}