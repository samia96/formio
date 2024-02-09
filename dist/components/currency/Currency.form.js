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
var Currency_edit_display_1 = __importDefault(require("./editForm/Currency.edit.display"));
var Currency_edit_data_1 = __importDefault(require("./editForm/Currency.edit.data"));
function default_1() {
    var extend = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        extend[_i] = arguments[_i];
    }
    return TextField_form_1.default.apply(void 0, __spreadArray([[
            {
                key: 'display',
                components: Currency_edit_display_1.default
            },
            {
                key: 'data',
                components: Currency_edit_data_1.default
            },
            {
                key: 'validation',
                components: [
                    {
                        key: 'validate.minLength',
                        ignore: true,
                    },
                    {
                        key: 'validate.maxLength',
                        ignore: true,
                    },
                    {
                        key: 'validate.minWords',
                        ignore: true,
                    },
                    {
                        key: 'validate.maxWords',
                        ignore: true,
                    },
                    {
                        key: 'validate.pattern',
                        ignore: true,
                    },
                ]
            },
        ]], extend, false));
}
exports.default = default_1;
//# sourceMappingURL=Currency.form.js.map