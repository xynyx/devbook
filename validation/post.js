"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator = require("validator");
function validatePostInput(data) {
    var errors = {};
    data.text ? data.text : (data.text = "");
    if (!Validator.isLength(data.text, { min: 5, max: 500 })) {
        errors.text = "Post must be between 5 and 500 characters.";
    }
    if (Validator.isEmpty(data.text)) {
        errors.text = "Text field is required.";
    }
    return { errors: errors, isValid: Object.keys(errors).length === 0 };
}
exports.default = validatePostInput;
