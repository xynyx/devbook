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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var authActions_1 = require("../../actions/authActions");
var react_redux_1 = require("react-redux");
var mapStateToProps = function (state) { return ({
    auth: state.auth,
    errors: state.errors,
}); };
// Component<Props, State>
var Login = /** @class */ (function (_super) {
    __extends(Login, _super);
    function Login(props) {
        var _this = _super.call(this, props) || this;
        _this.handleInputChange = function (e) {
            var _a;
            _this.setState((_a = {}, _a[e.target.name] = e.target.value, _a));
        };
        _this.handleSubmit = function (e) {
            //password2
            e.preventDefault();
            var _a = _this.state, email = _a.email, password = _a.password;
            var user = { email: email, password: password };
            authActions_1.loginUser(user, null);
            // console.log(user);
        };
        _this.state = {
            email: "",
            password: "",
            errors: {},
        };
        _this.handleInputChange = _this.handleInputChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    Login.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "login" },
            react_1.default.createElement("div", { className: "container" },
                react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement("div", { className: "col-md-8 m-auto" },
                        react_1.default.createElement("h1", { className: "display-4 text-center" }, "Log In"),
                        react_1.default.createElement("p", { className: "lead text-center" }, "Sign in to your DevBook account"),
                        react_1.default.createElement("form", { onSubmit: this.handleSubmit },
                            react_1.default.createElement("div", { className: "form-group" },
                                react_1.default.createElement("input", { type: "email", className: "form-control form-control-lg", placeholder: "Email Address", name: "email", value: this.state.email, onChange: this.handleInputChange })),
                            react_1.default.createElement("div", { className: "form-group" },
                                react_1.default.createElement("input", { type: "password", className: "form-control form-control-lg", placeholder: "Password", name: "password", value: this.state.password, onChange: this.handleInputChange })),
                            react_1.default.createElement("input", { type: "submit", className: "btn btn-info btn-block mt-4" })))))));
    };
    return Login;
}(react_1.Component));
exports.default = react_redux_1.connect(null, { loginUser: authActions_1.loginUser })(Login);
