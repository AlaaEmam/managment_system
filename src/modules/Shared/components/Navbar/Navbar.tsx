import React, { useState } from 'react'
import dashLogo from "../../../../assets/images/dash-logo.png"
import avatar from "../../../../assets/images/avatar.png"
interface Props {
  loginData:any;
}

// I changed this.

export default function Navbar({loginData}:Props) {
 
  
  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <img className='dash-logo' src={dashLogo} alt="" />
        </div>

        <div>
          <img className="avatar-img mx-3 avatar-img" src={avatar} alt="user-img" />
          <span>{loginData?.userName}</span>
        </div>
      </div> 
    </>
  )
}
