"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator = require("validator");
function validateProfileInput(data) {
    var errors = {};
    console.log(data);
    data.handle ? data.handle : (data.handle = "");
    data.status ? data.status : (data.status = "");
    data.skills
        ? data.skills.length > 0
            ? data.skills
            : (data.skills = "")
        : (data.skills = "");
    console.log("AFTER", data);
    // data.handle = !data.handle ? data.handle : "";
    // data.status = !data.status ? data.status : "";
    // data.skills = data.skills.length !== 0 ? data.skills : "";
    if (!Validator.isLength(data.handle, { min: 2, max: 30 })) {
        errors.handle = "Needs to be between 2 and 30 characters.";
    }
    if (Validator.isEmpty(data.handle)) {
        errors.handle = "Profile handle is required.";
    }
    if (Validator.isEmpty(data.skills)) {
        errors.skills = "At least one skill is required.";
    }
    if (data.website) {
        if (!Validator.isURL(data.website)) {
            errors.website = "Not a valid URL.";
        }
    }
    if (data.linkedIn) {
        if (!Validator.isURL(data.linkedIn)) {
            errors.linkedIn = "Not a valid URL.";
        }
    }
    if (data.instagram) {
        if (!Validator.isURL(data.instagram)) {
            errors.instagram = "Not a valid URL.";
        }
    }
    if (data.twitter) {
        if (!Validator.isURL(data.twitter)) {
            errors.twitter = "Not a valid URL.";
        }
    }
    return { errors: errors, isValid: Object.keys(errors).length === 0 };
}
exports.default = validateProfileInput;
//# sourceMappingURL=profile.js.map