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
var FormioAddon_1 = __importDefault(require("../FormioAddon"));
var PasswordStrengthAddon_form_1 = __importDefault(require("./PasswordStrengthAddon.form"));
var PasswordStrengthAddon = /** @class */ (function (_super) {
    __extends(PasswordStrengthAddon, _super);
    function PasswordStrengthAddon(settings, componentInstance) {
        var _this = _super.call(this, settings, componentInstance) || this;
        _this._entropy = 0; // Set initial value of entropy
        _this.levels = __spreadArray([], (_this.settings.levels || _this.defaultSettings.levels), true);
        _this.levels.sort(function (a, b) { return a.maxEntropy - b.maxEntropy; }); // Sort levels from the lowest one to the highest
        _this.level = _this.levels[0]; // Set currnt level to the lowest one
        _this.maxEntropy = _this.levels[_this.levels.length - 1].maxEntropy; // Set maximal amount of security points based on the highest level
        return _this;
    }
    Object.defineProperty(PasswordStrengthAddon, "info", {
        get: function () {
            return {
                supportedComponents: ['password'],
                name: 'passwordStrength',
                components: PasswordStrengthAddon_form_1.default,
                label: 'Password Strength',
                defaultSettings: {
                    rulesSettings: [
                        { name: 'length', required: false, message: 'Value should be longer' },
                        { name: 'upperCase', required: false, message: 'Value should have uppercase letters' },
                        { name: 'numeric', required: false, message: 'Value should have numeric symbols' },
                        { name: 'lowerCase', required: false, message: 'Value should be have lowercase letters' },
                        { name: 'symbols', required: false, message: 'Value should have symbols' }
                    ],
                    updateOn: 'levelChange',
                    required: true,
                    levels: [
                        { name: 'Low', maxEntropy: 28, style: 'danger' },
                        { name: 'Medium', maxEntropy: 45, style: 'warning' },
                        { name: 'High', maxEntropy: 59, style: 'info' },
                        { name: 'Very High', maxEntropy: 85, style: 'success' },
                    ],
                    blackList: [],
                    template: "\n          <div class=\"formio-security-indicator\">\n            {% if (!ctx.readOnly && !ctx.pristine) { %}\n              <div\n                title=\"{{ctx.t(ctx.tooltip)}}\"\n                class=\"security-{{ctx.levelName}} {{ ctx.level.style ? 'bg-' + ctx.level.style : ''}}\"\n                style=\"{{ctx.level.color ? 'background-color: ' + ctx.level.color + ';' : ''}}\"\n              ></div>\n            {% } %}\n          </div>\n        ",
                    location: {
                        insert: 'after',
                        selector: '[ref="element"]'
                    }
                }
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordStrengthAddon.prototype, "defaultSettings", {
        get: function () {
            return PasswordStrengthAddon.info.defaultSettings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordStrengthAddon.prototype, "rules", {
        get: function () {
            var _this = this;
            return {
                length: {
                    check: function (value, options) {
                        var minLength = options.minLength || _this.component.component.validate.minLength || 6;
                        if (value.length < minLength) {
                            return "Value must be longer than ".concat(minLength, " characters");
                        }
                        return true;
                    }
                },
                upperCase: {
                    check: function (value) {
                        if (/[A-Z]/g.test(value)) {
                            return true;
                        }
                        return 'Value must contain uppercased alphabetical characters';
                    },
                    increaseCharactersPoolSize: 26
                },
                numeric: {
                    check: function (value) {
                        if (/[0-9]/g.test(value)) {
                            return true;
                        }
                        return 'Value must contain numeric characters';
                    },
                    increaseCharactersPoolSize: 10,
                },
                lowerCase: {
                    check: function (value) {
                        if (/[a-z]/g.test(value)) {
                            return true;
                        }
                        return 'Value must contain lowercased alphabetical characters';
                    },
                    increaseCharactersPoolSize: 26,
                },
                symbols: {
                    check: function (value) {
                        if (/[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/.test(value)) {
                            return true;
                        }
                        return 'Value must contain symbols';
                    },
                    increaseCharactersPoolSize: 32,
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordStrengthAddon.prototype, "charactersPoolLength", {
        get: function () {
            return this._charactersPoolLength;
        },
        set: function (value) {
            this._charactersPoolLength = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordStrengthAddon.prototype, "level", {
        get: function () {
            return this._level || this.getLevel();
        },
        set: function (level) {
            this._level = level;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordStrengthAddon.prototype, "entropy", {
        get: function () {
            return this._entropy;
        },
        set: function (value) {
            var oldLevel = this.getLevel();
            var updateOnEntropyChange = this.settings.updateOn === 'entropyChange' && this._entropy !== value;
            this._entropy = value;
            this.level = this.getLevel();
            var updateOnLevelChange = this.settings.updateOn === 'levelChange' && oldLevel.name !== this.level.name;
            if (updateOnLevelChange || updateOnEntropyChange) {
                this.updateView();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordStrengthAddon.prototype, "dictionarySize", {
        get: function () {
            return this.settings.dictionarySize || 171476;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordStrengthAddon.prototype, "template", {
        get: function () {
            return this.settings.template;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordStrengthAddon.prototype, "tooltip", {
        get: function () {
            var _a, _b;
            return ((_a = this.level) === null || _a === void 0 ? void 0 : _a.tooltip) || "".concat((_b = this.level) === null || _b === void 0 ? void 0 : _b.name, " strongness");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordStrengthAddon.prototype, "rulesSettings", {
        get: function () {
            return this.settings.rulesSettings || [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PasswordStrengthAddon.prototype, "customRules", {
        get: function () {
            return this.settings.customRules || [];
        },
        enumerable: false,
        configurable: true
    });
    PasswordStrengthAddon.prototype.log2 = function (value) {
        if (typeof Math.log2 === 'function') {
            return Math.log2(value);
        }
        return Math.log(value) * Math.LOG2E;
    };
    PasswordStrengthAddon.prototype.calculatePasswordEntropy = function (passwordLength, charactersPoolSize) {
        return !passwordLength || !charactersPoolSize ? 0 : this.log2(Math.pow(charactersPoolSize, passwordLength));
    };
    PasswordStrengthAddon.prototype.calculatePasswordEntropyWords = function (wordsCount) {
        return !this.dictionarySize ? 0 : this.log2(this.dictionarySize) * wordsCount;
    };
    PasswordStrengthAddon.prototype.render = function () {
        var view = this.component.interpolate(this.template, {
            entropy: this.entropy,
            maxEntropy: this.maxEntropy,
            level: this.level,
            levelName: this.level.name.replace(' ', '-').toLowerCase(),
            levels: this.levels,
            readOnly: this.component.options.readOnly,
            pristine: this.component.pristine,
            t: this.t.bind(this),
            tooltip: this.tooltip,
        });
        return this.component.sanitize(view);
    };
    PasswordStrengthAddon.prototype.checkBlackList = function (value) {
        var blackList = __spreadArray([], this.settings.blackList, true);
        var customBlacklistedWords = this.settings.customBlacklistedWords;
        if (customBlacklistedWords && typeof customBlacklistedWords === 'string') {
            customBlacklistedWords = this.evaluate(customBlacklistedWords, this.component.evalContext({ value: value }), 'values');
            if (customBlacklistedWords && customBlacklistedWords.length) {
                blackList.push.apply(blackList, customBlacklistedWords);
            }
        }
        var restValue = value;
        var blacklistedWords = [];
        for (var i = 0; i < blackList.length; i++) {
            var word = blackList[i];
            var regExp = new RegExp("".concat(word), 'gi');
            if (regExp.test(value)) {
                blacklistedWords.push(word);
                restValue = restValue.replace(regExp, '');
            }
            // If less the 3 symboles left, just stop iterating
            if (restValue.length < 3) {
                break;
            }
        }
        if (blacklistedWords.length) {
            // If there are some random characters except of blacklisted words in the password,
            // calculate the entropy for them
            var charactersPoolSize = (restValue.length ? this.performChecks(restValue) : 0).charactersPoolSize;
            var entropyOfNonblacklistedValue = this.calculatePasswordEntropy(restValue.length, charactersPoolSize);
            // Calculate the entropy if the biggest part of the password could be picked up from dictionary words
            var dictionaryCheckEntropy = this.calculatePasswordEntropyWords(blacklistedWords.length);
            var entropy = dictionaryCheckEntropy + entropyOfNonblacklistedValue;
            return { entropy: entropy, blacklistedWords: blacklistedWords };
        }
        return true;
    };
    /**
     * Determines is a password is secure enough to submit
     * @return {boolean}
     */
    PasswordStrengthAddon.prototype.isValid = function () {
        var isValidCheck = this.settings.isValid;
        if (isValidCheck && typeof isValidCheck === 'string') {
            var valid = this.evaluate(isValidCheck, this.component.evalContext({
                entropy: this.entropy,
                level: this.level
            }), 'valid');
            return valid;
        }
        return this.entropy >= Math.round(this.maxEntropy / 2);
    };
    /**
     * Handles the result of check and constructs a new error object or returns an amount of points to add to the current entropy
     * @param {boolean|number} valid - Determines if the validation was failed or an amount of points if it was passed
     * @param {*} validation - Validation configuration
     * @param {string} value - Value which was validated
     * @param {string} message - Message which should be shown if validation was not passed
     */
    PasswordStrengthAddon.prototype.handleRuleCheckResult = function (valid, validation, message, errors) {
        if (valid !== true) {
            errors.push({
                validation: validation.name,
                message: message,
                level: validation.required ? 'error' : 'warning'
            });
        }
        else if (validation.increaseCharactersPoolSize) {
            return validation.increaseCharactersPoolSize;
        }
        return 0;
    };
    PasswordStrengthAddon.prototype.performChecks = function (value) {
        var _this = this;
        var errors = [];
        var charactersPoolSize = 0;
        this.rulesSettings.forEach(function (settings) {
            if (_this.rules[settings.name]) {
                var rule = lodash_1.default.merge({}, _this.rules[settings.name], settings);
                var valid = rule.check(value, settings.options || {});
                var message = settings.message || valid;
                charactersPoolSize += _this.handleRuleCheckResult(valid, rule, message, errors);
            }
        });
        this.customRules.forEach(function (rule) {
            if (rule.check && typeof rule.check === 'string') {
                var valid = _this.evaluate(rule.check, _this.component.evalContext({ value: value }), 'valid');
                var message = typeof valid === 'string' ? valid : "Password does not meet ".concat(rule.name, " validation");
                charactersPoolSize += _this.handleRuleCheckResult(valid, rule, message, errors);
            }
        });
        return {
            charactersPoolSize: charactersPoolSize,
            errors: errors
        };
    };
    /**
     * Performs checks to validate password security
     * @param {string} value - Suggested password
     */
    PasswordStrengthAddon.prototype.checkValidity = function (value) {
        var _a;
        var passwordLength = value.length;
        var _b = this.performChecks(value), charactersPoolSize = _b.charactersPoolSize, errors = _b.errors;
        this.errors = errors;
        var entropy = this.calculatePasswordEntropy(passwordLength, charactersPoolSize);
        var blackListCheck = ((_a = this.settings.blackList) === null || _a === void 0 ? void 0 : _a.length) || this.settings.customBlacklistedWords ?
            this.checkBlackList(value)
            : null;
        // If there were found some words from the black list
        if (blackListCheck && blackListCheck !== true) {
            this.handleBlackListCheckResult(blackListCheck);
            // Select the mininal entropy based on the dictionary check or symbolic check
            this.entropy = Math.min(entropy, blackListCheck.entropy);
        }
        else {
            this.entropy = entropy;
        }
        var isValid = this.isValid();
        if (!isValid) {
            this.errors.push({
                message: 'Password is not strong enough',
                level: this.settings.required ? 'error' : 'warning'
            });
        }
        return !this.errors.length;
    };
    PasswordStrengthAddon.prototype.handleBlackListCheckResult = function (result) {
        var blacklistedWords = result.blacklistedWords;
        var isRequired = this.settings.disableBlacklistedWords;
        var message = "Password ".concat(isRequired ? 'must' : 'should', " not include common words: ").concat(blacklistedWords.join(', '));
        var validation = {
            name: 'blacklist',
            required: isRequired,
        };
        this.handleRuleCheckResult(false, validation, message, this.errors);
    };
    PasswordStrengthAddon.prototype.attach = function (element) {
        var _this = this;
        _super.prototype.attach.call(this, element);
        var container = this.component.ce('div', { ref: 'passwordStrengthIndicator' });
        var inserted = this.insertContainer(element, container);
        if (!inserted) {
            this.component.append(container);
        }
        this._element = container;
        this.component.on('redraw', function () { return _this.updateView(); });
        this.component.on('componentError', function () { return _this.updateView(); });
        this.updateView();
    };
    PasswordStrengthAddon.prototype.insertContainer = function (element, container) {
        var _a, _b;
        if (!element || !container) {
            return false;
        }
        var insert = (_a = this.settings.location) === null || _a === void 0 ? void 0 : _a.insert;
        var selector = (_b = this.settings.location) === null || _b === void 0 ? void 0 : _b.selector;
        var reference;
        if (selector) {
            reference = element.querySelector(selector);
        }
        if (reference) {
            var parent = reference.parentNode;
            switch (insert) {
                case 'after':
                    if (parent) {
                        parent.insertBefore(container, reference.nextSibling || null);
                        return true;
                    }
                    return false;
                case 'before':
                    if (parent) {
                        parent.insertBefore(container, reference);
                        return true;
                    }
                    return false;
                default:
                    console.warn("Unknown insert option: ".concat(insert));
                    return false;
            }
        }
        else {
            console.warn("No elements found using selector: ".concat(selector));
            return false;
        }
    };
    PasswordStrengthAddon.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
    };
    /**
     * Finds the level which one the passed entropy suits
     * @param {number} entropy - Points of password's security
     */
    PasswordStrengthAddon.prototype.getLevel = function (entropy) {
        if (entropy === void 0) { entropy = this.entropy; }
        var lowestLevel = this.levels[0];
        var prevMaxEntropy = lowestLevel.maxEntropy;
        if (entropy <= lowestLevel.maxEntropy) {
            return lowestLevel;
        }
        if (entropy >= this.maxEntropy) {
            return this.levels[this.levels.length - 1];
        }
        // Iterate through levels and find the one which the passed entropy belongs to
        for (var i = 1; i < this.levels.length; i++) {
            var level = this.levels[i];
            if (entropy > prevMaxEntropy && entropy <= level.maxEntropy) {
                return level;
            }
            prevMaxEntropy = level.maxEntropy;
        }
        return lowestLevel;
    };
    /**
     * Update the current view of the password's security indicator
     */
    PasswordStrengthAddon.prototype.updateView = function () {
        if (!this.element) {
            return;
        }
        var view = this.render();
        this.element.innerHTML = view;
    };
    return PasswordStrengthAddon;
}(FormioAddon_1.default));
exports.default = PasswordStrengthAddon;
//# sourceMappingURL=PasswordStrengthAddon.js.map