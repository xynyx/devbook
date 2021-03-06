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
var react_router_dom_1 = require("react-router-dom");
var profileActions_1 = require("../../actions/profileActions");
var Spinner_1 = __importDefault(require("../common/Spinner"));
// interface ProfileInterface {
// }
var Dashboard = /** @class */ (function (_super) {
    __extends(Dashboard, _super);
    function Dashboard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Dashboard.prototype.componentDidMount = function () {
        this.props.getCurrentProfile();
    };
    Dashboard.prototype.render = function () {
        var user = this.props.auth.user;
        var _a = this.props.profile, profile = _a.profile, loading = _a.loading;
        var dashboardContent;
        if (!profile || loading) {
            dashboardContent = react_1.default.createElement(Spinner_1.default, null);
            // If profile 'exists' but has no keys
        }
        else if (Object.keys(profile).length > 0) {
            dashboardContent = react_1.default.createElement("h4", null, "TODO: show profile");
        }
        else {
            // User has no profile
            dashboardContent = (react_1.default.createElement("div", null,
                react_1.default.createElement("p", { className: "lead text-muted" },
                    "Welcome ",
                    user.name,
                    " "),
                react_1.default.createElement("p", null, "Please set up a profile"),
                react_1.default.createElement(react_router_dom_1.Link, { to: "/create-profile", className: "btn btn-lg btn-info" }, "Create Profile")));
        }
        return (react_1.default.createElement("div", { className: "dashboard" },
            react_1.default.createElement("div", { className: "container" },
                react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement("div", { className: "col-md-12" },
                        react_1.default.createElement("h1", { className: "display-4" }, "Dashboard"),
                        dashboardContent)))));
    };
    return Dashboard;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    profile: state.profile,
    auth: state.auth,
}); };
exports.default = react_redux_1.connect(mapStateToProps, { getCurrentProfile: profileActions_1.getCurrentProfile })(Dashboard);
