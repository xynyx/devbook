"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator = require("validator");
function validateRegisterInput(data) {
    var errors = {};
    data.name ? data.name : (data.name = "");
    data.email ? data.email : (data.email = "");
    data.password ? data.password : (data.password = "");
    // data.password2 ? data.text : (data.text = "");
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = "Must be a valid email";
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required";
    }
    if (!Validator.isLength(data.password, { min: 6, max: 20 })) {
        errors.password = "Needs to be between 6 and 20 characters";
    }
    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required";
    }
    return { errors: errors, isValid: Object.keys(errors).length === 0 };
}
exports.default = validateRegisterInput;
//# sourceMappingURL=register.js.map