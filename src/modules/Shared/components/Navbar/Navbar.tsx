import React, { useState } from 'react'
import avatar from "../../../../assets/images/avatar.png"
interface Props {
  loginData:any;
  profileImage:any;
}

export default function Navbar({loginData, profileImage}:Props) {
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e:any) => {
    setSearchText(e.target.value);
  }
  return (
    <>
       <nav className="navbar navbar-expand-lg">
        
    
      <div className="mr-auto col-md-6  d-flex justify-content-end align-items-center">
      <div className=" nav-item mx-5">
            <img className="avatar" src={profileImage || avatar} alt="user avatar" />
            <span className="navbar-text mx-2  fw-bold ">{loginData?.userName}</span>
        </div>
        
        <div  className=" nav-item position-relative">
        <i className="fas fa-bell"></i>
          <span className="position-absolute top-1 start-1 translate-middle badge border border-light rounded-circle bg-danger p-1">
          <span className="visually-hidden">unread messages</span></span>
        </div>
      

      </div>
    </nav>
    </>
  )
}
