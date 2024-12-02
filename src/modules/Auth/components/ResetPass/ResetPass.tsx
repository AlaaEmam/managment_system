import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTHURLS, axiosInstance } from '../../../../constants/URLS';
import { EmailValidation, OTPValidation, PasswordValidation } from '../../../../constants/validations';
import Logo from '../../../../assets/logo.png';

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
  <div>
    <div className='bg-container'>
      <div  className='container-fluid'>
        <div  className="row justify-content-center align-items-center">
          <div className='col-lg-6 col-md-8 col-sm-10'>
            <div className="logo-container">
              <img className="img-fluid my-3" src={Logo} alt="Logo" />
            </div>
            <div className='pt-3 px-5'>
              <div className='form-background rounded-2 p-5'>
                <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-4">
                    <p className="fw-light fs-7 text-white">
                      Welcome Back to Project Management System PMS.
                    </p>
                    <h4 className="auth-text-header">Reset Password</h4>
                </div>

                {/* Email input */}
                <div className='mt-4 mb-3'>
                  <label className="form-label mb-0">Email </label>
                    <input 
                    type="email" 
                    className="form-control  border-top-0 border-end-0 border-start-0 rounded-0 bg-transparent text-white" 
                    placeholder="Enter your E-mail" 
                    aria-label="Email" 
                    aria-describedby="basic-addon1"
                    {...register('email', EmailValidation)}
                    />
                  {errors.email && <span className="text-danger ">{errors.email.message}</span>}
              </div>

              {/* OTP input */}
              
              <div className='mb-3'>
              <label className="form-label mb-0">OTP Verification</label>
                <input 
                type="text" 
                className="form-control  border-top-0 border-end-0 border-start-0 rounded-0 bg-transparent text-white" 
                placeholder="Enter your OTP Code" 
                aria-label="Seed" aria-describedby="basic-addon1"
                {...register('seed', OTPValidation)}
                />
                {errors.seed && <span className="text-danger ">{errors.seed.message}</span>}
              </div>
              
             {/* PASSWORD  input*/}
              <div className='mb-3'>
              <label className="form-label mb-0">New Password</label>
                <div className="input-group d-flex justify-content-center align-items-center">
                <input 
                type={isPasswordVisible ? "text" : "password"}  
                className="form-control border-top-0 border-end-0 border-start-0 rounded-0 bg-transparent text-white"  
                placeholder="Enter your New Password" 
                aria-label="Password" 
                aria-describedby="basic-addon1"
                {...register('password', PasswordValidation)}
                />
                <button 
                  className="input-group-text border-0 bg-transparent position-absolute end-0 "
                  type="button"
                  onClick={()=>{setIsPasswordVisible((prev) => !prev)}}
                  onMouseDown={(e)=>
                    {e.preventDefault();}
                  }
                  onMouseUp={(e)=>
                  {e.preventDefault();}
                  }
                  id="basic-addon1">
                    <i
                     className={
                     `bi ${isPasswordVisible
                        ?   "bi-eye fs-5 text-white"
                        : "bi bi-eye-slash fs-5 text-white"}`
                     }
                    ></i>
                </button>
                </div>             
                {errors.password && <span className="text-danger ">{errors.password.message}</span>}

              </div>

              {/* CONFIRM PASSWORD */}
              
              <div className='mb-3'>
                <label className="form-label mb-0">Confirm Password</label>
                    <div className="input-group d-flex justify-content-center align-items-center">
                      <input 
                      type={isConfirmPasswordVisible ? "text" : "password"}  
                      className="form-control  border-top-0 border-end-0 border-start-0 rounded-0 bg-transparent text-white" 
                      placeholder="Enter your New Password" 
                      aria-label="Password" 
                      aria-describedby="basic-addon1"
                    {...register('confirmPassword', PasswordValidation)}
                    />

                    <button className="input-group-text border-0 bg-transparent position-absolute end-0"
                      type="button"
                      onClick={()=>{setIsConfirmPasswordVisible((prev) => !prev)}}
                      onMouseDown={(e)=>
                        {e.preventDefault();}
                      }
                      onMouseUp={(e)=>
                      {e.preventDefault();}
                      }
                      id="basic-addon1">
                        <i className={
                          ` bi ${isConfirmPasswordVisible 
                          ? "bi-eye fs-5 text-white" : 
                          " bi-eye-slash fs-5 text-white"}`
                          } 
                          aria-hidden='true'></i>
                    </button>
                    </div>
               {errors.confirmPassword && <span className="text-danger ">{errors.confirmPassword.message}</span>}
              </div>
              

              <button disabled={isSubmitting}  
              className='btn btn-color rounded-5 mt-5  w-100 my-3'>
                {isSubmitting ? "Saving": "Save"}
              </button>  
            </form>
              </div>
            </div>
         
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
