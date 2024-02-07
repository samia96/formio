"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Formio_1 = require("./Formio");
const builders_1 = __importDefault(require("./builders"));
const Form_1 = __importDefault(require("./Form"));
class FormBuilder extends Form_1.default {
    constructor(element, form, options) {
        form = form || {};
        options = options || {};
        super(element, form, Object.assign(options, FormBuilder.options, ((Formio_1.Formio.options && Formio_1.Formio.options.builder) ? Formio_1.Formio.options.builder : {})));
    }
    create(display) {
        if (builders_1.default.builders[display]) {
            return new builders_1.default.builders[display](this.element, this.options);
        }
        else {
            // eslint-disable-next-line new-cap
            return new builders_1.default.builders['webform'](this.element, this.options);
        }
    }
}
FormBuilder.options = {};
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
Formio_1.Formio.builder = (...args) => {
    return (new FormBuilder(...args)).ready;
};
Formio_1.Formio.FormBuilder = FormBuilder;
