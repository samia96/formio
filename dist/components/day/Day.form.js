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
var Components_1 = __importDefault(require("../Components"));
var Day_edit_data_1 = __importDefault(require("./editForm/Day.edit.data"));
var Day_edit_display_1 = __importDefault(require("./editForm/Day.edit.display"));
var Day_edit_validation_1 = __importDefault(require("./editForm/Day.edit.validation"));
var Day_edit_day_1 = __importDefault(require("./editForm/Day.edit.day"));
var Day_edit_month_1 = __importDefault(require("./editForm/Day.edit.month"));
var Day_edit_year_1 = __importDefault(require("./editForm/Day.edit.year"));
function default_1() {
    var extend = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        extend[_i] = arguments[_i];
    }
    return Components_1.default.baseEditForm.apply(Components_1.default, __spreadArray([[
            {
                key: 'display',
                components: Day_edit_display_1.default
            },
            {
                key: 'data',
                components: Day_edit_data_1.default,
            },
            {
                key: 'validation',
                components: Day_edit_validation_1.default
            },
            {
                key: 'day',
                label: 'Day',
                weight: 3,
                components: Day_edit_day_1.default
            },
            {
                key: 'month',
                label: 'Month',
                weight: 3,
                components: Day_edit_month_1.default
            },
            {
                key: 'year',
                label: 'Year',
                weight: 3,
                components: Day_edit_year_1.default
            },
        ]], extend, false));
}
exports.default = default_1;
//# sourceMappingURL=Day.form.js.map