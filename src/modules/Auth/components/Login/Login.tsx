import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/PMS.svg";
import { useForm } from "react-hook-form";
import { axiosInstance, user } from "../../../../services/urlApi";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext";

export default function Login() {
  let { saveLoginData } = useContext(AuthContext);

  interface loginData {
    email: string;
    password: string;
  }

  const [isPaswordVisble, setIsPaswordVisble] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: loginData) => {
    try {
      const response = await axiosInstance.post(user.login, data);
      console.log(response);
      toast.success("login succeed");
      navigate("/Dashboard");
      localStorage.setItem("token", response.data.token);
      saveLoginData();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    toast.play();
  }, []);

  return (
    <>
      <div className=" login container-fluid ">
        <div className="row justify-content-center align-items-center vh-100">
          <div className="col-lg-6  col-md-8 col-sm-10">
            <div className="text-center">
              <img src={logo} alt="" title="" />
            </div>

            <div className="pt-3 px-5">
              <div className="form-bg rounded-2 p-5">
                <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
                  <div className="mb-3">
                    <label className="form-label mb-0">Email </label>
                    <input
                      type="email"
                      placeholder="Enter your E-mail"
                      className="form-control  border-top-0 border-end-0 border-start-0  rounded-0 bg-transparent  text-white"
                      {...register("email", {
                        required: "Email Address is required",
                      })}
                    />
                  </div>
                  <div>
                    {errors.email && (
                      <div className="text-danger fs-6">
                        {errors.email.message}
                      </div>
                    )}
                  </div>
                  <div className="mb-1">
                    <div className="mb-3">
                      <label className="form-label mb-0">Password </label>
                      <div className="input-group d-flex justify-content-center align-items-center">
                        <input
                          type={isPaswordVisble ? "text" : "password"}
                          placeholder="Enter your Password"
                          className="form-control  border-top-0 border-end-0 border-start-0  rounded-0 bg-transparent  text-white"
                          {...register("password", {
                            required: "password Address is required",
                          })}
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
                          ></i>{" "}
                        </button>
                      </div>
                    </div>
                    <div>
                      {errors.password && (
                        <pan className="text-danger">
                          {errors.password.message}
                        </pan>
                      )}
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <Link
                      className="fs-6 text-decoration-none text-white"
                      to="/registration"
                    >
                      Register Now?
                    </Link>
                    <Link
                      className="fs-6 text-decoration-none text-white"
                      to="/forget-Pass"
                    >
                      Forget Password?
                    </Link>
                  </div>
                  <button
                    disabled={isSubmitting}
                    className="btn btn-yellow rounded-5 mt-5  w-100 my-3"
                  >
                    {isSubmitting ? "Login....... " : " Login"}
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