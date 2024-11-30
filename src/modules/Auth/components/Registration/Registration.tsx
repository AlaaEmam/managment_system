import React, { useState } from 'react';
import Logo from '../../../../assets/logo.png';
import DefaultProfile from '../../../../assets/defaultavatar.jpg';
import './Registration.css';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AUTHURLS, requestHeader } from './../../../../constants/URLS';
import { EmailValidation, PasswordValidation, PhoneNumberValidation } from './../../../../constants/validations';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();
  const [showPassword, setShowPassword] = useState(false);
  const [profileImage, setProfileImage] = useState('');

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axios.post<{ message: string }>(
        AUTHURLS.registerUrl,
        data,
        { headers: requestHeader }
      );
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

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Create a URL for the uploaded image
    }
  };

  const password = watch('password'); // To validate confirmPassword against password

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
                  <div className="col-md-12 col-lg-6">

                    {/* Username */}
                    <div className="floating-label rounded-2 username">
                      <span className="highlight"></span>
                      <input
                        type="text"
                        className="floating-input"
                        {...register('userName', {
                          required: 'Your Name is required. Please enter your Name.',
                          })}
                        placeholder=""
                      />
                      <label>Your Name</label>
                    </div>
                    {errors.userName && <span className="text-danger">{errors.userName.message}</span>}

                    {/* Country */}
                    <div className="floating-label    rounded-2 country">
                    <span className="highlight"></span>
                      <input
                        type="text"
                        className="floating-input "
                        {...register('country', {
                          required: 'Country is required.',
                        })}
                         placeholder=""
                      />
                      <label>Country</label>
                    </div>
                    {errors.country && <span className="text-danger">{errors.country.message}</span>}

                    {/* Password */}
                    <div className="floating-label    rounded-2 password">
                    <span className="highlight"></span>
                    
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="floating-input "
                        {...register('password', PasswordValidation)}
                       placeholder=""
                      />
                      <label>Password</label>
                      {/* <span
                        className="icon-showpass"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: 'pointer' }}
                      >
                        {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                      </span> */}
                    </div>
                    {errors.password && <span className="text-danger">{errors.password.message}</span>}
                  </div>

                  {/* Second Column */}
                  <div className="col-md-12 col-lg-6">
                    {/* Email */}
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

                    {/* Phone Number */}
                    <div className="floating-label    rounded-2 phone">
                    <span className="highlight"></span>
                      <input
                        type="text"
                        className="floating-input "
                        {...register('phoneNumber', PhoneNumberValidation)}
                       placeholder=""
                      />
                      <label>Phone Number</label>
                    </div>
                    {errors.phoneNumber && <span className="text-danger">{errors.phoneNumber.message}</span>}

                    {/* Confirm Password */}
                    <div className="floating-label    rounded-2 confirm-password">
                    <span className="highlight"></span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="floating-input "
                        {...register('confirmPassword', {
                          required: 'Confirm Password is required.',
                          validate: (value) =>
                            value === password || 'Passwords do not match.',
                        })}
                         placeholder=""
                      />
                       <label>Confirm Password</label>
                      {/* <span
                        className="icon-showpass"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: 'pointer' }}
                      >
                        {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
                      </span> */}
                    </div>
                    {errors.confirmPassword && <span className="text-danger">{errors.confirmPassword.message}</span>}
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
