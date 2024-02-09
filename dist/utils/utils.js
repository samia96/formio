"use strict";
/* global jQuery */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
exports.withSwitch = exports.firstNonNil = exports.unfold = exports.bootstrapVersion = exports.uniqueKey = exports.iterateKey = exports.delay = exports.fieldData = exports.getCurrencyAffixes = exports.getNumberDecimalLimit = exports.getNumberSeparators = exports.matchInputMask = exports.unmaskValue = exports.getInputMask = exports.convertFormatToMask = exports.convertFormatToMoment = exports.convertFormatToFlatpickr = exports.getLocaleDateFormatInfo = exports.formatOffset = exports.formatDate = exports.momentDate = exports.loadZones = exports.shouldLoadZones = exports.zonesLoaded = exports.offsetDate = exports.currentTimezone = exports.isValidDate = exports.getDateSetting = exports.guid = exports.uniqueName = exports.convertStringToHTMLElement = exports.escapeHTML = exports.unescapeHTML = exports.setActionProperty = exports.checkTrigger = exports.checkCondition = exports.checkJsonConditional = exports.checkCustomConditional = exports.getComponentActualValue = exports.checkSimpleConditional = exports.checkCalculated = exports.isMongoId = exports.boolValue = exports.getElementRect = exports.getPropertyValue = exports.getRandomComponentId = exports.evaluate = exports.moment = exports.ConditionOperators = exports.jsonLogic = void 0;
exports.isSelectResourceWithObjectValue = exports.getItemTemplateKeys = exports.getComponentSavedTypes = exports.componentValueTypes = exports._ = exports.getFocusableElements = exports.isInsideScopingComponent = exports.isPromise = exports.getDataParentComponent = exports.getComponentPath = exports.getComponentPathWithoutIndicies = exports.getBrowserInfo = exports.getIEBrowserVersion = exports.round = exports.getStringFromComponentPath = exports.hasInvalidComponent = exports.getArrayFromComponentPath = exports.isInputComponent = exports.interpolate = exports.Evaluator = exports.fastCloneDeep = exports.sanitize = exports.translateHTMLTemplate = exports.getContextButtons = exports.getContextComponents = exports.observeOverload = void 0;
var lodash_1 = __importDefault(require("lodash"));
exports._ = lodash_1.default;
var fetch_ponyfill_1 = __importDefault(require("fetch-ponyfill"));
var json_logic_js_1 = __importDefault(require("json-logic-js"));
exports.jsonLogic = json_logic_js_1.default;
var moment_timezone_1 = __importDefault(require("moment-timezone/moment-timezone"));
var jstimezonedetect_1 = __importDefault(require("jstimezonedetect"));
var operators_1 = require("./jsonlogic/operators");
var dompurify_1 = __importDefault(require("dompurify"));
var formUtils_1 = require("./formUtils");
var Evaluator_1 = __importDefault(require("./Evaluator"));
exports.Evaluator = Evaluator_1.default;
var conditionOperators_1 = __importDefault(require("./conditionOperators"));
exports.ConditionOperators = conditionOperators_1.default;
var interpolate = Evaluator_1.default.interpolate;
exports.interpolate = interpolate;
var fetch = (0, fetch_ponyfill_1.default)({
    Promise: Promise
}).fetch;
__exportStar(require("./formUtils"), exports);
// Configure JsonLogic
operators_1.lodashOperators.forEach(function (name) { return json_logic_js_1.default.add_operation("_".concat(name), lodash_1.default[name]); });
// Retrieve Any Date
json_logic_js_1.default.add_operation('getDate', function (date) {
    return (0, moment_timezone_1.default)(date).toISOString();
});
// Set Relative Minimum Date
json_logic_js_1.default.add_operation('relativeMinDate', function (relativeMinDate) {
    return (0, moment_timezone_1.default)().subtract(relativeMinDate, 'days').toISOString();
});
// Set Relative Maximum Date
json_logic_js_1.default.add_operation('relativeMaxDate', function (relativeMaxDate) {
    return (0, moment_timezone_1.default)().add(relativeMaxDate, 'days').toISOString();
});
exports.moment = __importStar(require("moment-timezone/moment-timezone"));
function setPathToComponentAndPerentSchema(component) {
    component.path = getComponentPath(component);
    var dataParent = getDataParentComponent(component);
    if (dataParent && typeof dataParent === 'object') {
        dataParent.path = getComponentPath(dataParent);
    }
}
/**
 * Evaluate a method.
 *
 * @param func
 * @param args
 * @return {*}
 */
function evaluate(func, args, ret, tokenize) {
    var returnVal = null;
    var component = args.component ? args.component : { key: 'unknown' };
    if (!args.form && args.instance) {
        args.form = lodash_1.default.get(args.instance, 'root._form', {});
    }
    var componentKey = component.key;
    if (typeof func === 'string') {
        if (ret) {
            func += ";return ".concat(ret);
        }
        if (tokenize) {
            // Replace all {{ }} references with actual data.
            func = func.replace(/({{\s+(.*)\s+}})/, function (match, $1, $2) {
                if ($2.indexOf('data.') === 0) {
                    return lodash_1.default.get(args.data, $2.replace('data.', ''));
                }
                else if ($2.indexOf('row.') === 0) {
                    return lodash_1.default.get(args.row, $2.replace('row.', ''));
                }
                // Support legacy...
                return lodash_1.default.get(args.data, $2);
            });
        }
        try {
            func = Evaluator_1.default.evaluator(func, args);
            args = lodash_1.default.values(args);
        }
        catch (err) {
            console.warn("An error occured within the custom function for ".concat(componentKey), err);
            returnVal = null;
            func = false;
        }
    }
    if (typeof func === 'function') {
        try {
            returnVal = Evaluator_1.default.evaluate(func, args);
        }
        catch (err) {
            returnVal = null;
            console.warn("An error occured within custom function for ".concat(componentKey), err);
        }
    }
    else if (typeof func === 'object') {
        try {
            returnVal = json_logic_js_1.default.apply(func, args);
        }
        catch (err) {
            returnVal = null;
            console.warn("An error occured within custom function for ".concat(componentKey), err);
        }
    }
    else if (func) {
        console.warn("Unknown function type for ".concat(componentKey));
    }
    return returnVal;
}
exports.evaluate = evaluate;
function getRandomComponentId() {
    return "e".concat(Math.random().toString(36).substring(7));
}
exports.getRandomComponentId = getRandomComponentId;
/**
 * Get a property value of an element.
 *
 * @param style
 * @param prop
 * @return {number}
 */
