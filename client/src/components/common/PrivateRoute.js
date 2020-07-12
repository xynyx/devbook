"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var react_redux_1 = require("react-redux");
var mapStateToProps = function (state) { return ({
    auth: state.auth,
}); };
function PrivateRoute(_a) {
    var Component = _a.component, auth = _a.auth, rest = __rest(_a, ["component", "auth"]);
    return (react_1.default.createElement(react_router_dom_1.Route, __assign({}, rest, { render: function (props) {
            return auth.isAuthenticated ? (react_1.default.createElement(Component, __assign({}, props))) : (react_1.default.createElement(react_router_dom_1.Redirect, { to: "/login" }));
        } })));
}
exports.default = react_redux_1.connect(mapStateToProps)(PrivateRoute);
