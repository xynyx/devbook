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
var Landing = /** @class */ (function (_super) {
    __extends(Landing, _super);
    function Landing() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Landing.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "landing" },
            react_1.default.createElement("div", { className: "dark-overlay landing-inner text-light" },
                react_1.default.createElement("div", { className: "container" },
                    react_1.default.createElement("div", { className: "row" },
                        react_1.default.createElement("div", { className: "col-md-12 text-center" },
                            react_1.default.createElement("h1", { className: "display-3 mb-4" }, "Devbook"),
                            react_1.default.createElement("p", { className: "lead" }, "Create a profile, post on the discussion board, and get guidance and support from other developers."),
                            react_1.default.createElement("hr", null),
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/register", className: "btn btn-lg btn-info mr-2" }, "Sign Up"),
                            react_1.default.createElement(react_router_dom_1.Link, { to: "/login", className: "btn btn-lg btn-light" }, "Login")))))));
    };
    return Landing;
}(react_1.Component));
exports.default = Landing;
