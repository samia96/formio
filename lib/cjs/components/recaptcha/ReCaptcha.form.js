"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Components_1 = __importDefault(require("../Components"));
const ReCaptcha_edit_display_1 = __importDefault(require("./editForm/ReCaptcha.edit.display"));
function default_1() {
    return Components_1.default.baseEditForm([
        {
            key: 'display',
            components: ReCaptcha_edit_display_1.default
        },
        {
            key: 'data',
            ignore: true
        },
        {
            key: 'validation',
            ignore: true
        },
        {
            key: 'conditional',
            ignore: true
        },
        {
            key: 'logic',
            ignore: true
        },
    ]);
}
exports.default = default_1;
