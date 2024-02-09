"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var NestedComponent_form_1 = __importDefault(require("../_classes/nested/NestedComponent.form"));
var Tabs_edit_display_1 = __importDefault(require("./editForm/Tabs.edit.display"));
function default_1() {
    var extend = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        extend[_i] = arguments[_i];
    }
    return NestedComponent_form_1.default.apply(void 0, __spreadArray([[
            {
                key: 'display',
                components: Tabs_edit_display_1.default
            },
        ]], extend, false));
}
exports.default = default_1;
//# sourceMappingURL=Tabs.form.js.map