function getPropertyValue(style, prop) {
    var value = style.getPropertyValue(prop);
    value = value ? value.replace(/[^0-9.]/g, '') : '0';
    return parseFloat(value);
}
exports.getPropertyValue = getPropertyValue;
/**
 * Get an elements bounding rectagle.
 *
 * @param element
 * @return {{x: string, y: string, width: string, height: string}}
 */
function getElementRect(element) {
    var style = window.getComputedStyle(element, null);
    return {
        x: getPropertyValue(style, 'left'),
        y: getPropertyValue(style, 'top'),
        width: getPropertyValue(style, 'width'),
        height: getPropertyValue(style, 'height')
    };
}
exports.getElementRect = getElementRect;
/**
 * Determines the boolean value of a setting.
 *
 * @param value
 * @return {boolean}
 */
function boolValue(value) {
    if (lodash_1.default.isBoolean(value)) {
        return value;
    }
    else if (lodash_1.default.isString(value)) {
        return (value.toLowerCase() === 'true');
    }
    else {
        return !!value;
    }
}
exports.boolValue = boolValue;
/**
 * Check to see if an ID is a mongoID.
 * @param text
 * @return {Array|{index: number, input: string}|Boolean|*}
 */
function isMongoId(text) {
    return text.toString().match(/^[0-9a-fA-F]{24}$/);
}
exports.isMongoId = isMongoId;
/**
 * Checks the calculated value for a provided component and data.
 *
 * @param {Object} component
 *   The component to check for the calculated value.
 * @param {Object} submission
 *   A submission object.
 * @param data
 *   The full submission data.
 */
function checkCalculated(component, submission, rowData) {
    // Process calculated value stuff if present.
    if (component.calculateValue) {
        lodash_1.default.set(rowData, component.key, evaluate(component.calculateValue, {
            value: undefined,
            data: submission ? submission.data : rowData,
            row: rowData,
            util: this,
            component: component
        }, 'value'));
    }
}
exports.checkCalculated = checkCalculated;
/**
 * Check if a simple conditional evaluates to true.
 *
 * @param condition
 * @param condition
 * @param row
 * @param data
 * @param instance
 * @returns {boolean}
 */
function checkSimpleConditional(component, condition, row, data, instance) {
    if (condition.when) {
        var value = getComponentActualValue(condition.when, data, row);
        var eq = String(condition.eq);
        var show = String(condition.show);
        // Special check for selectboxes component.
        if (lodash_1.default.isObject(value) && lodash_1.default.has(value, condition.eq)) {
            return String(value[condition.eq]) === show;
        }
        // FOR-179 - Check for multiple values.
        if (Array.isArray(value) && value.map(String).includes(eq)) {
            return show === 'true';
        }
        return (String(value) === eq) === (show === 'true');
    }
    else {
        var _a = condition.conditions, conditions = _a === void 0 ? [] : _a, _b = condition.conjunction, conjunction = _b === void 0 ? 'all' : _b, _c = condition.show, show = _c === void 0 ? true : _c;
        if (!conditions.length) {
            return true;
        }
        var conditionsResult = lodash_1.default.map(conditions, function (cond) {
            var comparedValue = cond.value, operator = cond.operator, conditionComponentPath = cond.component;
            if (!conditionComponentPath) {
                return true;
            }
            var value = getComponentActualValue(conditionComponentPath, data, row);
            var ConditionOperator = conditionOperators_1.default[operator];
            return ConditionOperator
                ? new ConditionOperator().getResult({ value: value, comparedValue: comparedValue, instance: instance, component: component, conditionComponentPath: conditionComponentPath })
                : true;
        });
        var result = false;
        switch (conjunction) {
            case 'any':
                result = lodash_1.default.some(conditionsResult, function (res) { return !!res; });
                break;
            default:
                result = lodash_1.default.every(conditionsResult, function (res) { return !!res; });
        }
        return show ? result : !result;
    }
}
exports.checkSimpleConditional = checkSimpleConditional;
function getComponentActualValue(compPath, data, row) {
    var value = null;
    if (row) {
        value = (0, formUtils_1.getValue)({ data: row }, compPath);
    }
    if (data && lodash_1.default.isNil(value)) {
        value = (0, formUtils_1.getValue)({ data: data }, compPath);
    }
    // FOR-400 - Fix issue where falsey values were being evaluated as show=true
    if (lodash_1.default.isNil(value) || (lodash_1.default.isObject(value) && lodash_1.default.isEmpty(value))) {
        value = '';
    }
    return value;
}
exports.getComponentActualValue = getComponentActualValue;
/**
 * Check custom javascript conditional.
 *
 * @param component
 * @param custom
 * @param row
 * @param data
 * @returns {*}
 */
function checkCustomConditional(component, custom, row, data, form, variable, onError, instance) {
    if (typeof custom === 'string') {
        custom = "var ".concat(variable, " = true; ").concat(custom, "; return ").concat(variable, ";");
    }
    var value = (instance && instance.evaluate) ?
        instance.evaluate(custom, { row: row, data: data, form: form }) :
        evaluate(custom, { row: row, data: data, form: form });
    if (value === null) {
        return onError;
    }
    return value;
}
exports.checkCustomConditional = checkCustomConditional;
function checkJsonConditional(component, json, row, data, form, onError) {
    try {
        return json_logic_js_1.default.apply(json, {
            data: data,
            row: row,
            form: form,
            _: lodash_1.default,
        });
    }
    catch (err) {
        console.warn("An error occurred in jsonLogic advanced condition for ".concat(component.key), err);
        return onError;
    }
}
exports.checkJsonConditional = checkJsonConditional;
function getRow(component, row, instance, conditional) {
    var _a;
    var condition = conditional || component.conditional;
    // If no component's instance passed (happens only in 6.x server), calculate its path based on the schema
    if (!instance) {
        instance = lodash_1.default.cloneDeep(component);
        setPathToComponentAndPerentSchema(instance);
    }
    var dataParent = getDataParentComponent(instance);
    var parentPath = dataParent ? getComponentPath(dataParent) : null;
    var isTriggerCondtionComponentPath = condition.when || !condition.conditions
        ? (_a = condition.when) === null || _a === void 0 ? void 0 : _a.startsWith(parentPath)
        : lodash_1.default.some(condition.conditions, function (cond) { return cond.component.startsWith(parentPath); });
    if (dataParent && isTriggerCondtionComponentPath) {
        var newRow = {};
        lodash_1.default.set(newRow, parentPath, row);
        row = newRow;
    }
    return row;
}
/**
 * Checks the conditions for a provided component and data.
 *
 * @param component
 *   The component to check for the condition.
 * @param row
 *   The data within a row
 * @param data
 *   The full submission data.
 *
 * @returns {boolean}
 */
