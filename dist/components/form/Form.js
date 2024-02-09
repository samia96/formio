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
var lodash_1 = __importDefault(require("lodash"));
var Component_1 = __importDefault(require("../_classes/component/Component"));
var ComponentModal_1 = __importDefault(require("../_classes/componentModal/ComponentModal"));
var eventemitter3_1 = __importDefault(require("eventemitter3"));
var utils_1 = require("../../utils/utils");
var Formio_1 = require("../../Formio");
var Form_1 = __importDefault(require("../../Form"));
var FormComponent = /** @class */ (function (_super) {
    __extends(FormComponent, _super);
    function FormComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Component_1.default.schema.apply(Component_1.default, __spreadArray([{
                label: 'Form',
                type: 'form',
                key: 'form',
                src: '',
                reference: true,
                form: '',
                path: '',
                tableView: true,
            }], extend, false));
    };
    Object.defineProperty(FormComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Nested Form',
                icon: 'wpforms',
                group: 'premium',
                documentation: '/userguide/form-building/premium-components#nested-form',
                weight: 110,
                schema: FormComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    FormComponent.savedValueTypes = function () {
        return [utils_1.componentValueTypes.object];
    };
    FormComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.formObj = {
            display: this.component.display,
            settings: this.component.settings,
            components: this.component.components
        };
        this.valueChanged = false;
        this.subForm = null;
        this.formSrc = '';
        if (this.component.src) {
            this.formSrc = this.component.src;
        }
        if (!this.component.src &&
            !this.options.formio &&
            (this.component.form || this.component.path)) {
            if (this.component.project) {
                this.formSrc = Formio_1.Formio.getBaseUrl();
                // Check to see if it is a MongoID.
                if ((0, utils_1.isMongoId)(this.component.project)) {
                    this.formSrc += '/project';
                }
                this.formSrc += "/".concat(this.component.project);
                this.options.project = this.formSrc;
            }
            else {
                this.formSrc = Formio_1.Formio.getProjectUrl();
                this.options.project = this.formSrc;
            }
            if (this.component.form) {
                if ((0, utils_1.isMongoId)(this.component.form)) {
                    this.formSrc += "/form/".concat(this.component.form);
                }
                else {
                    this.formSrc += "/".concat(this.component.form);
                }
            }
            else if (this.component.path) {
                this.formSrc += "/".concat(this.component.path);
            }
        }
        // Build the source based on the root src path.
        if (!this.formSrc && this.options.formio) {
            var rootSrc = this.options.formio.formsUrl;
            if (this.component.form && (0, utils_1.isMongoId)(this.component.form)) {
                this.formSrc = "".concat(rootSrc, "/").concat(this.component.form);
            }
            else {
                var formPath = this.component.path || this.component.form;
                this.formSrc = "".concat(rootSrc.replace(/\/form$/, ''), "/").concat(formPath);
            }
        }
        if (this.builderMode && this.component.hasOwnProperty('formRevision')) {
            this.component.revision = this.component.formRevision;
            delete this.component.formRevision;
        }
        // Add revision version if set.
        if (this.component.revision || this.component.revision === 0 ||
            this.component.formRevision || this.component.formRevision === 0
            || this.component.revisionId) {
            this.setFormRevision(this.component.revisionId || this.component.revision || this.component.formRevision);
        }
        return this.createSubForm();
    };
    Object.defineProperty(FormComponent.prototype, "dataReady", {
        get: function () {
            return this.subFormReady || Promise.resolve();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "defaultValue", {
        get: function () {
            // Not not provide a default value unless the subform is ready so that it will initialize correctly.
            return this.subForm ? _super.prototype.defaultValue : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "defaultSchema", {
        get: function () {
            return FormComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "emptyValue", {
        get: function () {
            return { data: {} };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "ready", {
        get: function () {
            return this.subFormReady || Promise.resolve();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "useOriginalRevision", {
        get: function () {
            var _a, _b;
            return ((_a = this.component) === null || _a === void 0 ? void 0 : _a.useOriginalRevision) && !!((_b = this.formObj) === null || _b === void 0 ? void 0 : _b.revisions);
        },
        enumerable: false,
        configurable: true
    });
    FormComponent.prototype.setFormRevision = function (rev) {
        // Remove current revisions from src if it is
        this.formSrc = this.formSrc.replace(/\/v\/[0-9a-z]+/, '');
        var revNumber = Number.parseInt(rev);
        if (!isNaN(revNumber)) {
            this.subFormRevision = rev;
            this.formSrc += "/v/".concat(rev);
        }
        else {
            this.subFormRevision = undefined;
        }
    };
    FormComponent.prototype.getComponent = function (path, fn) {
        path = (0, utils_1.getArrayFromComponentPath)(path);
        if (path[0] === 'data') {
            path.shift();
        }
        var originalPathStr = "".concat(this.path, ".data.").concat((0, utils_1.getStringFromComponentPath)(path));
        if (this.subForm) {
            return this.subForm.getComponent(path, fn, originalPathStr);
        }
    };
    FormComponent.prototype.getSubOptions = function (options) {
        if (options === void 0) { options = {}; }
        options.parentPath = "".concat(this.path, ".data.");
        options.events = this.createEmitter();
        // Make sure to not show the submit button in wizards in the nested forms.
        lodash_1.default.set(options, 'buttonSettings.showSubmit', false);
        if (!this.options) {
            return options;
        }
        if (this.options.base) {
            options.base = this.options.base;
        }
        if (this.options.project) {
            options.project = this.options.project;
        }
        if (this.options.readOnly || this.component.disabled) {
            options.readOnly = this.options.readOnly || this.component.disabled;
        }
        if (this.options.breadcrumbSettings) {
            options.breadcrumbSettings = this.options.breadcrumbSettings;
        }
        if (this.options.buttonSettings) {
            options.buttonSettings = lodash_1.default.clone(this.options.buttonSettings);
        }
        if (this.options.viewAsHtml) {
            options.viewAsHtml = this.options.viewAsHtml;
        }
        if (this.options.language) {
            options.language = this.options.language;
        }
        if (this.options.template) {
            options.template = this.options.template;
        }
        if (this.options.templates) {
            options.templates = this.options.templates;
        }
        if (this.options.renderMode) {
            options.renderMode = this.options.renderMode;
        }
        if (this.options.attachMode) {
            options.attachMode = this.options.attachMode;
        }
        if (this.options.iconset) {
            options.iconset = this.options.iconset;
        }
        if (this.options.fileService) {
            options.fileService = this.options.fileService;
        }
        if (this.options.onChange) {
            options.onChange = this.options.onChange;
        }
        if (this.options.preview) {
            options.preview = this.options.preview;
        }
        return options;
    };
    FormComponent.prototype.render = function () {
        if (this.builderMode) {
            return _super.prototype.render.call(this, this.component.label || 'Nested form');
        }
        var subform = this.subForm ? this.subForm.render() : this.renderTemplate('loading');
        return _super.prototype.render.call(this, subform);
    };
    FormComponent.prototype.asString = function (value) {
        return this.getValueAsString(value);
    };
    /**
     * Prints out the value of form components as a datagrid value.
     */
    FormComponent.prototype.getValueAsString = function (value, options) {
        if (!value) {
            return 'No data provided';
        }
        if (!value.data && value._id) {
            return value._id;
        }
        if (!value.data || !Object.keys(value.data).length) {
            return 'No data provided';
        }
        if (options === null || options === void 0 ? void 0 : options.email) {
            var result_1 = ("\n        <table border=\"1\" style=\"width:100%\">\n          <tbody>\n      ");
            this.everyComponent(function (component) {
                if (component.isInputComponent && component.visible && !component.skipInEmail) {
                    result_1 += ("\n            <tr>\n              <th style=\"padding: 5px 10px;\">".concat(component.label, "</th>\n              <td style=\"width:100%;padding:5px 10px;\">").concat(component.getView(component.dataValue, options), "</td>\n            </tr>\n          "));
                }
            }, __assign(__assign({}, options), { fromRoot: true }));
            result_1 += ("\n          </tbody>\n        </table>\n      ");
            return result_1;
        }
        if (lodash_1.default.isEmpty(value)) {
            return '';
        }
        return '[Complex Data]';
    };
    FormComponent.prototype.attach = function (element) {
        var _this = this;
        // Don't attach in builder.
        if (this.builderMode) {
            return _super.prototype.attach.call(this, element);
        }
        return _super.prototype.attach.call(this, element)
            .then(function () {
            if (_this.isSubFormLazyLoad() && !_this.hasLoadedForm && !_this.subFormLoading) {
                _this.createSubForm(true);
            }
            return _this.subFormReady.then(function () {
                _this.empty(element);
                if (_this.options.builder) {
                    _this.setContent(element, _this.ce('div', {
                        class: 'text-muted text-center p-2'
                    }, _this.text(_this.formObj.title)));
                    return;
                }
                _this.setContent(element, _this.render());
                if (_this.subForm) {
                    if (_this.isNestedWizard) {
                        element = _this.root.element;
                    }
                    _this.subForm.attach(element);
                    _this.valueChanged = _this.hasSetValue;
                    if (!_this.valueChanged && _this.dataValue.state !== 'submitted') {
                        _this.setDefaultValue();
                    }
                    else {
                        _this.restoreValue();
                    }
                }
                if (!_this.builderMode && _this.component.modalEdit) {
                    var modalShouldBeOpened = _this.componentModal ? _this.componentModal.isOpened : false;
                    var currentValue = modalShouldBeOpened ? _this.componentModal.currentValue : _this.dataValue;
                    _this.componentModal = new ComponentModal_1.default(_this, element, modalShouldBeOpened, currentValue);
                    _this.setOpenModalElement();
                }
                _this.calculateValue();
            });
        });
    };
    FormComponent.prototype.detach = function () {
        if (this.subForm) {
            this.subForm.detach();
        }
        _super.prototype.detach.call(this);
    };
    Object.defineProperty(FormComponent.prototype, "currentForm", {
        get: function () {
            return this._currentForm;
        },
        set: function (instance) {
            var _this = this;
            this._currentForm = instance;
            if (!this.subForm) {
                return;
            }
            this.subForm.getComponents().forEach(function (component) {
                component.currentForm = _this;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "hasLoadedForm", {
        get: function () {
            return this.formObj
                && this.formObj.components
                && Array.isArray(this.formObj.components)
                && this.formObj.components.length;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "isRevisionChanged", {
        get: function () {
            return lodash_1.default.isNumber(this.subFormRevision)
                && lodash_1.default.isNumber(this.formObj._vid)
                && this.formObj._vid !== this.subFormRevision;
        },
        enumerable: false,
        configurable: true
    });
    FormComponent.prototype.destroy = function (all) {
        if (all === void 0) { all = false; }
        if (this.subForm) {
            this.subForm.destroy(all);
            this.subForm = null;
            this.subFormReady = null;
        }
        _super.prototype.destroy.call(this, all);
    };
    FormComponent.prototype.redraw = function () {
        if (this.subForm) {
            this.subForm.form = this.formObj;
            this.setSubFormDisabled(this.subForm);
        }
        return _super.prototype.redraw.call(this);
    };
    /**
     * Pass everyComponent to subform.
     * @param args
     * @returns {*|void}
     */
    FormComponent.prototype.everyComponent = function () {
        var _a;
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this.subForm) {
            (_a = this.subForm).everyComponent.apply(_a, args);
        }
    };
    FormComponent.prototype.setSubFormDisabled = function (subForm) {
        subForm.disabled = this.disabled; // When the Nested Form is disabled make the subForm disabled
    };
    FormComponent.prototype.updateSubWizards = function (subForm) {
        var _this = this;
        var _a, _b;
        if (this.isNestedWizard && ((_a = this.root) === null || _a === void 0 ? void 0 : _a.subWizards) && ((_b = subForm === null || subForm === void 0 ? void 0 : subForm._form) === null || _b === void 0 ? void 0 : _b.display) === 'wizard') {
            var existedForm = this.root.subWizards.findIndex(function (form) { return form.component.form === _this.component.form; });
            if (existedForm !== -1) {
                this.root.subWizards[existedForm] = this;
            }
            else {
                this.root.subWizards.push(this);
            }
            this.emit('subWizardsUpdated', subForm);
        }
    };
    /**
     * Create a subform instance.
     *
     * @return {*}
     */
    FormComponent.prototype.createSubForm = function (fromAttach) {
        var _this = this;
        this.subFormReady = this.loadSubForm(fromAttach).then(function (form) {
            if (!form) {
                return;
            }
            // Iterate through every component and hide the submit button.
            (0, utils_1.eachComponent)(form.components, function (component) {
                _this.hideSubmitButton(component);
            });
            // If the subform is already created then destroy the old one.
            if (_this.subForm) {
                _this.subForm.destroy();
            }
            // Render the form.
            return (new Form_1.default(form, _this.getSubOptions())).ready.then(function (instance) {
                _this.subForm = instance;
                _this.subForm.currentForm = _this;
                _this.subForm.parent = _this;
                _this.subForm.parentVisible = _this.visible;
                _this.subForm.on('change', function () {
                    if (_this.subForm) {
                        _this.dataValue = _this.subForm.getValue();
                        _this.triggerChange({
                            noEmit: true
                        });
                    }
                });
                _this.subForm.url = _this.formSrc;
                _this.subForm.nosubmit = true;
                _this.subForm.root = _this.root;
                _this.subForm.localRoot = _this.isNestedWizard ? _this.localRoot : _this.subForm;
                _this.restoreValue();
                _this.valueChanged = _this.hasSetValue;
                _this.onChange();
                return _this.subForm;
            });
        }).then(function (subForm) {
            _this.updateSubWizards(subForm);
            return subForm;
        });
        return this.subFormReady;
    };
    FormComponent.prototype.hideSubmitButton = function (component) {
        var isSubmitButton = (component.type === 'button') &&
            ((component.action === 'submit') || !component.action);
        if (isSubmitButton) {
            component.hidden = true;
        }
    };
    /**
     * Load the subform.
     */
    FormComponent.prototype.loadSubForm = function (fromAttach) {
        var _this = this;
        var _a;
        if (this.builderMode || this.isHidden() || (this.isSubFormLazyLoad() && !fromAttach)) {
            return Promise.resolve();
        }
        if (this.hasLoadedForm && !this.isRevisionChanged &&
            !(this.options.pdf && ((_a = this.component) === null || _a === void 0 ? void 0 : _a.useOriginalRevision) && lodash_1.default.isNull(this.subForm) && !this.subFormLoading)) {
            // Pass config down to sub forms.
            if (this.root && this.root.form && this.root.form.config && !this.formObj.config) {
                this.formObj.config = this.root.form.config;
            }
            return Promise.resolve(this.formObj);
        }
        else if (this.formSrc) {
            this.subFormLoading = true;
            return (new Formio_1.Formio(this.formSrc)).loadForm({ params: { live: 1 } })
                .then(function (formObj) {
                _this.formObj = formObj;
                if (_this.options.pdf && _this.component.useOriginalRevision) {
                    _this.formObj.display = 'form';
                }
                _this.subFormLoading = false;
                return formObj;
            })
                .catch(function (err) {
                console.log(err);
                return null;
            });
        }
        return Promise.resolve();
    };
    Object.defineProperty(FormComponent.prototype, "subFormData", {
        get: function () {
            var _a;
            return ((_a = this.dataValue) === null || _a === void 0 ? void 0 : _a.data) || {};
        },
        enumerable: false,
        configurable: true
    });
    FormComponent.prototype.checkComponentValidity = function (data, dirty, row, options) {
        options = options || {};
        var silentCheck = options.silentCheck || false;
        if (this.subForm) {
            return this.subForm.checkValidity(this.subFormData, dirty, null, silentCheck);
        }
        return _super.prototype.checkComponentValidity.call(this, data, dirty, row, options);
    };
    FormComponent.prototype.checkComponentConditions = function (data, flags, row) {
        var _this = this;
        var visible = _super.prototype.checkComponentConditions.call(this, data, flags, row);
        // Return if already hidden
        if (!visible) {
            return visible;
        }
        if (this.subForm) {
            return this.subForm.checkConditions(this.subFormData);
        }
        // There are few cases when subForm is not loaded when a change is triggered,
        // so we need to perform checkConditions after it is ready, or some conditional fields might be hidden in View mode
        else if (this.subFormReady) {
            this.subFormReady.then(function () {
                if (_this.subForm) {
                    return _this.subForm.checkConditions(_this.subFormData);
                }
            });
        }
        return visible;
    };
    FormComponent.prototype.calculateValue = function (data, flags, row) {
        if (this.subForm) {
            return this.subForm.calculateValue(this.subFormData, flags);
        }
        return _super.prototype.calculateValue.call(this, data, flags, row);
    };
    FormComponent.prototype.setPristine = function (pristine) {
        _super.prototype.setPristine.call(this, pristine);
        if (this.subForm) {
            this.subForm.setPristine(pristine);
        }
    };
    Object.defineProperty(FormComponent.prototype, "shouldSubmit", {
        /**
         * Determine if the subform should be submitted.
         * @return {*|boolean}
         */
        get: function () {
            return this.subFormReady && (!this.component.hasOwnProperty('reference') || this.component.reference) && !this.isHidden();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Returns the data for the subform.
     *
     * @return {*}
     */
    FormComponent.prototype.getSubFormData = function () {
        if (lodash_1.default.get(this.subForm, 'form.display') === 'pdf') {
            return this.subForm.getSubmission();
        }
        else {
            return Promise.resolve(this.dataValue);
        }
    };
    /**
     * Submit the subform if configured to do so.
     *
     * @return {*}
     */
    FormComponent.prototype.submitSubForm = function (rejectOnError) {
        var _this = this;
        // If we wish to submit the form on next page, then do that here.
        if (this.shouldSubmit) {
            return this.subFormReady.then(function () {
                if (!_this.subForm) {
                    return _this.dataValue;
                }
                _this.subForm.nosubmit = false;
                return _this.subForm.submitForm().then(function (result) {
                    _this.subForm.loading = false;
                    _this.subForm.showAllErrors = false;
                    _this.dataValue = result.submission;
                    return _this.dataValue;
                }).catch(function (err) {
                    _this.subForm.showAllErrors = true;
                    if (rejectOnError) {
                        _this.subForm.onSubmissionError(err);
                        return Promise.reject(err);
                    }
                    else {
                        return {};
                    }
                });
            });
        }
        return this.getSubFormData();
    };
    /**
     * Submit the form before the next page is triggered.
     */
    FormComponent.prototype.beforePage = function (next) {
        var _this = this;
        // Should not submit child forms if we are going to the previous page
        if (!next) {
            return _super.prototype.beforePage.call(this, next);
        }
        return this.submitSubForm(true).then(function () { return _super.prototype.beforePage.call(_this, next); });
    };
    /**
     * Submit the form before the whole form is triggered.
     */
    FormComponent.prototype.beforeSubmit = function () {
        var _this = this;
        var _a;
        var submission = this.dataValue;
        var isAlreadySubmitted = submission && submission._id && submission.form;
        // This submission has already been submitted, so just return the reference data.
        if (isAlreadySubmitted && !((_a = this.subForm) === null || _a === void 0 ? void 0 : _a.wizard)) {
            this.dataValue = submission;
            return Promise.resolve(this.dataValue);
        }
        return this.submitSubForm(false)
            .then(function () {
            return _this.dataValue;
        })
            .then(function () { return _super.prototype.beforeSubmit.call(_this); });
    };
    FormComponent.prototype.isSubFormLazyLoad = function () {
        var _a, _b;
        return ((_b = (_a = this.root) === null || _a === void 0 ? void 0 : _a._form) === null || _b === void 0 ? void 0 : _b.display) === 'wizard' && this.component.lazyLoad;
    };
    FormComponent.prototype.isHidden = function () {
        if (!this.visible) {
            return true;
        }
        return !_super.prototype.checkConditions.call(this, this.rootValue);
    };
    FormComponent.prototype.setValue = function (submission, flags) {
        var _this = this;
        var _a;
        if (flags === void 0) { flags = {}; }
        var changed = _super.prototype.setValue.call(this, submission, flags);
        this.valueChanged = true;
        if (this.subForm) {
            var revisionPath = submission._frid ? '_frid' : '_vid';
            var shouldLoadOriginalRevision = this.useOriginalRevision
                && (lodash_1.default.isNumber(submission[revisionPath]) || lodash_1.default.isNumber(submission._fvid))
                && lodash_1.default.isNumber((_a = this.subForm.form) === null || _a === void 0 ? void 0 : _a[revisionPath])
                && submission._fvid !== this.subForm.form[revisionPath];
            if (shouldLoadOriginalRevision) {
                this.setFormRevision(submission._frid || submission._fvid);
                this.createSubForm().then(function () {
                    _this.attach(_this.element);
                });
            }
            else {
                this.setSubFormValue(submission, flags);
            }
        }
        return changed;
    };
    FormComponent.prototype.setSubFormValue = function (submission, flags) {
        var shouldLoadSubmissionById = submission
            && submission._id
            && this.subForm.formio
            && lodash_1.default.isEmpty(submission.data);
        if (shouldLoadSubmissionById) {
            var formId = submission.form || this.formObj.form || this.component.form;
            var submissionUrl = "".concat(this.subForm.formio.formsUrl, "/").concat(formId, "/submission/").concat(submission._id);
            this.subForm.setUrl(submissionUrl, this.options);
            this.subForm.loadSubmission().catch(function (err) {
                console.error("Unable to load subform submission ".concat(submission._id, ":"), err);
            });
        }
        else {
            this.subForm.setValue(submission, flags);
        }
    };
    FormComponent.prototype.isEmpty = function (value) {
        if (value === void 0) { value = this.dataValue; }
        return value === null || lodash_1.default.isEqual(value, this.emptyValue) || (this.areAllComponentsEmpty(value.data) && !value._id);
    };
    FormComponent.prototype.areAllComponentsEmpty = function (data) {
        var res = true;
        if (this.subForm) {
            this.subForm.everyComponent(function (comp) {
                var componentValue = lodash_1.default.get(data, comp.key);
                res &= comp.isEmpty(componentValue);
            });
        }
        else {
            res = false;
        }
        return res;
    };
    FormComponent.prototype.getValue = function () {
        if (this.subForm) {
            return this.subForm.getValue();
        }
        return this.dataValue;
    };
    Object.defineProperty(FormComponent.prototype, "errors", {
        get: function () {
            var errors = _super.prototype.errors;
            if (this.subForm) {
                errors = errors.concat(this.subForm.errors);
            }
            return errors;
        },
        enumerable: false,
        configurable: true
    });
    FormComponent.prototype.updateSubFormVisibility = function () {
        if (this.subForm) {
            this.subForm.parentVisible = this.visible;
        }
    };
    Object.defineProperty(FormComponent.prototype, "isNestedWizard", {
        /**
         * Determines if this form is a Nested Wizard
         * which means it should be a Wizard itself and should be a direct child of a Wizard's page
         * @returns {boolean}
         */
        get: function () {
            var _a, _b, _c, _d, _e;
            return ((_b = (_a = this.subForm) === null || _a === void 0 ? void 0 : _a._form) === null || _b === void 0 ? void 0 : _b.display) === 'wizard' && ((_e = (_d = (_c = this.parent) === null || _c === void 0 ? void 0 : _c.parent) === null || _d === void 0 ? void 0 : _d._form) === null || _e === void 0 ? void 0 : _e.display) === 'wizard';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "visible", {
        get: function () {
            return _super.prototype.visible;
        },
        set: function (value) {
            var _this = this;
            var isNestedWizard = this.isNestedWizard;
            if (this._visible !== value) {
                this._visible = value;
                // Form doesn't load if hidden. If it becomes visible, create the form.
                if (!this.subForm && value) {
                    this.createSubForm();
                    this.subFormReady.then(function () {
                        _this.updateSubFormVisibility();
                        _this.clearOnHide();
                    });
                    this.redraw();
                    return;
                }
                this.updateSubFormVisibility();
                this.clearOnHide();
                isNestedWizard ? this.rebuild() : this.redraw();
            }
            if (!value && isNestedWizard) {
                this.root.redraw();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FormComponent.prototype, "parentVisible", {
        get: function () {
            return _super.prototype.parentVisible;
        },
        set: function (value) {
            var _this = this;
            if (this._parentVisible !== value) {
                this._parentVisible = value;
                this.clearOnHide();
                // Form doesn't load if hidden. If it becomes visible, create the form.
                if (!this.subForm && value) {
                    this.createSubForm();
                    this.subFormReady.then(function () {
                        _this.updateSubFormVisibility();
                    });
                    this.redraw();
                    return;
                }
                this.updateSubFormVisibility();
                this.redraw();
            }
        },
        enumerable: false,
        configurable: true
    });
    FormComponent.prototype.isInternalEvent = function (event) {
        switch (event) {
            case 'focus':
            case 'blur':
            case 'componentChange':
            case 'componentError':
            case 'error':
            case 'formLoad':
            case 'languageChanged':
            case 'render':
            case 'checkValidity':
            case 'initialized':
            case 'submit':
            case 'submitButton':
            case 'nosubmit':
            case 'updateComponent':
            case 'submitDone':
            case 'submissionDeleted':
            case 'requestDone':
            case 'nextPage':
            case 'prevPage':
            case 'wizardNavigationClicked':
            case 'updateWizardNav':
            case 'restoreDraft':
            case 'saveDraft':
            case 'saveComponent':
            case 'pdfUploaded':
                return true;
            default:
                return false;
        }
    };
    FormComponent.prototype.createEmitter = function () {
        var emitter = new eventemitter3_1.default();
        var nativeEmit = emitter.emit;
        var that = this;
        emitter.emit = function (event) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var eventType = event.replace("".concat(that.options.namespace, "."), '');
            nativeEmit.call.apply(nativeEmit, __spreadArray([this, event], args, false));
            if (!that.isInternalEvent(eventType)) {
                that.emit.apply(that, __spreadArray([eventType], args, false));
            }
        };
        return emitter;
    };
    FormComponent.prototype.deleteValue = function () {
        _super.prototype.setValue.call(this, null, {
            noUpdateEvent: true,
            noDefault: true
        });
        this.unset();
    };
    return FormComponent;
}(Component_1.default));
exports.default = FormComponent;
//# sourceMappingURL=Form.js.map