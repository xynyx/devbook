"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("../actions/types");
function default_1(state, action) {
    if (state === void 0) { state = {}; }
    switch (action.type) {
        case types_1.SET_ERRORS:
            return action.payload;
        default:
            return state;
    }
}
exports.default = default_1;