function checkCondition(component, row, data, form, instance) {
    var customConditional = component.customConditional, conditional = component.conditional;
    if (customConditional) {
        return checkCustomConditional(component, customConditional, row, data, form, 'show', true, instance);
    }
    else if (conditional && (conditional.when || lodash_1.default.some(conditional.conditions || [], function (condition) { return condition.component && condition.operator; }))) {
        row = getRow(component, row, instance);
        return checkSimpleConditional(component, conditional, row, data, instance);
    }
    else if (conditional && conditional.json) {
        return checkJsonConditional(component, conditional.json, row, data, form, true);
    }
    // Default to show.
    return true;
}
exports.checkCondition = checkCondition;
/**
 * Test a trigger on a component.
 *
 * @param component
 * @param action
 * @param data
 * @param row
 * @returns {mixed}
 */
function checkTrigger(component, trigger, row, data, form, instance) {
    // If trigger is empty, don't fire it
    if (!trigger || !trigger[trigger.type]) {
        return false;
    }
    switch (trigger.type) {
        case 'simple':
            row = getRow(component, row, instance, trigger.simple);
            return checkSimpleConditional(component, trigger.simple, row, data, instance);
        case 'javascript':
            return checkCustomConditional(component, trigger.javascript, row, data, form, 'result', false, instance);
        case 'json':
            return checkJsonConditional(component, trigger.json, row, data, form, false);
    }
    // If none of the types matched, don't fire the trigger.
    return false;
}
exports.checkTrigger = checkTrigger;
function setActionProperty(component, action, result, row, data, instance) {
    var property = action.property.value;
    switch (action.property.type) {
        case 'boolean': {
            var currentValue = lodash_1.default.get(component, property, false).toString();
            var newValue = action.state.toString();
            if (currentValue !== newValue) {
                lodash_1.default.set(component, property, newValue === 'true');
            }
            break;
        }
        case 'string': {
            var evalData = {
                data: data,
                row: row,
                component: component,
                result: result,
            };
            var textValue = action.property.component ? action[action.property.component] : action.text;
            var currentValue = lodash_1.default.get(component, property, '');
            var newValue = (instance && instance.interpolate)
                ? instance.interpolate(textValue, evalData)
                : Evaluator_1.default.interpolate(textValue, evalData);
            if (newValue !== currentValue) {
                lodash_1.default.set(component, property, newValue);
            }
            break;
        }
    }
    return component;
}
exports.setActionProperty = setActionProperty;
/**
 * Unescape HTML characters like &lt, &gt, &amp and etc.
 * @param str
 * @returns {string}
 */
function unescapeHTML(str) {
    if (typeof window === 'undefined' || !('DOMParser' in window)) {
        return str;
    }
    var doc = new window.DOMParser().parseFromString(str, 'text/html');
    return doc.documentElement.textContent;
}
exports.unescapeHTML = unescapeHTML;
/**
 * Escape HTML characters like <, >, & and etc.
 * @param str
 * @returns {string}
 */
