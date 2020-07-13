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
var TextArea_1 = __importDefault(require("../common/TextArea"));
var SelectList_1 = __importDefault(require("../common/SelectList"));
var Input_1 = __importDefault(require("../common/Input"));
var CreateProfile = /** @class */ (function (_super) {
    __extends(CreateProfile, _super);
    function CreateProfile(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
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
            displaySocialInputs: false,
        };
        _this.onChange = _this.onChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.toggleSocialNetworks = _this.toggleSocialNetworks.bind(_this);
        return _this;
    }
    CreateProfile.prototype.handleSubmit = function (e) {
        e.preventDefault();
        console.log("submit");
    };
    CreateProfile.prototype.toggleSocialNetworks = function () {
        console.log("this.state :>> ", this.state);
        this.setState(function (prev) { return ({
            displaySocialInputs: !prev.displaySocialInputs,
        }); });
    };
    CreateProfile.prototype.onChange = function (e) {
        var _a;
        this.setState((_a = {}, _a[e.target.name] = e.target.value, _a));
    };
    CreateProfile.prototype.render = function () {
        var _a = this.state, errors = _a.errors, displaySocialInputs = _a.displaySocialInputs;
        var socialNetworks = (react_1.default.createElement("div", null,
            react_1.default.createElement(Input_1.default, { placeholder: "Instagram URL", name: "instagram", icon: "fab fa-instagram", value: this.state.instagram, onChange: this.onChange, error: errors.instagram }),
            react_1.default.createElement(Input_1.default, { placeholder: "LinkedIn URL", name: "linkedIn", icon: "fab fa-linkedin", value: this.state.linkedIn, onChange: this.onChange, error: errors.linkedIn }),
            react_1.default.createElement(Input_1.default, { placeholder: "Twitter URL", name: "twitter", icon: "fab fa-twitter", value: this.state.twitter, onChange: this.onChange, error: errors.twitter })));
        var options = [
            {
                label: "* Select Professional Status",
            },
            {
                label: "Developer",
            },
            {
                label: "Junior Developer",
            },
            {
                label: "Senior Developer",
            },
            {
                label: "Manager",
            },
            {
                label: "Student",
            },
            {
                label: "Teacher",
            },
            {
                label: "Intern",
            },
            {
                label: "Other",
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
                                react_1.default.createElement(SelectList_1.default, { placeholder: "Status", name: "status", value: this.state.status, onChange: this.onChange, options: options, error: errors.status, info: "Job Title" }),
                                react_1.default.createElement(TextField_1.default, { placeholder: "Company", name: "company", value: this.state.company, onChange: this.onChange, error: errors.company, info: "Current Company" }),
                                react_1.default.createElement(TextField_1.default, { placeholder: "Website", name: "website", value: this.state.website, onChange: this.onChange, error: errors.website, info: "Portfolio Website" }),
                                react_1.default.createElement(TextField_1.default, { placeholder: "Location", name: "location", value: this.state.location, onChange: this.onChange, error: errors.location, info: "Location" }),
                                react_1.default.createElement(TextField_1.default, { placeholder: "* Skills", name: "skills", value: this.state.skills, onChange: this.onChange, error: errors.skills, info: "Please use comma separated values - eg. 'JavaScript,Python,React'" }),
                                react_1.default.createElement(TextField_1.default, { placeholder: "Github Username", name: "githubUsername", value: this.state.githubUsername, onChange: this.onChange, error: errors.githubUsername, info: "Include your Github username if you want to display your repositories." }),
                                react_1.default.createElement(TextArea_1.default, { placeholder: "Bio", name: "bio", value: this.state.bio, onChange: this.onChange, error: errors.bio, info: "Tell the world about yourself!" }),
                                react_1.default.createElement("div", { className: "mb-3" },
                                    react_1.default.createElement("button", { type: "button", onClick: this.toggleSocialNetworks, className: "btn btn-light" }, "Add Social Networks"),
                                    react_1.default.createElement("span", { className: "text-muted" }, "Optional")),
                                displaySocialInputs && socialNetworks,
                                react_1.default.createElement("input", { type: "submit", value: "Submit", className: "btn btn-info btn-block mt-4" }))))))));
    };
    return CreateProfile;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    profile: state.profile,
    errors: state.errors,
}); };
exports.default = react_redux_1.connect(mapStateToProps)(CreateProfile);
