export const EmailValidation = {
    required: "Email is required",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Email should be valid mail",
    },
  };
  
  const PasswordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  
  export const PasswordValidation = {
    required: "This field is required",
    pattern: {
      value: PasswordRegEx,
      message: "At least 6 characters: UPPER/lowercase, numbers and special characters",
    },
  };

  export const PhoneNumberValidation ={

      pattern: {
        value: /^01[0-9]{9}$/,
        message: 'Phone number must start with 01 and contain 11 digits.'
      }

  }