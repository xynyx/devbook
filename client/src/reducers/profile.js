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
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../actions/types");
var initialState = {
    profile: null,
    profiles: null,
    loading: false,
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    switch (action.type) {
        case types_1.CLEAR_CURRENT_PROFILE:
            return __assign(__assign({}, state), { profile: null });
        case types_1.PROFILE_LOADING:
            return __assign(__assign({}, state), { loading: true });
        case types_1.SET_PROFILE:
            return __assign(__assign({}, state), { profile: action.payload, loading: false });
        default:
            return state;
    }
}
exports.default = default_1;
