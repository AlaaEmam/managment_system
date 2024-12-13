import React, { useContext, useEffect, useState } from 'react'
import styles from '../ProjectsAddList.module.css'
import { axiosInstance, PROJECTSURLS,  } from '../../../../constants/URLS';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';
import NoData from '../../../Shared/components/NoData/NoData';
import { Dropdown, Modal } from 'react-bootstrap';
import View from '../../../../assets/icons/View.svg';
import Delete from '../../../../assets/icons/delete.svg';
import Edit from '../../../../assets/icons/Edit.svg';
import closeButton from '../../../../assets/closeButton.png';

interface projectData{
  id: number;
  title: string;
  description: string;
  task:object[];
  creationDate:string;
}


export default function ProjectsList() {
  let {loginData}:any=useContext(AuthContext);
  let [projectsList, setProjectsList]=useState([]);

  const [arrayOfPages, setArrayOfPages]=useState<number[]>([]);
  const [nameValue, setNameValue]=useState<string>('');

  //Fetch data
  const getProjects = async (pageNo: number, pageSize: number, name: string = ''): Promise<void> => {
    try {
      let response = await axiosInstance.get(
        (loginData?.userGroup == "Manager" ? PROJECTSURLS.getAll : PROJECTSURLS.getEmp),
        { params: { pageSize: pageSize, pageNumber: pageNo, name } }
      );
  
      console.log("API response:", response.data.data); // Debug log
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill(0).map((_, i) => i + 1));
      setProjectsList(response.data.data);
    } catch (error) {
      console.log("Error fetching projects:", error); // Debug log
    }
  };

  let deleteProject = () => {
    try {
      if (selectedId !== null) {
        // Convert selectedId to a string for the delete URL
        let response = axiosInstance.delete(PROJECTSURLS.deleteUrl(selectedId.toString()));
        // Handle the response if needed
        getProjects(1, 5);
        
        // Pass selectedId to handleShowDelete
        handleShowDelete(selectedId);
      } else {
        console.error("Selected ID is null");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNameValue=(input: React.ChangeEvent<HTMLInputElement>)=>{
    console.log("Searching for:", input.target.value); 
    setNameValue(input.target.value);
    getProjects(1, 5, input.target.value);
  }
    
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
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const handleCloseView = () => setShowView(false);
  const handleShowView = (project: any) => {
    setSelectedProject(project);
    setShowView(true);
  };

  useEffect(()=>{
    getProjects(1, 5);
  },[])
  return (
   <>
    <div className='bg-gray'>
      <div className='header-module d-flex bg-white  justify-content-between align-items-center'>
        <h3 className='fw-bolder'>Projects</h3>
        {loginData?.userGroup ==='Manager'?
        <Link to="/dashboard/projects-list/new-project"  className='btn-color btn-yellow  px-3 py-2 mr-2'>+ Add New Project</Link>
        :""
        }
      </div>
      <DeleteConfirmation 
      deleteItem={'Project'}
      handleCloseDelete={handleCloseDelete}
      showDelete={showDelete}
      deleteFunction={deleteProject}
      /> 

    <Modal show={showView} onHide={handleCloseView} centered>
          <Modal.Header className='d-flex justify-content-between align-items-center'>
              <h5>View Project Data</h5>
              <img role="button" src={closeButton} onClick={handleCloseView} alt="Close" />
          </Modal.Header>
          <Modal.Body className="text-center">
              {selectedProject && (
                  <>
                      <h6 className="mb-3"><strong>Title: </strong>{selectedProject.title}</h6>
                      <h6 className="mb-3"><strong>Description: </strong>{selectedProject.description}</h6>
                      <h6 className="mb-3"><strong>Num Tasks: </strong>{selectedProject.task.length} </h6> 
                      <h6 className="mb-3"><strong>Date Created: </strong> {new Date (selectedProject.creationDate).toLocaleDateString()}</h6>
                  </>
              )}
          </Modal.Body>
        </Modal>
      <div className={styles["wrapper"]}>
          <div className="col-md-6">

            <input type="text"
            onChange={getNameValue}
            placeholder="Search here..."
            className={styles['search-input']}
            />
          </div>
          <div>
            {projectsList.length > 0 ?
              <table className="table table-white table-striped">
                <thead className="table-header table-success table-borderless">
                  <tr >
                    <th scope="col">Title</th>
                    <th scope="col">Description</th>
                    <th scope="col">Num Tasks</th>
                    <th scope="col">Date Created</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projectsList.map((project:projectData)=>
                    <tr key={project?.id}>
                      <td>{project.title}</td>
                      <td>{project.description}</td>
                      <td>{project.task.length}</td>
                      <td>{new Date(project.creationDate).toLocaleDateString()}</td>
                      {/* {loginData?.userGroup === 'Manager' ? (
                        <td>
                            <i className="bi bi-trash-fill text-danger fs-5"
                            onClick={()=>handleShow(String(project.id))} aria-hidden="true"></i>
                            
                            <Link to={`${project?.id}`}>
                              <i className="bi bi-pencil-square text-warning fs-5" aria-hidden="true"></i>
                            </Link>
                          </td>
                        ) : <td> {" "} </td> } */}
                           <td>
                            <Dropdown>
                                <Dropdown.Toggle variant="link" id="dropdown-basic" className="text-success">
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item onClick={() => handleShowView(project)} >
                                    <img src={View} alt="View" /> View
                                  </Dropdown.Item>
                                  <Dropdown.Item as={Link} to={`${project?.id}`}>
                                    <img src={Edit} alt="Edit" /> Edit
                                </Dropdown.Item>
                                  <Dropdown.Item onClick={() => handleShowDelete(project?.id)}>
                                    <img src={Delete} alt="Delete" /> Delete
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </td>
                    </tr>
                    )}
                </tbody>
              </table> :   
              <div>
                <table className="table table-white table-striped">
                <thead className="table-header table-success table-borderless">
                  <tr >
                    <th scope="col">Title</th>
                    <th scope="col">description</th>
                    <th scope="col">no of tasks</th>
                    <th scope="col">Date created</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
              </table> 
            <NoData/>
              </div>
            }
            <nav aria-label="Page navigation example" className='d-flex justify-content-end'>
              <ul className="pagination">
                <li className="page-item" >
                  <a className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </a>
                </li>
                {arrayOfPages.map((pageNo)=>(

                  <li className="page-item" key={pageNo}
                  onClick={()=>getProjects(pageNo, 5)}>
                    <a className="page-link" >
                      {pageNo}
                    </a>
                  </li>))
                }


                <li className="page-item">
                  <a className="page-link"  aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </a>
                </li>
              </ul>
            </nav>

          </div>
      </div>
    </div>
   </>
  )
}
