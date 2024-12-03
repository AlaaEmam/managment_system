import React, { useContext, useState } from 'react'
import dashLogo from "../../../../assets/dash-logo.png"
import avatar from "../../../../assets/avatar.png"
import './navbar.css'
import { AuthContext } from '../../../../context/AuthContext';

// I changed this.
interface loginData{
  userName:string;
}
export default function Navbar() {
  const {LoginData}:any=useContext(AuthContext);
  console.log(LoginData?.userName)
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <img className='dash-logo' src={dashLogo} alt="" />
        </div>

        <div>
          <img className="avatar-img mx-3" src={avatar} alt="user-img" />
          <span>{LoginData?.userName}</span>
        </div>
      </div> 
    </>
  )
}
