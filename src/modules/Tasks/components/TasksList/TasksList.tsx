import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './TasksList.css';
import SearchBar from './../../../Shared/components/SearchBar/SearchBar';
import { axiosInstance } from '../../../../services/urlApi';
import { TASKSURLS } from './../../../../constants/URLS';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import View from '../../../../assets/icons/View.png';
import Delete from '../../../../assets/icons/delete.png';
import Edit from '../../../../assets/icons/Edit.png';


interface Task {
  id: number;
  title: string;
  status: string;
  numUsers: number;
  numTasks: number;
  creationDate: string;  // Adjust type based on your API response
}

export default function TasksList() {
  const [tasksList, setTasksList] = useState<Task[]>([]);

  const getTasksList = async () => {
    try {
      const response = await axios.get(`https://upskilling-egypt.com:3003/api/v1/Task/manager?pageSize=10&pageNumber=1`,
        {    headers: {Authorization:localStorage.getItem("token")},}
      );
      console.log(response.data.data);
      setTasksList(response.data.data);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to fetch tasks."); // Optional: Show toast notification
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    getTasksList();
  }, []);

  // Handle Search
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search logic here
  };

  return (
    <>
      <div className='bg-gray'>
        <div className='header-module'>
          <div>
            <h3 className='fw-bolder'>Tasks</h3>
          </div>
          <div>
         <Link to='task-form'>
         <button className='btn btn-color rounded'>
              <i className="fa-solid fa-plus"></i>
              <span className='mx-1'> Add New Task</span>
            </button>
         </Link>
          </div>
        </div>
        <div className='container'>
          <div className='background-module'>
            {/* Search */}
            <SearchBar onSearch={handleSearch} />

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Num Users</th>
                  <th>Num Tasks</th>
                  <th>Date Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tasksList.map((task) => (
                  <tr key={task.id}>
                    <td>{task.title}</td>
                    <td>{task.status}</td>
                    <td>{task.numUsers}</td>
                    <td>{task.numTasks}</td>
                    <td>{task.creationDate}</td>
                    <td>
                    <div className="dropdown">
                      <div typeof="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa-solid fa-ellipsis text-success"></i>
                      </div>
                      <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" to={``} ><img src={View} alt="" />View</Link></li>
                        <li><Link className="dropdown-item" to={`${task?.id}`} ><img src={Edit} alt="" />Edit</Link></li>
                        <li><Link className="dropdown-item" to={``} ><img src={Delete} alt="" />Delete</Link></li>
                      </ul>
                    </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}