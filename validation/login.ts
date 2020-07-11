const Validator = require("validator");

export default function validateLoginInput(data: any) {
  let errors: any = {};

  data.email ? data.email : (data.email = "");
  data.password ? data.password : (data.password = "");
  // data.password2 ? data.text : (data.text = "");

  if (!Validator.isEmail(data.email)) {
    errors.email = "Must be a valid email";
  }
  
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
    errors.password = "Needs to be between 6 and 20 characters";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
}
