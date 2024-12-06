import React from 'react'
import Table from 'react-bootstrap/Table';
import './TasksList.css';


export default function TasksList() {
  return (
      <>
      <div className='bg-gray'>
      <div className='header-module'>
          <div>
            <h3 className='fw-bolder'>Tasks</h3>
            </div>
          <div> 
            <button className='btn btn-color rounded'>
              <i className="fa-solid fa-plus"></i> 
               <span className='mx-1'> Add New Task</span>
              </button>
          </div>
        </div>
        <div className='container'>
       

        
       
    
        <div className='background-module'>

      {/* Fillter & Search  */}
        <div className="mx-4 mb-3 bg-black ">
            <div className="search-bar input-group mb-1 rounded-pill">
                    <span className=" search-icon">
                     <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input 
                      type="text"
                      className="form-control rounded-5 pl-2"
                      placeholder="Search By Title"
                    />
            </div>
        </div>
   
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Statues</th>
                <th>Num Users</th>
                <th>Num Tasks</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      </div>
      </>
    
  )
}
