import React, { useState } from 'react';
import Logo from '../../../../assets/logo.png';
import DefaultProfile from '../../../../assets/defaultavatar.jpg';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AUTHURLS } from './../../../../constants/URLS';
import { EmailValidation, PasswordValidation, PhoneNumberValidation, UserNameValidation } from './../../../../constants/validations';
import PasswordInput from './../PasswordInput/PasswordInput';
import { axiosInstance } from '../../../../services/urlApi';



export default function Registration() {
  interface FormData {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
  }
  interface ApiResponse{
    message: string;
  }

  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [profileImage, setProfileImage] = useState(DefaultProfile); // Set default profile image
  const {
    register,
    handleSubmit,
    formState: { isSubmitting ,errors }
  } = useForm<FormData>();


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axiosInstance.post<ApiResponse>(
      AUTHURLS.registerUrl,data );
      console.log(response.data.message);
      navigate('/verification');
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data.message || 'An error occurred');
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create a URL for the uploaded image
      setProfileImage(imageUrl); // Update the profile image state
    }
  };



  return (
    <>
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
                <div className="my-4">
                  <p className="fw-light fs-7 text-white">
                    Welcome Back to Project Management System PMS.
                  </p>
                  <h4 className="auth-text-header">Create New Account</h4>
                </div>

                {/* Profile Image */}
                <div className="profile-image">
                  <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image-preview"
                  />
                  <input
                   autoComplete="off"
                    type="file"
                    id="profileImageInput"
                    className="input-img bg-transparent"
                    placeholder=""
                    aria-label="Profile Image"
                    accept="image/*"
                    onChange={handleProfileImageChange}
                  />
                  <label htmlFor="profileImageInput" className="icon-profile">
                    <i className="fa-solid fa-camera"></i>
                  </label>
                </div>

                <div className="row mb-3 g-3">
                  {/* First Column */}
                  <div className="col-md-12 col-lg-6 ">

                    {/* Username */}
                    <div className="floating-label ">
                      <span className="highlight"></span>
                      <input
                       autoComplete="off"
                        type="text"
                        className="floating-input "
                        {...register('userName', UserNameValidation)}
                        placeholder=""
                      />
                      <label>Your Name</label>
                      {errors.userName && <span className="text-danger">{errors.userName.message}</span>}
                    </div>

                  {/* Email input */}
                  <div className="floating-label email">
                    <span className="highlight"></span>
                      <input
                       autoComplete="off"
                        type="text"
                        className="floating-input  "
                        {...register('email', EmailValidation)}
                       placeholder=""
                      />
                      <label>E-mail</label>
                      {errors.email && <span className="text-danger">{errors.email.message}</span>}
                    </div>

                     {/* Phone Number */}
                     <div className="floating-label  phone">
                    <span className="highlight"></span>
                      <input
                       autoComplete="off"
                        type="tel"
                        className="floating-input "
                        {...register('phoneNumber', PhoneNumberValidation)}
                       placeholder=""
                      />
                      <label>Phone Number</label>
                      {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber.message}</span>}
                    </div>

                  </div>

                  {/* Second Column */}
                  <div className="col-md-12 col-lg-6">

                  {/* Country */}
                  <div className="floating-label country">
                    <span className="highlight"></span>
                      <input
                       autoComplete="off"
                        type="text"
                        className="floating-input  "
                        {...register('country', {
                          required: 'Country is required.',
                        })}
                         placeholder=""
                      />
                      <label>Country</label>
                      {errors.country && <span className="text-danger">{errors.country.message}</span>}

                    </div>

                  {/* Password Input */}
                  <PasswordInput
                    label="Password"
                    register={register}
                    name="password"
                    errors={errors.password}
                    showPassword={isPasswordVisible}
                    setIsPasswordVisible={setIsPasswordVisible}
                    validationRules={PasswordValidation}
                  />

                  {/* Confirm Password Input */}
                    <PasswordInput
                      label="Confirm Password"
                      register={register}
                      name="confirmPassword"
                      errors={errors.confirmPassword}
                      showPassword={isConfirmPasswordVisible}
                      setIsPasswordVisible={setIsConfirmPasswordVisible}
                      validationRules= {PasswordValidation}
                    />

                  </div>
                </div>
                <button
                disabled={isSubmitting}
                className="btn btn-color rounded-5 w-100 my-3">
                   {isSubmitting ? "Register....... " : " Register"}
                  </button>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
