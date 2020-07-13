"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
function Input(_a) {
    var name = _a.name, placeholder = _a.placeholder, value = _a.value, error = _a.error, onChange = _a.onChange, icon = _a.icon, type = _a.type;
    var baseClasses = "form-control form-control-lg";
    var isInvalid = classnames_1.default(baseClasses, {
        "is-invalid": error,
    });
    if (!type)
        type = "text";
    return (react_1.default.createElement("div", { className: "input-group mb-3" },
        react_1.default.createElement("div", { className: "input-group-prepend" },
            react_1.default.createElement("span", { className: "input-group-text" },
                react_1.default.createElement("i", { className: icon }))),
        react_1.default.createElement("input", { className: isInvalid, placeholder: placeholder, name: name, value: value, onChange: onChange }),
        error && react_1.default.createElement("div", { className: "invalid-feedback" }, error)));
}
exports.default = Input;
