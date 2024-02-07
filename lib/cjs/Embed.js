"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormBuilder = exports.Form = exports.Formio = void 0;
const CDN_js_1 = __importDefault(require("./CDN.js"));
class Formio {
    static setBaseUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            Formio.baseUrl = url;
        });
    }
    static setProjectUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            Formio.projectUrl = url;
        });
    }
    static debug(...args) {
        if (Formio.config.debug) {
            console.log(...args);
        }
    }
    static clearCache() {
        if (Formio.FormioClass) {
            Formio.FormioClass.clearCache();
        }
    }
    static global(prop) {
        const globalValue = window[prop];
        if (globalValue && globalValue.proxy) {
            return null;
        }
        Formio.debug(`Getting global ${prop}`, globalValue);
        return globalValue;
    }
    static createElement(type, attrs, children) {
        const element = document.createElement(type);
        Object.keys(attrs).forEach(key => {
            element.setAttribute(key, attrs[key]);
        });
        (children || []).forEach(child => {
            element.appendChild(Formio.createElement(child.tag, child.attrs, child.children));
        });
        return element;
    }
    static addScript(wrapper, src, name) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!src) {
                return Promise.resolve();
            }
            if (typeof src !== 'string' && src.length) {
                return Promise.all(src.map(ref => Formio.addScript(wrapper, ref)));
            }
            if (name && Formio.global(name)) {
                Formio.debug(`${name} already loaded.`);
                return Promise.resolve(Formio.global(name));
            }
            Formio.debug('Adding Script', src);
            wrapper.appendChild(Formio.createElement('script', {
                src
            }));
            if (!name) {
                return Promise.resolve();
            }
            return new Promise((resolve) => {
                Formio.debug(`Waiting to load ${name}`);
                const wait = setInterval(() => {
                    if (Formio.global(name)) {
                        clearInterval(wait);
                        Formio.debug(`${name} loaded.`);
                        resolve(Formio.global(name));
                    }
                }, 100);
            });
        });
    }
    static addStyles(wrapper, href) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!href) {
                return;
            }
            if (typeof href !== 'string' && href.length) {
                href.forEach(ref => Formio.addStyles(wrapper, ref));
                return;
            }
            Formio.debug('Adding Styles', href);
            wrapper.appendChild(Formio.createElement('link', {
                rel: 'stylesheet',
                href
            }));
        });
    }
    static submitDone(instance, submission) {
        return __awaiter(this, void 0, void 0, function* () {
            Formio.debug('Submision Complete', submission);
            const successMessage = (Formio.config.success || '').toString();
            if (successMessage && successMessage.toLowerCase() !== 'false' && instance.element) {
                instance.element.innerHTML = `<div class="alert-success" role="alert">${successMessage}</div>`;
            }
            let returnUrl = Formio.config.redirect;
            // Allow form based configuration for return url.
            if (!returnUrl &&
                (instance._form &&
                    instance._form.settings &&
                    (instance._form.settings.returnUrl ||
                        instance._form.settings.redirect))) {
                Formio.debug('Return url found in form configuration');
                returnUrl = instance._form.settings.returnUrl || instance._form.settings.redirect;
            }
            if (returnUrl) {
                const formSrc = instance.formio ? instance.formio.formUrl : '';
                const hasQuery = !!returnUrl.match(/\?/);
                const isOrigin = returnUrl.indexOf(location.origin) === 0;
                returnUrl += hasQuery ? '&' : '?';
                returnUrl += `sub=${submission._id}`;
                if (!isOrigin && formSrc) {
                    returnUrl += `&form=${encodeURIComponent(formSrc)}`;
                }
                Formio.debug('Return URL', returnUrl);
                window.location.href = returnUrl;
                if (isOrigin) {
                    window.location.reload();
                }
            }
        });
    }
    // Return the full script if the builder is being used.
    static formioScript(script, builder) {
        if (Formio.fullAdded || builder) {
            Formio.fullAdded = true;
            return script.replace('formio.form', 'formio.full');
        }
        return script;
    }
    // eslint-disable-next-line max-statements
    static init(element, options = {}, builder = false) {
        return __awaiter(this, void 0, void 0, function* () {
            Formio.cdn = new CDN_js_1.default(Formio.config.cdn);
            Formio.config.libs = Formio.config.libs || {
                uswds: {
                    fa: true,
                    js: `${Formio.cdn.uswds}/uswds.min.js`,
                    css: `${Formio.cdn.uswds}/uswds.min.css`,
                },
                fontawesome: {
                    css: `${Formio.cdn['font-awesome']}/css/font-awesome.min.css`
                },
                bootstrap: {
                    css: `${Formio.cdn.bootstrap}/css/bootstrap.min.css`
                }
            };
            const id = Formio.config.id || `formio-${Math.random().toString(36).substring(7)}`;
            // Create a new wrapper and add the element inside of a new wrapper.
            let wrapper = Formio.createElement('div', {
                'id': `"${id}-wrapper"`
            });
            element.parentNode.insertBefore(wrapper, element);
            // If we include the libraries, then we will attempt to run this in shadow dom.
            if (Formio.config.includeLibs && (typeof wrapper.attachShadow === 'function') && !Formio.config.premium) {
                wrapper = wrapper.attachShadow({
                    mode: 'open'
                });
                options.shadowRoot = wrapper;
            }
            element.parentNode.removeChild(element);
            wrapper.appendChild(element);
            // Load the renderer styles.
            yield Formio.addStyles(wrapper, Formio.config.embedCSS || `${Formio.cdn.js}/formio.embed.css`);
            // Add a loader.
            wrapper.appendChild(Formio.createElement('div', {
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
                }]));
            Formio.FormioClass = yield Formio.addScript(wrapper, Formio.formioScript(Formio.config.script || `${Formio.cdn.js}/formio.form.min.js`, builder), 'Formio');
            Formio.FormioClass.setBaseUrl(Formio.baseUrl || Formio.config.base);
            Formio.FormioClass.setProjectUrl(Formio.projectUrl || Formio.config.project);
            Formio.FormioClass.language = Formio.language;
            // Add premium modules
            if (Formio.global('premium')) {
                Formio.debug('Using premium module.');
                Formio.FormioClass.use(Formio.global('premium'));
            }
            if (Formio.global('vpat')) {
                Formio.debug('Using vpat module.');
                Formio.FormioClass.use(Formio.global('vpat'));
            }
            if (Formio.config.template) {
                if (Formio.config.includeLibs) {
                    yield Formio.addStyles(wrapper, Formio.config.libs[Formio.config.template].css);
                    yield Formio.addScript(wrapper, Formio.config.libs[Formio.config.template].js);
                    if (Formio.config.libs[Formio.config.template].fa) {
                        yield Formio.addStyles(wrapper, Formio.config.libs.fontawesome.css);
                    }
                }
                if (Formio.cdn[Formio.config.template]) {
                    const templateSrc = `${Formio.cdn[Formio.config.template]}/${Formio.config.template}.min`;
                    yield Formio.addStyles(wrapper, `${templateSrc}.css`);
                    Formio.debug(`Using ${Formio.config.template}`);
                    Formio.FormioClass.use(yield Formio.addScript(wrapper, `${templateSrc}.js`, Formio.config.template));
                }
            }
            else if (Formio.global('uswds')) {
                Formio.debug('Using uswds module.');
                Formio.FormioClass.use(Formio.global('uswds'));
            }
            // Default bootstrap + fontawesome.
            else if (Formio.config.includeLibs) {
                yield Formio.addStyles(wrapper, Formio.config.libs.fontawesome.css);
                yield Formio.addStyles(wrapper, Formio.config.libs.bootstrap.css);
            }
            if (Formio.config.premium) {
                yield Formio.addStyles(wrapper, Formio.config.premium.css);
                Formio.debug('Using premium');
                Formio.FormioClass.use(yield Formio.addScript(wrapper, Formio.config.premium.js, 'premium'));
            }
            yield Formio.addStyles(wrapper, Formio.formioScript(Formio.config.style || `${Formio.cdn.js}/formio.form.min.css`, builder));
            if (Formio.config.before) {
                yield Formio.config.before(Formio.FormioClass, element, Formio.config);
            }
            Formio.FormioClass.license = true;
            return wrapper;
        });
    }
    static createForm(element, form, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const wrapper = yield Formio.init(element, options);
            return Formio.FormioClass.createForm(element, form, Object.assign(Object.assign({}, options), { noLoader: true })).then((instance) => {
                Formio.debug('Form created', instance);
                // Remove the loader.
                Formio.debug('Removing loader');
                wrapper.removeChild(wrapper.querySelector('.formio-loader'));
                // Set the default submission data.
                if (Formio.config.submission) {
                    Formio.debug('Setting submission', Formio.config.submission);
                    instance.submission = Formio.config.submission;
                }
                // Allow them to provide additional configs.
                Formio.debug('Triggering embed event');
                Formio.FormioClass.events.emit('formEmbedded', instance);
                // Trigger the after handler.
                if (Formio.config.after) {
                    Formio.debug('Calling ready callback');
                    Formio.config.after(instance, Formio.config);
                }
                return instance;
            });
        });
    }
    static builder(element, form, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const wrapper = yield Formio.init(element, options, true);
            return Formio.FormioClass.builder(element, form, options).then((instance) => {
                Formio.debug('Builder created', instance);
                Formio.debug('Removing loader');
                wrapper.removeChild(wrapper.querySelector('.formio-loader'));
                Formio.debug('Triggering embed event');
                Formio.FormioClass.events.emit('builderEmbedded', instance);
                if (Formio.config.after) {
                    Formio.debug('Calling ready callback');
                    Formio.config.after(instance, Formio.config);
                }
                return instance;
            });
        });
    }
}
Formio.config = {};
Formio.cdn = null;
Formio.proxy = true;
Formio.version = 'FORMIO_VERSION';
exports.Formio = Formio;
class Form {
    constructor(element, form, options) {
        this.form = form;
        this.element = element;
        this.options = options || {};
        this.init();
        this.instance = {
            proxy: true,
            ready: this.ready,
            destroy: () => { }
        };
    }
    init() {
        this.element.innerHTML = '';
        this.ready = this.create().then((instance) => {
            this.instance = instance;
            this.form = instance.form;
            return instance;
        });
    }
    create() {
        return Formio.createForm(this.element, this.form, this.options);
    }
    setDisplay(display) {
        if (this.instance.proxy) {
            return this.ready;
        }
        this.form.display = display;
        this.init();
        return this.ready;
    }
}
exports.Form = Form;
class FormBuilder extends Form {
    create() {
        return Formio.builder(this.element, this.form, this.options);
    }
}
exports.FormBuilder = FormBuilder;
Formio.Form = Form;
Formio.FormBuilder = FormBuilder;
