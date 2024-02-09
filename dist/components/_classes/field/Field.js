"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __importDefault(require("../component/Component"));
var Field = /** @class */ (function (_super) {
    __extends(Field, _super);
    function Field() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Field.prototype.render = function (element) {
        if (this.noField) {
            return _super.prototype.render.call(this, element);
        }
        else if (this.isAdvancedLabel || this.options.condensedMode) {
            return _super.prototype.render.call(this, this.renderTemplate('field', __assign(__assign({}, this.getLabelInfo(this.options.condensedMode)), { labelMarkup: this.renderTemplate('label'), element: element }), 'align'));
        }
        else {
            return _super.prototype.render.call(this, this.renderTemplate('field', {
                labelMarkup: this.renderTemplate('label'),
                element: element,
            }));
        }
    };
    // Saves current caret position to restore it after the component is redrawn
    Field.prototype.saveCaretPosition = function (element, index) {
        var _a, _b;
        if (((_b = (_a = this.root) === null || _a === void 0 ? void 0 : _a.focusedComponent) === null || _b === void 0 ? void 0 : _b.path) === this.path) {
            try {
                this.root.currentSelection = { selection: [element.selectionStart, element.selectionEnd], index: index };
            }
            catch (e) {
                if (!(e instanceof DOMException)) {
                    console.debug(e);
                }
            }
        }
    };
    return Field;
}(Component_1.default));
exports.default = Field;
//# sourceMappingURL=Field.js.map