"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*globals grecaptcha*/
const Component_1 = __importDefault(require("../_classes/component/Component"));
const Formio_1 = require("../../Formio");
const get_1 = __importDefault(require("lodash/get"));
const debounce_1 = __importDefault(require("lodash/debounce"));
class ReCaptchaComponent extends Component_1.default {
    static schema(...extend) {
        return Component_1.default.schema({
            type: 'recaptcha',
            key: 'recaptcha',
            label: 'reCAPTCHA'
        }, ...extend);
    }
    static get builderInfo() {
        return {
            title: 'reCAPTCHA',
            group: 'premium',
            icon: 'refresh',
            documentation: '/userguide/form-building/premium-components#recaptcha',
            weight: 40,
            schema: ReCaptchaComponent.schema()
        };
    }
    static savedValueTypes() {
        return [];
    }
    render() {
        this.recaptchaResult = null;
        if (this.builderMode) {
            return super.render('reCAPTCHA');
        }
        else {
            return super.render('', true);
        }
    }
    createInput() {
        if (this.builderMode) {
            // We need to see it in builder mode.
            this.append(this.text(this.name));
        }
        else {
            const siteKey = (0, get_1.default)(this.root.form, 'settings.recaptcha.siteKey');
            if (siteKey) {
                const recaptchaApiScriptUrl = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
                this.recaptchaApiReady = Formio_1.Formio.requireLibrary('googleRecaptcha', 'grecaptcha', recaptchaApiScriptUrl, true);
            }
            else {
                console.warn('There is no Site Key specified in settings in form JSON');
            }
        }
    }
    createLabel() {
        return;
    }
    get skipInEmail() {
        return true;
    }
    verify(actionName) {
        const siteKey = (0, get_1.default)(this.root.form, 'settings.recaptcha.siteKey');
        if (!siteKey) {
            console.warn('There is no Site Key specified in settings in form JSON');
            return;
        }
        if (!this.recaptchaApiReady) {
            const recaptchaApiScriptUrl = `https://www.google.com/recaptcha/api.js?render=${(0, get_1.default)(this.root.form, 'settings.recaptcha.siteKey')}`;
            this.recaptchaApiReady = Formio_1.Formio.requireLibrary('googleRecaptcha', 'grecaptcha', recaptchaApiScriptUrl, true);
        }
        if (this.recaptchaApiReady) {
            this.recaptchaVerifiedPromise = new Promise((resolve, reject) => {
                this.recaptchaApiReady
                    .then(() => {
                    if (!this.isLoading) {
                        this.isLoading = true;
                        grecaptcha.ready((0, debounce_1.default)(() => {
                            grecaptcha
                                .execute(siteKey, {
                                action: actionName
                            })
                                .then((token) => {
                                return this.sendVerificationRequest(token).then(({ verificationResult, token }) => {
                                    this.recaptchaResult = Object.assign(Object.assign({}, verificationResult), { token });
                                    this.updateValue(this.recaptchaResult);
                                    return resolve(verificationResult);
                                });
                            })
                                .catch(() => {
                                this.isLoading = false;
                            });
                        }, 1000));
                    }
                })
                    .catch(() => {
                    return reject();
                });
            }).then(() => {
                this.isLoading = false;
            });
        }
    }
    beforeSubmit() {
        if (this.recaptchaVerifiedPromise) {
            return this.recaptchaVerifiedPromise
                .then(() => super.beforeSubmit());
        }
        return super.beforeSubmit();
    }
    sendVerificationRequest(token) {
        return Formio_1.Formio.makeStaticRequest(`${Formio_1.Formio.projectUrl}/recaptcha?recaptchaToken=${token}`)
            .then((verificationResult) => ({ verificationResult, token }));
    }
    checkComponentValidity(data, dirty, row, options = {}) {
        data = data || this.rootValue;
        row = row || this.data;
        const { async = false } = options;
        // Verification could be async only
        if (!async) {
            return super.checkComponentValidity(data, dirty, row, options);
        }
        const componentData = row[this.component.key];
        if (!componentData || !componentData.token) {
            this.setCustomValidity('ReCAPTCHA: Token is not specified in submission');
            return Promise.resolve(false);
        }
        if (!componentData.success) {
            this.setCustomValidity('ReCAPTCHA: Token validation error');
            return Promise.resolve(false);
        }
        return this.hook('validateReCaptcha', componentData.token, () => Promise.resolve(true))
            .then((success) => success)
            .catch((err) => {
            this.setCustomValidity(err.message || err);
            return false;
        });
    }
    normalizeValue(newValue) {
        // If a recaptcha result has already been established, then do not allow it to be reset.
        return this.recaptchaResult ? this.recaptchaResult : newValue;
    }
}
exports.default = ReCaptchaComponent;
