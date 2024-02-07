"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Component_1 = __importDefault(require("../component/Component"));
class Field extends Component_1.default {
    render(element) {
        if (this.noField) {
            return super.render(element);
        }
        else if (this.isAdvancedLabel || this.options.condensedMode) {
            return super.render(this.renderTemplate('field', Object.assign(Object.assign({}, this.getLabelInfo(this.options.condensedMode)), { labelMarkup: this.renderTemplate('label'), element: element }), 'align'));
        }
        else {
            return super.render(this.renderTemplate('field', {
                labelMarkup: this.renderTemplate('label'),
                element: element,
            }));
        }
    }
    // Saves current caret position to restore it after the component is redrawn
    saveCaretPosition(element, index) {
        var _a, _b;
        if (((_b = (_a = this.root) === null || _a === void 0 ? void 0 : _a.focusedComponent) === null || _b === void 0 ? void 0 : _b.path) === this.path) {
            try {
                this.root.currentSelection = { selection: [element.selectionStart, element.selectionEnd], index };
            }
            catch (e) {
                if (!(e instanceof DOMException)) {
                    console.debug(e);
                }
            }
        }
    }
}
exports.default = Field;