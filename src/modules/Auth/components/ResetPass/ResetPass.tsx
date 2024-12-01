import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTHURLS, axiosInstance } from '../../../../constants/URLS';
import { EmailValidation, PasswordValidation } from '../../../../constants/validations';

// I changed this

export default function ResetPass() {
  interface FormData {
    email: string;
    seed: string;
    password:string;
    confirmPassword:string;
  }
  interface ApiResponse{
    message: string;  
  }
  
  const location=useLocation();
  const navigate=useNavigate();
  const [isPasswordVisible, setIsPasswordVisible]=React.useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible]=React.useState(false);
  const {register, formState:{isSubmitting, errors}, handleSubmit}=useForm<FormData>({defaultValues:{email:location.state}, mode:"onChange"});
  
  const onSubmit:SubmitHandler<FormData>= async (data)=>{
    try{
      let response=await axiosInstance.post<ApiResponse>(AUTHURLS.resetUrl, data);
      navigate('/login', {state: data.email});
      // console.log(response)

    }catch(error){
      if (axios.isAxiosError(error)) {
        
        console.error('Error response:', error.response?.data);
        
      } else {
        console.error('Unexpected error:', error);
      }
    }
    // console.log(data);
  }
  return (
    <div className='forget-password px-5 py-3 rounded-4'>
      <div className='title'>  
        <span>welcome to PMS</span>
        <h3>Forget Password</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* EMAIL */}
        <label>E-mail</label>
        <div className='input-group mb-3 my-2'>
          <input type="email" className="form-control" 
          placeholder="Enter your E-mail" 
          aria-label="Email" aria-describedby="basic-addon1"
          {...register('email', EmailValidation)}
          />
        </div>
        {errors.email && <span className="text-danger ">{errors.email.message}</span>}
        
        {/* OTP */}
        <label>OTP Verification</label>
        <div className='input-group mb-3 my-2'>
          <input type="text" className="form-control" 
          placeholder="Enter Verification" 
          aria-label="Seed" aria-describedby="basic-addon1"
          {...register('seed')}
          />
        </div>
        {errors.seed && <span className="text-danger ">{errors.seed.message}</span>}
        
        {/* PASSWORD */}
        <label>New Password</label>
        <div className='input-group mb-3 my-2'>
          
          <input type={isPasswordVisible ? "text" : "password"}  
             className="form-control" 
          placeholder="Enter your New Password" 
          aria-label="Password" aria-describedby="basic-addon1"
          {...register('password', PasswordValidation)}
          />

          <button className="eye-btn input-group-text"
            type="button"
            onClick={()=>{setIsPasswordVisible((prev) => !prev)}}
            onMouseDown={(e)=>
              {e.preventDefault();}
            }
            onMouseUp={(e)=>
            {e.preventDefault();}
            }
            id="basic-addon1">
              <i className={` bi ${isPasswordVisible?"bi-eye fs-5": " bi-eye-slash fs-5"}`} aria-hidden='true'></i>
          </button>

        </div>
        {errors.password && <span className="text-danger ">{errors.password.message}</span>}
        
        {/* CONFIRM PASSWORD */}
        <label>Confirm Password</label>
        <div className='input-group mb-3 my-2'>
          
          <input 
            type={isConfirmPasswordVisible ? "text" : "password"}  
            className="form-control" 
            placeholder="Enter your New Password" 
            aria-label="Password" aria-describedby="basic-addon1"
          {...register('confirmPassword', PasswordValidation)}
          />

          <button className="eye-btn input-group-text"
            type="button"
            onClick={()=>{setIsConfirmPasswordVisible((prev) => !prev)}}
            onMouseDown={(e)=>
              {e.preventDefault();}
            }
            onMouseUp={(e)=>
            {e.preventDefault();}
            }
            id="basic-addon1">
              <i className={` bi ${isConfirmPasswordVisible?"bi-eye fs-5": " bi-eye-slash fs-5"}`} aria-hidden='true'></i>
          </button>
        </div>
        {errors.confirmPassword && <span className="text-danger ">{errors.confirmPassword.message}</span>}
        

        <button disabled={isSubmitting}  className='btn-yellow w-100 py-2 my-2 
          text-white border-0'>
          {isSubmitting ? "Saving": "Save"}
        </button>  
      </form>
    </div>
  )
}
