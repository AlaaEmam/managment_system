import React, { useContext, useEffect, useState } from 'react'
import styles from '../ProjectsAddList.module.css'
import { axiosInstance, PROJECTSURLS,  } from '../../../../constants/URLS';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';
import DeleteConfirmation from '../../../Shared/components/DeleteConfirmation/DeleteConfirmation';


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
  const [selectedId, setSelectedId]=useState<string>('0');
  const [nameValue, setNameValue]=useState<string>('');
  
  const [show, setShow] = useState<boolean>(false);
  const handleClose = () => setShow(false);
  const handleShow = (id:string) =>{ 
    setSelectedId(id)
    setShow(true)
  };
  
  const getProjects=async(pageNo:number, pageSize:number, name:string=''): Promise<void>=>{
    try{
      let response=await axiosInstance.get((loginData?.userGroup==="Manager" ?PROJECTSURLS.getAll:PROJECTSURLS.getEmp),
        {params:{pageSize:pageSize, pageNumber:pageNo, name}}
      );
      
      console.log(loginData?.userGroup);
      console.log(response.data.data);
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill(0).map((_,i)=>i+1));
      

      setProjectsList(response.data.data);
    }catch(error){
      console.log(error)

    }
  }
  
  let deleteProject=() =>{
    try{
      let response=axiosInstance.delete(PROJECTSURLS.deleteUrl(selectedId));
      // console.log(response);
      getProjects(1, 5)
    }catch(error){
      console.log(error)
    }
    // alert(selectedId)
    handleClose();
  }

  const getNameValue=(input: React.ChangeEvent<HTMLInputElement>)=>{
    // console.log(input.target.value);
    setNameValue(input.target.value);
    getProjects(1, 4, input.target.value);
  }


  useEffect(()=>{
    getProjects(1, 5);
  },[])
  return (
    <div className={styles['bg-project']}>
      <div className='d-flex bg-white  justify-content-between align-items-center'>
        <h1 className={styles['title-project']}>Projects</h1>
        {loginData?.userGroup ==='Manager'?
        <Link to="/dashboard/ProjectsList/new-project" className={styles["add-project"]}>+ Add New Project</Link>
        :""
        }
      </div>
      
      <DeleteConfirmation show={show} handleClose={handleClose} onDelete={deleteProject}>Project</DeleteConfirmation>  

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
                    <th scope="col">description</th>
                    <th scope="col">no of tasks</th>
                    <th scope="col">Date created</th>
                    <th scope="col">Actions</th> 
                    
                    
                  </tr>
                </thead>
                <tbody>
                  {projectsList.map((project:projectData)=>
                    <tr key={project?.id}>
                      <td>{project.title}</td>
                      <td>{project.description}</td>
                      <td>{project.task.length}</td>
                      <td>{project.creationDate}</td>
                      {loginData?.userGroup === 'Manager' ? (
                        <td>
                            <i className="bi bi-trash-fill text-danger fs-5"
                            onClick={()=>handleShow(String(project.id))} aria-hidden="true"></i>

                            <Link to={`${project?.id}`}>
                              <i className="bi bi-pencil-square text-warning fs-5" aria-hidden="true"></i>
                            </Link> 
                          </td>):<td>
                          {/* <i className="bi bi-heart-fill text-danger "
                            onClick={()=>addToFav(recipe.id)} aria-hidden="true"></i> */}
                        </td>}
                    </tr>
                      
                    )}
                  
                </tbody>
              </table> : (<h2>NO DATA</h2>)
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
  )
}
