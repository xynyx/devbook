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
var react_router_dom_1 = require("react-router-dom");
var Navbar = /** @class */ (function (_super) {
    __extends(Navbar, _super);
    function Navbar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Navbar.prototype.render = function () {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("nav", { className: "navbar navbar-expand-sm navbar-dark bg-dark mb-4" },
                react_1.default.createElement("div", { className: "container" },
                    react_1.default.createElement(react_router_dom_1.Link, { className: "navbar-brand", to: "/" }, "Devbook"),
                    react_1.default.createElement("button", { className: "navbar-toggler", type: "button", "data-toggle": "collapse", "data-target": "#mobile-nav" },
                        react_1.default.createElement("span", { className: "navbar-toggler-icon" })),
                    react_1.default.createElement("div", { className: "collapse navbar-collapse", id: "mobile-nav" },
                        react_1.default.createElement("ul", { className: "navbar-nav mr-auto" },
                            react_1.default.createElement("li", { className: "nav-item" },
                                react_1.default.createElement(react_router_dom_1.Link, { className: "nav-link", to: "/profiles" }, "Developers"))),
                        react_1.default.createElement("ul", { className: "navbar-nav ml-auto" },
                            react_1.default.createElement("li", { className: "nav-item" },
                                react_1.default.createElement(react_router_dom_1.Link, { className: "nav-link", to: "/register" }, "Sign Up")),
                            react_1.default.createElement("li", { className: "nav-item" },
                                react_1.default.createElement(react_router_dom_1.Link, { className: "nav-link", to: "/login" }, "Login"))))))));
    };
    return Navbar;
}(react_1.Component));
exports.default = Navbar;
