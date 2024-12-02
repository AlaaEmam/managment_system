import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Message, SubmitHandler, useForm } from "react-hook-form";
import { axiosInstance, user } from "../../../../services/urlApi";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";
import { AxiosResponse } from "axios";
import { AUTHURLS } from "../../../../constants/URLS";
import { Outlet } from 'react-router-dom'
import Logo from '../../../../assets/logo.png';

import {
  EmailValidation,
  PasswordValidation,
} from "../../../../constants/validations";

interface loginDataInterface {
  email: string;
  password: string;
}

export default function Login() {
  //  const { saveLoginData}   = useContext(AuthContext);

  const [isPaswordVisble, setIsPaswordVisble] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors ,isSubmitting },
  } = useForm<loginDataInterface>();

  const onSubmit: SubmitHandler<loginDataInterface> = async (data) => {
    try {
      const response = await axiosInstance.post<{ message: string }>(
        AUTHURLS.loginUrl,
        data
      );
      console.log("res", response);
      toast.success("login succeed");
      navigate("/Dashboard");
      // localStorage.setItem("token", response?.data?.token);
    } catch (error: any) {
      toast.error(error.response?.data.message);
    }
  };

  // useEffect(() => {
  //   toast.play();
  // }, []);

  return (
    <>
      <div className="bg-container ">
        <div className="container-fluid ">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6 col-md-8 col-sm-10">
          <div className="logo-container">
                <img className="img-fluid my-3" src={Logo} alt="Logo" />
          </div>
            <div className="pt-3 px-5">
              <div className="form-background rounded-2 p-5">
             
                <form className="text-white mt-3" onSubmit={handleSubmit(onSubmit)}>
               {/* Welcome Text */}
                <div className="mb-5">
                    <p className="fw-light fs-7 text-white">
                      Welcome Back to Project Management System PMS.
                    </p>
                    <h4 className="auth-text-header">Login</h4>
                  </div>
                  {/* Email input */}
                  <div className="mb-3">
                    <label className="form-label mb-0">Email </label>
                    <input
                      type="email"
                      placeholder="Enter your E-mail"
                      className="form-control  border-top-0 border-end-0 border-start-0 rounded-0 bg-transparent text-white"
                      {...register("email", EmailValidation)}
                    />
                    {errors.email && <span className="text-danger">{errors.email.message}</span>}

                  </div>
                
                   {/* Password input */}
                  <div className="mb-1">
                    <div className="mb-3">
                      <label className="form-label mb-0">Password </label>
                      <div className="input-group d-flex justify-content-center align-items-center">
                        <input
                          type={isPaswordVisble ? "text" : "password"}
                          placeholder="Enter your Password"
                          className="form-control  border-top-0 border-end-0 border-start-0  rounded-0 bg-transparent  text-white"
                          {...register("password", PasswordValidation)}
                        />
                        <button
                          onClick={() => {
                            setIsPaswordVisble((prev) => !prev);
                          }}
                          onMouseUp={(e) => {
                            e.preventDefault();
                          }}
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                          type="button"
                          className=" input-group-text border-0 bg-transparent position-absolute end-0 "
                        >
                          <i
                            className={
                              !isPaswordVisble
                                ? "fa-solid   fa-eye-slash fa-sm text-white"
                                : "fa-solid  fa-eye fa-sm  text-white"
                            }
                          ></i>
                        </button>
                      </div>
                    </div>
                    <div>
                      {errors.password && (
                        <span className="text-danger">
                          {errors.password.message}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <Link
                      className="fs-6 text-decoration-none text-white"
                      to="/register"
                    >
                      Register Now?
                    </Link>
                    <Link
                      className="fs-6 text-decoration-none text-white"
                      to="/forget-Password"
                    >
                      Forget Password?
                    </Link>
                  </div>
                  <button
                    disabled={isSubmitting}
                    className="btn btn-color rounded-5 mt-5  w-100 my-3"
                  >
                    {isSubmitting ? "Login....... " : " Login"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
