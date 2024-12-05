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
  const [selectedId, setSelectedId]=useState(0);
  const [nameValue, setNameValue]=useState('');
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (id:number) =>{ 
    setSelectedId(id)
    setShow(true)
  };
  
  const getAllProjects=async(pageNo:number, pageSize:number, name:string=''): Promise<void>=>{
    try{
      let response=await axiosInstance.get(PROJECTSURLS.getAll,
        {params:{pageSize:pageSize, pageNumber:pageNo, name}}
      );
      
      console.log(loginData?.userGroup);
      console.log(response.data.data);

      setProjectsList(response.data.data);
    }catch(error){
      console.log(error)

    }
  }
  
  let deleteProject=() =>{
    try{
      let response=axiosInstance.delete(PROJECTSURLS.deleteUrl(selectedId));
      // console.log(response);
      getAllProjects(1, 10)
    }catch(error){
      console.log(error)
    }
    // alert(selectedId)
    handleClose();
  }

  const getNameValue=(input: React.ChangeEvent<HTMLInputElement>)=>{
    // console.log(input.target.value);
    setNameValue(input.target.value);
    getAllProjects(1, 4, input.target.value);
  }


  useEffect(()=>{
    getAllProjects(1, 10);
  },[])
  return (
    <div className={styles['bg-project']}>
      <div className='d-flex bg-white  justify-content-between align-items-center'>
        <h1 className={styles['title-project']}>Projects</h1>
        {loginData?.userGroup ==='Manager'?
        <Link to="/dashboard/projectsData" className={styles["add-project"]}>+ Add New Project</Link>
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
                            onClick={()=>handleShow(project.id)} aria-hidden="true"></i>

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
          </div>
      </div>
    </div>
  )
}
