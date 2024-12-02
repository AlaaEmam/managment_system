import React, { useEffect, useState } from 'react'
import '../ProjectsAddList.css'
import { axiosInstance, PROJECTSURLS } from '../../../../constants/URLS';
import { Link } from 'react-router-dom';
export default function ProjectsList() {
  let [projectsList, setProjectsList]=useState([]);
  
  const getAllprojects=async()=>{
    try{
      let response=await axiosInstance.get(PROJECTSURLS.getAll);
      console.log(response.data.data);

      setProjectsList(response.data.data);
    }catch(error){
      console.log(error)

    }
  }

  useEffect(()=>{
    getAllprojects();
  },[])
  return (
    <div>
      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='title-project'>Projects</h1>
        <Link to="/dashboard/projectsData" className="btn add-project">+ Add New Project</Link>
      </div>
      <div>

        { projectsList.length > 0 ?
            <table className="table table-white table-striped">
              <thead className="table-header table-secondary table-borderless">
                <tr >
                  <th scope="col">Title</th>
                  <th scope="col">Status</th>
                  <th scope="col">User</th>
                  <th scope="col">Project</th>
                  <th scope="col">Date Created</th>
                  <th scope="col">Actions</th> 
                  
                  
                </tr>
              </thead>
              <tbody>
                {/* {recipesList.map(recipe=>
                <tr key={recipe.id}>
                  <td>{recipe.name}</td>
                  <td className="w-25">{recipe.imagePath ?
                    <img className="w-25" src={`${imgbaseURL}/${recipe.imagePath}`} alt="" />
                    :<img className="w-25" src={sora} alt="" />}
                    </td>
                    <td>{recipe.price}</td>
                    <td>{recipe.description}</td>
                    <td>{recipe.tag.name}</td>
                    <td>{recipe.category?.[0]?.name}</td>
                    
                    {loginData?.userGroup != 'SystemUser' ? (
                      <td>
                      <i className="bi bi-trash-fill text-danger fs-5"
                      onClick={()=>handleShow(recipe.id)} aria-hidden="true"></i>
                      
                      <Link to={`${recipe?.id}`}>
                      <i className="bi bi-pencil-square text-warning fs-5" aria-hidden="true"></i>
                      </Link>
                    </td>):<td>
                    <i className="bi bi-heart-fill text-danger "
                    onClick={()=>addToFav(recipe.id)} aria-hidden="true"></i>
                    </td>}
                    
                    
                    </tr>
                    
                    )} */}
                
              </tbody>
            </table> : ""}
      </div>
    </div>
  )
}
