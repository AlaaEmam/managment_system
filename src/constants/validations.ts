export const EmailValidation = {
    required: "Email is required Please enter your Email.",
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: "Email should be valid mail",
    },
  };
  
  const PasswordRegEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  
  export const PasswordValidation = {
    required: "Password is required Please enter your Password.",
    pattern: {
      value: PasswordRegEx,
      message: "At least 6 characters: UPPER/lowercase, numbers and special characters",
    },
  };

  const PhoneNumberwordRegEx = /^01[0-9]{9}$/;
  
  export const PhoneNumberValidation ={
    required: "Phone Number is required Please enter your Phone Number.",
      pattern: {
        value: PhoneNumberwordRegEx,
        message: 'Phone number must start with 01 and contain 11 digits.'
      }

  }