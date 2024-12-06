import React from 'react'
import Table from 'react-bootstrap/Table';
import './TasksList.css';
import SearchBar from './../../../Shared/components/SearchBar/SearchBar';

const handleSearch = (query: string) => {
  console.log('Search query:', query);
};

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

      {/* Search  */}
      <SearchBar onSearch={handleSearch} />
   
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



