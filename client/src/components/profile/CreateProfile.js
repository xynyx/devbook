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
var react_redux_1 = require("react-redux");
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
        return _this;
    }
    CreateProfile.prototype.render = function () {
        return (react_1.default.createElement("div", { className: "create-profile" },
            react_1.default.createElement("div", { className: "container" },
                react_1.default.createElement("div", { className: "row" },
                    react_1.default.createElement("div", { className: "col-md-8 m-auto" },
                        react_1.default.createElement("h1", { className: "display-4 text-center" },
                            "Create Your Profile",
                            " ",
                            react_1.default.createElement("p", { className: "lead text-center" }, "Add stuff")))))));
    };
    return CreateProfile;
}(react_1.Component));
var mapStateToProps = function (state) { return ({
    profile: state.profile,
    errors: state.errors,
}); };
exports.default = react_redux_1.connect(mapStateToProps)(CreateProfile);
