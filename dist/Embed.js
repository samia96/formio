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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormBuilder = exports.Form = exports.Formio = void 0;
var CDN_js_1 = __importDefault(require("./CDN.js"));
var Formio = exports.Formio = /** @class */ (function () {
    function Formio() {
    }
    Formio.setBaseUrl = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Formio.baseUrl = url;
                return [2 /*return*/];
            });
        });
    };
    Formio.setProjectUrl = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Formio.projectUrl = url;
                return [2 /*return*/];
            });
        });
    };
    Formio.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (Formio.config.debug) {
            console.log.apply(console, args);
        }
    };
    Formio.clearCache = function () {
        if (Formio.FormioClass) {
            Formio.FormioClass.clearCache();
        }
    };
    Formio.global = function (prop) {
        var globalValue = window[prop];
        if (globalValue && globalValue.proxy) {
            return null;
        }
        Formio.debug("Getting global ".concat(prop), globalValue);
        return globalValue;
    };
    Formio.createElement = function (type, attrs, children) {
        var element = document.createElement(type);
        Object.keys(attrs).forEach(function (key) {
            element.setAttribute(key, attrs[key]);
        });
        (children || []).forEach(function (child) {
            element.appendChild(Formio.createElement(child.tag, child.attrs, child.children));
        });
        return element;
    };
    Formio.addScript = function (wrapper, src, name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!src) {
                    return [2 /*return*/, Promise.resolve()];
                }
                if (typeof src !== 'string' && src.length) {
                    return [2 /*return*/, Promise.all(src.map(function (ref) { return Formio.addScript(wrapper, ref); }))];
                }
                if (name && Formio.global(name)) {
                    Formio.debug("".concat(name, " already loaded."));
                    return [2 /*return*/, Promise.resolve(Formio.global(name))];
                }
                Formio.debug('Adding Script', src);
                wrapper.appendChild(Formio.createElement('script', {
                    src: src
                }));
                if (!name) {
                    return [2 /*return*/, Promise.resolve()];
                }
                return [2 /*return*/, new Promise(function (resolve) {
                        Formio.debug("Waiting to load ".concat(name));
                        var wait = setInterval(function () {
                            if (Formio.global(name)) {
                                clearInterval(wait);
                                Formio.debug("".concat(name, " loaded."));
                                resolve(Formio.global(name));
                            }
                        }, 100);
                    })];
            });
        });
    };
    Formio.addStyles = function (wrapper, href) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (!href) {
                    return [2 /*return*/];
                }
                if (typeof href !== 'string' && href.length) {
                    href.forEach(function (ref) { return Formio.addStyles(wrapper, ref); });
                    return [2 /*return*/];
                }
                Formio.debug('Adding Styles', href);
                wrapper.appendChild(Formio.createElement('link', {
                    rel: 'stylesheet',
                    href: href
                }));
                return [2 /*return*/];
            });
        });
    };
    Formio.submitDone = function (instance, submission) {
        return __awaiter(this, void 0, void 0, function () {
            var successMessage, returnUrl, formSrc, hasQuery, isOrigin;
            return __generator(this, function (_a) {
                Formio.debug('Submision Complete', submission);
                successMessage = (Formio.config.success || '').toString();
                if (successMessage && successMessage.toLowerCase() !== 'false' && instance.element) {
                    instance.element.innerHTML = "<div class=\"alert-success\" role=\"alert\">".concat(successMessage, "</div>");
                }
                returnUrl = Formio.config.redirect;
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
                    formSrc = instance.formio ? instance.formio.formUrl : '';
                    hasQuery = !!returnUrl.match(/\?/);
                    isOrigin = returnUrl.indexOf(location.origin) === 0;
                    returnUrl += hasQuery ? '&' : '?';
                    returnUrl += "sub=".concat(submission._id);
                    if (!isOrigin && formSrc) {
                        returnUrl += "&form=".concat(encodeURIComponent(formSrc));
                    }
                    Formio.debug('Return URL', returnUrl);
                    window.location.href = returnUrl;
                    if (isOrigin) {
                        window.location.reload();
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    // Return the full script if the builder is being used.
    Formio.formioScript = function (script, builder) {
        if (Formio.fullAdded || builder) {
            Formio.fullAdded = true;
            return script.replace('formio.form', 'formio.full');
        }
        return script;
    };
    // eslint-disable-next-line max-statements
    Formio.init = function (element, options, builder) {
        if (options === void 0) { options = {}; }
        if (builder === void 0) { builder = false; }
        return __awaiter(this, void 0, void 0, function () {
            var id, wrapper, _a, templateSrc, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        Formio.cdn = new CDN_js_1.default(Formio.config.cdn);
                        Formio.config.libs = Formio.config.libs || {
                            uswds: {
                                fa: true,
                                js: "".concat(Formio.cdn.uswds, "/uswds.min.js"),
                                css: "".concat(Formio.cdn.uswds, "/uswds.min.css"),
                            },
                            fontawesome: {
                                css: "".concat(Formio.cdn['font-awesome'], "/css/font-awesome.min.css")
                            },
                            bootstrap: {
                                css: "".concat(Formio.cdn.bootstrap, "/css/bootstrap.min.css")
                            }
                        };
                        id = Formio.config.id || "formio-".concat(Math.random().toString(36).substring(7));
                        wrapper = Formio.createElement('div', {
                            'id': "\"".concat(id, "-wrapper\"")
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
                        return [4 /*yield*/, Formio.addStyles(wrapper, Formio.config.embedCSS || "".concat(Formio.cdn.js, "/formio.embed.css"))];
                    case 1:
                        // Load the renderer styles.
                        _f.sent();
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
                        _a = Formio;
                        return [4 /*yield*/, Formio.addScript(wrapper, Formio.formioScript(Formio.config.script || "".concat(Formio.cdn.js, "/formio.form.min.js"), builder), 'Formio')];
                    case 2:
                        _a.FormioClass = _f.sent();
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
                        if (!Formio.config.template) return [3 /*break*/, 10];
                        if (!Formio.config.includeLibs) return [3 /*break*/, 6];
                        return [4 /*yield*/, Formio.addStyles(wrapper, Formio.config.libs[Formio.config.template].css)];
                    case 3:
                        _f.sent();
                        return [4 /*yield*/, Formio.addScript(wrapper, Formio.config.libs[Formio.config.template].js)];
                    case 4:
                        _f.sent();
                        if (!Formio.config.libs[Formio.config.template].fa) return [3 /*break*/, 6];
                        return [4 /*yield*/, Formio.addStyles(wrapper, Formio.config.libs.fontawesome.css)];
                    case 5:
                        _f.sent();
                        _f.label = 6;
                    case 6:
                        if (!Formio.cdn[Formio.config.template]) return [3 /*break*/, 9];
                        templateSrc = "".concat(Formio.cdn[Formio.config.template], "/").concat(Formio.config.template, ".min");
                        return [4 /*yield*/, Formio.addStyles(wrapper, "".concat(templateSrc, ".css"))];
                    case 7:
                        _f.sent();
                        Formio.debug("Using ".concat(Formio.config.template));
                        _c = (_b = Formio.FormioClass).use;
                        return [4 /*yield*/, Formio.addScript(wrapper, "".concat(templateSrc, ".js"), Formio.config.template)];
                    case 8:
                        _c.apply(_b, [_f.sent()]);
                        _f.label = 9;
                    case 9: return [3 /*break*/, 14];
                    case 10:
                        if (!Formio.global('uswds')) return [3 /*break*/, 11];
                        Formio.debug('Using uswds module.');
                        Formio.FormioClass.use(Formio.global('uswds'));
                        return [3 /*break*/, 14];
                    case 11:
                        if (!Formio.config.includeLibs) return [3 /*break*/, 14];
                        return [4 /*yield*/, Formio.addStyles(wrapper, Formio.config.libs.fontawesome.css)];
                    case 12:
                        _f.sent();
                        return [4 /*yield*/, Formio.addStyles(wrapper, Formio.config.libs.bootstrap.css)];
                    case 13:
                        _f.sent();
                        _f.label = 14;
                    case 14:
                        if (!Formio.config.premium) return [3 /*break*/, 17];
                        return [4 /*yield*/, Formio.addStyles(wrapper, Formio.config.premium.css)];
                    case 15:
                        _f.sent();
                        Formio.debug('Using premium');
                        _e = (_d = Formio.FormioClass).use;
                        return [4 /*yield*/, Formio.addScript(wrapper, Formio.config.premium.js, 'premium')];
                    case 16:
                        _e.apply(_d, [_f.sent()]);
                        _f.label = 17;
                    case 17: return [4 /*yield*/, Formio.addStyles(wrapper, Formio.formioScript(Formio.config.style || "".concat(Formio.cdn.js, "/formio.form.min.css"), builder))];
                    case 18:
                        _f.sent();
                        if (!Formio.config.before) return [3 /*break*/, 20];
                        return [4 /*yield*/, Formio.config.before(Formio.FormioClass, element, Formio.config)];
                    case 19:
                        _f.sent();
                        _f.label = 20;
                    case 20:
                        Formio.FormioClass.license = true;
                        return [2 /*return*/, wrapper];
                }
            });
        });
    };
    Formio.createForm = function (element, form, options) {
        return __awaiter(this, void 0, void 0, function () {
            var wrapper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Formio.init(element, options)];
                    case 1:
                        wrapper = _a.sent();
                        return [2 /*return*/, Formio.FormioClass.createForm(element, form, __assign(__assign({}, options), { noLoader: true })).then(function (instance) {
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
                            })];
                }
            });
        });
    };
    Formio.builder = function (element, form, options) {
        return __awaiter(this, void 0, void 0, function () {
            var wrapper;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Formio.init(element, options, true)];
                    case 1:
                        wrapper = _a.sent();
                        return [2 /*return*/, Formio.FormioClass.builder(element, form, options).then(function (instance) {
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
                            })];
                }
            });
        });
    };
    Formio.config = {};
    Formio.cdn = null;
    Formio.proxy = true;
    Formio.version = 'FORMIO_VERSION';
    return Formio;
}());
var Form = /** @class */ (function () {
    function Form(element, form, options) {
        this.form = form;
        this.element = element;
        this.options = options || {};
        this.init();
        this.instance = {
            proxy: true,
            ready: this.ready,
            destroy: function () { }
        };
    }
    Form.prototype.init = function () {
        var _this = this;
        this.element.innerHTML = '';
        this.ready = this.create().then(function (instance) {
            _this.instance = instance;
            _this.form = instance.form;
            return instance;
        });
    };
    Form.prototype.create = function () {
        return Formio.createForm(this.element, this.form, this.options);
    };
    Form.prototype.setDisplay = function (display) {
        if (this.instance.proxy) {
            return this.ready;
        }
        this.form.display = display;
        this.init();
        return this.ready;
    };
    return Form;
}());
exports.Form = Form;
var FormBuilder = /** @class */ (function (_super) {
    __extends(FormBuilder, _super);
    function FormBuilder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormBuilder.prototype.create = function () {
        return Formio.builder(this.element, this.form, this.options);
    };
    return FormBuilder;
}(Form));
exports.FormBuilder = FormBuilder;
Formio.Form = Form;
Formio.FormBuilder = FormBuilder;
//# sourceMappingURL=Embed.js.map