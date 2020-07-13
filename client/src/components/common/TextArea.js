"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
function TextArea(_a) {
    var name = _a.name, placeholder = _a.placeholder, value = _a.value, error = _a.error, onChange = _a.onChange, info = _a.info;
    var baseClasses = "form-control form-control-lg";
    var isInvalid = classnames_1.default(baseClasses, {
        "is-invalid": error,
    });
    return (react_1.default.createElement("div", { className: "form-group" },
        react_1.default.createElement("textarea", { className: isInvalid, placeholder: placeholder, name: name, value: value, onChange: onChange }),
        info && react_1.default.createElement("small", { className: "form-text text-muted" }),
        error && react_1.default.createElement("div", { className: "invalid-feedback" }, error)));
}
exports.default = TextArea;
