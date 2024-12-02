import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTHURLS, axiosInstance} from '../../../../constants/URLS';
import { EmailValidation } from '../../../../constants/validations';
import Logo from '../../../../assets/logo.png';

interface FormData {
  email: string;
}
interface ApiResponse{
  message: string;  
}

export default function ForgetPassword() {

  let navigate=useNavigate();
  const {register, formState:{isSubmitting, errors}, handleSubmit}=useForm<FormData>();
  
  const onSubmit:SubmitHandler<FormData>= async (data)=>{
    try{
      let response=await axiosInstance.post<ApiResponse>(AUTHURLS.forgetUrl, data);
      navigate('/reset-password', {state: data.email});
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
    <div className='bg-container'>
      <div className='container-fluid'>
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="logo-container">
                <img className="img-fluid my-3" src={Logo} alt="Logo" />
          </div>
            <div className='pt-3 px-5' >
              <div className='form-background rounded-2 p-5'>
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-4">
                    <p className="fw-light fs-7 text-white">
                      Welcome Back to Project Management System PMS.
                    </p>
                    <h4 className="auth-text-header">Forget Password</h4>
                </div>

              {/* Email input */}
              
              <div className='my-5'>
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

              <button disabled={isSubmitting}  
              className='btn btn-color rounded-5 mt-5  w-100 my-3'>
                {isSubmitting ? "Verifying": "Verify"}
              </button>  
            </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
      
