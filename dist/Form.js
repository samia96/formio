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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var Element_1 = __importDefault(require("./Element"));
var Formio_1 = require("./Formio");
var displays_1 = __importDefault(require("./displays"));
var templates_1 = __importDefault(require("./templates"));
var FormioUtils = __importStar(require("./utils/utils"));
var Form = /** @class */ (function (_super) {
    __extends(Form, _super);
    /**
     * Creates an easy to use interface for embedding webforms, pdfs, and wizards into your application.
     *
     * @param {Object} element - The DOM element you wish to render this form within.
     * @param {Object | string} form - Either a Form JSON schema or the URL of a hosted form via. form.io.
     * @param {Object} options - The options to create a new form instance.
     * @param {boolean} options.readOnly - Set this form to readOnly
     * @param {boolean} options.noAlerts - Set to true to disable the alerts dialog.
     * @param {boolean} options.i18n - The translation file for this rendering. @see https://github.com/formio/formio.js/blob/master/i18n.js
     * @param {boolean} options.template - Provides a way to inject custom logic into the creation of every element rendered within the form.
     *
     * @example
     * import Form from '@formio/js/Form';
     * const form = new Form(document.getElementById('formio'), 'https://examples.form.io/example');
     * form.build();
     */
    function Form() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = this;
        var options = args[0] instanceof HTMLElement ? args[2] : args[1];
        if (Formio_1.Formio.options && Formio_1.Formio.options.form) {
            options = Object.assign(options, Formio_1.Formio.options.form);
        }
        _this = _super.call(this, options) || this;
        if (_this.options.useSessionToken) {
            Formio_1.Formio.useSessionToken(_this.options);
        }
        _this.ready = new Promise(function (resolve, reject) {
            _this.readyResolve = resolve;
            _this.readyReject = reject;
        });
        _this.instance = null;
        if (args[0] instanceof HTMLElement) {
            if (_this.element) {
                delete _this.element.component;
            }
            _this.element = args[0];
            _this.options = args[2] || {};
            _this.options.events = _this.events;
            _this.setForm(args[1])
                .then(function () { return _this.readyResolve(_this.instance); })
                .catch(_this.readyReject);
        }
        else if (args[0]) {
            _this.element = null;
            _this.options = args[1] || {};
            _this.options.events = _this.events;
            _this.setForm(args[0])
                .then(function () { return _this.readyResolve(_this.instance); })
                .catch(_this.readyReject);
        }
        else {
            _this.element = null;
            _this.options = {};
            _this.options.events = _this.events;
        }
        _this.display = '';
        return _this;
    }
    Form.prototype.createElement = function (tag, attrs, children) {
        var _this = this;
        var element = document.createElement(tag);
        for (var attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
                element.setAttribute(attr, attrs[attr]);
            }
        }
        (children || []).forEach(function (child) {
            element.appendChild(_this.createElement(child.tag, child.attrs, child.children));
        });
        return element;
    };
    Object.defineProperty(Form.prototype, "loading", {
        set: function (load) {
            if (!this.element || this.options.noLoader) {
                return;
            }
            if (load) {
                if (this.loader) {
                    return;
                }
                this.loader = this.createElement('div', {
                    'class': 'formio-loader'
                }, [{
                        tag: 'div',
                        attrs: {
                            class: 'loader-wrapper'
                        },
                        children: [{
                                tag: 'div',
                                attrs: {
                                    class: 'loader text-center'
                                }
                            }]
                    }]);
                this.element.appendChild(this.loader);
            }
            else if (this.loader) {
                this.element.removeChild(this.loader);
                this.loader = null;
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Create a new form instance provided the display of the form.
     *
     * @param {string} display - The display of the form, either "wizard", "form", or "pdf"
     * @return {*}
     */
    Form.prototype.create = function (display) {
        if (this.options && (this.options.flatten || this.options.renderMode === 'flat')) {
            display = 'form';
        }
        this.display = display;
        if (displays_1.default.displays[display]) {
            return new displays_1.default.displays[display](this.element, this.options);
        }
        else {
            // eslint-disable-next-line new-cap
            return new displays_1.default.displays['webform'](this.element, this.options);
        }
    };
    Object.defineProperty(Form.prototype, "form", {
        /**
         * Returns the loaded forms JSON.
         *
         * @return {object} - The loaded form's JSON
         */
        get: function () {
            return this._form;
        },
        /**
         * Sets the form. Either as JSON or a URL to a form JSON schema.
         *
         * @param {string|object} formParam - Either the form JSON or the URL of the form json.
         * @return {*}
         */
        set: function (formParam) {
            this.setForm(formParam);
        },
        enumerable: false,
        configurable: true
    });
    Form.prototype.errorForm = function (err) {
        return {
            components: [
                {
                    'label': 'HTML',
                    'tag': 'div',
                    'className': 'error error-message alert alert-danger ui red message',
                    'attrs': [
                        {
                            'attr': 'role',
                            'value': 'alert'
                        }
                    ],
                    'key': 'errorMessage',
                    'type': 'htmlelement',
                    'input': false,
                    'content': typeof err === 'string' ? err : err.message,
                }
            ]
        };
    };
    Form.prototype.setForm = function (formParam) {
        var _this = this;
        var result;
        formParam = formParam || this.form;
        if (typeof formParam === 'string') {
            var formio_1 = new Formio_1.Formio(formParam);
            var error_1;
            this.loading = true;
            result = this.getSubmission(formio_1, this.options)
                .catch(function (err) {
                error_1 = err;
            })
                .then(function (submission) {
                return formio_1.loadForm()
                    // If the form returned an error, show it instead of the form.
                    .catch(function (err) {
                    error_1 = err;
                })
                    .then(function (form) {
                    // If the submission returned an error, show it instead of the form.
                    if (error_1) {
                        form = _this.errorForm(error_1);
                    }
                    _this.loading = false;
                    _this.instance = _this.instance || _this.create(form.display);
                    _this.instance.url = formParam;
                    _this.instance.nosubmit = false;
                    _this._form = _this.instance.form = form;
                    if (submission) {
                        _this.instance.submission = submission;
                    }
                    if (error_1) {
                        throw error_1;
                    }
                    return _this.instance;
                });
            });
        }
        else {
            this.instance = this.instance || this.create(formParam.display);
            this._form = this.instance.form = formParam;
            result = this.instance.ready;
        }
        // A redraw has occurred so save off the new element in case of a setDisplay causing a rebuild.
        return result.then(function () {
            if (_this.element) {
                delete _this.element.component;
            }
            _this.element = _this.instance.element;
            return _this.instance;
        });
    };
    Form.prototype.getSubmission = function (formio, opts) {
        if (formio.submissionId) {
            return formio.loadSubmission(null, opts);
        }
        return Promise.resolve();
    };
    /**
     * Changes the display of the form.
     *
     * @param {string} display - The display to set this form. Either "wizard", "form", or "pdf"
     * @return {Promise<T>}
     */
    Form.prototype.setDisplay = function (display) {
        if ((this.display === display) && this.instance) {
            return Promise.resolve(this.instance);
        }
        this.form.display = display;
        this.instance.destroy();
        this.instance = this.create(display);
        return this.setForm(this.form);
    };
    Form.prototype.empty = function () {
        if (this.element) {
            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
        }
    };
    Form.embed = function (embed) {
        var _this = this;
        return new Promise(function (resolve) {
            if (!embed || !embed.src) {
                resolve();
            }
            var id = _this.id || "formio-".concat(Math.random().toString(36).substring(7));
            var className = embed.class || 'formio-form-wrapper';
            var code = embed.styles ? "<link rel=\"stylesheet\" href=\"".concat(embed.styles, "\">") : '';
            code += "<div id=\"".concat(id, "\" class=\"").concat(className, "\"></div>");
            document.write(code);
            var attempts = 0;
            var wait = setInterval(function () {
                attempts++;
                var formElement = document.getElementById(id);
                if (formElement || attempts > 10) {
                    resolve(new Form(formElement, embed.src).ready);
                    clearInterval(wait);
                }
            }, 10);
        });
    };
    /**
     * Sanitize an html string.
     *
     * @param string
     * @returns {*}
     */
    Form.prototype.sanitize = function (dirty, forceSanitize) {
        // If Sanitize is turned off
        if (this.options.sanitize === false && !forceSanitize) {
            return dirty;
        }
        return FormioUtils.sanitize(dirty, this.options);
    };
    Form.prototype.setContent = function (element, content, forceSanitize) {
        if (element instanceof HTMLElement) {
            element.innerHTML = this.sanitize(content, forceSanitize);
            return true;
        }
        return false;
    };
    /**
     * Build a new form.
     *
     * @return {Promise<T>}
     */
    Form.prototype.build = function () {
        var _this = this;
        if (!this.instance) {
            return Promise.reject('Form not ready. Use form.ready promise');
        }
        if (!this.element) {
            return Promise.reject('No DOM element for form.');
        }
        // Add temporary loader.
        var template = (this.options && this.options.template) ? this.options.template : 'bootstrap';
        var loader = templates_1.default[template].loader || templates_1.default.bootstrap.loader;
        this.setContent(this.element, loader.form);
        return this.render().then(function (html) {
            _this.setContent(_this.element, html);
            return _this.attach(_this.element).then(function () { return _this.instance; });
        })
            .then(function (param) {
            _this.emit('build', param);
            return param;
        });
    };
    Form.prototype.render = function () {
        var _this = this;
        if (!this.instance) {
            return Promise.reject('Form not ready. Use form.ready promise');
        }
        return Promise.resolve(this.instance.render())
            .then(function (param) {
            _this.emit('render', param);
            return param;
        });
    };
    Form.prototype.attach = function (element) {
        var _this = this;
        if (!this.instance) {
            return Promise.reject('Form not ready. Use form.ready promise');
        }
        if (this.element) {
            delete this.element.component;
        }
        this.element = element;
        return this.instance.attach(this.element)
            .then(function (param) {
            _this.emit('attach', param);
            return param;
        });
    };
    Form.prototype.teardown = function () {
        _super.prototype.teardown.call(this);
        delete this.instance;
        delete this.ready;
    };
    return Form;
}(Element_1.default));
exports.default = Form;
// Allow simple embedding.
Formio_1.Formio.embedForm = function (embed) { return Form.embed(embed); };
/**
 * Factory that creates a new form based on the form parameters.
 *
 * @param element {HMTLElement} - The HTML Element to add this form to.
 * @param form {string|Object} - The src of the form, or a form object.
 * @param options {Object} - The options to create this form.
 *
 * @return {Promise} - When the form is instance is ready.
 */
Formio_1.Formio.createForm = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return (new (Form.bind.apply(Form, __spreadArray([void 0], args, false)))()).ready;
};
Formio_1.Formio.Form = Form;
//# sourceMappingURL=Form.js.map