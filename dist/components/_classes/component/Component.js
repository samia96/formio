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
/* globals Quill, ClassicEditor, CKEDITOR */
var vanilla_text_mask_1 = require("@formio/vanilla-text-mask");
var tippy_js_1 = __importDefault(require("tippy.js"));
var lodash_1 = __importDefault(require("lodash"));
var ismobilejs_1 = __importDefault(require("ismobilejs"));
var Formio_1 = require("../../../Formio");
var FormioUtils = __importStar(require("../../../utils/utils"));
var Validator_1 = __importDefault(require("../../../validator/Validator"));
var utils_1 = require("../../../utils/utils");
var Element_1 = __importDefault(require("../../../Element"));
var ComponentModal_1 = __importDefault(require("../componentModal/ComponentModal"));
var widgets_1 = __importDefault(require("../../../widgets"));
var addons_1 = __importDefault(require("../../../addons"));
var uploadAdapter_1 = require("../../../providers/storage/uploadAdapter");
var en_1 = __importDefault(require("../../../translations/en"));
var Templates_1 = __importDefault(require("../../../templates/Templates"));
var isIEBrowser = FormioUtils.getBrowserInfo().ie;
/**
 * This is the Component class
 which all elements within the FormioForm derive from.
 */
var Component = /** @class */ (function (_super) {
    __extends(Component, _super);
    /* eslint-enable no-unused-vars */
    /**
     * Initialize a new Component.
     *
     * @param {Object} component - The component JSON you wish to initialize.
     * @param {Object} options - The options for this component.
     * @param {Object} data - The global data submission object this component will belong.
     */
    /* eslint-disable max-statements */
    function Component(component, options, data) {
        var _this = _super.call(this, Object.assign({
            renderMode: 'form',
            attachMode: 'full',
            noDefaults: false
        }, options || {})) || this;
        // Restore the component id.
        if (component && component.id) {
            _this.id = component.id;
        }
        /**
         * Determines if this component has a condition assigned to it.
         * @type {null}
         * @private
         */
        _this._hasCondition = null;
        /**
         * References to dom elements
         */
        _this.refs = {};
        // Allow global override for any component JSON.
        if (component &&
            _this.options.components &&
            _this.options.components[component.type]) {
            lodash_1.default.merge(component, _this.options.components[component.type]);
        }
        /**
         * Set the validator instance.
         */
        _this.validator = Validator_1.default;
        /**
         * The data path to this specific component instance.
         *
         * @type {string}
         */
        _this.path = '';
        /**
         * The Form.io component JSON schema.
         * @type {*}
         */
        _this.component = _this.mergeSchema(component || {});
        // Add the id to the component.
        _this.component.id = _this.id;
        _this.afterComponentAssign();
        // Save off the original component to be used in logic.
        _this.originalComponent = (0, utils_1.fastCloneDeep)(_this.component);
        /**
         * If the component has been attached
         */
        _this.attached = false;
        /**
         * If the component has been rendered
         */
        _this.rendered = false;
        /**
         * The data object in which this component resides.
         * @type {*}
         */
        _this._data = data || {};
        /**
         * The existing error that this component has.
         * @type {string}
         */
        _this.error = '';
        /**
         * Tool tip text after processing
         * @type {string}
         */
        _this.tooltip = '';
        /**
         * The row path of this component.
         * @type {number}
         */
        _this.row = _this.options.row;
        /**
         * Determines if this component is disabled, or not.
         *
         * @type {boolean}
         */
        _this._disabled = (0, utils_1.boolValue)(_this.component.disabled) ? _this.component.disabled : false;
        /**
         * Points to the root component, usually the FormComponent.
         *
         * @type {Component}
         */
        _this.root = _this.options.root;
        _this.localRoot = _this.options.localRoot;
        /**
         * If this input has been input and provided value.
         *
         * @type {boolean}
         */
        _this.pristine = true;
        /**
         * Points to the parent component.
         *
         * @type {Component}
         */
        _this.parent = _this.options.parent;
        _this.options.name = _this.options.name || 'data';
        /**
         * The validators that are assigned to this component.
         * @type {[string]}
         */
        _this.validators = ['required', 'minLength', 'maxLength', 'minWords', 'maxWords', 'custom', 'pattern', 'json', 'mask'];
        _this._path = '';
        // Nested forms don't have parents so we need to pass their path in.
        _this._parentPath = _this.options.parentPath || '';
        // Needs for Nextgen Rules Engine
        _this.resetCaches();
        /**
         * Determines if this component is visible, or not.
         */
        _this._parentVisible = _this.options.hasOwnProperty('parentVisible') ? _this.options.parentVisible : true;
        _this._visible = _this._parentVisible && _this.conditionallyVisible(null, data);
        _this._parentDisabled = false;
        /**
         * Used to trigger a new change in this component.
         * @type {function} - Call to trigger a change in this component.
         */
        var changes = [];
        var lastChanged = null;
        var triggerArgs = [];
        var _triggerChange = lodash_1.default.debounce(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (_this.root) {
                _this.root.changing = false;
            }
            triggerArgs = [];
            if (!args[1] && lastChanged) {
                // Set the changed component if one isn't provided.
                args[1] = lastChanged;
            }
            if (lodash_1.default.isEmpty(args[0]) && lastChanged) {
                // Set the flags if it is empty and lastChanged exists.
                args[0] = lastChanged.flags;
            }
            lastChanged = null;
            args[3] = changes;
            var retVal = _this.onChange.apply(_this, args);
            changes = [];
            return retVal;
        }, 100);
        _this.triggerChange = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            if (args[1]) {
                // Make sure that during the debounce that we always track lastChanged component, even if they
                // don't provide one later.
                lastChanged = args[1];
                changes.push(lastChanged);
            }
            if (_this.root) {
                _this.root.changing = true;
            }
            if (args.length) {
                triggerArgs = args;
            }
            return _triggerChange.apply(void 0, triggerArgs);
        };
        /**
         * Used to trigger a redraw event within this component.
         *
         * @type {Function}
         */
        _this.triggerRedraw = lodash_1.default.debounce(_this.redraw.bind(_this), 100);
        /**
         * list of attached tooltips
         * @type {Array}
         */
        _this.tooltips = [];
        /**
         * List of attached addons
         * @type {Array}
         */
        _this.addons = [];
        // To force this component to be invalid.
        _this.invalid = false;
        if (_this.component) {
            _this.type = _this.component.type;
            if (_this.allowData && _this.key) {
                _this.options.name += "[".concat(_this.key, "]");
                // If component is visible or not set to clear on hide, set the default value.
                if (_this.visible || !_this.component.clearOnHide) {
                    if (!_this.hasValue()) {
                        if (_this.shouldAddDefaultValue) {
                            _this.dataValue = _this.defaultValue;
                        }
                    }
                    else {
                        // Ensure the dataValue is set.
                        /* eslint-disable  no-self-assign */
                        _this.dataValue = _this.dataValue;
                        /* eslint-enable  no-self-assign */
                    }
                }
            }
            /**
             * The element information for creating the input element.
             * @type {*}
             */
            _this.info = _this.elementInfo();
        }
        // Allow anyone to hook into the component creation.
        _this.hook('component');
        if (!_this.options.skipInit) {
            _this.init();
        }
        return _this;
    }
    Component.schema = function () {
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i] = arguments[_i];
        }
        return lodash_1.default.merge.apply(lodash_1.default, __spreadArray([{
                /**
                 * Determines if this component provides an input.
                 */
                input: true,
                /**
                 * The data key for this component (how the data is stored in the database).
                 */
                key: '',
                /**
                 * The input placeholder for this component.
                 */
                placeholder: '',
                /**
                 * The input prefix
                 */
                prefix: '',
                /**
                 * The custom CSS class to provide to this component.
                 */
                customClass: '',
                /**
                 * The input suffix.
                 */
                suffix: '',
                /**
                 * If this component should allow an array of values to be captured.
                 */
                multiple: false,
                /**
                 * The default value of this component.
                 */
                defaultValue: null,
                /**
                 * If the data of this component should be protected (no GET api requests can see the data)
                 */
                protected: false,
                /**
                 * Validate if the value of this component should be unique within the form.
                 */
                unique: false,
                /**
                 * If the value of this component should be persisted within the backend api database.
                 */
                persistent: true,
                /**
                 * Determines if the component should be within the form, but not visible.
                 */
                hidden: false,
                /**
                 * If the component should be cleared when hidden.
                 */
                clearOnHide: true,
                /**
                 * This will refresh this component options when this field changes.
                 */
                refreshOn: '',
                /**
                 * This will redraw the component when this field changes.
                 */
                redrawOn: '',
                /**
                 * If this component should be included as a column within a submission table.
                 */
                tableView: false,
                /**
                 * If this component should be rendering in modal.
                 */
                modalEdit: false,
                /**
                 * The input label provided to this component.
                 */
                label: '',
                dataGridLabel: false,
                labelPosition: 'top',
                description: '',
                errorLabel: '',
                tooltip: '',
                hideLabel: false,
                tabindex: '',
                disabled: false,
                autofocus: false,
                dbIndex: false,
                customDefaultValue: '',
                calculateValue: '',
                calculateServer: false,
                widget: null,
                /**
                 * Attributes that will be assigned to the input elements of this component.
                 */
                attributes: {},
                /**
                 * This will perform the validation on either "change" or "blur" of the input element.
                 */
                validateOn: 'change',
                /**
                 * The validation criteria for this component.
                 */
                validate: {
                    /**
                     * If this component is required.
                     */
                    required: false,
                    /**
                     * Custom JavaScript validation.
                     */
                    custom: '',
                    /**
                     * If the custom validation should remain private (only the backend will see it and execute it).
                     */
                    customPrivate: false,
                    /**
                     * If this component should implement a strict date validation if the Calendar widget is implemented.
                     */
                    strictDateValidation: false,
                    multiple: false,
                    unique: false
                },
                /**
                 * The simple conditional settings for a component.
                 */
                conditional: {
                    show: null,
                    when: null,
                    eq: ''
                },
                overlay: {
                    style: '',
                    left: '',
                    top: '',
                    width: '',
                    height: '',
                },
                allowCalculateOverride: false,
                encrypted: false,
                showCharCount: false,
                showWordCount: false,
                properties: {},
                allowMultipleMasks: false,
                addons: [],
            }], sources, false));
    };
    Object.defineProperty(Component, "Validator", {
        /**
         * Return the validator as part of the component.
         *
         * @return {ValidationChecker}
         * @constructor
         */
        get: function () {
            return Validator_1.default;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component, "conditionOperatorsSettings", {
        /**
         * Return the simple condition settings as part of the component.
         *
         * @return {Object}
         *
         */
        get: function () {
            return {
                operators: ['isEqual', 'isNotEqual', 'isEmpty', 'isNotEmpty'],
                valueComponent: function () {
                    return { type: 'textfield' };
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Return the array of possible types of component value absed on its schema.
     *
     * @param schema
     * @return {Array}
     *
     */
    Component.savedValueTypes = function (schema) {
        schema = schema || {};
        return FormioUtils.getComponentSavedTypes(schema) || [FormioUtils.componentValueTypes.any];
    };
    /**
     * Provides a table view for this component. Override if you wish to do something different than using getView
     * method of your instance.
     *
     * @param value
     * @param options
     */
    /* eslint-disable no-unused-vars */
    Component.tableView = function (value, options) { };
    Object.defineProperty(Component.prototype, "data", {
        /* eslint-enable max-statements */
        get: function () {
            return this._data;
        },
        set: function (value) {
            this._data = value;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.mergeSchema = function (component) {
        if (component === void 0) { component = {}; }
        return lodash_1.default.defaultsDeep(component, this.defaultSchema);
    };
    Object.defineProperty(Component.prototype, "ready", {
        // Allow componets to notify when ready.
        get: function () {
            return Promise.resolve(this);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "isPDFReadOnlyMode", {
        get: function () {
            return this.parent &&
                this.parent.form &&
                (this.parent.form.display === 'pdf') &&
                this.options.readOnly;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "labelInfo", {
        get: function () {
            var label = {};
            label.hidden = this.labelIsHidden();
            label.className = '';
            label.labelPosition = this.component.labelPosition;
            label.tooltipClass = "".concat(this.iconClass('question-sign'), " text-muted");
            var isPDFReadOnlyMode = this.isPDFReadOnlyMode;
            if (this.hasInput && this.component.validate && (0, utils_1.boolValue)(this.component.validate.required) && !isPDFReadOnlyMode) {
                label.className += ' field-required';
            }
            if (label.hidden) {
                label.className += ' control-label--hidden';
            }
            if (this.info.attr.id) {
                label.for = this.info.attr.id;
            }
            return label;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.init = function () {
        var _this = this;
        var _a;
        this.disabled = this.shouldDisabled;
        this._visible = this.conditionallyVisible(null, null);
        if ((_a = this.component.addons) === null || _a === void 0 ? void 0 : _a.length) {
            this.component.addons.forEach(function (addon) { return _this.createAddon(addon); });
        }
    };
    Component.prototype.afterComponentAssign = function () {
        //implement in extended classes
    };
    Component.prototype.createAddon = function (addonConfiguration) {
        var _a;
        var name = addonConfiguration.name;
        if (!name) {
            return;
        }
        var settings = ((_a = addonConfiguration.settings) === null || _a === void 0 ? void 0 : _a.data) || {};
        var Addon = addons_1.default[name.value];
        var addon = null;
        if (Addon) {
            var supportedComponents = Addon.info.supportedComponents;
            var supportsThisComponentType = !(supportedComponents === null || supportedComponents === void 0 ? void 0 : supportedComponents.length) ||
                supportedComponents.indexOf(this.component.type) !== -1;
            if (supportsThisComponentType) {
                addon = new Addon(settings, this);
                this.addons.push(addon);
            }
            else {
                console.warn("Addon ".concat(name.label, " does not support component of type ").concat(this.component.type, "."));
            }
        }
        return addon;
    };
    Component.prototype.teardown = function () {
        if (this.element) {
            delete this.element.component;
            delete this.element;
        }
        delete this._currentForm;
        delete this.parent;
        delete this.root;
        delete this.triggerChange;
        delete this.triggerRedraw;
        if (this.options) {
            delete this.options.root;
            delete this.options.parent;
            delete this.options.i18next;
        }
        _super.prototype.teardown.call(this);
    };
    Component.prototype.destroy = function (all) {
        if (all === void 0) { all = false; }
        _super.prototype.destroy.call(this, all);
        this.detach();
        this.addons.forEach(function (addon) { return addon.destroy(); });
        if (all) {
            this.teardown();
        }
    };
    Object.defineProperty(Component.prototype, "shouldDisabled", {
        get: function () {
            return this.options.readOnly || this.component.disabled || (this.options.hasOwnProperty('disabled') && this.options.disabled[this.key]);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "isInputComponent", {
        get: function () {
            return !this.component.hasOwnProperty('input') || this.component.input;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "allowData", {
        get: function () {
            return this.hasInput;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "hasInput", {
        get: function () {
            return this.isInputComponent || (this.refs.input && this.refs.input.length);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "defaultSchema", {
        get: function () {
            return Component.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "key", {
        get: function () {
            return lodash_1.default.get(this.component, 'key', '');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "parentVisible", {
        get: function () {
            return this._parentVisible;
        },
        set: function (value) {
            this._parentVisible = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "parentDisabled", {
        get: function () {
            return this._parentDisabled;
        },
        set: function (value) {
            this._parentDisabled = value;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.shouldForceVisibility = function (component, visibility) {
        if (!this.options[visibility]) {
            return false;
        }
        if (!component) {
            component = this.component;
        }
        if (lodash_1.default.isArray(this.options[visibility])) {
            return this.options[visibility].includes(component.key);
        }
        return this.options[visibility][component.key];
    };
    Component.prototype.shouldForceHide = function (component) {
        return this.shouldForceVisibility(component, 'hide');
    };
    Component.prototype.shouldForceShow = function (component) {
        return this.shouldForceVisibility(component, 'show');
    };
    Object.defineProperty(Component.prototype, "visible", {
        /**
         *
         * @returns {boolean}
         */
        get: function () {
            // Show only if visibility changes or if we are in builder mode or if hidden fields should be shown.
            if (this.builderMode || this.previewMode || this.options.showHiddenFields) {
                return true;
            }
            if (this.shouldForceHide()) {
                return false;
            }
            if (this.shouldForceShow()) {
                return true;
            }
            return this._visible && this._parentVisible;
        },
        /**
         *
         * @param value {boolean}
         */
        set: function (value) {
            if (this._visible !== value) {
                // Skip if this component is set to visible and is supposed to be hidden.
                if (value && this.shouldForceHide()) {
                    return;
                }
                // Skip if this component is set to hidden and is supposed to be shown.
                if (!value && this.shouldForceShow()) {
                    return;
                }
                this._visible = value;
                this.clearOnHide();
                this.redraw();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "currentForm", {
        get: function () {
            return this._currentForm;
        },
        set: function (instance) {
            this._currentForm = instance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "fullMode", {
        get: function () {
            return this.options.attachMode === 'full';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "builderMode", {
        get: function () {
            return this.options.attachMode === 'builder';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "calculatedPath", {
        get: function () {
            console.error('component.calculatedPath was deprecated, use component.path instead.');
            return this.path;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "labelPosition", {
        get: function () {
            return this.component.labelPosition;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "labelWidth", {
        get: function () {
            var width = this.component.labelWidth;
            return width >= 0 ? width : 30;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "labelMargin", {
        get: function () {
            var margin = this.component.labelMargin;
            return margin >= 0 ? margin : 3;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "isAdvancedLabel", {
        get: function () {
            return [
                'left-left',
                'left-right',
                'right-left',
                'right-right'
            ].includes(this.labelPosition);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "labelPositions", {
        get: function () {
            return this.labelPosition.split('-');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "skipInEmail", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.rightDirection = function (direction) {
        if (this.options.condensedMode) {
            return false;
        }
        return direction === 'right';
    };
    Component.prototype.getLabelInfo = function (isCondensed) {
        if (isCondensed === void 0) { isCondensed = false; }
        var isRightPosition = this.rightDirection(this.labelPositions[0]);
        var isLeftPosition = this.labelPositions[0] === 'left' || isCondensed;
        var isRightAlign = this.rightDirection(this.labelPositions[1]);
        var contentMargin = '';
        if (this.component.hideLabel) {
            var margin = isCondensed ? 0 : this.labelWidth + this.labelMargin;
            contentMargin = isRightPosition ? "margin-right: ".concat(margin, "%") : '';
            contentMargin = isLeftPosition ? "margin-left: ".concat(margin, "%") : '';
        }
        var labelStyles = "\n      flex: ".concat(this.labelWidth, ";\n      ").concat(isRightPosition ? 'margin-left' : 'margin-right', ": ").concat(this.labelMargin, "%;\n    ");
        var contentStyles = "\n      flex: ".concat(100 - this.labelWidth - this.labelMargin, ";\n      ").concat(contentMargin, ";\n      ").concat(this.component.hideLabel ? "max-width: ".concat(100 - this.labelWidth - this.labelMargin) : '', ";\n    ");
        return {
            isRightPosition: isRightPosition,
            isRightAlign: isRightAlign,
            labelStyles: labelStyles,
            contentStyles: contentStyles
        };
    };
    /**
     * Returns only the schema that is different from the default.
     *
     * @param schema
     * @param defaultSchema
     */
    Component.prototype.getModifiedSchema = function (schema, defaultSchema, recursion) {
        var _this = this;
        var modified = {};
        if (!defaultSchema) {
            return schema;
        }
        lodash_1.default.each(schema, function (val, key) {
            if (!lodash_1.default.isArray(val) && lodash_1.default.isObject(val) && defaultSchema.hasOwnProperty(key)) {
                var subModified = _this.getModifiedSchema(val, defaultSchema[key], true);
                if (!lodash_1.default.isEmpty(subModified)) {
                    modified[key] = subModified;
                }
            }
            else if (lodash_1.default.isArray(val)) {
                if (val.length !== 0 && !lodash_1.default.isEqual(val, defaultSchema[key])) {
                    modified[key] = val;
                }
            }
            else if ((!recursion && (key === 'type')) ||
                (!recursion && (key === 'key')) ||
                (!recursion && (key === 'label')) ||
                (!recursion && (key === 'input')) ||
                (!recursion && (key === 'tableView')) ||
                (val !== '' && !defaultSchema.hasOwnProperty(key)) ||
                (val !== '' && val !== defaultSchema[key]) ||
                (defaultSchema[key] && val !== defaultSchema[key])) {
                modified[key] = val;
            }
        });
        return modified;
    };
    Object.defineProperty(Component.prototype, "schema", {
        /**
         * Returns the JSON schema for this component.
         */
        get: function () {
            return (0, utils_1.fastCloneDeep)(this.getModifiedSchema(lodash_1.default.omit(this.component, 'id'), this.defaultSchema));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "isInDataGrid", {
        /**
         * Returns true if component is inside DataGrid
         */
        get: function () {
            return this.inDataGrid;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Translate a text using the i18n system.
     *
     * @param {string} text - The i18n identifier.
     * @param {Object} params - The i18n parameters to use for translation.
     */
    Component.prototype.t = function (text, params) {
        if (params === void 0) { params = {}; }
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        if (!text) {
            return '';
        }
        // Use _userInput: true to ignore translations from defaults
        if (text in en_1.default && params._userInput) {
            return text;
        }
        params.data = this.rootValue;
        params.row = this.data;
        params.component = this.component;
        return _super.prototype.t.apply(this, __spreadArray([text, params], args, false));
    };
    Component.prototype.labelIsHidden = function () {
        return !this.component.label ||
            ((!this.isInDataGrid && this.component.hideLabel) ||
                (this.isInDataGrid && !this.component.dataGridLabel) ||
                this.options.inputsOnly) && !this.builderMode;
    };
    Component.prototype.transform = function (type, value) {
        var frameworkTemplates = this.options.template ? Templates_1.default.templates[this.options.template] : Templates_1.default.current;
        return frameworkTemplates.hasOwnProperty('transform')
            ? frameworkTemplates.transform(type, value, this)
            : function (type, value) { return value; };
    };
    Component.prototype.getTemplate = function (names, modes) {
        modes = Array.isArray(modes) ? modes : [modes];
        names = Array.isArray(names) ? names : [names];
        if (!modes.includes('form')) {
            modes.push('form');
        }
        var result = null;
        if (this.options.templates) {
            result = this.checkTemplate(this.options.templates, names, modes);
            if (result) {
                return result;
            }
        }
        var frameworkTemplates = this.options.template ? Templates_1.default.templates[this.options.template] : Templates_1.default.current;
        result = this.checkTemplate(frameworkTemplates, names, modes);
        if (result) {
            return result;
        }
        // Default back to bootstrap if not defined.
        var name = names[names.length - 1];
        var templatesByName = Templates_1.default.defaultTemplates[name];
        if (!templatesByName) {
            return "Unknown template: ".concat(name);
        }
        var templateByMode = this.checkTemplateMode(templatesByName, modes);
        if (templateByMode) {
            return templateByMode;
        }
        return templatesByName.form;
    };
    Component.prototype.checkTemplate = function (templates, names, modes) {
        for (var _i = 0, names_1 = names; _i < names_1.length; _i++) {
            var name = names_1[_i];
            var templatesByName = templates[name];
            if (templatesByName) {
                var templateByMode = this.checkTemplateMode(templatesByName, modes);
                if (templateByMode) {
                    return templateByMode;
                }
            }
        }
        return null;
    };
    Component.prototype.checkTemplateMode = function (templatesByName, modes) {
        for (var _i = 0, modes_1 = modes; _i < modes_1.length; _i++) {
            var mode = modes_1[_i];
            var templateByMode = templatesByName[mode];
            if (templateByMode) {
                return templateByMode;
            }
        }
        return null;
    };
    Component.prototype.getFormattedAttribute = function (attr) {
        return attr ? this.t(attr, { _userInput: true }).replace(/"/g, '&quot;') : '';
    };
    Component.prototype.getFormattedTooltip = function (tooltipValue) {
        var tooltip = this.interpolate(tooltipValue || '').replace(/(?:\r\n|\r|\n)/g, '<br />');
        return this.getFormattedAttribute(tooltip);
    };
    Component.prototype.isHtmlRenderMode = function () {
        return this.options.renderMode === 'html';
    };
    Component.prototype.renderTemplate = function (name, data, modeOption) {
        var _this = this;
        if (data === void 0) { data = {}; }
        // Need to make this fall back to form if renderMode is not found similar to how we search templates.
        var mode = modeOption || this.options.renderMode || 'form';
        data.component = this.component;
        data.self = this;
        data.options = this.options;
        data.readOnly = this.options.readOnly;
        data.iconClass = this.iconClass.bind(this);
        data.size = this.size.bind(this);
        data.t = this.t.bind(this);
        data.transform = this.transform.bind(this);
        data.id = data.id || this.id;
        data.key = data.key || this.key;
        data.value = data.value || this.dataValue;
        data.disabled = this.disabled;
        data.builder = this.builderMode;
        data.render = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            console.warn("Form.io 'render' template function is deprecated.\n      If you need to render template (template A) inside of another template (template B),\n      pass pre-compiled template A (use this.renderTemplate('template_A_name') as template context variable for template B");
            return _this.renderTemplate.apply(_this, args);
        };
        data.label = data.labelInfo || this.labelInfo;
        data.tooltip = this.getFormattedTooltip(this.component.tooltip);
        // Allow more specific template names
        var names = [
            "".concat(name, "-").concat(this.component.type, "-").concat(this.key),
            "".concat(name, "-").concat(this.component.type),
            "".concat(name, "-").concat(this.key),
            "".concat(name),
        ];
        // Allow template alters.
        return this.hook("render".concat(name.charAt(0).toUpperCase() + name.substring(1, name.length)), this.interpolate(this.getTemplate(names, mode), data), data, mode);
    };
    /**
     * Sanitize an html string.
     *
     * @param string
     * @returns {*}
     */
    Component.prototype.sanitize = function (dirty, forceSanitize, options) {
        var _a;
        if (!this.shouldSanitizeValue && !forceSanitize) {
            return dirty;
        }
        return FormioUtils.sanitize(dirty, {
            sanitizeConfig: lodash_1.default.merge(((_a = this.options) === null || _a === void 0 ? void 0 : _a.sanitizeConfig) || {}, options || {}),
        });
    };
    /**
     * Render a template string into html.
     *
     * @param template
     * @param data
     * @param actions
     *
     * @return {HTMLElement|String} - The created element or an empty string if template is not specified.
     */
    Component.prototype.renderString = function (template, data) {
        if (!template) {
            return '';
        }
        // Interpolate the template and populate
        return this.interpolate(template, data);
    };
    Component.prototype.performInputMapping = function (input) {
        return input;
    };
    Object.defineProperty(Component.prototype, "widget", {
        get: function () {
            var _a;
            var settings = this.component.widget;
            if (settings && ((_a = this.root) === null || _a === void 0 ? void 0 : _a.shadowRoot)) {
                settings.shadowRoot = this.root.shadowRoot;
            }
            var widget = settings && widgets_1.default[settings.type] ? new widgets_1.default[settings.type](settings, this.component, this) : null;
            return widget;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.getBrowserLanguage = function () {
        var nav = window.navigator;
        var browserLanguagePropertyKeys = ['language', 'browserLanguage', 'systemLanguage', 'userLanguage'];
        var language;
        // support for HTML 5.1 "navigator.languages"
        if (Array.isArray(nav.languages)) {
            for (var i = 0; i < nav.languages.length; i++) {
                language = nav.languages[i];
                if (language && language.length) {
                    return language.split(';')[0];
                }
            }
        }
        // support for other well known properties in browsers
        for (var i = 0; i < browserLanguagePropertyKeys.length; i++) {
            language = nav[browserLanguagePropertyKeys[i]];
            if (language && language.length) {
                return language.split(';')[0];
            }
        }
        return null;
    };
    /**
     * Called before a next and previous page is triggered allowing the components
     * to perform special functions.
     *
     * @return {*}
     */
    Component.prototype.beforePage = function () {
        return Promise.resolve(true);
    };
    Component.prototype.beforeNext = function () {
        return this.beforePage(true);
    };
    /**
     * Called before a submission is triggered allowing the components
     * to perform special async functions.
     *
     * @return {*}
     */
    Component.prototype.beforeSubmit = function () {
        return Promise.resolve(true);
    };
    Object.defineProperty(Component.prototype, "submissionTimezone", {
        /**
         * Return the submission timezone.
         *
         * @return {*}
         */
        get: function () {
            this.options.submissionTimezone = this.options.submissionTimezone || lodash_1.default.get(this.root, 'options.submissionTimezone');
            return this.options.submissionTimezone;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "timezone", {
        get: function () {
            return this.getTimezone(this.component);
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.getTimezone = function (settings) {
        if (settings.timezone) {
            return settings.timezone;
        }
        if (settings.displayInTimezone === 'utc') {
            return 'UTC';
        }
        var submissionTimezone = this.submissionTimezone;
        if (submissionTimezone &&
            ((settings.displayInTimezone === 'submission') ||
                ((this.options.pdf || this.options.server) && (settings.displayInTimezone === 'viewer')))) {
            return submissionTimezone;
        }
        // Return current timezone if none are provided.
        return (0, utils_1.currentTimezone)();
    };
    Component.prototype.loadRefs = function (element, refs) {
        for (var ref in refs) {
            var refType = refs[ref];
            var isString = typeof refType === 'string';
            var selector = isString && refType.includes('scope') ? ":scope > [ref=\"".concat(ref, "\"]") : "[ref=\"".concat(ref, "\"]");
            if (isString && refType.startsWith('single')) {
                this.refs[ref] = element.querySelector(selector);
            }
            else {
                this.refs[ref] = element.querySelectorAll(selector);
            }
        }
    };
    Component.prototype.setOpenModalElement = function (template) {
        this.componentModal.setOpenModalElement(template || this.getModalPreviewTemplate());
    };
    Component.prototype.getModalPreviewTemplate = function () {
        var _a;
        var dataValue = this.component.type === 'password' ? this.dataValue.replace(/./g, '•') : this.dataValue;
        var message = this.error ? {
            level: 'error',
            message: this.error.message,
        } : '';
        var modalLabel;
        if (this.hasInput && ((_a = this.component.validate) === null || _a === void 0 ? void 0 : _a.required) && !this.isPDFReadOnlyMode) {
            modalLabel = { className: 'field-required' };
        }
        return this.renderTemplate('modalPreview', {
            previewText: this.getValueAsString(dataValue, { modalPreview: true }) || this.t('Click to set value'),
            messages: message && this.renderTemplate('message', message),
            labelInfo: modalLabel,
        });
    };
    Component.prototype.build = function (element) {
        element = element || this.element;
        this.empty(element);
        this.setContent(element, this.render());
        return this.attach(element);
    };
    Object.defineProperty(Component.prototype, "hasModalSaveButton", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.render = function (children, topLevel) {
        if (children === void 0) { children = "Unknown component: ".concat(this.component.type); }
        if (topLevel === void 0) { topLevel = false; }
        var isVisible = this.visible;
        this.rendered = true;
        if (!this.builderMode && !this.previewMode && this.component.modalEdit) {
            return ComponentModal_1.default.render(this, {
                visible: isVisible,
                showSaveButton: this.hasModalSaveButton,
                id: this.id,
                classes: this.className,
                styles: this.customStyle,
                children: children
            }, topLevel);
        }
        else {
            return this.renderTemplate('component', {
                visible: isVisible,
                id: this.id,
                classes: this.className,
                styles: this.customStyle,
                children: children
            }, topLevel);
        }
    };
    Component.prototype.attachTooltips = function (toolTipsRefs) {
        var _this = this;
        toolTipsRefs === null || toolTipsRefs === void 0 ? void 0 : toolTipsRefs.forEach(function (tooltip, index) {
            if (tooltip) {
                var tooltipAttribute = tooltip.getAttribute('data-tooltip');
                var tooltipDataTitle = tooltip.getAttribute('data-title');
                var tooltipText = _this.interpolate(tooltipDataTitle || tooltipAttribute)
                    .replace(/(?:\r\n|\r|\n)/g, '<br />');
                _this.tooltips[index] = (0, tippy_js_1.default)(tooltip, {
                    allowHTML: true,
                    trigger: 'mouseenter click focus',
                    placement: 'right',
                    zIndex: 10000,
                    interactive: true,
                    content: _this.t(_this.sanitize(tooltipText), { _userInput: true }),
                });
            }
        });
    };
    Component.prototype.createComponentModal = function (element, modalShouldBeOpened, currentValue) {
        return new ComponentModal_1.default(this, element, modalShouldBeOpened, currentValue);
    };
    Component.prototype.attach = function (element) {
        if (!this.builderMode && !this.previewMode && this.component.modalEdit) {
            var modalShouldBeOpened = this.componentModal ? this.componentModal.isOpened : false;
            var currentValue = modalShouldBeOpened ? this.componentModal.currentValue : this.dataValue;
            var openModalTemplate = this.componentModal && modalShouldBeOpened
                ? this.componentModal.openModalTemplate
                : null;
            this.componentModal = this.createComponentModal(element, modalShouldBeOpened, currentValue);
            this.setOpenModalElement(openModalTemplate);
        }
        this.attached = true;
        this.setElement(element);
        element.component = this;
        // If this already has an id, get it from the dom. If SSR, it could be different from the initiated id.
        if (this.element.id) {
            this.id = this.element.id;
            this.component.id = this.id;
        }
        this.loadRefs(element, {
            messageContainer: 'single',
            tooltip: 'multiple'
        });
        this.attachTooltips(this.refs.tooltip);
        // Attach logic.
        this.attachLogic();
        this.autofocus();
        // Allow global attach.
        this.hook('attachComponent', element, this);
        // Allow attach per component type.
        var type = this.component.type;
        if (type) {
            this.hook("attach".concat(type.charAt(0).toUpperCase() + type.substring(1, type.length)), element, this);
        }
        this.restoreFocus();
        this.addons.forEach(function (addon) { return addon.attach(element); });
        return Promise.resolve();
    };
    Component.prototype.restoreFocus = function () {
        var _a, _b, _c;
        var isFocused = ((_b = (_a = this.root) === null || _a === void 0 ? void 0 : _a.focusedComponent) === null || _b === void 0 ? void 0 : _b.path) === this.path;
        if (isFocused) {
            this.loadRefs(this.element, { input: 'multiple' });
            this.focus((_c = this.root.currentSelection) === null || _c === void 0 ? void 0 : _c.index);
            this.restoreCaretPosition();
        }
    };
    Component.prototype.addShortcut = function (element, shortcut) {
        // Avoid infinite recursion.
        if (!element || !this.root || (this.root === this)) {
            return;
        }
        if (!shortcut) {
            shortcut = this.component.shortcut;
        }
        this.root.addShortcut(element, shortcut);
    };
    Component.prototype.removeShortcut = function (element, shortcut) {
        // Avoid infinite recursion.
        if (!element || (this.root === this)) {
            return;
        }
        if (!shortcut) {
            shortcut = this.component.shortcut;
        }
        this.root.removeShortcut(element, shortcut);
    };
    /**
     * Remove all event handlers.
     */
    Component.prototype.detach = function () {
        // First iterate through each ref and delete the component so there are no dangling component references.
        lodash_1.default.each(this.refs, function (ref) {
            if (typeof ref === NodeList) {
                ref.forEach(function (elem) {
                    delete elem.component;
                });
            }
            else if (ref) {
                delete ref.component;
            }
        });
        this.refs = {};
        this.removeEventListeners();
        this.detachLogic();
        if (this.tooltip) {
            this.tooltip.destroy();
        }
    };
    Component.prototype.checkRefresh = function (refreshData, changed, flags) {
        var changePath = lodash_1.default.get(changed, 'instance.path', false);
        // Don't let components change themselves.
        if (changePath && this.path === changePath) {
            return;
        }
        if (refreshData === 'data') {
            this.refresh(this.data, changed, flags);
        }
        else if ((changePath && (0, utils_1.getComponentPath)(changed.instance) === refreshData) && changed && changed.instance &&
            // Make sure the changed component is not in a different "context". Solves issues where refreshOn being set
            // in fields inside EditGrids could alter their state from other rows (which is bad).
            this.inContext(changed.instance)) {
            this.refresh(changed.value, changed, flags);
        }
    };
    Component.prototype.checkRefreshOn = function (changes, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        changes = changes || [];
        if (flags.noRefresh) {
            return;
        }
        if (!changes.length && flags.changed) {
            changes = [flags.changed];
        }
        var refreshOn = flags.fromBlur ? this.component.refreshOnBlur : this.component.refreshOn || this.component.redrawOn;
        // If they wish to refresh on a value, then add that here.
        if (refreshOn) {
            if (Array.isArray(refreshOn)) {
                refreshOn.forEach(function (refreshData) { return changes.forEach(function (changed) { return _this.checkRefresh(refreshData, changed, flags); }); });
            }
            else {
                changes.forEach(function (changed) { return _this.checkRefresh(refreshOn, changed, flags); });
            }
        }
    };
    /**
     * Refreshes the component with a new value.
     *
     * @param value
     */
    Component.prototype.refresh = function (value) {
        if (this.hasOwnProperty('refreshOnValue')) {
            this.refreshOnChanged = !lodash_1.default.isEqual(value, this.refreshOnValue);
        }
        else {
            this.refreshOnChanged = true;
        }
        this.refreshOnValue = (0, utils_1.fastCloneDeep)(value);
        if (this.refreshOnChanged) {
            if (this.component.clearOnRefresh) {
                this.setValue(null);
            }
            this.triggerRedraw();
        }
    };
    /**
     * Checks to see if a separate component is in the "context" of this component. This is determined by first checking
     * if they share the same "data" object. It will then walk up the parent tree and compare its parents data objects
     * with the components data and returns true if they are in the same context.
     *
     * Different rows of the same EditGrid, for example, are in different contexts.
     *
     * @param component
     */
    Component.prototype.inContext = function (component) {
        if (component.data === this.data) {
            return true;
        }
        var parent = this.parent;
        while (parent) {
            if (parent.data === component.data) {
                return true;
            }
            parent = parent.parent;
        }
        return false;
    };
    Object.defineProperty(Component.prototype, "viewOnly", {
        get: function () {
            return this.options.readOnly && this.options.viewAsHtml;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.setElement = function (element) {
        if (this.element) {
            delete this.element.component;
            delete this.element;
        }
        this.element = element;
    };
    Component.prototype.createViewOnlyElement = function () {
        this.setElement(this.ce('dl', {
            id: this.id
        }));
        if (this.element) {
            // Ensure you can get the component info from the element.
            this.element.component = this;
        }
        return this.element;
    };
    Object.defineProperty(Component.prototype, "defaultViewOnlyValue", {
        get: function () {
            return '-';
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Uses the widget to determine the output string.
     *
     * @param value
     * @return {*}
     */
    Component.prototype.getWidgetValueAsString = function (value, options) {
        var _this = this;
        var noInputWidget = !this.refs.input || !this.refs.input[0] || !this.refs.input[0].widget;
        if (!value || noInputWidget) {
            if (!this.widget || !value) {
                return value;
            }
            else {
                return this.widget.getValueAsString(value);
            }
        }
        if (Array.isArray(value)) {
            var values_1 = [];
            value.forEach(function (val, index) {
                var widget = _this.refs.input[index] && _this.refs.input[index].widget;
                if (widget) {
                    values_1.push(widget.getValueAsString(val, options));
                }
            });
            return values_1;
        }
        var widget = this.refs.input[0].widget;
        return widget.getValueAsString(value, options);
    };
    Component.prototype.getValueAsString = function (value, options) {
        if (!value) {
            return '';
        }
        value = this.getWidgetValueAsString(value, options);
        if (Array.isArray(value)) {
            return value.join(', ');
        }
        if (lodash_1.default.isPlainObject(value)) {
            return JSON.stringify(value);
        }
        if (value === null || value === undefined) {
            return '';
        }
        var stringValue = value.toString();
        return this.sanitize(stringValue);
    };
    Component.prototype.getView = function (value, options) {
        if (this.component.protected) {
            return '--- PROTECTED ---';
        }
        return this.getValueAsString(value, options);
    };
    Component.prototype.updateItems = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this.restoreValue();
        this.onChange.apply(this, args);
    };
    /**
     * @param {*} data
     * @param {boolean} [forceUseValue=false] - if true, return 'value' property of the data
     * @return {*}
     */
    Component.prototype.itemValue = function (data, forceUseValue) {
        if (forceUseValue === void 0) { forceUseValue = false; }
        if (lodash_1.default.isObject(data) && !lodash_1.default.isArray(data)) {
            if (this.valueProperty) {
                return lodash_1.default.get(data, this.valueProperty);
            }
            if (forceUseValue) {
                return data.value;
            }
        }
        return data;
    };
    Component.prototype.itemValueForHTMLMode = function (value) {
        var _this = this;
        if (Array.isArray(value)) {
            var values = value.map(function (item) { return Array.isArray(item) ? _this.itemValueForHTMLMode(item) : _this.itemValue(item); });
            return values.join(', ');
        }
        return this.itemValue(value);
    };
    Component.prototype.createModal = function (element, attr, confirm) {
        var _this = this;
        var dialog = this.ce('div', attr || {});
        this.setContent(dialog, this.renderTemplate('dialog'));
        // Add refs to dialog, not "this".
        dialog.refs = {};
        this.loadRefs.call(dialog, dialog, {
            dialogOverlay: 'single',
            dialogContents: 'single',
            dialogClose: 'single',
        });
        dialog.refs.dialogContents.appendChild(element);
        document.body.appendChild(dialog);
        document.body.classList.add('modal-open');
        dialog.close = function () {
            document.body.classList.remove('modal-open');
            dialog.dispatchEvent(new CustomEvent('close'));
        };
        this.addEventListener(dialog, 'close', function () { return _this.removeChildFrom(dialog, document.body); });
        var close = function (event) {
            event.preventDefault();
            dialog.close();
        };
        var handleCloseClick = function (e) {
            if (confirm) {
                confirm().then(function () { return close(e); })
                    .catch(function () { });
            }
            else {
                close(e);
            }
        };
        this.addEventListener(dialog.refs.dialogOverlay, 'click', handleCloseClick);
        this.addEventListener(dialog.refs.dialogClose, 'click', handleCloseClick);
        return dialog;
    };
    Object.defineProperty(Component.prototype, "optimizeRedraw", {
        get: function () {
            if (this.options.optimizeRedraw && this.element && !this.visible) {
                this.addClass(this.element, 'formio-removed');
                return true;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "className", {
        /**
         * Retrieves the CSS class name of this component.
         * @returns {string} - The class name of this component.
         */
        get: function () {
            var className = this.hasInput ? "".concat(this.transform('class', 'form-group'), " has-feedback ") : '';
            className += "formio-component formio-component-".concat(this.component.type, " ");
            // TODO: find proper way to avoid overriding of default type-based component styles
            if (this.key && this.key !== 'form') {
                className += "formio-component-".concat(this.key, " ");
            }
            if (this.component.multiple) {
                className += 'formio-component-multiple ';
            }
            if (this.component.customClass) {
                className += this.component.customClass;
            }
            if (this.hasInput && this.component.validate && (0, utils_1.boolValue)(this.component.validate.required)) {
                className += ' required';
            }
            if (this.labelIsHidden()) {
                className += ' formio-component-label-hidden';
            }
            if (!this.visible) {
                className += ' formio-hidden';
            }
            return className;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "customStyle", {
        /**
         * Build the custom style from the layout values
         * @return {string} - The custom style
         */
        get: function () {
            var customCSS = '';
            lodash_1.default.each(this.component.style, function (value, key) {
                if (value !== '') {
                    customCSS += "".concat(key, ":").concat(value, ";");
                }
            });
            return customCSS;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component, "serverConditionSettings", {
        get: function () {
            return Component.conditionOperatorsSettings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "isMobile", {
        get: function () {
            return (0, ismobilejs_1.default)();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the outside wrapping element of this component.
     * @returns {HTMLElement}
     */
    Component.prototype.getElement = function () {
        return this.element;
    };
    /**
     * Create an evaluation context for all script executions and interpolations.
     *
     * @param additional
     * @return {*}
     */
    Component.prototype.evalContext = function (additional) {
        return _super.prototype.evalContext.call(this, Object.assign({
            component: this.component,
            row: this.data,
            rowIndex: this.rowIndex,
            data: this.rootValue,
            iconClass: this.iconClass.bind(this),
            // Bind the translate function to the data context of any interpolated string.
            // It is useful to translate strings in different scenarions (eg: custom edit grid templates, custom error messages etc.)
            // and desirable to be publicly available rather than calling the internal {instance.t} function in the template string.
            t: this.t.bind(this),
            submission: (this.root ? this.root._submission : {
                data: this.rootValue
            }),
            form: this.root ? this.root._form : {},
            options: this.options,
        }, additional));
    };
    /**
     * Sets the pristine flag for this component.
     *
     * @param pristine {boolean} - TRUE to make pristine, FALSE not pristine.
     */
    Component.prototype.setPristine = function (pristine) {
        this.pristine = pristine;
    };
    Object.defineProperty(Component.prototype, "isPristine", {
        get: function () {
            return this.pristine;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.setDirty = function (dirty) {
        this.dirty = dirty;
    };
    Object.defineProperty(Component.prototype, "isDirty", {
        get: function () {
            return this.dirty;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Removes a value out of the data array and rebuild the rows.
     * @param {number} index - The index of the data element to remove.
     */
    Component.prototype.removeValue = function (index) {
        this.splice(index);
        this.redraw();
        this.restoreValue();
        this.triggerRootChange();
    };
    Component.prototype.iconClass = function (name, spinning) {
        var iconset = this.options.iconset || Templates_1.default.current.defaultIconset || 'fa';
        return Templates_1.default.current.hasOwnProperty('iconClass')
            ? Templates_1.default.current.iconClass(iconset, name, spinning)
            : this.options.iconset === 'fa' ? Templates_1.default.defaultTemplates.iconClass(iconset, name, spinning) : name;
    };
    Component.prototype.size = function (size) {
        return Templates_1.default.current.hasOwnProperty('size')
            ? Templates_1.default.current.size(size)
            : size;
    };
    Object.defineProperty(Component.prototype, "name", {
        /**
         * The readible name for this component.
         * @returns {string} - The name of the component.
         */
        get: function () {
            return this.t(this.component.label || this.component.placeholder || this.key, { _userInput: true });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "errorLabel", {
        /**
         * Returns the error label for this component.
         * @return {*}
         */
        get: function () {
            return this.t(this.component.errorLabel
                || this.component.label
                || this.component.placeholder
                || this.key);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get the error message provided a certain type of error.
     * @param type
     * @return {*}
     */
    Component.prototype.errorMessage = function (type) {
        return (this.component.errors && this.component.errors[type]) ? this.component.errors[type] : type;
    };
    Component.prototype.setContent = function (element, content, forceSanitize, sanitizeOptions) {
        if (element instanceof HTMLElement) {
            element.innerHTML = this.sanitize(content, forceSanitize, sanitizeOptions);
            return true;
        }
        return false;
    };
    Component.prototype.restoreCaretPosition = function () {
        var _a, _b, _c;
        if ((_a = this.root) === null || _a === void 0 ? void 0 : _a.currentSelection) {
            if ((_b = this.refs.input) === null || _b === void 0 ? void 0 : _b.length) {
                var _d = this.root.currentSelection, selection = _d.selection, index = _d.index;
                var input = this.refs.input[index];
                var isInputRangeSelectable = function (i) { return /text|search|password|tel|url/i.test((i === null || i === void 0 ? void 0 : i.type) || ''); };
                if (input) {
                    if (isInputRangeSelectable(input)) {
                        input.setSelectionRange.apply(input, selection);
                    }
                }
                else {
                    input = this.refs.input[this.refs.input.length];
                    var lastCharacter = ((_c = input.value) === null || _c === void 0 ? void 0 : _c.length) || 0;
                    if (isInputRangeSelectable(input)) {
                        input.setSelectionRange(lastCharacter, lastCharacter);
                    }
                }
            }
        }
    };
    Component.prototype.redraw = function () {
        // Don't bother if we have not built yet.
        if (!this.element || !this.element.parentNode || this.optimizeRedraw) {
            // Return a non-resolving promise.
            return Promise.resolve();
        }
        this.detach();
        this.emit('redraw');
        // Since we are going to replace the element, we need to know it's position so we can find it in the parent's children.
        var parent = this.element.parentNode;
        var index = Array.prototype.indexOf.call(parent.children, this.element);
        this.element.outerHTML = this.sanitize(this.render());
        this.setElement(parent.children[index]);
        return this.attach(this.element);
    };
    Component.prototype.rebuild = function () {
        this.destroy();
        this.init();
        this.visible = this.conditionallyVisible(null, null);
        return this.redraw();
    };
    Component.prototype.removeEventListeners = function () {
        _super.prototype.removeEventListeners.call(this);
        this.tooltips.forEach(function (tooltip) { return tooltip.destroy(); });
        this.tooltips = [];
    };
    Component.prototype.hasClass = function (element, className) {
        if (!element) {
            return;
        }
        return _super.prototype.hasClass.call(this, element, this.transform('class', className));
    };
    Component.prototype.addClass = function (element, className) {
        if (!element) {
            return;
        }
        return _super.prototype.addClass.call(this, element, this.transform('class', className));
    };
    Component.prototype.removeClass = function (element, className) {
        if (!element) {
            return;
        }
        return _super.prototype.removeClass.call(this, element, this.transform('class', className));
    };
    /**
     * Determines if this component has a condition defined.
     *
     * @return {null}
     */
    Component.prototype.hasCondition = function () {
        if (this._hasCondition !== null) {
            return this._hasCondition;
        }
        this._hasCondition = FormioUtils.hasCondition(this.component);
        return this._hasCondition;
    };
    /**
     * Check if this component is conditionally visible.
     *
     * @param data
     * @return {boolean}
     */
    Component.prototype.conditionallyVisible = function (data, row) {
        data = data || this.rootValue;
        row = row || this.data;
        if (this.builderMode || this.previewMode || !this.hasCondition()) {
            return !this.component.hidden;
        }
        data = data || (this.root ? this.root.data : {});
        return this.checkCondition(row, data);
    };
    /**
     * Checks the condition of this component.
     *
     * TODO: Switch row and data parameters to be consistent with other methods.
     *
     * @param row - The row contextual data.
     * @param data - The global data object.
     * @return {boolean} - True if the condition applies to this component.
     */
    Component.prototype.checkCondition = function (row, data) {
        return FormioUtils.checkCondition(this.component, row || this.data, data || this.rootValue, this.root ? this.root._form : {}, this);
    };
    /**
     * Check for conditionals and hide/show the element based on those conditions.
     */
    Component.prototype.checkComponentConditions = function (data, flags, row) {
        data = data || this.rootValue;
        flags = flags || {};
        row = row || this.data;
        if (!this.builderMode & !this.previewMode && this.fieldLogic(data, row)) {
            this.redraw();
        }
        // Check advanced conditions
        var visible = this.conditionallyVisible(data, row);
        if (this.visible !== visible) {
            this.visible = visible;
        }
        return visible;
    };
    /**
     * Checks conditions for this component and any sub components.
     * @param args
     * @return {boolean}
     */
    Component.prototype.checkConditions = function (data, flags, row) {
        data = data || this.rootValue;
        flags = flags || {};
        row = row || this.data;
        return this.checkComponentConditions(data, flags, row);
    };
    Object.defineProperty(Component.prototype, "logic", {
        get: function () {
            return this.component.logic || [];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Check all triggers and apply necessary actions.
     *
     * @param data
     */
    Component.prototype.fieldLogic = function (data, row) {
        var _this = this;
        data = data || this.rootValue;
        row = row || this.data;
        var logics = this.logic;
        // If there aren't logic, don't go further.
        if (logics.length === 0) {
            return;
        }
        var newComponent = (0, utils_1.fastCloneDeep)(this.originalComponent);
        var changed = logics.reduce(function (changed, logic) {
            var result = FormioUtils.checkTrigger(newComponent, logic.trigger, row, data, _this.root ? _this.root._form : {}, _this);
            return (result ? _this.applyActions(newComponent, logic.actions, result, row, data) : false) || changed;
        }, false);
        // If component definition changed, replace and mark as changed.
        if (!lodash_1.default.isEqual(this.component, newComponent)) {
            this.component = newComponent;
            changed = true;
            var disabled = this.shouldDisabled;
            // Change disabled state if it has changed
            if (this.disabled !== disabled) {
                this.disabled = disabled;
            }
        }
        return changed;
    };
    Component.prototype.isIE = function () {
        if (typeof window === 'undefined') {
            return false;
        }
        var userAgent = window.navigator.userAgent;
        var msie = userAgent.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(userAgent.substring(msie + 5, userAgent.indexOf('.', msie)), 10);
        }
        var trident = userAgent.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            var rv = userAgent.indexOf('rv:');
            return parseInt(userAgent.substring(rv + 3, userAgent.indexOf('.', rv)), 10);
        }
        var edge = userAgent.indexOf('Edge/');
        if (edge > 0) {
            // IE 12 (aka Edge) => return version number
            return parseInt(userAgent.substring(edge + 5, userAgent.indexOf('.', edge)), 10);
        }
        // other browser
        return false;
    };
    Component.prototype.defineActionValue = function (action, argsObject) {
        return this.evaluate(action.value, argsObject, 'value');
    };
    Component.prototype.applyActions = function (newComponent, actions, result, row, data) {
        var _this = this;
        data = data || this.rootValue;
        row = row || this.data;
        return actions.reduce(function (changed, action) {
            switch (action.type) {
                case 'property': {
                    FormioUtils.setActionProperty(newComponent, action, result, row, data, _this);
                    var property = action.property.value;
                    if (!lodash_1.default.isEqual(lodash_1.default.get(_this.component, property), lodash_1.default.get(newComponent, property))) {
                        changed = true;
                    }
                    break;
                }
                case 'value': {
                    var oldValue = _this.getValue();
                    var newValue = _this.defineActionValue(action, {
                        value: lodash_1.default.clone(oldValue),
                        data: data,
                        row: row,
                        component: newComponent,
                        result: result,
                    });
                    if (!lodash_1.default.isEqual(oldValue, newValue) && !(_this.component.clearOnHide && !_this.visible)) {
                        _this.setValue(newValue);
                        if (_this.viewOnly) {
                            _this.dataValue = newValue;
                        }
                        changed = true;
                    }
                    break;
                }
                case 'mergeComponentSchema': {
                    var schema = _this.evaluate(action.schemaDefinition, {
                        value: lodash_1.default.clone(_this.getValue()),
                        data: data,
                        row: row,
                        component: newComponent,
                        result: result,
                    }, 'schema');
                    lodash_1.default.assign(newComponent, schema);
                    if (!lodash_1.default.isEqual(_this.component, newComponent)) {
                        changed = true;
                    }
                    break;
                }
                case 'customAction': {
                    var oldValue = _this.getValue();
                    var newValue = _this.evaluate(action.customAction, {
                        value: lodash_1.default.clone(oldValue),
                        data: data,
                        row: row,
                        input: oldValue,
                        component: newComponent,
                        result: result,
                    }, 'value');
                    if (!lodash_1.default.isEqual(oldValue, newValue) && !(_this.component.clearOnHide && !_this.visible)) {
                        _this.setValue(newValue);
                        if (_this.viewOnly) {
                            _this.dataValue = newValue;
                        }
                        changed = true;
                    }
                    break;
                }
            }
            return changed;
        }, false);
    };
    // Deprecated
    Component.prototype.addInputError = function (message, dirty, elements) {
        this.addMessages(message);
        this.setErrorClasses(elements, dirty, !!message);
    };
    // Deprecated
    Component.prototype.removeInputError = function (elements) {
        this.setErrorClasses(elements, true, false);
    };
    /**
     * Add a new input error to this element.
     *
     * @param message
     * @param dirty
     */
    Component.prototype.addMessages = function (messages) {
        var _this = this;
        if (!messages) {
            return;
        }
        // Standardize on array of objects for message.
        if (typeof messages === 'string') {
            messages = {
                messages: messages,
                level: 'error',
            };
        }
        if (!Array.isArray(messages)) {
            messages = [messages];
        }
        messages = lodash_1.default.uniqBy(messages, function (message) { return message.message; });
        if (this.refs.messageContainer) {
            this.setContent(this.refs.messageContainer, messages.map(function (message) {
                if (message.message && typeof message.message === 'string') {
                    message.message = message.message.replaceAll('<', '&lt;').replaceAll('>', '&gt;');
                }
                return _this.renderTemplate('message', message);
            }).join(''));
        }
    };
    Component.prototype.setErrorClasses = function (elements, dirty, hasErrors, hasMessages, element) {
        var _this = this;
        if (element === void 0) { element = this.element; }
        this.clearErrorClasses();
        elements.forEach(function (element) {
            _this.setElementInvalid(_this.performInputMapping(element), false);
        });
        this.setInputWidgetErrorClasses(elements, hasErrors);
        if (hasErrors) {
            // Add error classes
            elements.forEach(function (input) {
                _this.setElementInvalid(_this.performInputMapping(input), true);
            });
            if (dirty && this.options.highlightErrors) {
                this.addClass(element, this.options.componentErrorClass);
            }
            else {
                this.addClass(element, 'has-error');
            }
        }
        if (hasMessages) {
            this.addClass(element, 'has-message');
        }
    };
    Component.prototype.setElementInvalid = function (element, invalid) {
        if (!element)
            return;
        if (invalid) {
            this.addClass(element, 'is-invalid');
        }
        else {
            this.removeClass(element, 'is-invalid');
        }
        element.setAttribute('aria-invalid', invalid ? 'true' : 'false');
    };
    Component.prototype.clearOnHide = function () {
        // clearOnHide defaults to true for old forms (without the value set) so only trigger if the value is false.
        if (
        // if change happens inside EditGrid's row, it doesn't trigger change on the root level, so rootPristine will be true
        (!this.rootPristine || this.options.server || (0, utils_1.isInsideScopingComponent)(this)) &&
            this.component.clearOnHide !== false &&
            !this.options.readOnly &&
            !this.options.showHiddenFields) {
            if (!this.visible) {
                this.deleteValue();
            }
            else if (!this.hasValue() && this.shouldAddDefaultValue) {
                // If shown, ensure the default is set.
                this.setValue(this.defaultValue, {
                    noUpdateEvent: true
                });
            }
        }
    };
    Component.prototype.triggerRootChange = function () {
        var _a, _b;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.options.onChange) {
            (_a = this.options).onChange.apply(_a, args);
        }
        else if (this.root) {
            (_b = this.root).triggerChange.apply(_b, args);
        }
    };
    Component.prototype.onChange = function (flags, fromRoot) {
        flags = flags || {};
        if (flags.modified) {
            if (!flags.noPristineChangeOnModified) {
                this.pristine = false;
            }
            this.addClass(this.getElement(), 'formio-modified');
        }
        // If we are supposed to validate on blur, then don't trigger validation yet.
        if (this.component.validateOn === 'blur' && !this.errors.length) {
            flags.noValidate = true;
        }
        if (this.component.onChange) {
            this.evaluate(this.component.onChange, {
                flags: flags
            });
        }
        // Set the changed variable.
        var changed = {
            instance: this,
            component: this.component,
            value: this.dataValue,
            flags: flags
        };
        // Emit the change.
        this.emit('componentChange', changed);
        // Do not propogate the modified flag.
        var modified = false;
        if (flags.modified) {
            modified = true;
            delete flags.modified;
        }
        // Bubble this change up to the top.
        if (!fromRoot) {
            this.triggerRootChange(flags, changed, modified);
        }
        return changed;
    };
    Object.defineProperty(Component.prototype, "wysiwygDefault", {
        get: function () {
            return {
                quill: {
                    theme: 'snow',
                    placeholder: this.t(this.component.placeholder, { _userInput: true }),
                    modules: {
                        toolbar: [
                            // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
                            // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            // [{ 'font': [] }],
                            ['bold', 'italic', 'underline'],
                            // [{ 'color': [] }, { 'background': [] }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            // ['blockquote', 'code-block'],
                            // ['link', 'image', 'video', 'formula', 'source']
                        ]
                    }
                },
                ace: {
                    theme: 'ace/theme/xcode',
                    maxLines: 12,
                    minLines: 12,
                    tabSize: 2,
                    mode: 'ace/mode/javascript',
                    placeholder: this.t(this.component.placeholder, { _userInput: true })
                },
                ckeditor: {
                    image: {
                        toolbar: [
                            'imageTextAlternative',
                            '|',
                            'imageStyle:full',
                            'imageStyle:alignLeft',
                            'imageStyle:alignCenter',
                            'imageStyle:alignRight'
                        ],
                        styles: [
                            'full',
                            'alignLeft',
                            'alignCenter',
                            'alignRight'
                        ]
                    },
                    extraPlugins: []
                },
                default: {}
            };
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.addCKE = function (element, settings, onChange) {
        settings = lodash_1.default.isEmpty(settings) ? {} : settings;
        settings.base64Upload = this.component.isUploadEnabled ? false : true;
        settings.mediaEmbed = { previewsInData: true };
        settings = lodash_1.default.merge(this.wysiwygDefault.ckeditor, lodash_1.default.get(this.options, 'editors.ckeditor.settings', {}), settings);
        if (this.component.isUploadEnabled) {
            settings.extraPlugins.push((0, uploadAdapter_1.getFormioUploadAdapterPlugin)(this.fileService, this));
        }
        return Formio_1.Formio.requireLibrary('ckeditor', isIEBrowser ? 'CKEDITOR' : 'ClassicEditor', lodash_1.default.get(this.options, 'editors.ckeditor.src', "".concat(Formio_1.Formio.cdn.ckeditor, "/ckeditor.js")), true)
            .then(function () {
            if (!element.parentNode) {
                return Promise.reject();
            }
            if (isIEBrowser) {
                var editor_1 = CKEDITOR.replace(element);
                editor_1.on('change', function () { return onChange(editor_1.getData()); });
                return Promise.resolve(editor_1);
            }
            else {
                return ClassicEditor.create(element, settings).then(function (editor) {
                    editor.model.document.on('change', function () { return onChange(editor.data.get()); });
                    return editor;
                });
            }
        });
    };
    Component.prototype.addQuill = function (element, settings, onChange) {
        var _this = this;
        settings = lodash_1.default.isEmpty(settings) ? this.wysiwygDefault.quill : settings;
        settings = lodash_1.default.merge(this.wysiwygDefault.quill, lodash_1.default.get(this.options, 'editors.quill.settings', {}), settings);
        settings = __assign(__assign({}, settings), { modules: __assign({ table: true }, settings.modules) });
        // Lazy load the quill css.
        Formio_1.Formio.requireLibrary("quill-css-".concat(settings.theme), 'Quill', [
            { type: 'styles', src: "".concat(Formio_1.Formio.cdn.quill, "/quill.").concat(settings.theme, ".css") }
        ], true);
        // Lazy load the quill library.
        return Formio_1.Formio.requireLibrary('quill', 'Quill', lodash_1.default.get(this.options, 'editors.quill.src', "".concat(Formio_1.Formio.cdn.quill, "/quill.min.js")), true)
            .then(function () {
            return Formio_1.Formio.requireLibrary('quill-table', 'Quill', "".concat(Formio_1.Formio.cdn.baseUrl, "/quill/quill-table.js"), true)
                .then(function () {
                if (!element.parentNode) {
                    return Promise.reject();
                }
                _this.quill = new Quill(element, isIEBrowser ? __assign(__assign({}, settings), { modules: {} }) : settings);
                /** This block of code adds the [source] capabilities.  See https://codepen.io/anon/pen/ZyEjrQ **/
                var txtArea = document.createElement('textarea');
                txtArea.setAttribute('class', 'quill-source-code');
                _this.quill.addContainer('ql-custom').appendChild(txtArea);
                var qlSource = element.parentNode.querySelector('.ql-source');
                if (qlSource) {
                    _this.addEventListener(qlSource, 'click', function (event) {
                        event.preventDefault();
                        if (txtArea.style.display === 'inherit') {
                            _this.quill.setContents(_this.quill.clipboard.convert({ html: txtArea.value }));
                        }
                        txtArea.style.display = (txtArea.style.display === 'none') ? 'inherit' : 'none';
                    });
                }
                /** END CODEBLOCK **/
                // Make sure to select cursor when they click on the element.
                _this.addEventListener(element, 'click', function () { return _this.quill.focus(); });
                // Allows users to skip toolbar items when tabbing though form
                var elm = document.querySelectorAll('.ql-formats > button');
                for (var i = 0; i < elm.length; i++) {
                    elm[i].setAttribute('tabindex', '-1');
                }
                _this.quill.on('text-change', function () {
                    txtArea.value = _this.quill.root.innerHTML;
                    onChange(txtArea);
                });
                return _this.quill;
            });
        });
    };
    Object.defineProperty(Component.prototype, "shouldSanitizeValue", {
        get: function () {
            var _a;
            // Sanitize value if sanitizing for thw whole content is turned off
            return (((_a = this.options) === null || _a === void 0 ? void 0 : _a.sanitize) !== false);
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.addAce = function (element, settings, onChange) {
        if (!settings || (settings.theme === 'snow')) {
            var mode = settings ? settings.mode : '';
            settings = {};
            if (mode) {
                settings.mode = mode;
            }
        }
        settings = lodash_1.default.merge(this.wysiwygDefault.ace, lodash_1.default.get(this.options, 'editors.ace.settings', {}), settings || {});
        return Formio_1.Formio.requireLibrary('ace', 'ace', lodash_1.default.get(this.options, 'editors.ace.src', "".concat(Formio_1.Formio.cdn.ace, "/ace.js")), true)
            .then(function (editor) {
            editor = editor.edit(element);
            editor.removeAllListeners('change');
            editor.setOptions(settings);
            editor.getSession().setMode(settings.mode);
            editor.on('change', function () { return onChange(editor.getValue()); });
            if (settings.isUseWorkerDisabled) {
                editor.session.setUseWorker(false);
            }
            return editor;
        });
    };
    Object.defineProperty(Component.prototype, "tree", {
        get: function () {
            return this.component.tree || false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "emptyValue", {
        /**
         * The empty value for this component.
         *
         * @return {null}
         */
        get: function () {
            return null;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns if this component has a value set.
     *
     */
    Component.prototype.hasValue = function (data) {
        return !lodash_1.default.isUndefined(lodash_1.default.get(data || this.data, this.key));
    };
    Object.defineProperty(Component.prototype, "rootValue", {
        /**
         * Get the data value at the root level.
         *
         * @return {*}
         */
        get: function () {
            return this.root ? this.root.data : this.data;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "rootPristine", {
        get: function () {
            return lodash_1.default.get(this, 'root.pristine', false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "dataValue", {
        /**
         * Get the static value of this component.
         * @return {*}
         */
        get: function () {
            if (!this.key ||
                (!this.visible && this.component.clearOnHide && !this.rootPristine)) {
                return this.emptyValue;
            }
            if (!this.hasValue() && this.shouldAddDefaultValue) {
                var empty = this.component.multiple ? [] : this.emptyValue;
                if (!this.rootPristine) {
                    this.dataValue = empty;
                }
                return empty;
            }
            return lodash_1.default.get(this._data, this.key);
        },
        /**
         * Sets the static value of this component.
         *
         * @param value
         */
        set: function (value) {
            if (!this.allowData ||
                !this.key ||
                (!this.visible && this.component.clearOnHide && !this.rootPristine)) {
                return;
            }
            if ((value !== null) && (value !== undefined)) {
                value = this.hook('setDataValue', value, this.key, this._data);
            }
            if ((value === null) || (value === undefined)) {
                this.unset();
                return;
            }
            lodash_1.default.set(this._data, this.key, value);
            return;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Splice a value from the dataValue.
     *
     * @param index
     */
    Component.prototype.splice = function (index, flags) {
        if (flags === void 0) { flags = {}; }
        if (this.hasValue()) {
            var dataValue = this.dataValue || [];
            if (lodash_1.default.isArray(dataValue) && dataValue.hasOwnProperty(index)) {
                dataValue.splice(index, 1);
                this.dataValue = dataValue;
                this.triggerChange(flags);
            }
        }
    };
    Component.prototype.unset = function () {
        lodash_1.default.unset(this._data, this.key);
    };
    /**
     * Deletes the value of the component.
     */
    Component.prototype.deleteValue = function () {
        this.setValue(null, {
            noUpdateEvent: true,
            noDefault: true
        });
        this.unset();
    };
    Component.prototype.getCustomDefaultValue = function (defaultValue) {
        if (this.component.customDefaultValue && !this.options.preview) {
            defaultValue = this.evaluate(this.component.customDefaultValue, { value: '' }, 'value');
        }
        return defaultValue;
    };
    Object.defineProperty(Component.prototype, "shouldAddDefaultValue", {
        get: function () {
            return !this.options.noDefaults || (this.component.defaultValue && !this.isEmpty(this.component.defaultValue)) || this.component.customDefaultValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Component.prototype, "defaultValue", {
        get: function () {
            var _this = this;
            var defaultValue = this.emptyValue;
            if (this.component.defaultValue) {
                defaultValue = this.component.defaultValue;
            }
            defaultValue = this.getCustomDefaultValue(defaultValue);
            var checkMask = function (value) {
                if (typeof value === 'string') {
                    var placeholderChar = _this.placeholderChar;
                    value = (0, vanilla_text_mask_1.conformToMask)(value, _this.defaultMask, { placeholderChar: placeholderChar }).conformedValue;
                    if (!FormioUtils.matchInputMask(value, _this.defaultMask)) {
                        value = '';
                    }
                }
                else {
                    value = '';
                }
                return value;
            };
            if (this.defaultMask) {
                if (Array.isArray(defaultValue)) {
                    defaultValue = defaultValue.map(checkMask);
                }
                else {
                    defaultValue = checkMask(defaultValue);
                }
            }
            // Clone so that it creates a new instance.
            return lodash_1.default.cloneDeep(defaultValue);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get the input value of this component.
     *
     * @return {*}
     */
    Component.prototype.getValue = function () {
        if (!this.hasInput || this.viewOnly || !this.refs.input || !this.refs.input.length) {
            return this.dataValue;
        }
        var values = [];
        for (var i in this.refs.input) {
            if (this.refs.input.hasOwnProperty(i)) {
                if (!this.component.multiple) {
                    return this.getValueAt(i);
                }
                values.push(this.getValueAt(i));
            }
        }
        if (values.length === 0 && !this.component.multiple) {
            return '';
        }
        return values;
    };
    /**
     * Get the value at a specific index.
     *
     * @param index
     * @returns {*}
     */
    Component.prototype.getValueAt = function (index) {
        var input = this.performInputMapping(this.refs.input[index]);
        return input ? input.value : undefined;
    };
    /**
     * Set the value of this component.
     *
     * @param value
     * @param flags
     *
     * @return {boolean} - If the value changed.
     */
    Component.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = this.updateValue(value, flags);
        value = this.dataValue;
        if (!this.hasInput) {
            return changed;
        }
        var isArray = Array.isArray(value);
        var valueInput = this.refs.fileLink || this.refs.input;
        if (isArray &&
            Array.isArray(this.defaultValue) &&
            this.refs.hasOwnProperty('input') &&
            valueInput &&
            (valueInput.length !== value.length) &&
            this.visible) {
            this.redraw();
        }
        if (this.isHtmlRenderMode() && flags && flags.fromSubmission && changed) {
            this.redraw();
            return changed;
        }
        for (var i in this.refs.input) {
            if (this.refs.input.hasOwnProperty(i)) {
                this.setValueAt(i, isArray ? value[i] : value, flags);
            }
        }
        return changed;
    };
    /**
     * Set the value at a specific index.
     *
     * @param index
     * @param value
     */
    Component.prototype.setValueAt = function (index, value, flags) {
        if (flags === void 0) { flags = {}; }
        if (!flags.noDefault && (value === null || value === undefined) && !this.component.multiple) {
            value = this.defaultValue;
        }
        var input = this.performInputMapping(this.refs.input[index]);
        var valueMaskInput = this.refs.valueMaskInput;
        if (valueMaskInput === null || valueMaskInput === void 0 ? void 0 : valueMaskInput.mask) {
            valueMaskInput.mask.textMaskInputElement.update(value);
        }
        if (input.mask) {
            input.mask.textMaskInputElement.update(value);
        }
        else if (input.widget && input.widget.setValue) {
            input.widget.setValue(value);
        }
        else {
            input.value = value;
        }
    };
    Object.defineProperty(Component.prototype, "hasSetValue", {
        get: function () {
            return this.hasValue() && !this.isEmpty(this.dataValue);
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.setDefaultValue = function () {
        if (this.defaultValue && this.shouldAddDefaultValue) {
            var defaultValue = (this.component.multiple && !this.dataValue.length) ? [] : this.defaultValue;
            this.setValue(defaultValue, {
                noUpdateEvent: true
            });
        }
    };
    /**
     * Restore the value of a control.
     */
    Component.prototype.restoreValue = function () {
        if (this.hasSetValue) {
            this.setValue(this.dataValue, {
                noUpdateEvent: true
            });
        }
        else {
            this.setDefaultValue();
        }
    };
    /**
     * Normalize values coming into updateValue.
     *
     * @param value
     * @return {*}
     */
    Component.prototype.normalizeValue = function (value) {
        if (this.component.multiple && !Array.isArray(value)) {
            value = value ? [value] : [];
        }
        return value;
    };
    /**
     * Update a value of this component.
     *
     * @param flags
     */
    Component.prototype.updateComponentValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var newValue = (!flags.resetValue && (value === undefined || value === null)) ? this.getValue() : value;
        newValue = this.normalizeValue(newValue, flags);
        var oldValue = this.dataValue;
        var changed = ((newValue !== undefined) ? this.hasChanged(newValue, oldValue) : false);
        if (changed) {
            this.dataValue = newValue;
            changed = this.dataValue !== oldValue;
            this.updateOnChange(flags, changed);
        }
        if (this.componentModal && flags && flags.fromSubmission) {
            this.componentModal.setValue(value);
        }
        return changed;
    };
    /**
     * Updates the value of this component plus all sub-components.
     *
     * @param args
     * @return {boolean}
     */
    Component.prototype.updateValue = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return this.updateComponentValue.apply(this, args);
    };
    Component.prototype.getIcon = function (name, content, styles, ref) {
        if (ref === void 0) { ref = 'icon'; }
        return this.renderTemplate('icon', {
            className: this.iconClass(name),
            ref: ref,
            styles: styles,
            content: content
        });
    };
    /**
     * Resets the value of this component.
     */
    Component.prototype.resetValue = function () {
        this.unset();
        this.setValue(this.emptyValue, {
            noUpdateEvent: true,
            noValidate: true,
            resetValue: true
        });
    };
    /**
     * Determine if the value of this component has changed.
     *
     * @param newValue
     * @param oldValue
     * @return {boolean}
     */
    Component.prototype.hasChanged = function (newValue, oldValue) {
        if (((newValue === undefined) || (newValue === null)) &&
            ((oldValue === undefined) || (oldValue === null) || this.isEmpty(oldValue))) {
            return false;
        }
        // If we do not have a value and are getting set to anything other than undefined or null, then we changed.
        if (newValue !== undefined &&
            newValue !== null &&
            this.allowData &&
            !this.hasValue()) {
            return true;
        }
        return !lodash_1.default.isEqual(newValue, oldValue);
    };
    /**
     * Update the value on change.
     *
     * @param flags
     */
    Component.prototype.updateOnChange = function (flags, changed) {
        if (flags === void 0) { flags = {}; }
        if (changed === void 0) { changed = false; }
        if (!flags.noUpdateEvent && changed) {
            this.triggerChange(flags);
            return true;
        }
        return false;
    };
    /**
     * Perform a calculated value operation.
     *
     * @param data - The global data object.
     *
     * @return {boolean} - If the value changed during calculation.
     */
    Component.prototype.convertNumberOrBoolToString = function (value) {
        if (typeof value === 'number' || typeof value === 'boolean') {
            return value.toString();
        }
        return value;
    };
    Component.prototype.doValueCalculation = function (dataValue, data, row) {
        var _a;
        return this.evaluate(this.component.calculateValue, {
            value: dataValue,
            data: data,
            row: row || this.data,
            submission: ((_a = this.root) === null || _a === void 0 ? void 0 : _a._submission) || {
                data: this.rootValue
            }
        }, 'value');
    };
    /* eslint-disable max-statements */
    Component.prototype.calculateComponentValue = function (data, flags, row) {
        // Skip value calculation for the component if we don't have entire form data set
        if (lodash_1.default.isUndefined(lodash_1.default.get(this, 'root.data'))) {
            return false;
        }
        // If no calculated value or
        // hidden and set to clearOnHide (Don't calculate a value for a hidden field set to clear when hidden)
        var clearOnHide = this.component.clearOnHide;
        var shouldBeCleared = !this.visible && clearOnHide;
        var allowOverride = lodash_1.default.get(this.component, 'allowCalculateOverride', false);
        // Handle all cases when calculated values should not fire.
        if ((this.options.readOnly && !this.options.pdf && !this.component.calculateValue) ||
            !(this.component.calculateValue || this.component.calculateValueVariable) ||
            shouldBeCleared ||
            (this.options.server && !this.component.calculateServer) ||
            (flags.dataSourceInitialLoading && allowOverride)) {
            return false;
        }
        var dataValue = this.dataValue;
        // Calculate the new value.
        var calculatedValue = this.doValueCalculation(dataValue, data, row, flags);
        if (this.options.readOnly && dataValue && !calculatedValue) {
            return false;
        }
        if (lodash_1.default.isNil(calculatedValue)) {
            calculatedValue = this.emptyValue;
        }
        var changed = !lodash_1.default.isEqual(dataValue, calculatedValue);
        // Do not override calculations on server if they have calculateServer set.
        if (allowOverride) {
            // The value is considered locked if it is not empty and comes from a submission value.
            var fromSubmission = (flags.fromSubmission && this.component.persistent === true);
            if (this.isEmpty(dataValue)) {
                // Reset the calculation lock if ever the data is cleared.
                this.calculationLocked = false;
            }
            else if (this.calculationLocked || fromSubmission) {
                this.calculationLocked = true;
                return false;
            }
            var firstPass = (this.calculatedValue === undefined);
            if (firstPass) {
                this.calculatedValue = null;
            }
            var newCalculatedValue = this.normalizeValue(this.convertNumberOrBoolToString(calculatedValue));
            var previousCalculatedValue = this.normalizeValue(this.convertNumberOrBoolToString(this.calculatedValue));
            var normalizedDataValue = this.normalizeValue(this.convertNumberOrBoolToString(dataValue));
            var calculationChanged = !lodash_1.default.isEqual(previousCalculatedValue, newCalculatedValue);
            var previousChanged = !lodash_1.default.isEqual(normalizedDataValue, previousCalculatedValue);
            if (calculationChanged && previousChanged && !firstPass) {
                return false;
            }
            // Check to ensure that the calculated value is different than the previously calculated value.
            if (previousCalculatedValue && previousChanged && !calculationChanged) {
                return false;
            }
            if (flags.isReordered || !calculationChanged) {
                return false;
            }
            if (fromSubmission) {
                // If we set value from submission and it differs from calculated one, set the calculated value to prevent overriding dataValue in the next pass
                this.calculatedValue = calculatedValue;
                return false;
            }
            // If this is the firstPass, and the dataValue is different than to the calculatedValue.
            if (firstPass && !this.isEmpty(dataValue) && changed && calculationChanged) {
                // Return that we have a change so it will perform another pass.
                return true;
            }
        }
        this.calculatedValue = calculatedValue;
        if (changed) {
            if (!flags.noPristineChangeOnModified) {
                this.pristine = false;
            }
            flags.triggeredComponentId = this.id;
            return this.setValue(calculatedValue, flags);
        }
        return false;
    };
    /* eslint-enable max-statements */
    /**
     * Performs calculations in this component plus any child components.
     *
     * @param args
     * @return {boolean}
     */
    Component.prototype.calculateValue = function (data, flags, row) {
        data = data || this.rootValue;
        flags = flags || {};
        row = row || this.data;
        return this.calculateComponentValue(data, flags, row);
    };
    Object.defineProperty(Component.prototype, "label", {
        /**
         * Get this component's label text.
         *
         */
        get: function () {
            return this.component.label;
        },
        /**
         * Set this component's label text and render it.
         *
         * @param value - The new label text.
         */
        set: function (value) {
            this.component.label = value;
            if (this.labelElement) {
                this.labelElement.innerText = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get FormioForm element at the root of this component tree.
     *
     */
    Component.prototype.getRoot = function () {
        return this.root;
    };
    /**
     * Returns the invalid message, or empty string if the component is valid.
     *
     * @param data
     * @param dirty
     * @return {*}
     */
    Component.prototype.invalidMessage = function (data, dirty, ignoreCondition, row) {
        if (!ignoreCondition && !this.checkCondition(row, data)) {
            return '';
        }
        // See if this is forced invalid.
        if (this.invalid) {
            return this.invalid;
        }
        // No need to check for errors if there is no input or if it is pristine.
        if (!this.hasInput || (!dirty && this.pristine)) {
            return '';
        }
        return lodash_1.default.map(Validator_1.default.checkComponent(this, data), 'message').join('\n\n');
    };
    /**
     * Returns if the component is valid or not.
     *
     * @param data
     * @param dirty
     * @return {boolean}
     */
    Component.prototype.isValid = function (data, dirty) {
        return !this.invalidMessage(data, dirty);
    };
    Component.prototype.setComponentValidity = function (messages, dirty, silentCheck) {
        var hasErrors = !!messages.filter(function (message) { return message.level === 'error' && !message.fromServer; }).length;
        if (messages.length && (!silentCheck || this.error) && (!this.isEmpty(this.defaultValue) || dirty || !this.pristine)) {
            this.setCustomValidity(messages, dirty);
        }
        else if (!silentCheck) {
            this.setCustomValidity('');
        }
        return !hasErrors;
    };
    /**
     * Checks the validity of this component and sets the error message if it is invalid.
     *
     * @param data
     * @param dirty
     * @param row
     * @return {boolean}
     */
    Component.prototype.checkComponentValidity = function (data, dirty, row, options) {
        var _this = this;
        var _a;
        if (options === void 0) { options = {}; }
        data = data || this.rootValue;
        row = row || this.data;
        var _b = options.async, async = _b === void 0 ? false : _b, _c = options.silentCheck, silentCheck = _c === void 0 ? false : _c;
        if (this.shouldSkipValidation(data, dirty, row)) {
            this.setCustomValidity('');
            return async ? Promise.resolve(true) : true;
        }
        var check = Validator_1.default.checkComponent(this, data, row, true, async);
        var validations = check;
        if ((_a = this.serverErrors) === null || _a === void 0 ? void 0 : _a.length) {
            validations = check.concat(this.serverErrors);
        }
        return async ?
            validations.then(function (messages) { return _this.setComponentValidity(messages, dirty, silentCheck); }) :
            this.setComponentValidity(validations, dirty, silentCheck);
    };
    Component.prototype.checkValidity = function (data, dirty, row, silentCheck) {
        data = data || this.rootValue;
        row = row || this.data;
        var isValid = this.checkComponentValidity(data, dirty, row, { silentCheck: silentCheck });
        this.checkModal();
        return isValid;
    };
    Component.prototype.checkAsyncValidity = function (data, dirty, row, silentCheck) {
        return Promise.resolve(this.checkComponentValidity(data, dirty, row, { async: true, silentCheck: silentCheck }));
    };
    /**
     * Check the conditions, calculations, and validity of a single component and triggers an update if
     * something changed.
     *
     * @param data - The root data of the change event.
     * @param flags - The flags from this change event.
     *
     * @return boolean - If component is valid or not.
     */
    Component.prototype.checkData = function (data, flags, row) {
        data = data || this.rootValue;
        flags = flags || {};
        row = row || this.data;
        // Needs for Nextgen Rules Engine
        this.resetCaches();
        // Do not trigger refresh if change was triggered on blur event since components with Refresh on Blur have their own listeners
        if (!flags.fromBlur) {
            this.checkRefreshOn(flags.changes, flags);
        }
        if (flags.noCheck) {
            return true;
        }
        this.checkComponentConditions(data, flags, row);
        if (this.id !== flags.triggeredComponentId) {
            this.calculateComponentValue(data, flags, row);
        }
        if (flags.noValidate && !flags.validateOnInit && !flags.fromIframe) {
            if (flags.fromSubmission && this.rootPristine && this.pristine && this.error && flags.changed) {
                this.checkComponentValidity(data, !!this.options.alwaysDirty, row, true);
            }
            return true;
        }
        var isDirty = false;
        // We need to set dirty if they explicitly set noValidate to false.
        if (this.options.alwaysDirty || flags.dirty) {
            isDirty = true;
        }
        // See if they explicitely set the values with setSubmission.
        if (flags.fromSubmission && this.hasValue(data)) {
            isDirty = true;
        }
        this.setDirty(isDirty);
        if (this.component.validateOn === 'blur' && flags.fromSubmission) {
            return true;
        }
        var isValid = this.checkComponentValidity(data, isDirty, row, flags);
        this.checkModal();
        return isValid;
    };
    Component.prototype.checkModal = function (isValid, dirty) {
        if (isValid === void 0) { isValid = true; }
        if (dirty === void 0) { dirty = false; }
        if (!this.component.modalEdit || !this.componentModal) {
            return;
        }
        if (dirty && !isValid) {
            this.setErrorClasses([this.refs.openModal], dirty, !isValid, !!this.errors.length, this.refs.openModalWrapper);
        }
        else {
            this.clearErrorClasses(this.refs.openModalWrapper);
        }
    };
    Object.defineProperty(Component.prototype, "validationValue", {
        get: function () {
            return this.dataValue;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.isEmpty = function (value) {
        if (value === void 0) { value = this.dataValue; }
        var isEmptyArray = (lodash_1.default.isArray(value) && value.length === 1) ? lodash_1.default.isEqual(value[0], this.emptyValue) : false;
        return value == null || value.length === 0 || lodash_1.default.isEqual(value, this.emptyValue) || isEmptyArray;
    };
    Component.prototype.isEqual = function (valueA, valueB) {
        if (valueB === void 0) { valueB = this.dataValue; }
        return (this.isEmpty(valueA) && this.isEmpty(valueB)) || lodash_1.default.isEqual(valueA, valueB);
    };
    /**
     * Check if a component is eligible for multiple validation
     *
     * @return {boolean}
     */
    Component.prototype.validateMultiple = function () {
        return true;
    };
    Object.defineProperty(Component.prototype, "errors", {
        get: function () {
            return this.error ? [this.error] : [];
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.clearErrorClasses = function (element) {
        if (element === void 0) { element = this.element; }
        this.removeClass(element, this.options.componentErrorClass);
        this.removeClass(element, 'alert alert-danger');
        this.removeClass(element, 'has-error');
        this.removeClass(element, 'has-message');
    };
    Component.prototype.setInputWidgetErrorClasses = function (inputRefs, hasErrors) {
        if (!this.isInputComponent || !this.component.widget || !(inputRefs === null || inputRefs === void 0 ? void 0 : inputRefs.length)) {
            return;
        }
        inputRefs.forEach(function (input) {
            if ((input === null || input === void 0 ? void 0 : input.widget) && input.widget.setErrorClasses) {
                input.widget.setErrorClasses(hasErrors);
            }
        });
    };
    Component.prototype.addFocusBlurEvents = function (element) {
        var _this = this;
        this.addEventListener(element, 'focus', function () {
            if (_this.root.focusedComponent !== _this) {
                if (_this.root.pendingBlur) {
                    _this.root.pendingBlur();
                }
                _this.root.focusedComponent = _this;
                _this.emit('focus', _this);
            }
            else if (_this.root.focusedComponent === _this && _this.root.pendingBlur) {
                _this.root.pendingBlur.cancel();
                _this.root.pendingBlur = null;
            }
        });
        this.addEventListener(element, 'blur', function () {
            _this.root.pendingBlur = FormioUtils.delay(function () {
                _this.emit('blur', _this);
                if (_this.component.validateOn === 'blur') {
                    _this.root.triggerChange({ fromBlur: true }, {
                        instance: _this,
                        component: _this.component,
                        value: _this.dataValue,
                        flags: { fromBlur: true }
                    });
                }
                _this.root.focusedComponent = null;
                _this.root.pendingBlur = null;
            });
        });
    };
    Component.prototype.setCustomValidity = function (messages, dirty, external) {
        var _this = this;
        var inputRefs = this.isInputComponent ? this.refs.input || [] : null;
        if (typeof messages === 'string' && messages) {
            messages = {
                level: 'error',
                message: messages,
            };
        }
        if (!Array.isArray(messages)) {
            if (messages) {
                messages = [messages];
            }
            else {
                messages = [];
            }
        }
        var hasErrors = !!messages.filter(function (message) { return message.level === 'error'; }).length;
        var invalidInputRefs = inputRefs;
        if (this.component.multiple) {
            var inputRefsArray = Array.from(inputRefs);
            inputRefsArray.forEach(function (input) {
                _this.setElementInvalid(_this.performInputMapping(input), false);
            });
            this.setInputWidgetErrorClasses(inputRefsArray, false);
            invalidInputRefs = inputRefsArray.filter(function (ref) {
                var _a;
                return (_a = messages.some) === null || _a === void 0 ? void 0 : _a.call(messages, function (msg) {
                    var _a;
                    return ((_a = msg === null || msg === void 0 ? void 0 : msg.context) === null || _a === void 0 ? void 0 : _a.input) === ref;
                });
            });
        }
        if (messages.length) {
            if (this.refs.messageContainer) {
                this.empty(this.refs.messageContainer);
            }
            this.error = {
                component: this.component,
                message: messages[0].message,
                messages: messages,
                external: !!external,
            };
            this.emit('componentError', this.error);
            this.addMessages(messages, dirty, invalidInputRefs);
            if (invalidInputRefs) {
                this.setErrorClasses(invalidInputRefs, dirty, hasErrors, !!messages.length);
            }
        }
        else if (!this.error || (this.error && this.error.external === !!external)) {
            if (this.refs.messageContainer) {
                this.empty(this.refs.messageContainer);
            }
            if (this.refs.modalMessageContainer) {
                this.empty(this.refs.modalMessageContainer);
            }
            this.error = null;
            if (invalidInputRefs) {
                this.setErrorClasses(invalidInputRefs, dirty, hasErrors, !!messages.length);
            }
            this.clearErrorClasses();
        }
        // if (!this.refs.input) {
        //   return;
        // }
        // this.refs.input.forEach(input => {
        //   input = this.performInputMapping(input);
        //   if (typeof input.setCustomValidity === 'function') {
        //     input.setCustomValidity(message, dirty);
        //   }
        // });
    };
    /**
     * Determines if the value of this component is hidden from the user as if it is coming from the server, but is
     * protected.
     *
     * @return {boolean|*}
     */
    Component.prototype.isValueHidden = function () {
        if (this.component.protected && this.root.editing) {
            return false;
        }
        if (!this.root || !this.root.hasOwnProperty('editing')) {
            return false;
        }
        if (!this.root || !this.root.editing) {
            return false;
        }
        return (this.component.protected || !this.component.persistent || (this.component.persistent === 'client-only'));
    };
    Component.prototype.shouldSkipValidation = function (data, dirty, row) {
        var _this = this;
        var rules = [
            // Force valid if component is read-only
            function () { return _this.options.readOnly; },
            // Do not check validations if component is not an input component.
            function () { return !_this.hasInput; },
            // Check to see if we are editing and if so, check component persistence.
            function () { return _this.isValueHidden(); },
            // Force valid if component is hidden.
            function () { return !_this.visible; },
            // Force valid if component is conditionally hidden.
            function () { return !_this.checkCondition(row, data); }
        ];
        return rules.some(function (pred) { return pred(); });
    };
    // Maintain reverse compatibility.
    Component.prototype.whenReady = function () {
        console.warn('The whenReady() method has been deprecated. Please use the dataReady property instead.');
        return this.dataReady;
    };
    Object.defineProperty(Component.prototype, "dataReady", {
        get: function () {
            return Promise.resolve();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Prints out the value of this component as a string value.
     */
    Component.prototype.asString = function (value) {
        value = value || this.getValue();
        return (Array.isArray(value) ? value : [value]).map(lodash_1.default.toString).join(', ');
    };
    Object.defineProperty(Component.prototype, "disabled", {
        /**
         * Return if the component is disabled.
         * @return {boolean}
         */
        get: function () {
            return this._disabled || this.parentDisabled;
        },
        /**
         * Disable this component.
         *
         * @param {boolean} disabled
         */
        set: function (disabled) {
            this._disabled = disabled;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.setDisabled = function (element, disabled) {
        if (!element) {
            return;
        }
        element.disabled = disabled;
        if (disabled) {
            element.setAttribute('disabled', 'disabled');
        }
        else {
            element.removeAttribute('disabled');
        }
    };
    Component.prototype.setLoading = function (element, loading) {
        if (!element || (element.loading === loading)) {
            return;
        }
        element.loading = loading;
        if (!element.loader && loading) {
            element.loader = this.ce('i', {
                class: "".concat(this.iconClass('refresh', true), " button-icon-right")
            });
        }
        if (element.loader) {
            if (loading) {
                this.appendTo(element.loader, element);
            }
            else {
                this.removeChildFrom(element.loader, element);
            }
        }
    };
    Component.prototype.selectOptions = function (select, tag, options, defaultValue) {
        var _this = this;
        lodash_1.default.each(options, function (option) {
            var attrs = {
                value: option.value
            };
            if (defaultValue !== undefined && (option.value === defaultValue)) {
                attrs.selected = 'selected';
            }
            var optionElement = _this.ce('option', attrs);
            optionElement.appendChild(_this.text(option.label));
            select.appendChild(optionElement);
        });
    };
    Component.prototype.setSelectValue = function (select, value) {
        var options = select.querySelectorAll('option');
        lodash_1.default.each(options, function (option) {
            if (option.value === value) {
                option.setAttribute('selected', 'selected');
            }
            else {
                option.removeAttribute('selected');
            }
        });
        if (select.onchange) {
            select.onchange();
        }
        if (select.onselect) {
            select.onselect();
        }
    };
    Component.prototype.getRelativePath = function (path) {
        var keyPart = ".".concat(this.key);
        var thisPath = this.isInputComponent ? this.path
            : this.path.slice(0).replace(keyPart, '');
        return path.replace(thisPath, '');
    };
    Component.prototype.clear = function () {
        this.detach();
        this.empty(this.getElement());
    };
    Component.prototype.append = function (element) {
        this.appendTo(element, this.element);
    };
    Component.prototype.prepend = function (element) {
        this.prependTo(element, this.element);
    };
    Component.prototype.removeChild = function (element) {
        this.removeChildFrom(element, this.element);
    };
    Component.prototype.detachLogic = function () {
        var _this = this;
        this.logic.forEach(function (logic) {
            if (logic.trigger.type === 'event') {
                var event = _this.interpolate(logic.trigger.event);
                _this.off(event); // only applies to callbacks on this component
            }
        });
    };
    Component.prototype.attachLogic = function () {
        var _this = this;
        // Do not attach logic during builder mode.
        if (this.builderMode) {
            return;
        }
        this.logic.forEach(function (logic) {
            if (logic.trigger.type === 'event') {
                var event = _this.interpolate(logic.trigger.event);
                _this.on(event, function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var newComponent = (0, utils_1.fastCloneDeep)(_this.originalComponent);
                    if (_this.applyActions(newComponent, logic.actions, args)) {
                        // If component definition changed, replace it.
                        if (!lodash_1.default.isEqual(_this.component, newComponent)) {
                            _this.component = newComponent;
                            var visible = _this.conditionallyVisible(null, null);
                            var disabled = _this.shouldDisabled;
                            // Change states which won't be recalculated during redrawing
                            if (_this.visible !== visible) {
                                _this.visible = visible;
                            }
                            if (_this.disabled !== disabled) {
                                _this.disabled = disabled;
                            }
                            _this.redraw();
                        }
                    }
                }, true);
            }
        });
    };
    /**
     * Get the element information.
     */
    Component.prototype.elementInfo = function () {
        var attributes = {
            name: this.options.name,
            type: this.component.inputType || 'text',
            class: 'form-control',
            lang: this.options.language
        };
        if (this.component.placeholder) {
            attributes.placeholder = this.t(this.component.placeholder, { _userInput: true });
        }
        if (this.component.tabindex) {
            attributes.tabindex = this.component.tabindex;
        }
        if (this.disabled) {
            attributes.disabled = 'disabled';
        }
        lodash_1.default.defaults(attributes, this.component.attributes);
        return {
            type: 'input',
            component: this.component,
            changeEvent: 'change',
            attr: attributes
        };
    };
    Component.prototype.autofocus = function () {
        var _this = this;
        var hasAutofocus = this.component.autofocus && !this.builderMode && !this.options.preview;
        if (hasAutofocus) {
            this.on('render', function () { return _this.focus(); }, true);
        }
    };
    Component.prototype.scrollIntoView = function (element) {
        if (element === void 0) { element = this.element; }
        if (!element) {
            return;
        }
        var _a = element.getBoundingClientRect(), left = _a.left, top = _a.top;
        window.scrollTo(left + window.scrollX, top + window.scrollY);
    };
    Component.prototype.focus = function (index) {
        var _a, _b;
        if ('beforeFocus' in this.parent) {
            this.parent.beforeFocus(this);
        }
        if ((_a = this.refs.input) === null || _a === void 0 ? void 0 : _a.length) {
            var focusingInput = typeof index === 'number' && this.refs.input[index]
                ? this.refs.input[index]
                : this.refs.input[this.refs.input.length - 1];
            if (((_b = this.component.widget) === null || _b === void 0 ? void 0 : _b.type) === 'calendar') {
                var sibling = focusingInput.nextSibling;
                if (sibling) {
                    sibling.focus();
                }
            }
            else {
                focusingInput.focus();
            }
        }
        if (this.refs.openModal) {
            this.refs.openModal.focus();
        }
        if (this.parent.refs.openModal) {
            this.parent.refs.openModal.focus();
        }
    };
    Object.defineProperty(Component.prototype, "fileService", {
        /**
         * Get `Formio` instance for working with files
         */
        get: function () {
            if (this.options.fileService) {
                return this.options.fileService;
            }
            if (this.options.formio) {
                return this.options.formio;
            }
            if (this.root && this.root.formio) {
                return this.root.formio;
            }
            var formio = new Formio_1.Formio();
            // If a form is loaded, then make sure to set the correct formUrl.
            if (this.root && this.root._form && this.root._form._id) {
                formio.formUrl = "".concat(formio.projectUrl, "/form/").concat(this.root._form._id);
            }
            return formio;
        },
        enumerable: false,
        configurable: true
    });
    Component.prototype.resetCaches = function () { };
    Object.defineProperty(Component.prototype, "previewMode", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    return Component;
}(Element_1.default));
exports.default = Component;
Component.externalLibraries = {};
Component.requireLibrary = function (name, property, src, polling) {
    if (!Component.externalLibraries.hasOwnProperty(name)) {
        Component.externalLibraries[name] = {};
        Component.externalLibraries[name].ready = new Promise(function (resolve, reject) {
            Component.externalLibraries[name].resolve = resolve;
            Component.externalLibraries[name].reject = reject;
        });
        var callbackName = "".concat(name, "Callback");
        if (!polling && !window[callbackName]) {
            window[callbackName] = function () {
                this.resolve();
            }.bind(Component.externalLibraries[name]);
        }
        // See if the plugin already exists.
        var plugin = lodash_1.default.get(window, property);
        if (plugin) {
            Component.externalLibraries[name].resolve(plugin);
        }
        else {
            src = Array.isArray(src) ? src : [src];
            src.forEach(function (lib) {
                var attrs = {};
                var elementType = '';
                if (typeof lib === 'string') {
                    lib = {
                        type: 'script',
                        src: lib
                    };
                }
                switch (lib.type) {
                    case 'script':
                        elementType = 'script';
                        attrs = {
                            src: lib.src,
                            type: 'text/javascript',
                            defer: true,
                            async: true
                        };
                        break;
                    case 'styles':
                        elementType = 'link';
                        attrs = {
                            href: lib.src,
                            rel: 'stylesheet'
                        };
                        break;
                }
                // Add the script to the top page.
                var script = document.createElement(elementType);
                for (var attr in attrs) {
                    script.setAttribute(attr, attrs[attr]);
                }
                document.getElementsByTagName('head')[0].appendChild(script);
            });
            // if no callback is provided, then check periodically for the script.
            if (polling) {
                setTimeout(function checkLibrary() {
                    var plugin = lodash_1.default.get(window, property);
                    if (plugin) {
                        Component.externalLibraries[name].resolve(plugin);
                    }
                    else {
                        // check again after 200 ms.
                        setTimeout(checkLibrary, 200);
                    }
                }, 200);
            }
        }
    }
    return Component.externalLibraries[name].ready;
};
Component.libraryReady = function (name) {
    if (Component.externalLibraries.hasOwnProperty(name) &&
        Component.externalLibraries[name].ready) {
        return Component.externalLibraries[name].ready;
    }
    return Promise.reject("".concat(name, " library was not required."));
};
//# sourceMappingURL=Component.js.map