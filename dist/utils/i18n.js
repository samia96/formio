"use strict";
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
exports.I18n = void 0;
var utils_1 = require("@formio/core/utils");
var i18n_1 = __importDefault(require("../i18n"));
var i18Defaults = {};
for (var lang in i18n_1.default.resources) {
    if (i18n_1.default.resources.hasOwnProperty(lang)) {
        i18Defaults[lang] = i18n_1.default.resources[lang].translation;
    }
}
/**
 * This file is used to mimic the i18n library interface.
 */
var I18n = /** @class */ (function () {
    function I18n(languages) {
        if (languages === void 0) { languages = {}; }
        this.languages = i18Defaults;
        this.language = 'en';
        this.currentLanguage = i18Defaults.en;
        this.setLanguages(languages);
        this.changeLanguage(this.language);
    }
    I18n.prototype.setLanguages = function (languages) {
        if (languages.resources) {
            for (var lang in languages.resources) {
                if (languages.resources.hasOwnProperty(lang)) {
                    languages[lang] = languages.resources[lang].translation;
                }
            }
            delete languages.resources;
        }
        if (languages.lng) {
            languages.language = languages.lng;
            delete languages.lng;
        }
        // Do not use these configurations.
        delete languages.nsSeparator;
        delete languages.keySeparator;
        delete languages.pluralSeparator;
        delete languages.contextSeparator;
        // Now establish the languages default.
        if (languages.language) {
            this.language = languages.language;
        }
        for (var lang in languages) {
            if (lang !== 'language' && languages.hasOwnProperty(lang)) {
                if (!this.languages[lang]) {
                    this.languages[lang] = {};
                }
                this.languages[lang] = __assign(__assign({}, this.languages[lang]), languages[lang]);
            }
        }
    };
    I18n.init = function (languages) {
        if (languages === void 0) { languages = {}; }
        return new I18n(languages);
    };
    I18n.prototype.dir = function (lang) {
        if (lang === void 0) { lang = ''; }
        lang = lang || this.language;
        var rtls = ['ar', 'he', 'fa', 'ps', 'ur'];
        return rtls.includes(lang) ? 'rtl' : 'ltr';
    };
    I18n.createInstance = function () {
        return new I18n();
    };
    I18n.prototype.changeLanguage = function (language, ready) {
        if (ready === void 0) { ready = null; }
        if (!this.languages[language]) {
            language = 'en';
        }
        this.language = language;
        this.currentLanguage = this.languages[language] ? this.languages[language] : {};
        if (ready) {
            ready();
        }
    };
    I18n.prototype.addResourceBundle = function (language, type, strings) {
        this.languages[language] = strings;
    };
    I18n.prototype.t = function (text) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (this.currentLanguage[text]) {
            return utils_1.Evaluator.interpolateString.apply(utils_1.Evaluator, __spreadArray([this.currentLanguage[text]], args, false));
        }
        return utils_1.Evaluator.interpolateString.apply(utils_1.Evaluator, __spreadArray([text], args, false));
    };
    return I18n;
}());
exports.I18n = I18n;
//# sourceMappingURL=i18n.js.map