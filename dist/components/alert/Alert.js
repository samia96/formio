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
var lodash_1 = __importDefault(require("lodash"));
var utils_1 = require("../../utils/utils");
var Alert = /** @class */ (function () {
    function Alert(container, component) {
        this.container = container;
        this.alert = null;
        this.parentComponent = component;
        this.refs = {};
        this.loadRefs = this.parentComponent.loadRefs.bind(this);
    }
    Object.defineProperty(Alert.prototype, "refsNames", {
        get: function () {
            return {
                messageRef: 'multiple'
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Alert.prototype, "alertTypes", {
        get: function () {
            return {
                error: 'danger',
                success: 'success',
                info: 'info',
                warning: 'warning'
            };
        },
        enumerable: false,
        configurable: true
    });
    Alert.prototype.showErrors = function (errors, triggerEvent, options) {
        if (errors === void 0) { errors = []; }
        if (triggerEvent === void 0) { triggerEvent = false; }
        if (options === void 0) { options = {}; }
        errors = lodash_1.default.isArray(errors) ? errors : [errors];
        var messagesList = this.createMessagesList('error', errors);
        this.showAlert('error', messagesList, options);
        if (triggerEvent) {
            this.parentComponent.emit('error', errors);
        }
        return errors;
    };
    Alert.prototype.showMessage = function (message, type, options) {
        if (options === void 0) { options = {}; }
        var messageElement = message;
        if (messageElement instanceof HTMLElement) {
            messageElement.setAttribute('ref', 'messageRef');
        }
        else {
            messageElement = this.parentComponent.ce('p', {
                ref: 'messageRef'
            });
        }
        this.showAlert(type, messageElement, options);
    };
    Alert.prototype.createMessagesList = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        switch (type) {
            case 'error':
                return this.createErrorList.apply(this, args);
        }
    };
    Alert.prototype.createErrorList = function (errors) {
        var _this = this;
        var p = this.parentComponent.ce('p');
        this.parentComponent.setContent(p, this.parentComponent.t('error'));
        var ul = this.parentComponent.ce('ul');
        var messagesList = document.createDocumentFragment();
        errors.forEach(function (err) { return _this.appendErrorToList(err, ul); });
        p.appendChild(ul);
        messagesList.appendChild(p);
        return messagesList;
    };
    Alert.prototype.showAlert = function (type, messagesList, options) {
        if (options === void 0) { options = {}; }
        var customClasses = options.customClasses, customEvents = options.customEvents;
        this.setAlert(type, messagesList, { customClasses: customClasses });
        if (!this.alert) {
            return;
        }
        this.attach({ customEvents: customEvents });
        this.parentComponent.prependTo(this.alert, this.container);
    };
    Alert.prototype.setAlert = function (type, messagesList, options) {
        if (options === void 0) { options = {}; }
        var alertType = this.alertTypes[type];
        if (this.alert) {
            this.clear();
        }
        if (messagesList) {
            var _a = options.id, id = _a === void 0 ? "".concat(type, "-list-").concat(this.parentComponent.id) : _a, _b = options.customClasses, customClasses = _b === void 0 ? "alert alert-".concat(alertType) : _b;
            this.alert = this.parentComponent.ce('div', { id: id, class: customClasses });
            if (messagesList instanceof HTMLElement) {
                this.parentComponent.appendTo(messagesList, this.alert);
            }
            else {
                this.parentComponent.setContent(this.alert, messagesList);
            }
        }
    };
    Alert.prototype.attach = function (options) {
        var _this = this;
        var _a, _b, _c;
        var _d = options.customEvents, customEvents = _d === void 0 ? {} : _d;
        this.eventListenersKeys = [];
        this.loadRefs(this.alert, this.refsNames);
        var clickListeners = ((_a = customEvents.click) === null || _a === void 0 ? void 0 : _a.listeners) || [];
        var keyPressListeners = ((_b = customEvents.keypress) === null || _b === void 0 ? void 0 : _b.listeners) || [];
        customEvents = __assign(__assign({}, customEvents), { click: __spreadArray(__spreadArray([], clickListeners, true), [
                function (e) {
                    var key = e.currentTarget.dataset.componentKey;
                    _this.focusOnComponent(key);
                }
            ], false), keypress: __spreadArray(__spreadArray([], keyPressListeners, true), [
                function (e) {
                    var key = e.currentTarget.dataset.componentKey;
                    _this.focusOnComponent(key);
                }
            ], false) });
        if ((_c = this.refs.messageRef) === null || _c === void 0 ? void 0 : _c.length) {
            this.refs.messageRef.forEach(function (el) {
                Object.entries(customEvents).forEach(function (_a) {
                    var event = _a[0], listeners = _a[1];
                    listeners.forEach(function (listener) { return _this.parentComponent.addEventListener(el, event, listener); });
                    _this.eventListenersKeys.push(event);
                });
            });
        }
    };
    Alert.prototype.clear = function () {
        var _this = this;
        var _a;
        try {
            if ((_a = this.refs.messageRef) === null || _a === void 0 ? void 0 : _a.length) {
                this.refs.messageRef.forEach(function (el) {
                    _this.eventListenersKeys.forEach(function (event) { return _this.parentComponent.removeEventListener(el, event); });
                });
            }
            this.refs = {};
            this.parentComponent.removeChildFrom(this.alert, this.container);
            this.alert = null;
        }
        catch (err) {
            // ignore
        }
    };
    Alert.prototype.focusOnComponent = function (keyOrPath) {
        var _a;
        if (keyOrPath) {
            var path = this.parentComponent._parentPath ? keyOrPath.replace(this.parentComponent._parentPath, '') : keyOrPath;
            var component = (_a = this.parentComponent.root) === null || _a === void 0 ? void 0 : _a.getComponent(path, null, keyOrPath);
            if (component && lodash_1.default.isFunction(component.focus)) {
                component.focus();
            }
        }
    };
    Alert.prototype.createMessage = function (type, element, message, index, err) {
        switch (type) {
            case 'error':
                return this.createErrorMessage(element, message, index, err);
        }
    };
    Alert.prototype.createErrorMessage = function (element, message, index, err) {
        var _a, _b;
        var params = {
            style: 'cursor: pointer',
            ref: 'messageRef',
            tabIndex: 0,
            'aria-label': "".concat(message, ". Click to navigate to the field with following error.")
        };
        var li = this.parentComponent.ce('li', params);
        this.parentComponent.setContent(li, message);
        var messageFromIndex = !lodash_1.default.isUndefined(index) && ((_a = err === null || err === void 0 ? void 0 : err.messages) === null || _a === void 0 ? void 0 : _a[index]);
        var keyOrPath = (messageFromIndex === null || messageFromIndex === void 0 ? void 0 : messageFromIndex.path) || ((_b = err === null || err === void 0 ? void 0 : err.component) === null || _b === void 0 ? void 0 : _b.key);
        if (keyOrPath) {
            var formattedKeyOrPath = (0, utils_1.getStringFromComponentPath)(keyOrPath);
            li.dataset.componentKey = formattedKeyOrPath;
        }
        this.parentComponent.appendTo(li, element);
    };
    Alert.prototype.appendErrorToList = function (err, ul) {
        var _this = this;
        var _a;
        if ((_a = err === null || err === void 0 ? void 0 : err.messages) === null || _a === void 0 ? void 0 : _a.length) {
            err.messages.forEach(function (_a, index) {
                var message = _a.message;
                _this.createMessage('error', ul, message, index, err);
            });
        }
        else if (err) {
            var message = lodash_1.default.isObject(err) ? err.message || '' : err;
            this.createMessage('error', ul, message);
        }
    };
    return Alert;
}());
exports.default = Alert;
//# sourceMappingURL=Alert.js.map