const Validator = require("validator");

export default function validateRegisterInput(data: any) {
  let errors: any = {};

  data.name ? data.name : (data.name = "");
  data.email ? data.email : (data.email = "");
  data.password ? data.password : (data.password = "");
  // data.password2 ? data.text : (data.text = "");

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required.";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required.";
  }
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required.";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
}
