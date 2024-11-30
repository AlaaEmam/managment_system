import Logo from '../../../../assets/logo.png';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AUTHURLS, requestHeader } from './../../../../constants/URLS';
import { EmailValidation } from '../../../../constants/validations';
import axios from 'axios';

interface FormData {
  email: string;
  code: string;
}


export default function VerifyAccount() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post<{ message: string }>(
        AUTHURLS.verifyAccountUrl,
        data,
        { headers: requestHeader }
      );
      console.log(response.data.message);
      navigate('/login');
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data.message || 'An error occurred');
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

            <form 
            onSubmit={handleSubmit(onSubmit)} 
            className="floating-form col-lg-12 col-sm-12 "
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
                  </div>
                  {errors.email && <span className="text-danger">{errors.email.message}</span>}

                 {/* INPUT Verification code */}
              <div className="floating-label">
                      <input 
                      type="text" 
                      className="floating-input "
                      {...register('code', 
                        {
                          required: 'OTP is required. Please Enter Your OTP  or Check Your Inbox.',
                      })}
                      placeholder=""
                      />
                       <label>Verification Code</label>
                </div>
          
              <div className='mb-3'>                
                {errors.code && <span className='text-danger'>{errors.code.message}</span>}
              </div>

              <button className="btn primary-color w-100 p-2 mt-4 mb-2 rounded-5">Submit</button>
              </form>
          </div>
        </div>
      </div>
    </div>
  )
}
