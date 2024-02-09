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
var TextField_form_1 = __importDefault(require("../textfield/TextField.form"));
var PhoneNumber_edit_validation_1 = __importDefault(require("./editForm/PhoneNumber.edit.validation"));
function default_1() {
    var extend = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        extend[_i] = arguments[_i];
    }
    return TextField_form_1.default.apply(void 0, __spreadArray([[
            {
                key: 'display',
                components: [
                    {
                        key: 'showWordCount',
                        ignore: true
                    },
                    {
                        key: 'showCharCount',
                        ignore: true
                    }
                ]
            },
            {
                key: 'data',
                components: [
                    {
                        key: 'case',
                        ignore: true
                    }
                ]
            },
            {
                key: 'validation',
                components: PhoneNumber_edit_validation_1.default
            },
        ]], extend, false));
}
exports.default = default_1;
//# sourceMappingURL=PhoneNumber.form.js.map