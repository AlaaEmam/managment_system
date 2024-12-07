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
import { Button, Dropdown, Modal } from 'react-bootstrap';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import NoData from './../../../Shared/components/NoData/NoData';



export default function TasksList() {
  interface Employee {
    userName: string;
  }
  
  interface Project {
    title: string;
  }
  
  interface Task {
    id: any;
    title: string;
    description: string;
    status: string;
    numUsers: number;
    numTasks: number;
    creationDate: string; 
    project: Project;
    employee: Employee;
  }
  const [tasksList, setTasksList] = useState<Task[]>([]);
  const [counttasks, setCountTasks] = useState<Task[]>([]);

  // Get Tasks
  const getTasksList = async () => {
    try {
      const response = await axios.get(`https://upskilling-egypt.com:3003/api/v1/Task/manager`,
        {    headers: {Authorization:localStorage.getItem("token")},}
      );
      console.log(response.data.data);
      setTasksList(response.data.data);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to fetch tasks."); // Optional: Show toast notification
    }
  };

  // Get count Tasks
  const getCountTasks= async () => {
    try {
      const response = await axios.get(`https://upskilling-egypt.com:3003/api/v1/Task/count`,
        {    headers: {Authorization:localStorage.getItem("token")},}
      );
      console.log(response.data.data);
      setCountTasks(response.data.data);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to fetch tasks."); // Optional: Show toast notification
    }
  };

  // Fetch tasks on component mount
  useEffect(() => {
    getTasksList();
    getCountTasks();
  }, []);

  // Handle Search
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement search logic here
  };

  //Handle delete 
  let deleteTask = async  () =>{
      if(selectedId !== null){
        try{
          let response = await axios.delete(`https://upskilling-egypt.com:3003/api/v1/Task/${selectedId}`,
            {
              headers: {Authorization:localStorage.getItem("token")},
            }
          );
          getTasksList();
          toast.success("Operation completed successfully! ");
         
        }catch(error){
          toast.error("An error occurred. Please try again."); // Handle errors
        }
      }
      handleCloseDelete();
  };
    
  //Handle Modal Delete
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = (id: number) => {
    setSelectedId(id);
    setShowDelete(true);
  };

  //Filter with Charater
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [sortedTasks, setSortedTasks] = useState<Task[]>(tasksList);
  const handleSort = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);

    const sorted = [...tasksList].sort((a, b) => {
        if (newDirection === 'asc') {
            return a.title.localeCompare(b.title);
        } else {
            return b.title.localeCompare(a.title);
        }
    });

    setSortedTasks(sorted);
};

  return (
    <>
      <DeleteConfirmation 
      deleteItem={'Task'}
      handleCloseDelete={handleCloseDelete}
      showDelete={showDelete}
      deleteFunction={deleteTask}
      /> 

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

            {tasksList.length > 0 ?
            <Table striped bordered hover>
            <thead>
              <tr>
              <th>Title
                  <div className='d-inline-grid fw-lighter px-2'>
                      <i
                          className="fa-solid fa-angle-up"
                          onClick={handleSort}
                          style={{ cursor: 'pointer', color: sortDirection === 'asc' ? 'blue' : 'black' }}
                      ></i>
                      <i
                          className="fa-solid fa-angle-down"
                          onClick={handleSort}
                          style={{ cursor: 'pointer', color: sortDirection === 'desc' ? 'blue' : 'black' }}
                      ></i>
                  </div>
              </th>
                <th>Description</th>
                <th>Status</th>
                <th>Users Name</th>
                <th>Project Name</th>
                <th>Date Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {tasksList.map((task) => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <th>{task.description}</th>
                  <td className='text-center'>
                      <button className={
                      task.status === "ToDo" ? "status-todo" :
                      task.status === "InProgress" ? "status-in-progress" :
                      task.status === "Done" ? "status-done" :
                      ""
                    }>{task.status}</button>
                    </td>
                  <td>{task.employee.userName}</td>
                  <td>{task.project.title}</td>
                  <td>{task.creationDate}</td>
                  <td>
          
                  <Dropdown>
                      <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-success">
                      <i className="fa-solid fa-ellipsis-vertical"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={`${task.id}`}>
                          <img src={View} alt="View" /> View
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to={`${task?.id}`}>
                          <img src={Edit} alt="Edit" /> Edit
                      </Dropdown.Item>
                        <Dropdown.Item onClick={() => handleShowDelete(task.id)}>
                          <img src={Delete} alt="Delete" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table> 
          : <div>
              <Table  striped bordered hover>
                <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Numbers Users</th>
                  <th>Numbers Project</th>
                  <th>Date Created</th>
                  <th></th>
                </tr>
              </thead>
            </Table>
            <NoData/>
          </div>
          }
          </div>
        </div>
      </div>

   
    </>
  );
}