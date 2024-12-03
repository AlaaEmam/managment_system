import React, { useContext, useEffect, useState } from 'react'
import styles from '../ProjectsAddList.module.css'
import { axiosInstance, PROJECTSURLS, USERSSURLS } from '../../../../constants/URLS';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext';


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
  const [nameValue, setNameValue]=useState('');
  

  const getAllProjects=async(pageNo:number, pageSize:number, name:string=''): Promise<void>=>{
    try{
      let response=await axiosInstance.get(PROJECTSURLS.getAll,
        {params:{pageSize:pageSize, pageNumber:pageNo, name}}
      );
      
      console.log(response.data.data);

      setProjectsList(response.data.data);
    }catch(error){
      console.log(error)

    }
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
        <Link to="/dashboard/projectsData" className={styles["add-project"]}>+ Add New Project</Link>
      </div>
      
      
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
                      <td></td>
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
