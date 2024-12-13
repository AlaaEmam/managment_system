import React, { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext';

export default function Header() {
  const { loginData } = useContext(AuthContext) || { loginData: null };
    console.log('LoginData:', loginData);
  return (
    <>
 <div className=" container-fluid">
    <div className="row " >
      <div className='p-4'>
    <div className= "header2  d-flex  align-items-center mb-4">
      <div className="col-md-7 ps-5 text-white">
        <h3 className="fw-light fs-1 my-2">Welcome <span className=" fw-normal yellow ">{loginData ? loginData.userName : 'Guest'}</span></h3>
        <span className='fw-lighter fs-5'>You can add project and assign tasks to your team </span>
      </div>
    </div>
      </div>

        </div>
      </div>
    </>
  )
}
