import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import './TasksList.css';
import SearchBar from './../../../Shared/components/SearchBar/SearchBar';
import { axiosInstance } from '../../../../services/urlApi';
import { TASKSURLS } from './../../../../constants/URLS';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axios from 'axios';
import View from '../../../../assets/icons/View.svg';
import Delete from '../../../../assets/icons/delete.svg';
import Edit from '../../../../assets/icons/Edit.svg';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import NoData from './../../../Shared/components/NoData/NoData';
import closeButton from '../../../../assets/closeButton.png';
import Pagination from './../../../Shared/components/Pagination/Pagination';



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
  const getTasksList = async (pageNo: number, pageSize: number) => {
    try {
      const response = await axios.get(`https://upskilling-egypt.com:3003/api/v1/Task/manager`,
        {    
          headers: {Authorization:localStorage.getItem("token")},
          params: {
            pageSize: pageSize , 
            pageNumber: pageNo , 
          }
      }
      );
      console.log(response.data.data);
      setTasksList(response.data.data);
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to fetch tasks."); // Optional: Show toast notification
    }
  };

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
          getTasksList(currentPage, tasksPerPage);
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

  //Modal View
  const [showView, setShowView] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<any | null>(null);

  const handleCloseView = () => setShowView(false);
  const handleShowView = (task: any) => {
    setSelectedTask(task);
    setShowView(true);
  };

  // Handle Sort
  // const [sortedTasks, setSortedTasks] = useState<Task[]>([]);
  // const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);

  // const handleSort = () => {
  //   const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
  //   setSortDirection(newDirection);

  //   const sorted = [...tasksList].sort((a, b) => {
  //     if (newDirection === 'asc') {
  //       return a.title.localeCompare(b.title);
  //     } else {
  //       return b.title.localeCompare(a.title);
  //     }
  //   });

  //   setSortedTasks(sorted);
  // };



//Handel pagination
const [tasksPerPage] = useState<number>(6);
const [totalTasks, setTotalTasks] = useState<number>(0);

const [currentPage, setCurrentPage] = useState(1);
const totalResults = 102; 
const resultsPerPage = 10; 
const totalPages = Math.ceil(totalResults / resultsPerPage);


const handlePageChange = (pageNo: number) => {
  setCurrentPage(pageNo);
  getTasksList(pageNo, tasksPerPage);
};

  // Fetch tasks on component mount
  useEffect(() => {
    getTasksList(currentPage, tasksPerPage);
    //getCountTasks();
  }, [currentPage]);

  return (
    <>
      {/* <DeleteConfirmation 
      deleteItem={'Task'}
      handleCloseDelete={handleCloseDelete}
      showDelete={showDelete}
      deleteFunction={deleteTask}
      />  */}
      
    {/* View user Modal */}
    <Modal show={showView} onHide={handleCloseView} centered>
      <Modal.Header className='d-flex justify-content-between align-items-center'>
          <h5>View Task Data</h5>
          <img role="button" src={closeButton} onClick={handleCloseView} alt="Close" />
      </Modal.Header>
      <Modal.Body className="text-center">
          {selectedTask && (
              <>
                  <h6 className="mb-3"><strong>Title: </strong>{selectedTask.title}</h6>
                  <h6 className="mb-3"><strong>Description: </strong>{selectedTask.description}</h6>
                  <h6 className="mb-3"><strong>Status: </strong>{selectedTask.status} </h6> 
                  <h6 className="mb-3"><strong>User Name: </strong>{selectedTask.employee?.userName} </h6> 
                  <h6 className="mb-3"><strong>Project Name: </strong>{selectedTask.project?.title} </h6> 
                  <h6 className="mb-3"><strong>Date Created: </strong> {new Date (selectedTask.creationDate).toLocaleDateString()}</h6>
              </>
          )}
      </Modal.Body>
    </Modal>

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
        {/* <div className='d-inline-grid fw -lighter px-2'>
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
        </div> */}
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
            <td>{task.employee?.userName}</td>
            <td>{task.project?.title}</td>
            <td>{new Date(task.creationDate).toLocaleDateString()}</td>

            <td>

            <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-success">
                <i className="fa-solid fa-ellipsis-vertical"></i>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleShowView(task)} >
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
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalResults={totalResults}
            onPageChange={handlePageChange}
            /> 
          </div>


        </div>
      </div>
   
    </>
  );
}
