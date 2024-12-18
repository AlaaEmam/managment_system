import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import styles from "./ChangePassword.module.css";
import { AUTHURLS, axiosInstance }  from "../../../../constants/URLS";
import { PasswordValidation } from "../../../../constants/validations";
import Logo from '../../../../assets/logo.png';

// Define the form data type
interface ChangePasswordFormData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePassword: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordFormData>(); // Use the defined interface

  const onSubmit = async (data: ChangePasswordFormData): Promise<void> => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You are not authenticated. Please login first.");
        navigate("/login");
        return;
      }

      await axiosInstance.put<{message:string}>(AUTHURLS.changePassUrl,
        data,
     );

      toast.success("Password changed successfully!");
      navigate("/dashboard");
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
   <div className="bg-container ">
     <div className="container-fluid">
      <div className="row justify-content-center align-items-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
        <div className="logo-container">
                <img className="img-fluid my-3" src={Logo} alt="Logo" />
          </div>

          <div className="pt-3 px-5">
            <div className="form-background  rounded-2 p-5">
              <form className="text-white" onSubmit={handleSubmit(onSubmit)}>
                {/* Welcome Text */}
                <div className="mb-5">
                  <p className="fw-light fs-7 text-white"> Welcome Back to Project Management System PMS.</p>
                  <h4 className="auth-text-header">Change Password</h4>
                </div>

                {/* Old Password input */}
                <div className="mb-3">
                  <label className="form-label mb-0">Old Password</label>
                  <input
                    autoComplete="off"
                    type="password"
                    placeholder="Enter your old Password"
                    className="form-control  border-top-0 border-end-0 border-start-0 rounded-0 bg-transparent text-white"
                    {...register("oldPassword", PasswordValidation)}
                  />
                  {errors.oldPassword && (
                    <div className="text-danger fs-6">
                      {errors.oldPassword.message}
                    </div>
                  )}
                </div>

                {/* New Password */}
                <div className="mb-3">
                  <label className="form-label mb-0">New Password</label>
                  <input
                   autoComplete="off"
                    type="password"
                    placeholder="Enter your New Password"
                    className="form-control border-top-0 border-end-0 border-start-0 rounded-0 bg-transparent text-white"
                    {...register("newPassword", { required: "New Password is required" })}
                  />
                  {errors.newPassword && (
                    <div className="text-danger fs-6">
                      {errors.newPassword.message}
                    </div>
                  )}
                </div>

                {/* Confirm New Password */}
                <div className="mb-3">
                  <label className="form-label mb-0">Confirm New Password</label>
                  <input
                   autoComplete="off"
                    type="password"
                    placeholder="Confirm your New Password"
                    className="form-control border-top-0 border-end-0 border-start-0 rounded-0 bg-transparent text-white"
                    {...register("confirmNewPassword", PasswordValidation)}
                  />
                  {errors.confirmNewPassword && (
                    <div className="text-danger fs-6">
                      {errors.confirmNewPassword.message}
                    </div>
                  )}
                </div>

                <button
                  disabled={isSubmitting}
                  className="btn btn-color rounded-5 mt-5  w-100 my-3"
                >
                  {isSubmitting ? "Changing Password..." : "Change Password"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default ChangePassword;