function escapeHTML(html) {
    if (html) {
        return html.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    return '';
}
exports.escapeHTML = escapeHTML;
/**
 * Make HTML element from string
 * @param str
 * @param selector
 * @returns {HTMLElement}
 */
function convertStringToHTMLElement(str, selector) {
    var doc = new window.DOMParser().parseFromString(str, 'text/html');
    return doc.body.querySelector(selector);
}
exports.convertStringToHTMLElement = convertStringToHTMLElement;
/**
 * Make a filename guaranteed to be unique.
 * @param name
 * @param template
 * @param evalContext
 * @returns {string}
 */
function uniqueName(name, template, evalContext) {
    template = template || '{{fileName}}-{{guid}}';
    //include guid in template anyway, to prevent overwriting issue if filename matches existing file
    if (!template.includes('{{guid}}')) {
        template = "".concat(template, "-{{guid}}");
    }
    var parts = name.split('.');
    var fileName = parts.slice(0, parts.length - 1).join('.');
    var extension = parts.length > 1
        ? ".".concat(lodash_1.default.last(parts))
        : '';
    //allow only 100 characters from original name to avoid issues with filename length restrictions
    fileName = fileName.substr(0, 100);
    evalContext = Object.assign(evalContext || {}, {
        fileName: fileName,
        guid: guid()
    });
    //only letters, numbers, dots, dashes, underscores and spaces are allowed. Anything else will be replaced with dash
    var uniqueName = "".concat(Evaluator_1.default.interpolate(template, evalContext)).concat(extension).replace(/[^0-9a-zA-Z.\-_ ]/g, '-');
    return uniqueName;
}
exports.uniqueName = uniqueName;
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0;
        var v = c === 'x'
            ? r
            : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
exports.guid = guid;
/**
 * Return a translated date setting.
 *
 * @param date
 * @return {(null|Date)}
 */
function getDateSetting(date) {
    if (lodash_1.default.isNil(date) || lodash_1.default.isNaN(date) || date === '') {
        return null;
    }
    if (date instanceof Date) {
        return date;
    }
    else if (typeof date.toDate === 'function') {
        return date.isValid() ? date.toDate() : null;
    }
    var dateSetting = ((typeof date !== 'string') || (date.indexOf('moment(') === -1)) ? (0, moment_timezone_1.default)(date) : null;
    if (dateSetting && dateSetting.isValid()) {
        return dateSetting.toDate();
    }
    dateSetting = null;
    try {
        var value = Evaluator_1.default.evaluator("return ".concat(date, ";"), 'moment')(moment_timezone_1.default);
        if (typeof value === 'string') {
            dateSetting = (0, moment_timezone_1.default)(value);
        }
        else if (typeof value.toDate === 'function') {
            dateSetting = (0, moment_timezone_1.default)(value.toDate().toUTCString());
        }
        else if (value instanceof Date) {
            dateSetting = (0, moment_timezone_1.default)(value);
        }
    }
    catch (e) {
        return null;
    }
    if (!dateSetting) {
        return null;
    }
    // Ensure this is a date.
    if (!dateSetting.isValid()) {
        return null;
    }
    return dateSetting.toDate();
}
exports.getDateSetting = getDateSetting;
function isValidDate(date) {
    return lodash_1.default.isDate(date) && !lodash_1.default.isNaN(date.getDate());
}
exports.isValidDate = isValidDate;
/**
 * Get the current timezone string.
 *
 * @return {string}
 */
function currentTimezone() {
    if (moment_timezone_1.default.currentTimezone) {
        return moment_timezone_1.default.currentTimezone;
    }
    moment_timezone_1.default.currentTimezone = jstimezonedetect_1.default.determine().name();
    return moment_timezone_1.default.currentTimezone;
}
exports.currentTimezone = currentTimezone;
/**
 * Get an offset date provided a date object and timezone object.
 *
 * @param date
 * @param timezone
 * @return {Date}
 */
function offsetDate(date, timezone) {
    if (timezone === 'UTC') {
        return {
            date: new Date(date.getTime() + (date.getTimezoneOffset() * 60000)),
            abbr: 'UTC'
        };
    }
    var dateMoment = (0, moment_timezone_1.default)(date).tz(timezone);
    return {
        date: new Date(date.getTime() + ((dateMoment.utcOffset() + date.getTimezoneOffset()) * 60000)),
        abbr: dateMoment.format('z')
    };
}
exports.offsetDate = offsetDate;
/**
 * Returns if the zones are loaded.
 *
 * @return {boolean}
 */
function zonesLoaded() {
    return moment_timezone_1.default.zonesLoaded;
}
exports.zonesLoaded = zonesLoaded;
/**
 * Returns if we should load the zones.
 *
 * @param timezone
 * @return {boolean}
 */
function shouldLoadZones(timezone) {
    if (timezone === currentTimezone() || timezone === 'UTC') {
        return false;
    }
    return true;
}
exports.shouldLoadZones = shouldLoadZones;
/**
 * Externally load the timezone data.
 *
 * @return {Promise<any> | *}
 */
function loadZones(url, timezone) {
    if (timezone && !shouldLoadZones(timezone)) {
        // Return non-resolving promise.
        return new Promise(lodash_1.default.noop);
    }
    if (moment_timezone_1.default.zonesPromise) {
        return moment_timezone_1.default.zonesPromise;
    }
    return moment_timezone_1.default.zonesPromise = fetch(url)
        .then(function (resp) { return resp.json().then(function (zones) {
        moment_timezone_1.default.tz.load(zones);
        moment_timezone_1.default.zonesLoaded = true;
        // Trigger a global event that the timezones have finished loading.
        if (document && document.createEvent && document.body && document.body.dispatchEvent) {
            var event = document.createEvent('Event');
            event.initEvent('zonesLoaded', true, true);
            document.body.dispatchEvent(event);
        }
    }); });
}
exports.loadZones = loadZones;
/**
 * Get the moment date object for translating dates with timezones.
 *
 * @param value
 * @param format
 * @param timezone
 * @return {*}
 */
function momentDate(value, format, timezone) {
    var momentDate = (0, moment_timezone_1.default)(value);
    if (!timezone) {
        return momentDate;
    }
    if (timezone === 'UTC') {
        timezone = 'Etc/UTC';
    }
    if ((timezone !== currentTimezone() || (format && format.match(/\s(z$|z\s)/))) && moment_timezone_1.default.zonesLoaded) {
        return momentDate.tz(timezone);
    }
    return momentDate;
}
exports.momentDate = momentDate;
/**
 * Format a date provided a value, format, and timezone object.
 *
 * @param value
 * @param format
 * @param timezone
 * @return {string}
 */
function formatDate(timezonesUrl, value, format, timezone, flatPickrInputFormat) {
    var momentDate = (0, moment_timezone_1.default)(value, flatPickrInputFormat || undefined);
    if (timezone === currentTimezone()) {
        // See if our format contains a "z" timezone character.
        if (format.match(/\s(z$|z\s)/)) {
            loadZones(timezonesUrl);
            if (moment_timezone_1.default.zonesLoaded) {
                return momentDate.tz(timezone).format(convertFormatToMoment(format));
            }
            else {
                return momentDate.format(convertFormatToMoment(format.replace(/\s(z$|z\s)/, '')));
            }
        }
        // Return the standard format.
        return momentDate.format(convertFormatToMoment(format));
    }
    if (timezone === 'UTC') {
        var offset = offsetDate(momentDate.toDate(), 'UTC');
        return "".concat((0, moment_timezone_1.default)(offset.date).format(convertFormatToMoment(format)), " UTC");
    }
    // Load the zones since we need timezone information.
    loadZones(timezonesUrl);
    if (moment_timezone_1.default.zonesLoaded && timezone) {
        return momentDate.tz(timezone).format("".concat(convertFormatToMoment(format), " z"));
    }
    else {
        return momentDate.format(convertFormatToMoment(format));
    }
}
exports.formatDate = formatDate;
/**
 * Pass a format function to format within a timezone.
 *
 * @param formatFn
 * @param date
 * @param format
 * @param timezone
 * @return {string}
 */
function formatOffset(timezonesUrl, formatFn, date, format, timezone) {
    if (timezone === currentTimezone()) {
        return formatFn(date, format);
    }
    if (timezone === 'UTC') {
        return "".concat(formatFn(offsetDate(date, 'UTC').date, format), " UTC");
    }
    // Load the zones since we need timezone information.
    loadZones(timezonesUrl);
    if (moment_timezone_1.default.zonesLoaded) {
        var offset = offsetDate(date, timezone);
        return "".concat(formatFn(offset.date, format), " ").concat(offset.abbr);
    }
    else {
        return formatFn(date, format);
    }
}
exports.formatOffset = formatOffset;
function getLocaleDateFormatInfo(locale) {
    var formatInfo = {};
    var day = 21;
    var exampleDate = new Date(2017, 11, day);
    var localDateString = exampleDate.toLocaleDateString(locale);
    formatInfo.dayFirst = localDateString.slice(0, 2) === day.toString();
    return formatInfo;
}
exports.getLocaleDateFormatInfo = getLocaleDateFormatInfo;
/**
 * Convert the format from the angular-datepicker module to flatpickr format.
 * @param format
 * @return {string}
 */
function convertFormatToFlatpickr(format) {
    return format
        // Remove the Z timezone offset, not supported by flatpickr.
        .replace(/Z/g, '')
        // Year conversion.
        .replace(/y/g, 'Y')
        .replace('YYYY', 'Y')
        .replace('YY', 'y')
        // Month conversion.
        .replace('MMMM', 'F')
        .replace(/M/g, 'n')
        .replace('nnn', 'M')
        .replace('nn', 'm')
        // Day in month.
        .replace(/d/g, 'j')
        .replace(/jj/g, 'd')
        // Day in week.
        .replace('EEEE', 'l')
        .replace('EEE', 'D')
        // Hours, minutes, seconds
        .replace('HH', 'H')
        .replace('hh', 'G')
        .replace('mm', 'i')
        .replace('ss', 'S')
        .replace(/a/g, 'K');
}
exports.convertFormatToFlatpickr = convertFormatToFlatpickr;
/**
 * Convert the format from the angular-datepicker module to moment format.
 * @param format
 * @return {string}
 */
function convertFormatToMoment(format) {
    return format
        // Year conversion.
        .replace(/y/g, 'Y')
        // Day in month.
        .replace(/d/g, 'D')
        // Day in week.
        .replace(/E/g, 'd')
        // AM/PM marker
        .replace(/a/g, 'A')
        // Unix Timestamp
        .replace(/U/g, 'X');
}
exports.convertFormatToMoment = convertFormatToMoment;
function convertFormatToMask(format) {
    return format
        // Long month replacement.
        .replace(/M{4}/g, 'MM')
        // Initial short month conversion.
        .replace(/M{3}/g, '***')
        // Short month conversion if input as text.
        .replace(/e/g, 'Q')
        // Month number conversion.
        .replace(/W/g, '99')
        // Year conversion.
        .replace(/[ydhmswHMG]/g, '9')
        // AM/PM conversion.
        .replace(/a/g, 'AA');
}
exports.convertFormatToMask = convertFormatToMask;
/**
 * Returns an input mask that is compatible with the input mask library.
 * @param {string} mask - The Form.io input mask.
 * @param {string} placeholderChar - Char which is used as a placeholder.
 * @returns {Array} - The input mask for the mask library.
 */
function getInputMask(mask, placeholderChar) {
    if (mask instanceof Array) {
        return mask;
    }
    var maskArray = [];
    maskArray.numeric = true;
    for (var i = 0; i < mask.length; i++) {
        switch (mask[i]) {
            case '9':
                maskArray.push(/\d/);
                break;
            case 'A':
                maskArray.numeric = false;
                maskArray.push(/[a-zA-Z]/);
                break;
            case 'a':
                maskArray.numeric = false;
                maskArray.push(/[a-z]/);
                break;
            case '*':
                maskArray.numeric = false;
                maskArray.push(/[a-zA-Z0-9]/);
                break;
            // If char which is used inside mask placeholder was used in the mask, replace it with space to prevent errors
            case placeholderChar:
                maskArray.numeric = false;
                maskArray.push(' ');
                break;
            default:
                maskArray.numeric = false;
                maskArray.push(mask[i]);
                break;
        }
    }
    return maskArray;
}
exports.getInputMask = getInputMask;
function unmaskValue(value, mask, placeholderChar) {
    if (!mask || !value || value.length > mask.length) {
        return value;
    }
    var unmaskedValue = value.split('');
    for (var i = 0; i < mask.length; i++) {
        var char = value[i] || '';
        var charPart = mask[i];
        if (!lodash_1.default.isRegExp(charPart) && char === charPart) {
            unmaskedValue[i] = '';
        }
    }
    unmaskedValue = unmaskedValue.join('').replace(placeholderChar, '');
    return unmaskedValue;
}
exports.unmaskValue = unmaskValue;
function matchInputMask(value, inputMask) {
    if (!inputMask) {
        return true;
    }
    // If value is longer than mask, it isn't valid.
    if (value.length > inputMask.length) {
        return false;
    }
    for (var i = 0; i < inputMask.length; i++) {
        var char = value[i] || '';
        var charPart = inputMask[i];
        if (!(lodash_1.default.isRegExp(charPart) && charPart.test(char) || charPart === char)) {
            return false;
        }
    }
    return true;
}
exports.matchInputMask = matchInputMask;
function getNumberSeparators(lang) {
    if (lang === void 0) { lang = 'en'; }
    var formattedNumberString = (12345.6789).toLocaleString(lang);
    var delimeters = formattedNumberString.match(/..(.)...(.)../);
    if (!delimeters) {
        return {
            delimiter: ',',
            decimalSeparator: '.'
        };
    }
    return {
        delimiter: (delimeters.length > 1) ? delimeters[1] : ',',
        decimalSeparator: (delimeters.length > 2) ? delimeters[2] : '.',
    };
}
exports.getNumberSeparators = getNumberSeparators;
function getNumberDecimalLimit(component, defaultLimit) {
    if (lodash_1.default.has(component, 'decimalLimit')) {
        return lodash_1.default.get(component, 'decimalLimit');
    }
    // Determine the decimal limit. Defaults to 20 but can be overridden by validate.step or decimalLimit settings.
    var decimalLimit = defaultLimit || 20;
    var step = lodash_1.default.get(component, 'validate.step', 'any');
    if (step !== 'any') {
        var parts = step.toString().split('.');
        if (parts.length > 1) {
            decimalLimit = parts[1].length;
        }
    }
    return decimalLimit;
}
exports.getNumberDecimalLimit = getNumberDecimalLimit;
function getCurrencyAffixes(_a) {
    var currency = _a.currency, decimalLimit = _a.decimalLimit, decimalSeparator = _a.decimalSeparator, lang = _a.lang;
    // Get the prefix and suffix from the localized string.
    var regex = "(.*)?".concat((100).toLocaleString(lang));
    if (decimalLimit) {
        regex += "".concat(decimalSeparator === '.' ? '\\.' : decimalSeparator).concat((0).toLocaleString(lang), "{").concat(decimalLimit, "}");
    }
    regex += '(.*)?';
    var parts = (100).toLocaleString(lang, {
        style: 'currency',
        currency: currency ? currency : 'USD',
        useGrouping: true,
        maximumFractionDigits: decimalLimit || 0,
        minimumFractionDigits: decimalLimit || 0
    }).replace('.', decimalSeparator).match(new RegExp(regex));
    return {
        prefix: (parts === null || parts === void 0 ? void 0 : parts[1]) || '',
        suffix: (parts === null || parts === void 0 ? void 0 : parts[2]) || ''
    };
}
exports.getCurrencyAffixes = getCurrencyAffixes;
/**
 * Fetch the field data provided a component.
 *
 * @param data
 * @param component
 * @return {*}
 */
function fieldData(data, component) {
    if (!data) {
        return '';
    }
    if (!component || !component.key) {
        return data;
    }
    if (component.key.includes('.')) {
        var value = data;
        var parts = component.key.split('.');
        var key = '';
        for (var i = 0; i < parts.length; i++) {
            key = parts[i];
            // Handle nested resources
            if (value.hasOwnProperty('_id')) {
                value = value.data;
            }
            // Return if the key is not found on the value.
            if (!value.hasOwnProperty(key)) {
                return;
            }
            // Convert old single field data in submissions to multiple
            if (key === parts[parts.length - 1] && component.multiple && !Array.isArray(value[key])) {
                value[key] = [value[key]];
            }
            // Set the value of this key.
            value = value[key];
        }
        return value;
    }
    else {
        // Convert old single field data in submissions to multiple
        if (component.multiple && !Array.isArray(data[component.key])) {
            data[component.key] = [data[component.key]];
        }
        // Fix for checkbox type radio submission values in tableView
        if (component.type === 'checkbox' && component.inputType === 'radio') {
            return data[component.name] === component.value;
        }
        return data[component.key];
    }
}
exports.fieldData = fieldData;
/**
 * Delays function execution with possibility to execute function synchronously or cancel it.
 *
 * @param fn Function to delay
 * @param delay Delay time
 * @return {*}
 */
function delay(fn, delay) {
    if (delay === void 0) { delay = 0; }
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var timer = setTimeout.apply(void 0, __spreadArray([fn, delay], args, false));
    function cancel() {
        clearTimeout(timer);
    }
    function earlyCall() {
        cancel();
        return fn.apply(void 0, args);
    }
    earlyCall.timer = timer;
    earlyCall.cancel = cancel;
    return earlyCall;
}
exports.delay = delay;
/**
 * Iterate the given key to make it unique.
 *
 * @param {String} key
 *   Modify the component key to be unique.
 *
 * @returns {String}
 *   The new component key.
 */
function iterateKey(key) {
    if (!key.match(/(\d+)$/)) {
        return "".concat(key, "1");
    }
    return key.replace(/(\d+)$/, function (suffix) {
        return Number(suffix) + 1;
    });
}
exports.iterateKey = iterateKey;
/**
 * Determines a unique key within a map provided the base key.
 *
 * @param map
 * @param base
 * @return {*}
 */
function uniqueKey(map, base) {
    var newKey = base;
    while (map.hasOwnProperty(newKey)) {
        newKey = iterateKey(newKey);
    }
    return newKey;
}
exports.uniqueKey = uniqueKey;
/**
 * Determines the major version number of bootstrap.
 *
 * @return {number}
 */
function bootstrapVersion(options) {
    if (options.bootstrap) {
        return options.bootstrap;
    }
    if ((typeof jQuery === 'function') && (typeof jQuery().collapse === 'function')) {
        return parseInt(jQuery.fn.collapse.Constructor.VERSION.split('.')[0], 10);
    }
    if (window.bootstrap && window.bootstrap.Collapse) {
        return parseInt(window.bootstrap.Collapse.VERSION.split('.')[0], 10);
    }
    return 0;
}
exports.bootstrapVersion = bootstrapVersion;
/**
 * Retrun provided argument.
 * If argument is a function, returns the result of a function call.
 * @param {*} e;
 *
 * @return {*}
 */
function unfold(e) {
    if (typeof e === 'function') {
        return e();
    }
    return e;
}
exports.unfold = unfold;
/**
 * Map values through unfold and return first non-nil value.
 * @param {Array<T>} collection;
 *
 * @return {T}
 */
exports.firstNonNil = lodash_1.default.flow([
    lodash_1.default.partialRight(lodash_1.default.map, unfold),
    lodash_1.default.partialRight(lodash_1.default.find, function (v) { return !lodash_1.default.isUndefined(v); })
]);
/*
 * Create enclosed state.
 * Returns functions to getting and cycling between states.
 * @param {*} a - initial state.
 * @param {*} b - next state.
 * @return {Functions[]} -- [get, toggle];
 */
function withSwitch(a, b) {
    var state = a;
    var next = b;
    function get() {
        return state;
    }
    function toggle() {
        var prev = state;
        state = next;
        next = prev;
    }
    return [get, toggle];
}
exports.withSwitch = withSwitch;
function observeOverload(callback, options) {
    if (options === void 0) { options = {}; }
    var _a = options.limit, limit = _a === void 0 ? 50 : _a, _b = options.delay, delay = _b === void 0 ? 500 : _b;
    var callCount = 0;
    var timeoutID = 0;
    var reset = function () { return callCount = 0; };
    return function () {
        if (timeoutID !== 0) {
            clearTimeout(timeoutID);
            timeoutID = 0;
        }
        timeoutID = setTimeout(reset, delay);
        callCount += 1;
        if (callCount >= limit) {
            clearTimeout(timeoutID);
            reset();
            return callback();
        }
    };
}
exports.observeOverload = observeOverload;
function getContextComponents(context, excludeNested, excludedTypes) {
    if (excludedTypes === void 0) { excludedTypes = []; }
    var values = [];
    context.utils.eachComponent(context.instance.options.editForm.components, function (component, path) {
        var addToContextComponents = excludeNested ? !component.tree : true;
        if (component.key !== context.data.key && addToContextComponents && !lodash_1.default.includes(excludedTypes, component.type)) {
            values.push({
                label: "".concat(component.label || component.key, " (").concat(path, ")"),
                value: path,
            });
        }
    });
    return values;
}
exports.getContextComponents = getContextComponents;
function getContextButtons(context) {
    var values = [];
    context.utils.eachComponent(context.instance.options.editForm.components, function (component) {
        if (component.type === 'button') {
            values.push({
                label: "".concat(component.key, " (").concat(component.label, ")"),
                value: component.key,
            });
        }
    });
    return values;
}
exports.getContextButtons = getContextButtons;
// Tags that could be in text, that should be ommited or handled in a special way
var inTextTags = ['#text', 'A', 'B', 'EM', 'I', 'SMALL', 'STRONG', 'SUB', 'SUP', 'INS', 'DEL', 'MARK', 'CODE'];
/**
 * Helper function for 'translateHTMLTemplate'. Translates text value of the passed html element.
 *
 * @param {HTMLElement} elem
 * @param {Function} translate
 *
 * @returns {String}
 *   Translated element template.
 */
function translateElemValue(elem, translate) {
    if (!elem.innerText) {
        return elem.innerHTML;
    }
    var elemValue = elem.innerText.replace(Evaluator_1.default.templateSettings.interpolate, '').replace(/\s\s+/g, ' ').trim();
    var translatedValue = translate(elemValue);
    if (elemValue !== translatedValue) {
        var links = elem.innerHTML.match(/<a[^>]*>(.*?)<\/a>/g);
        if (links && links.length) {
            if (links.length === 1 && links[0].length === elem.innerHTML.length) {
                return elem.innerHTML.replace(elemValue, translatedValue);
            }
            var translatedLinks = links.map(function (link) {
                var linkElem = document.createElement('a');
                linkElem.innerHTML = link;
                return translateElemValue(linkElem, translate);
            });
            return "".concat(translatedValue, " (").concat(translatedLinks.join(', '), ")");
        }
        else {
            return elem.innerText.replace(elemValue, translatedValue);
        }
    }
    else {
        return elem.innerHTML;
    }
}
/**
 * Helper function for 'translateHTMLTemplate'. Goes deep through html tag children and calls function to translate their text values.
 *
 * @param {HTMLElement} tag
 * @param {Function} translate
 *
 * @returns {void}
 */
function translateDeepTag(tag, translate) {
    var children = tag.children.length && __spreadArray([], tag.children, true);
    var shouldTranslateEntireContent = children && children.every(function (child) {
        return child.children.length === 0
            && inTextTags.some(function (tag) { return child.nodeName === tag; });
    });
    if (!children || shouldTranslateEntireContent) {
        tag.innerHTML = translateElemValue(tag, translate);
    }
    else {
        children.forEach(function (child) { return translateDeepTag(child, translate); });
    }
}
/**
 * Translates text values in html template.
 *
 * @param {String} template
 * @param {Function} translate
 *
 * @returns {String}
 *   Html template with translated values.
 */
function translateHTMLTemplate(template, translate) {
    var isHTML = /<[^>]*>/.test(template);
    if (!isHTML) {
        return translate(template);
    }
    var tempElem = document.createElement('div');
    tempElem.innerHTML = template;
    if (tempElem.innerText && tempElem.children.length) {
        translateDeepTag(tempElem, translate);
        return tempElem.innerHTML;
    }
    return template;
}
exports.translateHTMLTemplate = translateHTMLTemplate;
/**
 * Sanitize an html string.
 *
 * @param string
 * @returns {*}
 */
function sanitize(string, options) {
    if (typeof dompurify_1.default.sanitize !== 'function') {
        return string;
    }
    // Dompurify configuration
    var sanitizeOptions = {
        ADD_ATTR: ['ref', 'target'],
        USE_PROFILES: { html: true }
    };
    // Use profiles
    if (options.sanitizeConfig && options.sanitizeConfig.useProfiles) {
        Object.keys(options.sanitizeConfig.useProfiles).forEach(function (key) {
            sanitizeOptions.USE_PROFILES[key] = options.sanitizeConfig.useProfiles[key];
        });
    }
    // Add attrs
    if (options.sanitizeConfig && Array.isArray(options.sanitizeConfig.addAttr) && options.sanitizeConfig.addAttr.length > 0) {
        options.sanitizeConfig.addAttr.forEach(function (attr) {
            sanitizeOptions.ADD_ATTR.push(attr);
        });
    }
    // Add tags
    if (options.sanitizeConfig && Array.isArray(options.sanitizeConfig.addTags) && options.sanitizeConfig.addTags.length > 0) {
        sanitizeOptions.ADD_TAGS = options.sanitizeConfig.addTags;
    }
    // Allow tags
    if (options.sanitizeConfig && Array.isArray(options.sanitizeConfig.allowedTags) && options.sanitizeConfig.allowedTags.length > 0) {
        sanitizeOptions.ALLOWED_TAGS = options.sanitizeConfig.allowedTags;
    }
    // Allow attributes
    if (options.sanitizeConfig && Array.isArray(options.sanitizeConfig.allowedAttrs) && options.sanitizeConfig.allowedAttrs.length > 0) {
        sanitizeOptions.ALLOWED_ATTR = options.sanitizeConfig.allowedAttrs;
    }
    // Allowd URI Regex
    if (options.sanitizeConfig && options.sanitizeConfig.allowedUriRegex) {
        sanitizeOptions.ALLOWED_URI_REGEXP = options.sanitizeConfig.allowedUriRegex;
    }
    // Allow to extend the existing array of elements that are safe for URI-like values
    if (options.sanitizeConfig && Array.isArray(options.sanitizeConfig.addUriSafeAttr) && options.sanitizeConfig.addUriSafeAttr.length > 0) {
        sanitizeOptions.ADD_URI_SAFE_ATTR = options.sanitizeConfig.addUriSafeAttr;
    }
    return dompurify_1.default.sanitize(string, sanitizeOptions);
}
exports.sanitize = sanitize;
/**
 * Fast cloneDeep for JSON objects only.
 */
function fastCloneDeep(obj) {
    return obj ? JSON.parse(JSON.stringify(obj)) : obj;
}
exports.fastCloneDeep = fastCloneDeep;
function isInputComponent(componentJson) {
    if (componentJson.input === false || componentJson.input === true) {
        return componentJson.input;
    }
    switch (componentJson.type) {
        case 'htmlelement':
        case 'content':
        case 'columns':
        case 'fieldset':
        case 'panel':
        case 'table':
        case 'tabs':
        case 'well':
        case 'button':
            return false;
        default:
            return true;
    }
}
exports.isInputComponent = isInputComponent;
function getArrayFromComponentPath(pathStr) {
    if (!pathStr || !lodash_1.default.isString(pathStr)) {
        if (!lodash_1.default.isArray(pathStr)) {
            return [pathStr];
        }
        return pathStr;
    }
    return pathStr.replace(/[[\]]/g, '.')
        .replace(/\.\./g, '.')
        .replace(/(^\.)|(\.$)/g, '')
        .split('.')
        .map(function (part) { return lodash_1.default.defaultTo(lodash_1.default.toNumber(part), part); });
}
exports.getArrayFromComponentPath = getArrayFromComponentPath;
function hasInvalidComponent(component) {
    return component.getComponents().some(function (comp) {
        if (lodash_1.default.isArray(comp.components)) {
            return hasInvalidComponent(comp);
        }
        return comp.error;
    });
}
exports.hasInvalidComponent = hasInvalidComponent;
function getStringFromComponentPath(path) {
    if (!lodash_1.default.isArray(path)) {
        return path;
    }
    var strPath = '';
    path.forEach(function (part, i) {
        if (lodash_1.default.isNumber(part)) {
            strPath += "[".concat(part, "]");
        }
        else {
            strPath += i === 0 ? part : ".".concat(part);
        }
    });
    return strPath;
}
exports.getStringFromComponentPath = getStringFromComponentPath;
function round(number, precision) {
    if (lodash_1.default.isNumber(number)) {
        return number.toFixed(precision);
    }
    return number;
}
exports.round = round;
/**
 * Check for Internet Explorer browser version
 *
 * @return {(number|null)}
 */
function getIEBrowserVersion() {
    var _a = getBrowserInfo(), ie = _a.ie, version = _a.version;
    return ie ? version : null;
}
exports.getIEBrowserVersion = getIEBrowserVersion;
/**
 * Get browser name and version (modified from 'jquery-browser-plugin')
 *
 * @return {Object} -- {{browser name, version, isWebkit?}}
 * Possible browser names: chrome, safari, ie, edge, opera, mozilla, yabrowser
 */
function getBrowserInfo() {
    var browser = {};
    if (typeof window === 'undefined') {
        return browser;
    }
    var ua = window.navigator.userAgent.toLowerCase();
    var match = /(edge|edg)\/([\w.]+)/.exec(ua) ||
        /(opr)[/]([\w.]+)/.exec(ua) ||
        /(yabrowser)[ /]([\w.]+)/.exec(ua) ||
        /(chrome)[ /]([\w.]+)/.exec(ua) ||
        /(iemobile)[/]([\w.]+)/.exec(ua) ||
        /(version)(applewebkit)[ /]([\w.]+).*(safari)[ /]([\w.]+)/.exec(ua) ||
        /(webkit)[ /]([\w.]+).*(version)[ /]([\w.]+).*(safari)[ /]([\w.]+)/.exec(ua) ||
        /(webkit)[ /]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ /]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        ua.indexOf('trident') >= 0 && /(rv)(?::| )([\w.]+)/.exec(ua) ||
        ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) ||
        [];
    var matched = {
        browser: match[5] || match[3] || match[1] || '',
        version: match[4] || match[2] || '0'
    };
    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = parseInt(matched.version, 10);
    }
    // Chrome, Opera 15+, Safari and Yandex.Browser are webkit based browsers
    if (browser.chrome || browser.opr || browser.safari || browser.edg || browser.yabrowser) {
        browser.isWebkit = true;
    }
    // IE11 has a new token so we will assign it ie to avoid breaking changes
    if (browser.rv || browser.iemobile) {
        browser.ie = true;
    }
    // Edge has a new token since it became webkit based
    if (browser.edg) {
        browser.edge = true;
    }
    // Opera 15+ are identified as opr
    if (browser.opr) {
        browser.opera = true;
    }
    return browser;
}
exports.getBrowserInfo = getBrowserInfo;
function getComponentPathWithoutIndicies(path) {
    if (path === void 0) { path = ''; }
    return path.replace(/\[\d+\]/, '');
}
exports.getComponentPathWithoutIndicies = getComponentPathWithoutIndicies;
/**
 * Returns a path to the component which based on its schema
 * @param {*} component is a component's schema containing link to its parent's schema in the 'parent' property
 */
