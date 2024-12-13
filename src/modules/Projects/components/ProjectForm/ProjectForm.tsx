import React from 'react'

import styles from '../ProjectsAddList.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { axiosInstance, PROJECTSURLS } from '../../../../constants/URLS';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';


export default function ProjectForm() {
  const params =useParams<{ projectId: string }>();
  const navigate=useNavigate();
  
  let { register, setValue, getValues,
    formState:{isSubmitting, errors}, 
    handleSubmit}=useForm<FormData>({mode:'onChange'})
   
    interface FormData{
      title:string;
      description:string;
    }

    interface ApiResponse{
      message: string;  
    }
    
    
    const onSubmitHandler:SubmitHandler<FormData>=async(data)=>{
      console.log(data);
      
      const formData = new FormData();    
      
      formData.append('title', data?.title);
      formData.append('description', data?.description);
  
      try{
        const response=await axiosInstance[isNewproject ? 'post' : 'put']<ApiResponse>(
          (isNewproject ? PROJECTSURLS.addUrl : PROJECTSURLS.updateUrl(String(projectId)))
          , data);
        console.log(response);
        
        toast.success("Project added");
        navigate("/dashboard/projects-list")
      }catch(error){
        
        toast.error("Failed to add Project");
        console.log(error)
      }
  
    }

    const projectId=params.projectId;
    const isNewproject=projectId ==="new-project";

    React.useEffect(()=>{
      (async ()=>{

        if(!isNewproject){
          const getProjectById=async()=>{
            try{
              const response=await axiosInstance.get(PROJECTSURLS.getUrl(String(projectId)));
              console.log(response)
              const project=response?.data
              setValue("title", project?.title);
              setValue("description", project?.description);
              
            }catch(error){
              console.log(error)
            }
          }
          getProjectById();
        }
        })()
    },[])
  
  return (
    <div className='bg-gray'>
      <div className='header-TaskForm'>
        <Link to="/dashboard/projects-list" >
        <div className='d-ruby'>
            <i className=" fa-solid fa-chevron-left p-2"></i> 
            <p className='fw-light '>View All Project</p>
        </div>
        </Link>
        <h3 className='fw-bold'>{projectId ? "Edit Project" : "Create New Project"}</h3>
        </div>

        <div className='container'>
          <div className='background-module form'>
            <form onSubmit={handleSubmit(onSubmitHandler)} className={styles["wrapper"]}>
              <div className={styles["input-wrapper"]}>
                <h3>Title</h3>
                {errors?.title?.message &&<div className="text-danger">{errors?.title?.message}</div>}
                <input placeholder="Name" 
                className="form-control"
                {...register("title", {required:"This title is required"})}/>
              
              </div>
      
              <div className={styles["input-wrapper"]}>
                <h3>Description</h3>
                {errors?.description?.message &&<div className="text-danger">{errors?.description?.message}</div>}
              <textarea placeholder="Description" className="form-control"
                {...register("description", {required:"description is required"})}/>
              </div>
      
              
              <hr />
              <div className='m-4 d-flex justify-content-sm-between'>
                  <Link  to="/dashboard/projects-list" >
                      <Button className='rounded-5 px-5 py-2 mx-2' variant="outline-dark">Cancel</Button>
                  </Link>
                  <Button className='btn btn-color rounded-5 border px-5 py-2 mx-2' disabled={isSubmitting} type="submit">
                      {isSubmitting ? "Saving..." : (projectId ? "Update" : "Submit")}
                  </Button>
              </div>
           </form>
          </div>
        </div>
    </div>
  )
}
