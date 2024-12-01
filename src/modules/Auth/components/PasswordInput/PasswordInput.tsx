import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';
import { PasswordValidation } from '../../../../constants/validations';

interface PasswordInputProps {
  label: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldError | undefined;
  showPassword: boolean;
  togglePasswordVisibility: () => void;
  validationRules: any;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  register,
  name,
  errors,
  showPassword,
  togglePasswordVisibility,
}) => {
  return (
    <div className="floating-label">
      <span className="highlight"></span>
      <input
        type={showPassword ? 'text' : 'password'}
        className="floating-input"
        {...register(name, PasswordValidation)}
        placeholder=""
      />
      <label>{label}</label>
      <span
        className="icon-showpass"
        onClick={togglePasswordVisibility}
        style={{ cursor: 'pointer' }}
      >
        {showPassword ? <i className="fa-solid fa-eye"></i> : <i className="fa-solid fa-eye-slash"></i>}
      </span>
      {errors && <span className="text-danger">{errors.message}</span>}
    </div>
  );
};

export default PasswordInput;