function getComponentPath(component, path) {
    var _a;
    if (path === void 0) { path = ''; }
    if (!component || !component.key || ((_a = component === null || component === void 0 ? void 0 : component._form) === null || _a === void 0 ? void 0 : _a.display) === 'wizard') { // unlike the Webform, the Wizard has the key and it is a duplicate of the panel key
        return path;
    }
    path = component.isInputComponent || component.input === true ? "".concat(component.key).concat(path ? '.' : '').concat(path) : path;
    return getComponentPath(component.parent, path);
}
exports.getComponentPath = getComponentPath;
/**
 * Returns a parent component of the passed component instance skipping all the Layout components
 * @param {*} componentInstance
 * @return {(Component|undefined)}
 */
function getDataParentComponent(componentInstance) {
    if (!componentInstance) {
        return;
    }
    var parent = componentInstance.parent;
    if (parent && (parent.isInputComponent || parent.input)) {
        return parent;
    }
    else {
        return getDataParentComponent(parent);
    }
}
exports.getDataParentComponent = getDataParentComponent;
/**
 * Returns whether the value is a promise
 * @param value
 * @return {boolean}
 */
function isPromise(value) {
    return value
        && value.then
        && typeof value.then === 'function'
        && Object.prototype.toString.call(value) === '[object Promise]';
}
exports.isPromise = isPromise;
/**
 * Determines if the component has a scoping parent in tree (a component which scopes its children and manages its
 * changes by itself, e.g. EditGrid)
 * @param componentInstance
 * @param firstPass
 * @returns {boolean|boolean|*}
 */
