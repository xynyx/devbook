const Validator = require("validator");

export default function validateEducationInput(data: any) {
  let errors: any = {};
  console.log(data);

  data.degree ? data.degree : (data.degree = "");
  data.from ? data.from : (data.from = "");
  data.field ? data.field : (data.field = "");
  data.school ? data.school : (data.school = "");

  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree is required.";
  }
  if (Validator.isEmpty(data.school)) {
    errors.school = "School is required.";
  }
  if (Validator.isEmpty(data.field)) {
    errors.field = "Field of study is required.";
  }
  if (Validator.isEmpty(data.from)) {
    errors.from = "Starting date is required.";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
}
