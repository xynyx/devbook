"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator = require("validator");
function validateEducationInput(data) {
    var errors = {};
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
    return { errors: errors, isValid: Object.keys(errors).length === 0 };
}
exports.default = validateEducationInput;
