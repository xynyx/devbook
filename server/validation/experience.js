"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator = require("validator");
function validateExperienceInput(data) {
    var errors = {};
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
    return { errors: errors, isValid: Object.keys(errors).length === 0 };
}
exports.default = validateExperienceInput;
//# sourceMappingURL=experience.js.map