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
var EditGrid_edit_data_1 = __importDefault(require("./editForm/EditGrid.edit.data"));
var EditGrid_edit_display_1 = __importDefault(require("./editForm/EditGrid.edit.display"));
var EditGrid_edit_templates_1 = __importDefault(require("./editForm/EditGrid.edit.templates"));
var EditGrid_edit_validation_1 = __importDefault(require("./editForm/EditGrid.edit.validation"));
function default_1() {
    var extend = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        extend[_i] = arguments[_i];
    }
    return Components_1.default.baseEditForm.apply(Components_1.default, __spreadArray([[
            {
                label: 'Templates',
                key: 'templates',
                weight: 5,
                components: EditGrid_edit_templates_1.default
            },
            {
                key: 'display',
                components: EditGrid_edit_display_1.default,
            },
            {
                key: 'data',
                components: EditGrid_edit_data_1.default,
            },
            {
                key: 'validation',
                components: EditGrid_edit_validation_1.default
            },
        ]], extend, false));
}
exports.default = default_1;
//# sourceMappingURL=EditGrid.form.js.map