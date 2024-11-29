import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AUTHURLS, axiosInstance} from '../../../../constants/URLS';
import { EmailValidation } from '../../../../constants/validations';

export default function ForgetPassword() {
  interface FormData {
    email: string;
  }
  interface ApiResponse{
    message: string;  
  }
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
    <div className='forget-password px-5 py-5 rounded-4'>
      <div className='title'>  
        <span>welcome to PMS</span>
        <h3>Forget Password</h3>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label>E-mail</label>
        <div className='input-group mb-3 my-2'>
          <input type="email" className="form-control" 
          placeholder="Enter your E-mail" 
          aria-label="Email" aria-describedby="basic-addon1"
          {...register('email', EmailValidation)}
          />
        </div>
        {errors.email && <span className="text-danger ">{errors.email.message}</span>}
        <button disabled={isSubmitting}  className='btn-yellow w-100 py-2 my-2 
          text-white rounded-3 border-0'>
          {isSubmitting ? "Verifying": "Verify"}
        </button>  
      </form>
    </div>
  )
}
