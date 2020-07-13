"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_redux_1 = require("react-redux");
var TextField_1 = __importDefault(require("../common/TextField"));
var SelectList_1 = __importDefault(require("../common/SelectList"));
var CreateProfile = /** @class */ (function (_super) {
    __extends(CreateProfile, _super);
    function CreateProfile(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            socialNetworks: false,
            handle: "",
            company: "",
            website: "",
            location: "",
            status: "",
            skills: "",
            githubUsername: "",
            bio: "",
            twitter: "",
            linkedIn: "",
            instagram: "",
            errors: {},
        };
        _this.onChange = _this.onChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    CreateProfile.prototype.handleSubmit = function (e) {
        e.preventDefault();
        console.log("submit");
    };
    CreateProfile.prototype.onChange = function (e) {
        var _a;
        this.setState((_a = {}, _a[e.target.name] = e.target.value, _a));
    };
    CreateProfile.prototype.render = function () {
        var errors = this.state.errors;
        var options = [
            {
                label: "* Select Professional Status",
                value: 0,
            },
            {
                label: "Developer",
                value: "Developer",
            },
            {
                label: "Junior Developer",
                value: "Junior Developer",
            },
            {
                label: "Senior Developer",
                value: "Senior Developer",
            },
            {
                label: "Manager",
                value: "Manager",
            },
            {
                label: "Student",
                value: "Student",
            },
            {
                label: "Instructor / Teacher",
                value: "Instructor / Teacher",
            },
            {
                label: "Intern",
                value: "Intern",
            },
            {
                label: "Other",
                value: "Other",
            },
        ];
        return (react_1.default.createElement("div", { className: "create-profile" },
            react_1.default.createElement("div", { className: "container" },
                react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement("div", { className: "col-md-8 m-auto" },
                        react_1.default.createElement("h1", { className: "display-4 text-center" },
                            "Create Your Profile",
                            react_1.default.createElement("p", { className: "lead text-center" }, "Add stuff"),
                            react_1.default.createElement("small", { className: "d-block pb-3" }, "* = required fields"),
                            react_1.default.createElement("form", { onSubmit: this.handleSubmit },
                                react_1.default.createElement(TextField_1.default, { placeholder: "* Profile Handle", name: "handle", value: this.state.handle, onChange: this.onChange, error: errors.handle, info: "A unique handle for your profile URL. These fields CANNOT be changed later." }),
                                react_1.default.createElement(SelectList_1.default, { placeholder: "Status", name: "status", value: this.state.status, onChange: this.onChange, options: options, error: errors.status, info: "Job Title" }))))))));
    };
    return CreateProfile;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    profile: state.profile,
    errors: state.errors,
}); };
exports.default = react_redux_1.connect(mapStateToProps)(CreateProfile);
