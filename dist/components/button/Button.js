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
var lodash_1 = __importDefault(require("lodash"));
var Field_1 = __importDefault(require("../_classes/field/Field"));
var Input_1 = __importDefault(require("../_classes/input/Input"));
var utils_1 = require("../../utils/utils");
var ButtonComponent = /** @class */ (function (_super) {
    __extends(ButtonComponent, _super);
    function ButtonComponent(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        _this.filesUploading = [];
        return _this;
    }
    ButtonComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Input_1.default.schema.apply(Input_1.default, __spreadArray([{
                type: 'button',
                label: 'Submit',
                key: 'submit',
                size: 'md',
                leftIcon: '',
                rightIcon: '',
                block: false,
                action: 'submit',
                persistent: false,
                disableOnInvalid: false,
                theme: 'primary',
                dataGridLabel: true
            }], extend, false));
    };
    Object.defineProperty(ButtonComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Button',
                group: 'basic',
                icon: 'stop',
                documentation: '/userguide/form-building/form-components#button',
                weight: 110,
                schema: ButtonComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    ButtonComponent.savedValueTypes = function (schema) {
        return (0, utils_1.getComponentSavedTypes)(schema) || [utils_1.componentValueTypes.boolean];
    };
    Object.defineProperty(ButtonComponent.prototype, "defaultSchema", {
        get: function () {
            return ButtonComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.elementInfo.call(this);
            info.type = 'button';
            info.attr.type = (['submit', 'saveState'].includes(this.component.action)) ? 'submit' : 'button';
            this.component.theme = this.component.theme || 'default';
            info.attr.class = "btn btn-".concat(this.component.theme);
            if (this.component.size) {
                info.attr.class += " btn-".concat(this.component.size);
            }
            if (this.component.block) {
                info.attr.class += ' btn-block';
            }
            if (this.component.customClass) {
                info.attr.class += " ".concat(this.component.customClass);
            }
            info.content = this.t(this.component.label, { _userInput: true });
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "labelInfo", {
        get: function () {
            return {
                hidden: true
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "loading", {
        set: function (loading) {
            this.setLoading(this.refs.button, loading);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "skipInEmail", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    // No label needed for buttons.
    ButtonComponent.prototype.createLabel = function () { };
    ButtonComponent.prototype.createInput = function (container) {
        this.refs.button = _super.prototype.createInput.call(this, container);
        return this.refs.button;
    };
    Object.defineProperty(ButtonComponent.prototype, "emptyValue", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    ButtonComponent.prototype.getValue = function () {
        return this.dataValue;
    };
    Object.defineProperty(ButtonComponent.prototype, "clicked", {
        get: function () {
            return this.dataValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "defaultValue", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "className", {
        get: function () {
            var className = _super.prototype.className;
            className += " ".concat(this.transform('class', 'form-group'));
            return className;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ButtonComponent.prototype, "oauthConfig", {
        get: function () {
            if (lodash_1.default.has(this, 'root.form.config.oauth') && this.component.oauthProvider) {
                return this.root.form.config.oauth[this.component.oauthProvider];
            }
            // Legacy oauth location.
            if (this.component.oauth) {
                return this.component.oauth;
            }
            return false;
        },
        enumerable: false,
        configurable: true
    });
    ButtonComponent.prototype.render = function () {
        if (this.viewOnly || this.options.hideButtons) {
            this._visible = false;
        }
        return _super.prototype.render.call(this, this.renderTemplate('button', {
            component: this.component,
            input: this.inputInfo,
        }));
    };
    ButtonComponent.prototype.attachButton = function () {
        var _this = this;
        this.addShortcut(this.refs.button);
        var onChange = null;
        var onError = null;
        if (this.component.action === 'submit') {
            this.on('submitButton', function () {
                _this.disabled = true;
            }, true);
            this.on('cancelSubmit', function () {
                _this.disabled = false;
            }, true);
            this.on('submitDone', function (message) {
                var resultMessage = lodash_1.default.isString(message) ? message : _this.t('complete');
                _this.loading = false;
                _this.disabled = false;
                _this.addClass(_this.refs.button, 'btn-success submit-success');
                _this.removeClass(_this.refs.button, 'btn-danger submit-fail');
                _this.addClass(_this.refs.buttonMessageContainer, 'has-success');
                _this.removeClass(_this.refs.buttonMessageContainer, 'has-error');
                _this.setContent(_this.refs.buttonMessage, resultMessage);
            }, true);
            this.on('submitError', function (message) {
                var resultMessage = lodash_1.default.isString(message) ? _this.t(message) : _this.t(_this.errorMessage('submitError'));
                _this.loading = false;
                _this.disabled = false;
                _this.hasError = true;
                _this.removeClass(_this.refs.button, 'btn-success submit-success');
                _this.addClass(_this.refs.button, 'btn-danger submit-fail');
                _this.removeClass(_this.refs.buttonMessageContainer, 'has-success');
                _this.addClass(_this.refs.buttonMessageContainer, 'has-error');
                _this.setContent(_this.refs.buttonMessage, resultMessage);
            }, true);
            this.on('fileUploadingStart', function (filePromise) {
                _this.filesUploading.push(filePromise);
                _this.disabled = true;
                _this.setDisabled(_this.refs.button, _this.disabled);
            }, true);
            this.on('fileUploadingEnd', function (filePromise) {
                var index = _this.filesUploading.indexOf(filePromise);
                if (index !== -1) {
                    _this.filesUploading.splice(index, 1);
                }
                _this.disabled = _this.shouldDisabled ? true : false;
                _this.setDisabled(_this.refs.button, _this.disabled);
            }, true);
            onChange = function (value, isValid) {
                _this.removeClass(_this.refs.button, 'btn-success submit-success');
                if (isValid) {
                    _this.removeClass(_this.refs.button, 'btn-danger submit-fail');
                    if (_this.hasError) {
                        _this.hasError = false;
                        _this.setContent(_this.refs.buttonMessage, '');
                        _this.removeClass(_this.refs.buttonMessageContainer, 'has-success');
                        _this.removeClass(_this.refs.buttonMessageContainer, 'has-error');
                    }
                }
            };
            onError = function () {
                _this.hasError = true;
                _this.removeClass(_this.refs.button, 'btn-success submit-success');
                _this.addClass(_this.refs.button, 'btn-danger submit-fail');
                _this.removeClass(_this.refs.buttonMessageContainer, 'has-success');
                _this.addClass(_this.refs.buttonMessageContainer, 'has-error');
                _this.setContent(_this.refs.buttonMessage, _this.t(_this.errorMessage('submitError')));
            };
        }
        if (this.component.action === 'url') {
            this.on('requestButton', function () {
                _this.disabled = true;
            }, true);
            this.on('requestDone', function () {
                _this.loading = false;
                _this.disabled = false;
            }, true);
        }
        this.on('change', function (value, flags) {
            var isValid = value.isValid;
            var isSilent = flags && flags.silent;
            //check root validity only if disableOnInvalid is set and when it is not possible to make submission because of validation errors
            if (flags && flags.noValidate && (_this.component.disableOnInvalid || _this.hasError)) {
                isValid = flags.rootValidity || (_this.root ? _this.root.checkValidity(_this.root.data, null, null, true) : true);
                flags.rootValidity = isValid;
            }
            _this.isDisabledOnInvalid = _this.component.disableOnInvalid && (isSilent || !isValid);
            _this.disabled = _this.shouldDisabled;
            _this.setDisabled(_this.refs.button, _this.disabled);
            if (onChange) {
                onChange(value, isValid);
            }
        }, true);
        this.on('error', function () {
            _this.loading = false;
            _this.disabled = false;
            if (onError) {
                onError();
            }
        }, true);
        if (this.component.saveOnEnter) {
            this.root.addEventListener(this.root.element, 'keyup', function (event) {
                if (event.keyCode === 13) {
                    _this.onClick.call(_this, event);
                }
            });
        }
        this.addEventListener(this.refs.button, 'click', this.onClick.bind(this));
        this.addEventListener(this.refs.buttonMessageContainer, 'click', function () {
            if (_this.refs.buttonMessageContainer.classList.contains('has-error')) {
                if (_this.root && _this.root.alert) {
                    _this.scrollIntoView(_this.root.alert);
                }
            }
        });
        this.disabled = this.shouldDisabled;
        this.setDisabled(this.refs.button, this.disabled);
        function getUrlParameter(name) {
            name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
            var regex = new RegExp("[\\?&]".concat(name, "=([^&#]*)"));
            var results = regex.exec(location.search);
            if (!results) {
                return results;
            }
            return decodeURIComponent(results[1].replace(/\+/g, ' '));
        }
        // If this is an OpenID Provider initiated login, perform the click event immediately
        if ((this.component.action === 'oauth') && this.oauthConfig && !this.oauthConfig.error) {
            var iss = getUrlParameter('iss');
            if (iss && (this.oauthConfig.authURI.indexOf(iss) === 0)) {
                this.openOauth(this.oauthConfig);
            }
        }
    };
    Object.defineProperty(ButtonComponent.prototype, "shouldDisabled", {
        get: function () {
            var _a;
            return _super.prototype.shouldDisabled || !!((_a = this.filesUploading) === null || _a === void 0 ? void 0 : _a.length) || this.isDisabledOnInvalid;
        },
        enumerable: false,
        configurable: true
    });
    ButtonComponent.prototype.attach = function (element) {
        this.loadRefs(element, {
            button: 'single',
            buttonMessageContainer: 'single',
            buttonMessage: 'single'
        });
        var superAttach = _super.prototype.attach.call(this, element);
        this.attachButton();
        return superAttach;
    };
    /* eslint-enable max-statements */
    ButtonComponent.prototype.detach = function (element) {
        if (element && this.refs.button) {
            this.removeShortcut(this.refs.button);
        }
        _super.prototype.detach.call(this);
    };
    ButtonComponent.prototype.onClick = function (event) {
        this.triggerReCaptcha();
        // Don't click if disabled or in builder mode.
        if (this.disabled || this.options.attachMode === 'builder') {
            return;
        }
        this.dataValue = true;
        if (this.component.action !== 'submit' && this.component.showValidations) {
            this.emit('checkValidity', this.data);
        }
        switch (this.component.action) {
            case 'saveState':
            case 'submit':
                event.preventDefault();
                event.stopPropagation();
                this.loading = true;
                this.emit('submitButton', {
                    state: this.component.state || 'submitted',
                    component: this.component,
                    instance: this
                });
                break;
            case 'event':
                this.emit(this.interpolate(this.component.event), this.data);
                this.events.emit(this.interpolate(this.component.event), this.data);
                this.emit('customEvent', {
                    type: this.interpolate(this.component.event),
                    component: this.component,
                    data: this.data,
                    event: event
                });
                break;
            case 'custom': {
                // Get the FormioForm at the root of this component's tree
                var form = this.getRoot();
                var flattened_1 = {};
                var components_1 = {};
                (0, utils_1.eachComponent)(form.components, function (componentWrapper, path) {
                    var component = componentWrapper.component || componentWrapper;
                    flattened_1[path] = component;
                    components_1[component.key] = component;
                }, true);
                this.evaluate(this.component.custom, {
                    form: form,
                    flattened: flattened_1,
                    components: components_1
                });
                this.triggerChange();
                break;
            }
            case 'url':
                this.loading = true;
                this.emit('requestButton', {
                    component: this.component,
                    instance: this
                });
                this.emit('requestUrl', {
                    url: this.interpolate(this.component.url),
                    headers: this.component.headers
                });
                break;
            case 'reset':
                this.emit('resetForm');
                break;
            case 'delete':
                this.emit('deleteSubmission');
                break;
            case 'oauth':
                if (this.root === this) {
                    console.warn('You must add the OAuth button to a form for it to function properly');
                    return;
                }
                // Display Alert if OAuth config is missing
                if (!this.oauthConfig) {
                    this.root.setAlert('danger', 'OAuth not configured. You must configure oauth for your project before it will work.');
                    break;
                }
                // Display Alert if oAuth has an error is missing
                if (this.oauthConfig.error) {
                    this.root.setAlert('danger', "The Following Error Has Occured ".concat(this.oauthConfig.error));
                    break;
                }
                this.openOauth(this.oauthConfig);
                break;
        }
    };
    ButtonComponent.prototype.openOauth = function (settings) {
        var _this = this;
        if (!this.root.formio) {
            console.warn('You must attach a Form API url to your form in order to use OAuth buttons.');
            return;
        }
        /*eslint-disable camelcase */
        var params = {
            response_type: 'code',
            client_id: settings.clientId,
            redirect_uri: (settings.redirectURI && this.interpolate(settings.redirectURI)) || window.location.origin || "".concat(window.location.protocol, "//").concat(window.location.host),
            state: settings.state,
            scope: settings.scope
        };
        /*eslint-enable camelcase */
        // Needs for the correct redirection URI for the OpenID
        var originalRedirectUri = params.redirect_uri;
        // Make display optional.
        if (settings.display) {
            params.display = settings.display;
        }
        params = Object.keys(params).map(function (key) {
            return "".concat(key, "=").concat(encodeURIComponent(params[key]));
        }).join('&');
        var separator = settings.authURI.indexOf('?') !== -1 ? '&' : '?';
        var url = "".concat(settings.authURI).concat(separator).concat(params);
        var popup = window.open(url, settings.provider, 'width=1020,height=618');
        var interval = setInterval(function () {
            try {
                var popupHost = popup.location.host;
                var currentHost = window.location.host;
                if (popup && !popup.closed && popupHost === currentHost) {
                    popup.close();
                    var params_1 = popup.location.search.substr(1).split('&').reduce(function (params, param) {
                        var split = param.split('=');
                        params[split[0]] = split[1];
                        return params;
                    }, {});
                    if (params_1.error) {
                        alert(params_1.error_description || params_1.error);
                        _this.root.setAlert('danger', params_1.error_description || params_1.error);
                        return;
                    }
                    // TODO: check for error response here
                    if (settings.state !== params_1.state) {
                        _this.root.setAlert('danger', 'OAuth state does not match. Please try logging in again.');
                        return;
                    }
                    // Depending on where the settings came from, submit to either the submission endpoint (old) or oauth endpoint (new).
                    var requestPromise = Promise.resolve();
                    if (lodash_1.default.has(_this, 'root.form.config.oauth') && _this.root.form.config.oauth[_this.component.oauthProvider]) {
                        params_1.provider = settings.provider;
                        params_1.redirectURI = originalRedirectUri;
                        // Needs for the exclude oAuth Actions that not related to this button
                        params_1.triggeredBy = _this.oauthComponentPath;
                        requestPromise = _this.root.formio.makeRequest('oauth', "".concat(_this.root.formio.projectUrl, "/oauth2"), 'POST', params_1);
                    }
                    else {
                        var submission = { data: {}, oauth: {} };
                        submission.oauth[settings.provider] = params_1;
                        submission.oauth[settings.provider].redirectURI = originalRedirectUri;
                        if (settings.logoutURI) {
                            _this.root.formio.oauthLogoutURI(settings.logoutURI);
                        }
                        // Needs for the exclude oAuth Actions that not related to this button
                        submission.oauth[settings.provider].triggeredBy = _this.oauthComponentPath;
                        requestPromise = _this.root.formio.saveSubmission(submission);
                    }
                    requestPromise.then(function (result) {
                        _this.root.onSubmit(result, true);
                    })
                        .catch(function (err) {
                        _this.root.onSubmissionError(err);
                    });
                }
            }
            catch (error) {
                if (error.name !== 'SecurityError' && (error.name !== 'Error' || error.message !== 'Permission denied')) {
                    _this.root.setAlert('danger', error.message || error);
                }
            }
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(interval);
            }
        }, 100);
    };
    Object.defineProperty(ButtonComponent.prototype, "oauthComponentPath", {
        get: function () {
            var pathArray = (0, utils_1.getArrayFromComponentPath)(this.path);
            return lodash_1.default.chain(pathArray).filter(function (pathPart) { return !lodash_1.default.isNumber(pathPart); }).join('.').value();
        },
        enumerable: false,
        configurable: true
    });
    ButtonComponent.prototype.focus = function () {
        if (this.refs.button) {
            this.refs.button.focus();
        }
    };
    ButtonComponent.prototype.triggerReCaptcha = function () {
        var _this = this;
        if (!this.root) {
            return;
        }
        var recaptchaComponent;
        this.root.everyComponent(function (component) {
            if (component.component.type === 'recaptcha' &&
                component.component.eventType === 'buttonClick' &&
                component.component.buttonKey === _this.component.key) {
                recaptchaComponent = component;
            }
        });
        if (recaptchaComponent) {
            recaptchaComponent.verify("".concat(this.component.key, "Click"));
        }
    };
    return ButtonComponent;
}(Field_1.default));
exports.default = ButtonComponent;
//# sourceMappingURL=Button.js.map