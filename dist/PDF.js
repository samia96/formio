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
var Formio_1 = require("./Formio");
var Webform_1 = __importDefault(require("./Webform"));
var utils_1 = require("./utils/utils");
var PDF = /** @class */ (function (_super) {
    __extends(PDF, _super);
    function PDF(element, options) {
        var _this = this;
        options.display = 'pdf';
        _this = _super.call(this, element, options) || this;
        _this.components = [];
        return _this;
    }
    PDF.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        // Handle an iframe submission.
        this.on('iframe-submission', function (submission) { return _this.setValue(submission, {
            fromIframe: true
        }); }, true);
        this.on('iframe-change', function (submission) { return _this.setValue(submission, {
            fromIframe: true
        }); }, true);
        this.on('iframe-getIframePositions', function (query) {
            var iframe = document.getElementById("iframe-".concat(query.formId));
            if (iframe) {
                var iframeBoundingClientRect = iframe.getBoundingClientRect();
                _this.postMessage({
                    name: 'iframePositions',
                    data: {
                        formId: query.formId,
                        iframe: {
                            top: iframeBoundingClientRect.top
                        },
                        scrollY: window.scrollY || window.pageYOffset
                    }
                });
            }
        });
        // Trigger when this form is ready.
        this.on('iframe-ready', function () { return _this.iframeReadyResolve(); }, true);
    };
    PDF.prototype.render = function () {
        this.submitButton = this.addComponent({
            disabled: this.form.disableWizardSubmit,
            input: true,
            type: 'button',
            action: 'submit',
            internal: true,
            label: 'Submit',
            key: 'submit',
            ref: 'button',
            hidden: this.isSubmitButtonHidden()
        });
        return this.renderTemplate('pdf', {
            submitButton: this.submitButton.render(),
            classes: 'formio-form-pdf',
            children: this.renderComponents()
        });
    };
    PDF.prototype.redraw = function () {
        this.postMessage({ name: 'redraw' });
        return this.builderMode ? Promise.resolve() : _super.prototype.redraw.call(this);
    };
    PDF.prototype.destroy = function (all) {
        if (all === void 0) { all = false; }
        if (this.iframeElement) {
            delete this.iframeElement.formioComponent;
            this.iframeElement.formioComponent = null;
        }
        _super.prototype.destroy.call(this, all);
    };
    PDF.prototype.rebuild = function () {
        if (this.attached && this.builderMode && this.component.components) {
            this.destroyComponents();
            this.addComponents();
            return Promise.resolve();
        }
        this.postMessage({ name: 'redraw' });
        return _super.prototype.rebuild.call(this);
    };
    // Do not attach nested components for pdf.
    PDF.prototype.attachComponents = function (element, components, container) {
        components = components || this.components;
        container = container || this.component.components;
        element = this.hook('attachComponents', element, components, container, this);
        return Promise.resolve();
    };
    PDF.prototype.attach = function (element) {
        var _this = this;
        return _super.prototype.attach.call(this, element).then(function () {
            _this.loadRefs(element, {
                button: 'single',
                buttonMessageContainer: 'single',
                buttonMessage: 'single',
                zoomIn: 'single',
                zoomOut: 'single',
                iframeContainer: 'single'
            });
            _this.submitButton.refs = __assign({}, _this.refs);
            _this.submitButton.attachButton();
            // Reset the iframeReady promise.
            _this.iframeReady = new Promise(function (resolve, reject) {
                _this.iframeReadyResolve = resolve;
                _this.iframeReadyReject = reject;
            });
            // iframes cannot be in the template so manually create it
            _this.iframeElement = _this.ce('iframe', {
                src: _this.getSrc(),
                id: "iframe-".concat(_this.id),
                seamless: true,
                class: 'formio-iframe'
            });
            _this.iframeElement.formioContainer = _this.component.components;
            _this.iframeElement.formioComponent = _this;
            // Append the iframe to the iframeContainer in the template
            _this.empty(_this.refs.iframeContainer);
            _this.appendChild(_this.refs.iframeContainer, _this.iframeElement);
            // Post the form to the iframe
            _this.form.base = Formio_1.Formio.getBaseUrl();
            _this.form.projectUrl = Formio_1.Formio.getProjectUrl();
            _this.postMessage({ name: 'form', data: _this.form });
            // Hide the submit button if the associated component is hidden
            var submitButton = _this.components.find(function (c) { return c.element === _this.refs.button; });
            if (submitButton) {
                _this.refs.button.classList.toggle('hidden', !submitButton.visible);
            }
            _this.addEventListener(_this.refs.zoomIn, 'click', function (event) {
                event.preventDefault();
                _this.postMessage({ name: 'zoomIn' });
            });
            _this.addEventListener(_this.refs.zoomOut, 'click', function (event) {
                event.preventDefault();
                _this.postMessage({ name: 'zoomOut' });
            });
            var form = (0, utils_1.fastCloneDeep)(_this.form);
            if (_this.formio) {
                form.projectUrl = _this.formio.projectUrl;
                form.url = _this.formio.formUrl;
                form.base = _this.formio.base;
                _this.postMessage({ name: 'token', data: _this.formio.getToken() });
            }
            _this.emit('attach');
        });
    };
    /**
     * Get the submission from the iframe.
     *
     * @return {Promise<any>}
     */
    PDF.prototype.getSubmission = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.once('iframe-submission', resolve);
            _this.postMessage({ name: 'getSubmission' });
        });
    };
    /**
     * Ensure we have the submission from the iframe before we submit the form.
     *
     * @param options
     * @return {*}
     */
    PDF.prototype.submitForm = function (options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.postMessage({ name: 'getErrors' });
        return this.getSubmission().then(function () { return _super.prototype.submitForm.call(_this, options); });
    };
    PDF.prototype.getSrc = function () {
        if (!this._form || !this._form.settings || !this._form.settings.pdf) {
            return '';
        }
        var iframeSrc = "".concat(this._form.settings.pdf.src, ".html");
        var params = ["id=".concat(this.id)];
        if (this.options.showCheckboxBackground || this._form.settings.showCheckboxBackground) {
            params.push('checkboxbackground=1');
        }
        if (this.options.readOnly) {
            params.push('readonly=1');
        }
        if (this.options.zoom) {
            params.push("zoom=".concat(this.options.zoom));
        }
        if (this.builderMode) {
            params.push('builder=1');
        }
        if (params.length) {
            iframeSrc += "?".concat(params.join('&'));
        }
        return iframeSrc;
    };
    PDF.prototype.setForm = function (form, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        return _super.prototype.setForm.call(this, form, flags).then(function () {
            if (_this.formio) {
                form.projectUrl = _this.formio.projectUrl;
                form.url = _this.formio.formUrl;
                form.base = _this.formio.base;
                _this.postMessage({ name: 'token', data: _this.formio.getToken() });
            }
            _this.postMessage({ name: 'form', data: _this.form });
        });
    };
    /**
     * Set's the value of this form component.
     *
     * @param submission
     * @param flags
     */
    PDF.prototype.setValue = function (submission, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        var changed = _super.prototype.setValue.call(this, submission, flags);
        if (!flags || !flags.fromIframe) {
            this.once('iframe-ready', function () {
                if (changed) {
                    _this.postMessage({ name: 'submission', data: submission });
                }
            });
        }
        return changed;
    };
    PDF.prototype.postMessage = function (message) {
        var _this = this;
        // If we get here before the iframeReady promise is set up, it's via the superclass constructor
        if (!this.iframeReady) {
            return;
        }
        if (!message.type) {
            message.type = 'iframe-data';
        }
        this.iframeReady.then(function () {
            if (_this.iframeElement && _this.iframeElement.contentWindow && !(message.name === 'form' && _this.iframeFormSetUp)) {
                _this.iframeElement.contentWindow.postMessage(JSON.stringify(message), '*');
                _this.iframeFormSetUp = message.name === 'form';
            }
        });
    };
    PDF.prototype.focusOnComponent = function (key) {
        this.postMessage({
            name: 'focusErroredField',
            data: key,
        });
    };
    // Do not clear the iframe.
    PDF.prototype.clear = function () { };
    PDF.prototype.showErrors = function (error, triggerEvent) {
        var _a;
        var helpBlock = document.getElementById('submit-error');
        var submitError = this.t('submitError');
        var isSubmitErrorShown = ((_a = this.refs.buttonMessage) === null || _a === void 0 ? void 0 : _a.textContent.trim()) === submitError;
        if (!helpBlock && this.errors.length && !isSubmitErrorShown) {
            var p = this.ce('p', { class: 'help-block' });
            this.setContent(p, submitError);
            p.addEventListener('click', function () {
                window.scrollTo(0, 0);
            });
            var div = this.ce('div', { id: 'submit-error', class: 'has-error' });
            this.appendTo(p, div);
            this.appendTo(div, this.element);
        }
        if (!this.errors.length && helpBlock) {
            helpBlock.remove();
        }
        _super.prototype.showErrors.call(this, error, triggerEvent);
    };
    PDF.prototype.isSubmitButtonHidden = function () {
        var hidden = false;
        (0, utils_1.eachComponent)(this.component.components, function (component) {
            if ((component.type === 'button') &&
                ((component.action === 'submit') || !component.action)) {
                hidden = component.hidden || false;
            }
        });
        return hidden;
    };
    return PDF;
}(Webform_1.default));
exports.default = PDF;
/**
 * Listen for window messages.
 */
if (typeof window !== 'undefined') {
    window.addEventListener('message', function (event) {
        var eventData = null;
        try {
            eventData = JSON.parse(event.data);
        }
        catch (err) {
            eventData = null;
        }
        // If this form exists, then emit the event within this form.
        if (eventData &&
            eventData.name &&
            eventData.formId &&
            Formio_1.Formio.forms.hasOwnProperty(eventData.formId)) {
            Formio_1.Formio.forms[eventData.formId].emit("iframe-".concat(eventData.name), eventData.data);
        }
    });
}
//# sourceMappingURL=PDF.js.map