"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
function ProfileActions() {
    return (react_1.default.createElement("div", { className: "btn-group mb-4", role: "group" },
        react_1.default.createElement(react_router_dom_1.Link, { to: "/edit-profile", className: "btn btn-light" },
            react_1.default.createElement("i", { className: "fas fa-user-circle text-info mr-1" }),
            " Edit Profile"),
        react_1.default.createElement(react_router_dom_1.Link, { to: "/add-experience", className: "btn btn-light" },
            react_1.default.createElement("i", { className: "fab fa-black-tie text-info mr-1" }),
            "Add Experience"),
        react_1.default.createElement(react_router_dom_1.Link, { to: "/add-education", className: "btn btn-light" },
            react_1.default.createElement("i", { className: "fas fa-graduation-cap text-info mr-1" }),
            "Add Education")));
}
exports.default = ProfileActions;
