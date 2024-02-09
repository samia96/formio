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
var Formio_1 = require("./Formio");
var builders_1 = __importDefault(require("./builders"));
var Form_1 = __importDefault(require("./Form"));
var FormBuilder = /** @class */ (function (_super) {
    __extends(FormBuilder, _super);
    function FormBuilder(element, form, options) {
        form = form || {};
        options = options || {};
        return _super.call(this, element, form, Object.assign(options, FormBuilder.options, ((Formio_1.Formio.options && Formio_1.Formio.options.builder) ? Formio_1.Formio.options.builder : {}))) || this;
    }
    FormBuilder.prototype.create = function (display) {
        if (builders_1.default.builders[display]) {
            return new builders_1.default.builders[display](this.element, this.options);
        }
        else {
            // eslint-disable-next-line new-cap
            return new builders_1.default.builders['webform'](this.element, this.options);
        }
    };
    FormBuilder.options = {};
    return FormBuilder;
}(Form_1.default));
exports.default = FormBuilder;
/**
 * Factory that creates a new form builder based on the form parameter.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */
Formio_1.Formio.builder = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (new (FormBuilder.bind.apply(FormBuilder, __spreadArray([void 0], args, false)))()).ready;
};
Formio_1.Formio.FormBuilder = FormBuilder;
//# sourceMappingURL=FormBuilder.js.map