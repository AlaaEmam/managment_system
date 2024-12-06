import React from 'react'

import styles from '../ProjectsAddList.module.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { axiosInstance, PROJECTSURLS } from '../../../../constants/URLS';
import { toast } from 'react-toastify';


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
        const response=await axiosInstance[isNewproject?'post':'put']<ApiResponse>(
          (isNewproject? PROJECTSURLS.addUrl: PROJECTSURLS.updateUrl(String(projectId)))
          , data);
        console.log(response);
        
        toast.success("Project added");
        navigate("/dashboard/projectsList")
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
    <div className={styles['bg-project']}>
      <div className='d-flex bg-white flex-column'>
        <Link to="/dashboard/projectsList" className={styles["view-project"]}>
          {`${'<'}`} View All Projects
        </Link>
        <h1 className={styles['view-project']}>Add a new Project</h1>
      </div>
      
      
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

        <div className={styles['actions-wrapper']}>
        <Link to="/dashboard/projectsList" type="button" className={styles["btn-cancel"]}>Cancel</Link>
          <button disabled={isSubmitting} className={styles["btn-primary"]}>
            {isSubmitting? "Saving...":"Save"}</button>
        </div>


      </form>
    </div>
  )
}
