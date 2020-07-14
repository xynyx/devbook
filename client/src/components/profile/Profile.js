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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Profile = /** @class */ (function (_super) {
    __extends(Profile, _super);
    function Profile() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Profile.prototype.render = function () {
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
    };
    return Profile;
}(react_1.Component));
exports.default = Profile;
