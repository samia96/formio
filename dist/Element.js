"use strict";
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
var EventEmitter_1 = __importDefault(require("./EventEmitter"));
var Formio_1 = require("./Formio");
var FormioUtils = __importStar(require("./utils/utils"));
var i18n_1 = require("./utils/i18n");
var lodash_1 = __importDefault(require("lodash"));
var moment_1 = __importDefault(require("moment"));
var vanilla_text_mask_1 = __importDefault(require("@formio/vanilla-text-mask"));
/**
 * The root component for all elements within the Form.io renderer.
 */
var Element = /** @class */ (function () {
    function Element(options) {
        var _a;
        /**
         * The options for this component.
         * @type {{}}
         */
        this.options = Object.assign({
            language: 'en',
            highlightErrors: true,
            componentErrorClass: 'formio-error-wrapper',
            componentWarningClass: 'formio-warning-wrapper',
            row: '',
            namespace: 'formio'
        }, options || {});
        /**
         * The ID of this component. This value is auto-generated when the component is created, but
         * can also be provided from the component.id value passed into the constructor.
         * @type {string}
         */
        this.id = FormioUtils.getRandomComponentId();
        /**
         * An array of event handlers so that the destry command can deregister them.
         * @type {Array}
         */
        this.eventHandlers = [];
        // Use the i18next that is passed in, otherwise use the global version.
        this.options.i18n = this.options.i18n || {};
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.language) {
            this.options.i18n.language = this.options.language;
        }
        this.options.i18next = this.i18next = this.options.i18next || i18n_1.I18n.init(this.options.i18n);
        /**
         * An instance of the EventEmitter class to handle the emitting and registration of events.
         *
         * @type {EventEmitter}
         */
        this.events = (options && options.events) ? options.events : new EventEmitter_1.default();
        this.defaultMask = null;
        /**
         * Conditional to show or hide helplinks in editForm
         *
         * @type {*|boolean}
         */
        this.helplinks = (this.options.helplinks === 'false') ? false : (this.options.helplinks || 'https://help.form.io');
    }
    /**
     * Register for a new event within this component.
     *
     * @example
     * let component = new BaseComponent({
     *   type: 'textfield',
     *   label: 'First Name',
     *   key: 'firstName'
     * });
     * component.on('componentChange', (changed) => {
     *   console.log('this element is changed.');
     * });
     *
     *
     * @param {string} event - The event you wish to register the handler for.
     * @param {function} cb - The callback handler to handle this event.
     */
    Element.prototype.on = function (event, cb, internal, once) {
        if (once === void 0) { once = false; }
        if (!this.events) {
            return;
        }
        var type = "".concat(this.options.namespace, ".").concat(event);
        // Store the component id in the handler so that we can determine which events are for this component.
        cb.id = this.id;
        cb.key = this.key;
        cb.internal = internal;
        // Register for this event.
        return this.events[once ? 'once' : 'on'](type, cb);
    };
    /**
     * Register for a new single-fire event within this component.
     *
     * @param {string} event - The event you wish to register the handler for.
     * @param {function} cb - The callback handler to handle this event.
     */
    Element.prototype.once = function (event, cb, internal) {
        return this.on(event, cb, internal, true);
    };
    /**
     * Allow catching any event.
     *
     * @param cb
     * @returns {this}
     */
    Element.prototype.onAny = function (cb) {
        if (!this.events) {
            return;
        }
        return this.events.onAny(cb);
    };
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @param cb
     * @returns {this}
     */
    Element.prototype.offAny = function (cb) {
        if (!this.events) {
            return;
        }
        return this.events.offAny(cb);
    };
    /**
     * Removes a listener for a certain event. Not passing the 2nd arg will remove all listeners for that event.
     *
     * @param {string} event - The event you wish to register the handler for.
     * @param {function|undefined} cb - The callback handler to handle this event.
     */
    Element.prototype.off = function (event, cb) {
        var _this = this;
        if (!this.events) {
            return;
        }
        var type = "".concat(this.options.namespace, ".").concat(event);
        this.events.listeners(type).forEach(function (listener) {
            // Ensure the listener is for this element
            if (!listener || listener.id !== _this.id) {
                return;
            }
            // If there is a given callback, only deal with the match
            if (cb && cb !== listener) {
                return;
            }
            _this.events.off(type, listener);
        });
    };
    /**
     * Emit a new event.
     *
     * @param {string} event - The event to emit.
     * @param {Object} data - The data to emit with the handler.
     */
    Element.prototype.emit = function (event) {
        var _a;
        var data = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            data[_i - 1] = arguments[_i];
        }
        if (this.events) {
            (_a = this.events).emit.apply(_a, __spreadArray(["".concat(this.options.namespace, ".").concat(event)], data, false));
        }
    };
    /**
     * Check if the component has an event handler set up for the event.
     *
     * @param {string} event - The event name.
     * @returns {boolean}
     */
    Element.prototype.hasEventHandler = function (event) {
        var _this = this;
        if (!this.events) {
            return false;
        }
        var type = "".concat(this.options.namespace, ".").concat(event);
        return this.events.listeners(type).some(function (listener) {
            if (!listener) {
                return false;
            }
            return listener.id === _this.id || listener.key === _this.key;
        });
    };
    /**
     * Wrapper method to add an event listener to an HTML element.
     *
     * @param obj
     *   The DOM element to add the event to.
     * @param type
     *   The event name to add.
     * @param func
     *   The callback function to be executed when the listener is triggered.
     * @param persistent
     *   If this listener should persist beyond "destroy" commands.
     */
    Element.prototype.addEventListener = function (obj, type, func, persistent, capture) {
        if (!obj) {
            return;
        }
        if (!persistent) {
            this.eventHandlers.push({ id: this.id, obj: obj, type: type, func: func });
        }
        if ('addEventListener' in obj) {
            obj.addEventListener(type, func, !!capture);
        }
        else if ('attachEvent' in obj) {
            obj.attachEvent("on".concat(type), func);
        }
        return this;
    };
    /**
     * Remove an event listener from the object.
     *
     * @param obj
     * @param type
     */
    Element.prototype.removeEventListener = function (obj, type, func) {
        var _this = this;
        if (func === void 0) { func = null; }
        var indexes = [];
        if (!obj) {
            return;
        }
        this.eventHandlers.forEach(function (handler, index) {
            if ((handler.id === _this.id)
                && obj.removeEventListener
                && (handler.type === type)
                && (!func || handler.func === func)) {
                obj.removeEventListener(type, handler.func);
                indexes.push(index);
            }
        });
        if (indexes.length) {
            lodash_1.default.pullAt(this.eventHandlers, indexes);
        }
        return this;
    };
    Element.prototype.removeEventListeners = function () {
        var _this = this;
        this.eventHandlers.forEach(function (handler) {
            if ((_this.id === handler.id) && handler.type && handler.obj && handler.obj.removeEventListener) {
                handler.obj.removeEventListener(handler.type, handler.func);
            }
        });
        this.eventHandlers = [];
    };
    Element.prototype.removeAllEvents = function (includeExternal) {
        var _this = this;
        if (this.events) {
            lodash_1.default.each(this.events._events, function (events, type) {
                lodash_1.default.each(events, function (listener) {
                    if (listener && (_this.id === listener.id) && (includeExternal || listener.internal)) {
                        _this.events.off(type, listener);
                    }
                });
            });
        }
    };
    Element.prototype.teardown = function () {
        delete this.i18next;
        delete this.events;
    };
    /**
     * Removes all event listeners attached to this component.
     */
    Element.prototype.destroy = function (all) {
        if (all === void 0) { all = false; }
        this.removeEventListeners();
        this.removeAllEvents();
        if (all) {
            this.teardown();
        }
    };
    /**
     * Append an HTML DOM element to a container.
     *
     * @param element
     * @param container
     */
    Element.prototype.appendTo = function (element, container) {
        container === null || container === void 0 ? void 0 : container.appendChild(element);
        return this;
    };
    /**
     * Prepend an HTML DOM element to a container.
     *
     * @param {HTMLElement} element - The DOM element to prepend.
     * @param {HTMLElement} container - The DOM element that is the container of the element getting prepended.
     */
    Element.prototype.prependTo = function (element, container) {
        if (container) {
            if (container.firstChild) {
                try {
                    container.insertBefore(element, container.firstChild);
                }
                catch (err) {
                    console.warn(err);
                    container.appendChild(element);
                }
            }
            else {
                container.appendChild(element);
            }
        }
        return this;
    };
    /**
     * Removes an HTML DOM element from its bounding container.
     *
     * @param {HTMLElement} element - The element to remove.
     * @param {HTMLElement} container - The DOM element that is the container of the element to remove.
     */
    Element.prototype.removeChildFrom = function (element, container) {
        if (container && container.contains(element)) {
            try {
                container.removeChild(element);
            }
            catch (err) {
                console.warn(err);
            }
        }
        return this;
    };
    /**
     * Alias for document.createElement.
     *
     * @param {string} type - The type of element to create
     * @param {Object} attr - The element attributes to add to the created element.
     * @param {Various} children - Child elements. Can be a DOM Element, string or array of both.
     *
     * @return {HTMLElement} - The created element.
     */
    Element.prototype.ce = function (type, attr, children) {
        if (children === void 0) { children = null; }
        // console.warn('Call to deprecated this.ce(). Dom elements should be created with templates, not manually with ce.');
        // Create the element.
        var element = document.createElement(type);
        // Add attributes.
        if (attr) {
            this.attr(element, attr);
        }
        // Append the children.
        this.appendChild(element, children);
        return element;
    };
    /**
     * Append different types of children.
     *
     * @param child
     */
    Element.prototype.appendChild = function (element, child) {
        var _this = this;
        if (Array.isArray(child)) {
            child.forEach(function (oneChild) { return _this.appendChild(element, oneChild); });
        }
        else if (child instanceof HTMLElement || child instanceof Text) {
            element.appendChild(child);
        }
        else if (child) {
            element.appendChild(this.text(child.toString()));
        }
        return this;
    };
    /**
     * Creates a new input mask placeholder.
     * @param {HTMLElement} mask - The input mask.
     * @returns {string} - The placeholder that will exist within the input as they type.
     */
    Element.prototype.maskPlaceholder = function (mask) {
        var _this = this;
        return mask.map(function (char) { return (char instanceof RegExp) ? _this.placeholderChar : char; }).join('');
    };
    Object.defineProperty(Element.prototype, "placeholderChar", {
        get: function () {
            var _a;
            return ((_a = this.component) === null || _a === void 0 ? void 0 : _a.inputMaskPlaceholderChar) || '_';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Sets the input mask for an input.
     *
     * @param {HTMLElement} input - The html input to apply the mask to.
     * @param {String} inputMask - The input mask to add to this input.
     * @param {Boolean} usePlaceholder - Set the mask placeholder on the input.
     */
    Element.prototype.setInputMask = function (input, inputMask, usePlaceholder) {
        if (input && inputMask) {
            var mask = FormioUtils.getInputMask(inputMask, this.placeholderChar);
            this.defaultMask = mask;
            try {
                //destroy previous mask
                if (input.mask) {
                    input.mask.destroy();
                }
                input.mask = (0, vanilla_text_mask_1.default)({
                    inputElement: input,
                    mask: mask,
                    placeholderChar: this.placeholderChar,
                    shadowRoot: this.root ? this.root.shadowRoot : null
                });
            }
            catch (e) {
                // Don't pass error up, to prevent form rejection.
                // Internal bug of vanilla-text-mask on iOS (`selectionEnd`);
                console.warn(e);
            }
            if (mask.numeric) {
                input.setAttribute('pattern', '\\d*');
            }
            if (usePlaceholder) {
                input.setAttribute('placeholder', this.maskPlaceholder(mask));
            }
        }
    };
    /**
     * Translate a text using the i18n system.
     *
     * @param {string|Array<string>} text - The i18n identifier.
     * @param {Object} params - The i18n parameters to use for translation.
     */
    Element.prototype.t = function (text) {
        var _a;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return this.i18next ? (_a = this.i18next).t.apply(_a, __spreadArray([text], args, false)) : text;
    };
    /**
     * Alias to create a text node.
     * @param text
     * @returns {Text}
     */
    Element.prototype.text = function (text) {
        return document.createTextNode(this.t(text));
    };
    /**
     * Adds an object of attributes onto an element.
     * @param {HtmlElement} element - The element to add the attributes to.
     * @param {Object} attr - The attributes to add to the input element.
     */
    Element.prototype.attr = function (element, attr) {
        var _this = this;
        if (!element) {
            return;
        }
        lodash_1.default.each(attr, function (value, key) {
            if (typeof value !== 'undefined') {
                if (key.indexOf('on') === 0) {
                    // If this is an event, add a listener.
                    _this.addEventListener(element, key.substr(2).toLowerCase(), value);
                }
                else {
                    // Otherwise it is just an attribute.
                    element.setAttribute(key, value);
                }
            }
        });
    };
    /**
     * Determines if an element has a class.
     *
     * Taken from jQuery https://j11y.io/jquery/#v=1.5.0&fn=jQuery.fn.hasClass
     */
    Element.prototype.hasClass = function (element, className) {
        if (!element) {
            return false;
        }
        // Allow templates to intercept.
        className = " ".concat(className, " ");
        return ((" ".concat(element.className, " ")).replace(/[\n\t\r]/g, ' ').indexOf(className) > -1);
    };
    /**
     * Adds a class to a DOM element.
     *
     * @param element
     *   The element to add a class to.
     * @param className
     *   The name of the class to add.
     */
    Element.prototype.addClass = function (element, className) {
        if (!element || !(element instanceof HTMLElement)) {
            return this;
        }
        // Allow templates to intercept.
        var classes = element.getAttribute('class');
        if (!(classes === null || classes === void 0 ? void 0 : classes.includes(className))) {
            element.setAttribute('class', "".concat(classes, " ").concat(className));
        }
        return this;
    };
    /**
     * Remove a class from a DOM element.
     *
     * @param element
     *   The DOM element to remove the class from.
     * @param className
     *   The name of the class that is to be removed.
     */
    Element.prototype.removeClass = function (element, className) {
        if (!element || !className || !(element instanceof HTMLElement)) {
            return this;
        }
        // Allow templates to intercept.
        var cls = element.getAttribute('class');
        if (cls) {
            cls = cls.replace(new RegExp(" ".concat(className), 'g'), '');
            element.setAttribute('class', cls);
        }
        return this;
    };
    /**
     * Empty's an HTML DOM element.
     *
     * @param {HTMLElement} element - The element you wish to empty.
     */
    Element.prototype.empty = function (element) {
        if (element) {
            while (element.firstChild) {
                element.removeChild(element.firstChild);
            }
        }
    };
    /**
     * Create an evaluation context for all script executions and interpolations.
     *
     * @param additional
     * @return {*}
     */
    Element.prototype.evalContext = function (additional) {
        var _a;
        return Object.assign({
            _: lodash_1.default,
            utils: FormioUtils,
            util: FormioUtils,
            user: Formio_1.Formio.getUser(),
            moment: moment_1.default,
            instance: this,
            self: this,
            token: Formio_1.Formio.getToken({
                decode: true
            }),
            config: this.root && this.root.form && this.root.form.config
                ? this.root.form.config
                : ((_a = this.options) === null || _a === void 0 ? void 0 : _a.formConfig)
                    ? this.options.formConfig
                    : {},
        }, additional, lodash_1.default.get(this.root, 'options.evalContext', {}));
    };
    /**
     * Performs an interpolation using the evaluation context of this component.
     *
     * @param string
     * @param data
     * @return {XML|string|*|void}
     */
    Element.prototype.interpolate = function (string, data, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        if (typeof string !== 'function' && (this.component.content || this.component.html)
            && !FormioUtils.Evaluator.templateSettings.interpolate.test(string)) {
            string = FormioUtils.translateHTMLTemplate(String(string), function (value) { return _this.t(value); });
        }
        if (this.component.filter === string && !this.options.building) {
            var evalContext = this.evalContext(data);
            evalContext.data = lodash_1.default.mapValues(evalContext.data, function (val) { return lodash_1.default.isString(val) ? encodeURIComponent(val) : val; });
            return FormioUtils.interpolate(string, evalContext, options);
        }
        return FormioUtils.interpolate(string, this.evalContext(data), options);
    };
    /**
     * Performs an evaluation using the evaluation context of this component.
     *
     * @param func
     * @param args
     * @param ret
     * @param tokenize
     * @return {*}
     */
    Element.prototype.evaluate = function (func, args, ret, tokenize) {
        return FormioUtils.evaluate(func, this.evalContext(args), ret, tokenize);
    };
    /**
     * Allow for options to hook into the functionality of this renderer.
     * @return {*}
     */
    Element.prototype.hook = function () {
        var name = arguments[0];
        if (this.options &&
            this.options.hooks &&
            this.options.hooks[name]) {
            return this.options.hooks[name].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        else {
            // If this is an async hook instead of a sync.
            var fn = (typeof arguments[arguments.length - 1] === 'function') ? arguments[arguments.length - 1] : null;
            if (fn) {
                return fn(null, arguments[1]);
            }
            else {
                return arguments[1];
            }
        }
    };
    return Element;
}());
exports.default = Element;
//# sourceMappingURL=Element.js.map