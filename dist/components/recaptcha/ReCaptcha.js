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
/*globals grecaptcha*/
var Component_1 = __importDefault(require("../_classes/component/Component"));
var Formio_1 = require("../../Formio");
var get_1 = __importDefault(require("lodash/get"));
var debounce_1 = __importDefault(require("lodash/debounce"));
var ReCaptchaComponent = /** @class */ (function (_super) {
    __extends(ReCaptchaComponent, _super);
    function ReCaptchaComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ReCaptchaComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Component_1.default.schema.apply(Component_1.default, __spreadArray([{
                type: 'recaptcha',
                key: 'recaptcha',
                label: 'reCAPTCHA'
            }], extend, false));
    };
    Object.defineProperty(ReCaptchaComponent, "builderInfo", {
        get: function () {
            return {
                title: 'reCAPTCHA',
                group: 'premium',
                icon: 'refresh',
                documentation: '/userguide/form-building/premium-components#recaptcha',
                weight: 40,
                schema: ReCaptchaComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    ReCaptchaComponent.savedValueTypes = function () {
        return [];
    };
    ReCaptchaComponent.prototype.render = function () {
        this.recaptchaResult = null;
        if (this.builderMode) {
            return _super.prototype.render.call(this, 'reCAPTCHA');
        }
        else {
            return _super.prototype.render.call(this, '', true);
        }
    };
    ReCaptchaComponent.prototype.createInput = function () {
        if (this.builderMode) {
            // We need to see it in builder mode.
            this.append(this.text(this.name));
        }
        else {
            var siteKey = (0, get_1.default)(this.root.form, 'settings.recaptcha.siteKey');
            if (siteKey) {
                var recaptchaApiScriptUrl = "https://www.google.com/recaptcha/api.js?render=".concat(siteKey);
                this.recaptchaApiReady = Formio_1.Formio.requireLibrary('googleRecaptcha', 'grecaptcha', recaptchaApiScriptUrl, true);
            }
            else {
                console.warn('There is no Site Key specified in settings in form JSON');
            }
        }
    };
    ReCaptchaComponent.prototype.createLabel = function () {
        return;
    };
    Object.defineProperty(ReCaptchaComponent.prototype, "skipInEmail", {
        get: function () {
            return true;
        },
        enumerable: false,
        configurable: true
    });
    ReCaptchaComponent.prototype.verify = function (actionName) {
        var _this = this;
        var siteKey = (0, get_1.default)(this.root.form, 'settings.recaptcha.siteKey');
        if (!siteKey) {
            console.warn('There is no Site Key specified in settings in form JSON');
            return;
        }
        if (!this.recaptchaApiReady) {
            var recaptchaApiScriptUrl = "https://www.google.com/recaptcha/api.js?render=".concat((0, get_1.default)(this.root.form, 'settings.recaptcha.siteKey'));
            this.recaptchaApiReady = Formio_1.Formio.requireLibrary('googleRecaptcha', 'grecaptcha', recaptchaApiScriptUrl, true);
        }
        if (this.recaptchaApiReady) {
            this.recaptchaVerifiedPromise = new Promise(function (resolve, reject) {
                _this.recaptchaApiReady
                    .then(function () {
                    if (!_this.isLoading) {
                        _this.isLoading = true;
                        grecaptcha.ready((0, debounce_1.default)(function () {
                            grecaptcha
                                .execute(siteKey, {
                                action: actionName
                            })
                                .then(function (token) {
                                return _this.sendVerificationRequest(token).then(function (_a) {
                                    var verificationResult = _a.verificationResult, token = _a.token;
                                    _this.recaptchaResult = __assign(__assign({}, verificationResult), { token: token });
                                    _this.updateValue(_this.recaptchaResult);
                                    return resolve(verificationResult);
                                });
                            })
                                .catch(function () {
                                _this.isLoading = false;
                            });
                        }, 1000));
                    }
                })
                    .catch(function () {
                    return reject();
                });
            }).then(function () {
                _this.isLoading = false;
            });
        }
    };
    ReCaptchaComponent.prototype.beforeSubmit = function () {
        var _this = this;
        if (this.recaptchaVerifiedPromise) {
            return this.recaptchaVerifiedPromise
                .then(function () { return _super.prototype.beforeSubmit.call(_this); });
        }
        return _super.prototype.beforeSubmit.call(this);
    };
    ReCaptchaComponent.prototype.sendVerificationRequest = function (token) {
        return Formio_1.Formio.makeStaticRequest("".concat(Formio_1.Formio.projectUrl, "/recaptcha?recaptchaToken=").concat(token))
            .then(function (verificationResult) { return ({ verificationResult: verificationResult, token: token }); });
    };
    ReCaptchaComponent.prototype.checkComponentValidity = function (data, dirty, row, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        data = data || this.rootValue;
        row = row || this.data;
        var _a = options.async, async = _a === void 0 ? false : _a;
        // Verification could be async only
        if (!async) {
            return _super.prototype.checkComponentValidity.call(this, data, dirty, row, options);
        }
        var componentData = row[this.component.key];
        if (!componentData || !componentData.token) {
            this.setCustomValidity('ReCAPTCHA: Token is not specified in submission');
            return Promise.resolve(false);
        }
        if (!componentData.success) {
            this.setCustomValidity('ReCAPTCHA: Token validation error');
            return Promise.resolve(false);
        }
        return this.hook('validateReCaptcha', componentData.token, function () { return Promise.resolve(true); })
            .then(function (success) { return success; })
            .catch(function (err) {
            _this.setCustomValidity(err.message || err);
            return false;
        });
    };
    ReCaptchaComponent.prototype.normalizeValue = function (newValue) {
        // If a recaptcha result has already been established, then do not allow it to be reset.
        return this.recaptchaResult ? this.recaptchaResult : newValue;
    };
    return ReCaptchaComponent;
}(Component_1.default));
exports.default = ReCaptchaComponent;
//# sourceMappingURL=ReCaptcha.js.map