import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { PasswordValidation } from '../../../../constants/validations';

interface PasswordInputProps {
  label: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldError | undefined;
  showPassword: boolean;
  setIsPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
  validationRules: any;
  tabIndex:any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  register,
  name,
  errors,
  showPassword,
  tabIndex,
  setIsPasswordVisible,
}) => {
  return (
    <div className="floating-label">
      <span className="highlight"></span>
      <input
       autoComplete="off"
        type={showPassword ? 'text' : 'password'}
        className="floating-input"
        {...register(name, PasswordValidation)}
        placeholder=""
        tabIndex={tabIndex}
      />
      <label>{label}</label>
      <button
        onClick={() => setIsPasswordVisible((prev) => !prev)}
        onMouseUp={(e) => e.preventDefault()}
        onMouseDown={(e) => e.preventDefault()}
        type="button"
        className="icon-showpass border-0 bg-transparent position-absolute end-0"
      >
        <i
          className={
            !showPassword
              ? 'fa-solid fa-eye-slash fa-sm text-white'
              : 'fa-solid fa-eye fa-sm text-white'
          }
        ></i>
      </button>
      {errors && <span className="text-danger">{errors.message}</span>}
    </div>
  );
};

export default PasswordInput;