function isInsideScopingComponent(componentInstance, firstPass) {
    if (firstPass === void 0) { firstPass = true; }
    if (!firstPass && (componentInstance === null || componentInstance === void 0 ? void 0 : componentInstance.hasScopedChildren)) {
        return true;
    }
    var dataParent = getDataParentComponent(componentInstance);
    if (dataParent === null || dataParent === void 0 ? void 0 : dataParent.hasScopedChildren) {
        return true;
    }
    else if (dataParent === null || dataParent === void 0 ? void 0 : dataParent.parent) {
        return isInsideScopingComponent(dataParent.parent, false);
    }
    return false;
}
exports.isInsideScopingComponent = isInsideScopingComponent;
function getFocusableElements(element) {
    var focusableSelector = "button:not([disabled]), input:not([disabled]), select:not([disabled]),\n    textarea:not([disabled]), button:not([disabled]), [href]";
    return element.querySelectorAll(focusableSelector);
}
exports.getFocusableElements = getFocusableElements;
exports.componentValueTypes = {
    number: 'number',
    string: 'string',
    boolean: 'boolean',
    array: 'array',
    object: 'object',
    date: 'date',
    any: 'any',
};
function getComponentSavedTypes(fullSchema) {
    var schema = fullSchema || {};
    if (schema.persistent !== true) {
        return [];
    }
    if (schema.multiple) {
        return [exports.componentValueTypes.array];
    }
    return null;
}
exports.getComponentSavedTypes = getComponentSavedTypes;
function getItemTemplateKeys(template) {
    var templateKeys = [];
    if (!template) {
        return templateKeys;
    }
    var keys = template.match(/({{\s*(.*?)\s*}})/g);
    if (keys) {
        keys.forEach(function (key) {
            var propKey = key.match(/{{\s*item\.(.*?)\s*}}/);
            if (propKey && propKey.length > 1) {
                templateKeys.push(propKey[1]);
            }
        });
    }
    return templateKeys;
}
exports.getItemTemplateKeys = getItemTemplateKeys;
function isSelectResourceWithObjectValue(comp) {
    if (comp === void 0) { comp = {}; }
    var reference = comp.reference, dataSrc = comp.dataSrc, valueProperty = comp.valueProperty;
    return reference || (dataSrc === 'resource' && (!valueProperty || valueProperty === 'data'));
}
exports.isSelectResourceWithObjectValue = isSelectResourceWithObjectValue;
//# sourceMappingURL=utils.js.map