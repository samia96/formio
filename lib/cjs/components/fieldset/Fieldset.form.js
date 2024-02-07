"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NestedComponent_form_1 = __importDefault(require("../_classes/nested/NestedComponent.form"));
const Fieldset_edit_display_1 = __importDefault(require("./editForm/Fieldset.edit.display"));
function default_1(...extend) {
    return (0, NestedComponent_form_1.default)([
        {
            key: 'display',
            components: Fieldset_edit_display_1.default
        },
    ], ...extend);
}
exports.default = default_1;
