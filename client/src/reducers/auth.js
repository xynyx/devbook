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
    isAuthenticated: false,
    user: {},
};
function default_1(state, action) {
    if (state === void 0) { state = initialState; }
    console.log("action.paylozsad", action.payload);
    console.log('state', state);
    switch (action.type) {
        case types_1.SET_USER:
            return __assign(__assign({}, state), { isAuthenticated: Object.keys(action.payload).length > 0 ? true : false, user: action.payload });
        default:
            return state;
    }
}
exports.default = default_1;
