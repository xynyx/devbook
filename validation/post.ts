const Validator = require("validator");

export default function validatePostInput(data: any) {
  let errors: any = {};

  data.text ? data.text : (data.text = "");

  if (!Validator.isLength(data.text, { min: 5, max: 500 })) {
    errors.text = "Post must be between 5 and 500 characters.";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Text field is required.";
  }

  return { errors, isValid: Object.keys(errors).length === 0 };
}
