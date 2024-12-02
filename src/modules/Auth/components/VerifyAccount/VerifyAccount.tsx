import Logo from '../../../../assets/logo.png';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AUTHURLS } from './../../../../constants/URLS';
import { EmailValidation, OTPValidation } from '../../../../constants/validations';
import axios from 'axios';
import { axiosInstance } from '../../../../services/urlApi';

export default function VerifyAccount() {
  
interface FormData {
  email: string;
  code: string;
}
interface ApiResponse{
  message: string;  
}

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors ,isSubmitting},
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axiosInstance.put<ApiResponse>(
        AUTHURLS.verifyAccountUrl, data );
      console.log(response.data.message);
         navigate('/login');
         toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };
  return (
    <div className="bg-container">
    <div className="container-fluid">
      <div className="row justify-content-center align-content-center">
        <div className="col-md-6 col-sm-6">
          <div className="logo-container">
            <img className="img-fluid my-3" src={Logo} alt="Logo" />
          </div>
          <div className='col-lg-12 col-sm-12'>
          <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="floating-form form-background rounded-2 py-2 px-5"
            >
            <div className="my-5">
                <p className="fw-light fs-7 text-white">
                  Welcome Back to Project Management System PMS.
                </p>
                <h4 className="auth-text-header">Verify Account</h4>
            </div>
              {/* INPUT EMAIL */}
              <div className="floating-label">
                  <span className="highlight"></span>
                    <input
                      type="text"
                      className="floating-input "
                      {...register('email', EmailValidation)}
                      placeholder=""
                    />
                    <label>E-mail</label>
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}
                </div>

                 {/* INPUT Verification code */}
              <div className="floating-label">
              <span className="highlight"></span>
                      <input 
                      type="text" 
                      className="floating-input "
                      {...register('code', OTPValidation)}
                      placeholder=""
                      />
                       <label>Verification Code</label>
                  {errors.code && <span className='text-danger'>{errors.code.message}</span>}
                </div>
          
              <div className='mb-3'>                
              </div>

              <button 
              disabled={isSubmitting}
              className="btn btn-color rounded-5 mt-5  w-100 my-3">
              {isSubmitting ? "Submit....... " : " Submit"}
                
                </button>
            </form>
          </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
