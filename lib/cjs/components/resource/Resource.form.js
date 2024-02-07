"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Components_1 = __importDefault(require("../Components"));
const Resource_edit_display_1 = __importDefault(require("./editForm/Resource.edit.display"));
function default_1(...extend) {
    return Components_1.default.baseEditForm([
        {
            key: 'display',
            components: Resource_edit_display_1.default
        },
    ], ...extend);
}
exports.default = default_1;
