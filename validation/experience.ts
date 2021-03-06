const Validator = require("validator");

export default function validateExperienceInput(data: any) {
  let errors: any = {};
  console.log(data);

  data.from ? data.from : (data.from = "");
  data.title ? data.title : (data.title = "");
  data.company ? data.company : (data.company = "");

  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title is required.";
  }
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company is required.";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "Starting date is required.";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
}
