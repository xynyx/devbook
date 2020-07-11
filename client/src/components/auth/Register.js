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
var react_router_dom_1 = require("react-router-dom");
var classnames_1 = __importDefault(require("classnames"));
var react_redux_1 = require("react-redux");
var authActions_1 = require("../../actions/authActions");
// Takes in states -> convert to props to pass to the component / Redux
var mapStateToProps = function (state) { return ({
    auth: state.auth,
    errors: state.errors,
}); };
// Component<Props, State>
var Register = /** @class */ (function (_super) {
    __extends(Register, _super);
    function Register(props) {
        var _this = _super.call(this, props) || this;
        _this.handleInputChange = function (e) {
            var _a;
            _this.setState((_a = {}, _a[e.target.name] = e.target.value, _a));
        };
        _this.handleSubmit = function (e) {
            console.log("e", e);
            //password2
            e.preventDefault();
            var _a = _this.state, name = _a.name, email = _a.email, password = _a.password;
            var newUser = { name: name, email: email, password: password };
            // The action (registerUser) cannot use history like a component can
            // However you can pass an action the history to be able to redirect within the action itself
            _this.props.registerUser(newUser, _this.props.history);
        };
        _this.state = {
            name: "",
            email: "",
            password: "",
            errors: {},
        };
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    Register.prototype.componentDidMount = function () {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push("/dashboard");
        }
    };
    Register.prototype.componentWillReceiveProps = function (nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors });
        }
    };
    Register.prototype.render = function () {
        var errors = this.props.errors;
        var user = this.props.auth.user;
        var baseClasses = "form-control form-control-lg";
        var invalidName = classnames_1.default(baseClasses, {
            "is-invalid": errors.name,
        });
        var invalidEmail = classnames_1.default(baseClasses, {
            "is-invalid": errors.email,
        });
        var invalidPassword = classnames_1.default(baseClasses, {
            "is-invalid": errors.password,
        });
        return (react_1.default.createElement("div", { className: "register" },
            react_1.default.createElement("div", { className: "container" },
                react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement("div", { className: "col-md-8 m-auto" },
                        react_1.default.createElement("h1", { className: "display-4 text-center" }, "Sign Up"),
                        react_1.default.createElement("p", { className: "lead text-center" }, "Create your DevBook account"),
                        react_1.default.createElement("form", { noValidate: true, onSubmit: this.handleSubmit },
                            react_1.default.createElement("div", { className: "form-group" },
                                react_1.default.createElement("input", { type: "text", 
                                    // className="form-control form-control-lg"
                                    className: invalidName, placeholder: "Name", name: "name", value: this.state.name, onChange: this.handleInputChange }),
                                errors.name && (react_1.default.createElement("div", { className: "invalid-feedback" }, errors.name))),
                            react_1.default.createElement("div", { className: "form-group" },
                                react_1.default.createElement("input", { type: "email", className: invalidEmail, placeholder: "Email Address", name: "email", value: this.state.email, onChange: this.handleInputChange }),
                                errors.email && (react_1.default.createElement("div", { className: "invalid-feedback" }, errors.email))),
                            react_1.default.createElement("div", { className: "form-group" },
                                react_1.default.createElement("input", { type: "password", className: invalidPassword, placeholder: "Password", name: "password", value: this.state.password, onChange: this.handleInputChange }),
                                errors.password && (react_1.default.createElement("div", { className: "invalid-feedback" }, errors.password))),
                            react_1.default.createElement("div", { className: "form-group" },
                                react_1.default.createElement("input", { type: "password", 
                                    // className={invalidName}
                                    placeholder: "Confirm Password", name: "password2" })),
                            react_1.default.createElement("input", { type: "submit", className: "btn btn-info btn-block mt-4" })))))));
    };
    return Register;
}(react_1.Component));
// withRouter, which is a HOC, gives you access to the history object and the closest <Route> match
// Passes 'match, location, history' props to the wrapped component whenever it renders
exports.default = react_redux_1.connect(mapStateToProps, { registerUser: authActions_1.registerUser })(react_router_dom_1.withRouter(Register));
