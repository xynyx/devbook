"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var classnames_1 = __importDefault(require("classnames"));
function SelectList(_a) {
    var name = _a.name, value = _a.value, error = _a.error, onChange = _a.onChange, options = _a.options, placeholder = _a.placeholder, info = _a.info;
    var baseClasses = "form-control form-control-lg";
    var isInvalid = classnames_1.default(baseClasses, {
        "is-invalid": error,
    });
    var selectOptions = options === null || options === void 0 ? void 0 : options.map(function (option) { return (react_1.default.createElement("option", { key: option.label, value: option.value })); });
    return (react_1.default.createElement("div", { className: "form-group" },
        react_1.default.createElement("select", { placeholder: placeholder, className: isInvalid, name: name, value: value, onChange: onChange }, selectOptions),
        info && react_1.default.createElement("small", { className: "form-text text-muted" }, info),
        error && react_1.default.createElement("div", { className: "invalid-feedback" }, error)));
}
exports.default = SelectList;
