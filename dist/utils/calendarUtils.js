"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInvalidDate = exports.lessOrGreater = exports.CALENDAR_ERROR_MESSAGES = void 0;
var moment_1 = __importDefault(require("moment"));
var lodash_1 = __importDefault(require("lodash"));
exports.CALENDAR_ERROR_MESSAGES = {
    INVALID: 'You entered the Invalid Date',
    INCOMPLETE: 'You entered an incomplete date.',
    greater: function (date, format) {
        return "The entered date is greater than ".concat(date.format(format));
    },
    less: function (date, format) {
        return "The entered date is less than ".concat(date.format(format));
    }
};
/**
 * Builds the response for checkInvalidDate.
 *
 * @param {String} message
 *   The message for response.
 * @param {Boolean} result
 *   The boolean flag for response.
 * * @return {{message: string, result: boolean}}
 */
function buildResponse(message, result) {
    return {
        message: message,
        result: result
    };
}
/**
 * Checks the value for a min date and max date.
 *
 * @param {moment} value
 *   The value to check.
 * @param {[String]} format
 *   A moment formats.
 * @param {Date} maxDate
 *   The max date.
 * @param {Date} minDate
 *   The min date.
 * * @return {{message: string, result: boolean}}
 */
function lessOrGreater(value, format, maxDate, minDate) {
    var message = '';
    var result = true;
    if (maxDate && value.isValid()) {
        var maxDateMoment = (0, moment_1.default)(maxDate, format);
        if (value > maxDateMoment) {
            message = exports.CALENDAR_ERROR_MESSAGES.greater(maxDateMoment, format);
            result = false;
        }
    }
    if (minDate && value.isValid()) {
        var minDateMoment = (0, moment_1.default)(minDate, format);
        if (value < minDateMoment) {
            message = exports.CALENDAR_ERROR_MESSAGES.less(minDateMoment, format);
            result = false;
        }
    }
    return {
        message: message,
        result: result
    };
}
exports.lessOrGreater = lessOrGreater;
/**
 * Checks the entered date for validity.
 *
 * @param {String} value
 *   The value to check.
 * @param {[String]} format
 *   A moment formats.
 * @param {Date} maxDate
 *   The max date.
 * @param {Date} minDate
 *   The min date.
 * * @return {{message: string, result: boolean}}
 */
function checkInvalidDate(value, format, minDate, maxDate) {
    var date = (0, moment_1.default)(value, format, true);
    var isValidDate = date.isValid();
    if (!isValidDate) {
        var delimeters_1 = value.match(/[^a-z0-9_]/gi);
        var delimetersRegEx = new RegExp(delimeters_1.join('|'), 'gi');
        var inputParts = value.replace(/_*/gi, '').split(delimetersRegEx);
        var formatParts_1 = format[1] ? format[1].split(delimetersRegEx) : format[0].split(delimetersRegEx);
        var timeIndex_1 = lodash_1.default.findIndex(formatParts_1, function (part, index) { return part.length === 1 && index === formatParts_1.length - 1; });
        var yearIndex = lodash_1.default.findIndex(formatParts_1, function (part) { return part.match(/yyyy/gi); });
        if (inputParts[yearIndex] / 1000 < 1) {
            return buildResponse(exports.CALENDAR_ERROR_MESSAGES.INVALID, false);
        }
        if (inputParts[0].length === formatParts_1[0].length) {
            var modifiedParts = inputParts.map(function (part, index) {
                var partValue = part;
                if (!part && index === timeIndex_1) {
                    partValue = 'AM';
                }
                else if (!part) {
                    partValue = '01';
                }
                if (delimeters_1[index]) {
                    partValue = "".concat(partValue).concat(delimeters_1[index]);
                }
                return partValue;
            });
            var problemDate = (0, moment_1.default)(modifiedParts.join(''), format, true);
            if (problemDate.isValid()) {
                var checkedLessOrGreater = lessOrGreater(problemDate, format[0], maxDate, minDate);
                if (!checkedLessOrGreater.result) {
                    var message = checkedLessOrGreater.message, result = checkedLessOrGreater.result;
                    return buildResponse(message, result);
                }
                return buildResponse(exports.CALENDAR_ERROR_MESSAGES.INCOMPLETE, false);
            }
            else {
                return buildResponse(exports.CALENDAR_ERROR_MESSAGES.INVALID, false);
            }
        }
        else {
            return buildResponse(exports.CALENDAR_ERROR_MESSAGES.INVALID, false);
        }
    }
    else if (isValidDate && value.indexOf('_') === -1) {
        var checkedLessOrGreater = lessOrGreater(date, format[0], maxDate, minDate);
        if (!checkedLessOrGreater.result) {
            var message = checkedLessOrGreater.message, result = checkedLessOrGreater.result;
            return buildResponse(message, result);
        }
    }
    return buildResponse('', true);
}
exports.checkInvalidDate = checkInvalidDate;
//# sourceMappingURL=calendarUtils.js.map