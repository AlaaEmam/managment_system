import React, { useState } from 'react';
import Logo from '../../../../assets/logo.png';
import DefaultProfile from '../../../../assets/defaultavatar.jpg';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AUTHURLS } from './../../../../constants/URLS';
import { EmailValidation, PasswordValidation, PhoneNumberValidation } from './../../../../constants/validations';
import PasswordInput from './../PasswordInput/PasswordInput';

interface FormData {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export default function Registration() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();


  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post<{ message: string }>(
        AUTHURLS.registerUrl,
        data);
      console.log(response.data.message);
      navigate('/verification');
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response?.data.message || 'An error occurred');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Create a URL for the uploaded image
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
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="floating-form col-lg-12 col-sm-12"
              >
                <div className="mt-4">
                  <p className="fw-light fs-7 text-white">
                    Welcome Back to Project Management System PMS.
                  </p>
                  <h4 className="auth-text-header">Create New Account</h4>
                </div>

                {/* Profile Image */}
                <div className="profile-image">
                  <img src={DefaultProfile} alt="Profile" className="profile-image-preview" />
                  <input
                    type="file"
                    id="profileImageInput"
                    className="input-img bg-transparent"
                    placeholder=""
                    aria-label="Profile Image"
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
                        type="text"
                        className="floating-input "
                        {...register('userName', {
                          required: 'Your Name is required. Please enter your Name.',
                          })}
                        placeholder=""
                      />
                      <label>Your Name</label>
                      {errors.userName && <span className="text-danger">{errors.userName.message}</span>}
                    </div>

                  {/* Email */}
                  <div className="floating-label email">
                    <span className="highlight"></span>
                      <input
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
                    showPassword={showPassword}
                    togglePasswordVisibility={togglePasswordVisibility}
                    validationRules={PasswordValidation} 
                  />

                  {/* Confirm Password Input */}
                    <PasswordInput
                      label="Confirm Password"
                      register={register}
                      name="confirmPassword"
                      errors={errors.confirmPassword}
                      showPassword={showPassword}
                      togglePasswordVisibility={toggleConfirmPasswordVisibility}
                      validationRules= {PasswordValidation}
                    />

                  </div>
                </div>
                <button className="btn primary-color w-100 p-2 mt-4 mb-2 rounded-5">Register</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
