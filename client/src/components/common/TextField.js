"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
function TextFieldGroup(_a) {
    var name = _a.name, placeholder = _a.placeholder, value = _a.value, label = _a.label, error = _a.error, info = _a.info, type = _a.type, onChange = _a.onChange, disabled = _a.disabled;
    var baseClasses = "form-control form-control-lg";
    var isInvalid = classnames_1.default(baseClasses, {
        "is-invalid": error,
    });
    if (!type)
        type = "text";
    return (react_1.default.createElement("div", { className: "form-group" },
        react_1.default.createElement("input", { type: type, className: isInvalid, placeholder: placeholder, name: name, value: value, onChange: onChange, disabled: disabled }),
        info && react_1.default.createElement("small", { className: "form-text text-muted" }),
        error && react_1.default.createElement("div", { className: "invalid-feedback" }, error)));
}
exports.default = TextFieldGroup;
