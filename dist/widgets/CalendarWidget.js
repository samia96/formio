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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Formio_1 = require("../Formio");
var InputWidget_1 = __importDefault(require("./InputWidget"));
var utils_1 = require("../utils/utils");
var moment_1 = __importDefault(require("moment"));
var lodash_1 = __importDefault(require("lodash"));
var DEFAULT_FORMAT = 'yyyy-MM-dd hh:mm a';
var ISO_8601_FORMAT = 'yyyy-MM-ddTHH:mm:ssZ';
var isIEBrowser = (0, utils_1.getBrowserInfo)().ie;
var CalendarWidget = /** @class */ (function (_super) {
    __extends(CalendarWidget, _super);
    /* eslint-enable camelcase */
    function CalendarWidget(settings, component, instance, index) {
        var _this = _super.call(this, settings, component, instance, index) || this;
        // Change the format to map to the settings.
        if (_this.settings.noCalendar) {
            _this.settings.format = _this.settings.format.replace(/yyyy-MM-dd /g, '');
        }
        if (!_this.settings.enableTime) {
            _this.settings.format = _this.settings.format.replace(/ hh:mm a$/g, '');
        }
        else if (_this.settings.time_24hr) {
            _this.settings.format = _this.settings.format.replace(/hh:mm a$/g, 'HH:mm');
        }
        _this.zoneLoading = false;
        _this.timezonesUrl = "".concat(Formio_1.Formio.cdn['moment-timezone'], "/data/packed/latest.json");
        return _this;
    }
    Object.defineProperty(CalendarWidget, "defaultSettings", {
        /* eslint-disable camelcase */
        get: function () {
            return {
                type: 'calendar',
                altInput: true,
                allowInput: true,
                clickOpens: true,
                enableDate: true,
                enableTime: true,
                mode: 'single',
                noCalendar: false,
                format: DEFAULT_FORMAT,
                dateFormat: ISO_8601_FORMAT,
                useLocaleSettings: false,
                language: 'us-en',
                hourIncrement: 1,
                minuteIncrement: 5,
                time_24hr: false,
                saveAs: 'date',
                displayInTimezone: '',
                timezone: '',
                disable: [],
                minDate: '',
                maxDate: ''
            };
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Load the timezones.
     *
     * @return {boolean} TRUE if the zones are loading, FALSE otherwise.
     */
    CalendarWidget.prototype.loadZones = function () {
        var _this = this;
        var timezone = this.timezone;
        if (this.zoneLoading) {
            return true;
        }
        if (!(0, utils_1.zonesLoaded)() && (0, utils_1.shouldLoadZones)(timezone)) {
            this.zoneLoading = true;
            (0, utils_1.loadZones)(this.timezonesUrl, timezone).then(function () {
                _this.zoneLoading = false;
                _this.emit('redraw');
            });
            // Return zones are loading.
            return true;
        }
        // Zones are already loaded.
        return false;
    };
    CalendarWidget.prototype.attach = function (input) {
        var _this = this;
        var _a;
        var superAttach = _super.prototype.attach.call(this, input);
        var dateFormatInfo = (0, utils_1.getLocaleDateFormatInfo)(this.settings.language);
        this.defaultFormat = {
            date: dateFormatInfo.dayFirst ? 'd/m/Y ' : 'm/d/Y ',
            time: 'G:i K'
        };
        this.closedOn = 0;
        this.valueFormat = (this.settings.saveAs === 'date') ? ISO_8601_FORMAT : this.settings.dateFormat || ISO_8601_FORMAT;
        this.valueMomentFormat = (0, utils_1.convertFormatToMoment)(this.valueFormat);
        var isReadOnly = this.settings.readOnly;
        this.settings.minDate = isReadOnly ? null : (0, utils_1.getDateSetting)(this.settings.minDate);
        this.settings.maxDate = isReadOnly ? null : (0, utils_1.getDateSetting)(this.settings.maxDate);
        this.settings.disable = this.disabledDates;
        this.settings.disableWeekends ? this.settings.disable.push(this.disableWeekends) : '';
        this.settings.disableWeekdays ? this.settings.disable.push(this.disableWeekdays) : '';
        this.settings.disableFunction ? this.settings.disable.push(this.disableFunction) : '';
        this.settings.wasDefaultValueChanged = false;
        this.settings.defaultValue = '';
        this.settings.manualInputValue = '';
        this.settings.isManuallyOverriddenValue = false;
        this.settings.currentValue = '';
        this.settings.altFormat = (0, utils_1.convertFormatToFlatpickr)(this.settings.format);
        this.settings.dateFormat = (0, utils_1.convertFormatToFlatpickr)(this.settings.dateFormat);
        this.settings.position = 'auto center';
        this.settings.onChange = function () {
            if (_this.settings.allowInput) {
                if (_this.settings.isManuallyOverriddenValue && _this.settings.enableTime) {
                    _this.calendar._input.value = _this.settings.manualInputValue;
                }
                else {
                    _this.settings.manualInputValue = '';
                }
                _this.settings.isManuallyOverriddenValue = false;
            }
            _this.emit('update');
        };
        this.settings.onOpen = function () { return _this.hook('onCalendarOpen'); };
        this.settings.onClose = function () {
            _this.hook('onCalendarClose');
            _this.closedOn = Date.now();
            if (_this.settings.allowInput && _this.settings.enableTime) {
                _this.calendar._input.value = _this.settings.manualInputValue || _this.calendar._input.value;
                _this.settings.isManuallyOverriddenValue = false;
                _this.emit('update');
            }
            if (_this.settings.wasDefaultValueChanged) {
                _this.calendar._input.value = _this.settings.defaultValue;
                _this.settings.wasDefaultValueChanged = false;
            }
            if (_this.calendar) {
                _this.emit('blur');
            }
        };
        Formio_1.Formio.requireLibrary('flatpickr-css', 'flatpickr', [
            { type: 'styles', src: "".concat(Formio_1.Formio.cdn['flatpickr-formio'], "/flatpickr.min.css") }
        ], true);
        if (this.component.shortcutButtons) {
            this.component.shortcutButtons = this.component.shortcutButtons.filter(function (btn) { return btn.label && btn.onClick; });
        }
        if ((_a = this.component.shortcutButtons) === null || _a === void 0 ? void 0 : _a.length) {
            Formio_1.Formio.requireLibrary('shortcut-buttons-flatpickr-css', 'ShortcutButtonsPlugin', [
                { type: 'styles', src: "".concat(Formio_1.Formio.cdn['shortcut-buttons-flatpickr'], "/themes/light.min.css") }
            ], true);
        }
        return superAttach
            .then(function () {
            var _a;
            if ((_a = _this.component.shortcutButtons) === null || _a === void 0 ? void 0 : _a.length) {
                return Formio_1.Formio.requireLibrary('shortcut-buttons-flatpickr', 'ShortcutButtonsPlugin', "".concat(Formio_1.Formio.cdn['shortcut-buttons-flatpickr'], "/shortcut-buttons-flatpickr.min.js"), true);
            }
        })
            .then(function (ShortcutButtonsPlugin) {
            return Formio_1.Formio.requireLibrary('flatpickr', 'flatpickr', "".concat(Formio_1.Formio.cdn['flatpickr-formio'], "/flatpickr.min.js"), true)
                .then(function (Flatpickr) {
                var _a;
                if (((_a = _this.component.shortcutButtons) === null || _a === void 0 ? void 0 : _a.length) && ShortcutButtonsPlugin) {
                    _this.initShortcutButtonsPlugin(ShortcutButtonsPlugin);
                }
                _this.settings.formatDate = _this.getFlatpickrFormatDate(Flatpickr);
                if (_this._input) {
                    var locale = _this.settings.locale;
                    if (locale && locale.length >= 2 && locale !== 'en') {
                        return Formio_1.Formio.requireLibrary("flatpickr-".concat(locale), "flatpickr-".concat(locale), "".concat(Formio_1.Formio.cdn['flatpickr-formio'], "/l10n/flatpickr-").concat(locale, ".js"), true).then(function () { return _this.initFlatpickr(Flatpickr); });
                    }
                    else {
                        _this.initFlatpickr(Flatpickr);
                    }
                }
            });
        })
            .catch(function (err) {
            console.warn(err);
        });
    };
    Object.defineProperty(CalendarWidget.prototype, "disableWeekends", {
        get: function () {
            return function (date) {
                return (date.getDay() === 0 || date.getDay() === 6);
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "disableWeekdays", {
        get: function () {
            var _this = this;
            return function (date) { return !_this.disableWeekends(date); };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "disableFunction", {
        get: function () {
            var _this = this;
            return function (date) { return _this.evaluate("return ".concat(_this.settings.disableFunction), {
                date: date
            }); };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "timezone", {
        get: function () {
            return this.componentInstance.getTimezone(this.settings);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "defaultSettings", {
        get: function () {
            return CalendarWidget.defaultSettings;
        },
        enumerable: false,
        configurable: true
    });
    CalendarWidget.prototype.addSuffix = function (suffix) {
        var _this = this;
        this.addEventListener(suffix, 'click', function () {
            setTimeout(function () {
                if (_this.calendar) {
                    if (!_this.calendar.isOpen && ((Date.now() - _this.closedOn) > 200)) {
                        _this.calendar.open();
                    }
                    else if (_this.calendar.isOpen) {
                        _this.calendar.close();
                    }
                }
            }, 0);
        });
        return suffix;
    };
    Object.defineProperty(CalendarWidget.prototype, "disabled", {
        set: function (disabled) {
            _super.prototype.disabled = disabled;
            if (this.calendar) {
                if (disabled) {
                    this.calendar._input.setAttribute('disabled', 'disabled');
                }
                else {
                    this.calendar._input.removeAttribute('disabled');
                }
                this.calendar.close();
                this.calendar.redraw();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "input", {
        get: function () {
            return this.calendar ? this.calendar.altInput : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "disabledDates", {
        get: function () {
            if (this.settings.disabledDates) {
                var disabledDates = this.settings.disabledDates.split(',');
                return disabledDates.map(function (item) {
                    var dateMask = /\d{4}-\d{2}-\d{2}/g;
                    var dates = item.match(dateMask);
                    if (dates && dates.length) {
                        return dates.length === 1 ? item.match(dateMask)[0] : {
                            from: item.match(dateMask)[0],
                            to: item.match(dateMask)[1],
                        };
                    }
                });
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "localeFormat", {
        get: function () {
            var format = '';
            if (this.settings.enableDate) {
                format += this.defaultFormat.date;
            }
            if (this.settings.enableTime) {
                format += this.defaultFormat.time;
            }
            return format;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "dateTimeFormat", {
        get: function () {
            return this.settings.useLocaleSettings ? this.localeFormat : (0, utils_1.convertFormatToFlatpickr)(this.dateFormat);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CalendarWidget.prototype, "dateFormat", {
        get: function () {
            return lodash_1.default.get(this.settings, 'format', DEFAULT_FORMAT);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Return the date value.
     *
     * @param date
     * @param format
     * @return {string}
     */
    CalendarWidget.prototype.getDateValue = function (date, format, useTimezone) {
        if (useTimezone) {
            return (0, utils_1.momentDate)(date, this.valueFormat, this.timezone).format((0, utils_1.convertFormatToMoment)(format));
        }
        return (0, moment_1.default)(date).format((0, utils_1.convertFormatToMoment)(format));
    };
    /**
     * Return the value of the selected date.
     *
     * @return {*}
     */
    CalendarWidget.prototype.getValue = function () {
        // Standard output format.
        if (!this.calendar) {
            return _super.prototype.getValue.call(this);
        }
        // Get the selected dates from the calendar widget.
        var dates = this.calendar.selectedDates;
        if (!dates || !dates.length) {
            return _super.prototype.getValue.call(this);
        }
        if (!(dates[0] instanceof Date)) {
            return 'Invalid Date';
        }
        return this.getDateValue(dates[0], this.valueFormat, (this.settings.saveAs === 'date'));
    };
    CalendarWidget.prototype.isValueISO8601 = function (value) {
        return value && (typeof value === 'string') && value.match(/-[0-9]{2}T[0-9]{2}:/);
    };
    /**
     * Set the selected date value.
     *
     * @param value
     */
    CalendarWidget.prototype.setValue = function (value) {
        var saveAsText = (this.settings.saveAs === 'text');
        if (!this.calendar) {
            value = value ? (0, utils_1.formatDate)(this.timezonesUrl, value, (0, utils_1.convertFormatToMoment)(this.settings.format), this.timezone, (0, utils_1.convertFormatToMoment)(this.valueMomentFormat)) : value;
            return _super.prototype.setValue.call(this, value);
        }
        var zonesLoading = this.loadZones();
        if (value) {
            if (!saveAsText && this.settings.readOnly && !zonesLoading) {
                this.calendar.setDate((0, utils_1.momentDate)(value, this.valueFormat, this.timezone).format(), false);
            }
            else if (this.isValueISO8601(value)) {
                this.calendar.setDate(value, false);
            }
            else {
                this.calendar.setDate((0, moment_1.default)(value, this.valueMomentFormat).toDate(), false);
            }
        }
        else {
            this.calendar.clear(false);
        }
    };
    CalendarWidget.prototype.getValueAsString = function (value, format) {
        var inputFormat = format || this.dateFormat;
        var valueFormat = this.calendar ? this.valueFormat : this.settings.dateFormat;
        if (this.settings.saveAs === 'text' && this.componentInstance.parent && !this.settings.readOnly) {
            return (0, moment_1.default)(value, (0, utils_1.convertFormatToMoment)(valueFormat)).format((0, utils_1.convertFormatToMoment)(valueFormat));
        }
        return (0, utils_1.formatDate)(this.timezonesUrl, value, inputFormat, this.timezone, (0, utils_1.convertFormatToMoment)(valueFormat));
    };
    CalendarWidget.prototype.setErrorClasses = function (hasErrors) {
        if (!this.input) {
            return;
        }
        if (hasErrors) {
            this.addClass(this.input, 'is-invalid');
            this.input.setAttribute('aria-invalid', 'true');
        }
        else {
            this.removeClass(this.input, 'is-invalid');
            this.input.setAttribute('aria-invalid', 'false');
        }
    };
    CalendarWidget.prototype.validationValue = function (value) {
        if (typeof value === 'string') {
            return new Date(value);
        }
        return value.map(function (val) { return new Date(val); });
    };
    CalendarWidget.prototype.isCalendarElement = function (element) {
        var _a, _b, _c, _d, _e;
        if (!element) {
            return true;
        }
        if ((_c = (_b = (_a = this.calendar) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.appendTo) === null || _c === void 0 ? void 0 : _c.contains(element)) {
            return true;
        }
        return (_e = (_d = this.calendar) === null || _d === void 0 ? void 0 : _d.calendarContainer) === null || _e === void 0 ? void 0 : _e.contains(element);
    };
    CalendarWidget.prototype.initFlatpickr = function (Flatpickr) {
        var _this = this;
        // Create a new flatpickr.
        this.calendar = new Flatpickr(this._input, __assign(__assign({}, this.settings), { disableMobile: true }));
        this.calendar.altInput.addEventListener('input', function (event) {
            if (_this.settings.allowInput && _this.settings.currentValue !== event.target.value) {
                _this.settings.manualInputValue = event.target.value;
                _this.settings.isManuallyOverriddenValue = true;
                _this.settings.currentValue = event.target.value;
            }
            if (event.target.value === '' && _this.calendar.selectedDates.length > 0) {
                _this.settings.wasDefaultValueChanged = true;
                _this.settings.defaultValue = event.target.value;
                _this.calendar.clear();
            }
            else {
                _this.settings.wasDefaultValueChanged = false;
            }
        });
        var excludedFromMaskFormats = ['MMMM'];
        if (!this.settings.readOnly && !lodash_1.default.some(excludedFromMaskFormats, function (format) { return lodash_1.default.includes(_this.settings.format, format); })) {
            // Enforce the input mask of the format.
            this.setInputMask(this.calendar._input, (0, utils_1.convertFormatToMask)(this.settings.format));
        }
        // Fixes an issue with IE11 where value is set only after the second click
        // TODO: Remove when the issue is solved in the flatpickr library
        if (isIEBrowser) {
            // Remove the original blur listener, because value will be set to empty since relatedTarget is null in IE11
            var originalBlurListener = this.calendar._handlers.find(function (_a) {
                var event = _a.event, element = _a.element;
                return event === 'blur' && element === _this.calendar._input;
            });
            this.calendar._input.removeEventListener('blur', originalBlurListener.handler);
            // Add the same event listener as in the original library, but with workaround for IE11 issue
            this.addEventListener(this.calendar._input, 'blur', function (event) {
                var activeElement = _this.settings.shadowRoot ? _this.settings.shadowRoot.activeElement : document.activeElement;
                var relatedTarget = event.relatedTarget ? event.relatedTarget : activeElement;
                var isInput = event.target === _this.calendar._input;
                if (isInput && !_this.isCalendarElement(relatedTarget)) {
                    _this.calendar.setDate(_this.calendar._input.value, true, event.target === _this.calendar.altInput
                        ? _this.calendar.config.altFormat
                        : _this.calendar.config.dateFormat);
                }
            });
        }
        // Make sure we commit the value after a blur event occurs.
        this.addEventListener(this.calendar._input, 'blur', function (event) {
            var _a, _b, _c, _d;
            var activeElement = _this.settings.shadowRoot ? _this.settings.shadowRoot.activeElement : document.activeElement;
            var relatedTarget = event.relatedTarget ? event.relatedTarget : activeElement;
            if (!(isIEBrowser && !relatedTarget) && !_this.isCalendarElement(relatedTarget)) {
                var inputValue = _this.calendar.input.value;
                var dateValue = inputValue ? (0, moment_1.default)(_this.calendar.input.value, (0, utils_1.convertFormatToMoment)(_this.valueFormat)).toDate() : inputValue;
                _this.calendar.setDate(dateValue, true, _this.settings.altFormat);
            }
            else if (!_this.calendar.input.value && _this.calendar.config.noCalendar) {
                var value = (0, moment_1.default)({ hour: (_b = (_a = _this.calendar) === null || _a === void 0 ? void 0 : _a.config) === null || _b === void 0 ? void 0 : _b.defaultHour, minute: (_d = (_c = _this.calendar) === null || _c === void 0 ? void 0 : _c.config) === null || _d === void 0 ? void 0 : _d.defaultMinute }).toDate();
                _this.calendar.setDate(value, true, _this.settings.format);
            }
        });
        // FJS-1103: When hit the enter button, the field not saving the year correctly
        this.addEventListener(this.calendar.altInput, 'keydown', function (event) {
            if (event.keyCode === 13) {
                if (_this.calendar.isOpen) {
                    _this.calendar.close();
                    event.stopPropagation();
                }
            }
        });
        // Restore the calendar value from the component value.
        this.setValue(this.componentValue);
    };
    CalendarWidget.prototype.initShortcutButtonsPlugin = function (ShortcutButtonsPlugin) {
        var _this = this;
        this.settings.plugins = [
            // eslint-disable-next-line new-cap
            ShortcutButtonsPlugin({
                button: this.component.shortcutButtons.map(function (btn) { return ({ label: btn.label, attributes: btn.attribute }); }),
                onClick: function (index) {
                    var getValue = _this.component.shortcutButtons[index].onClick;
                    var date = _this.evaluate(getValue, { date: new Date() }, 'date');
                    _this.calendar.setDate(date, true);
                }
            })
        ];
    };
    Object.defineProperty(CalendarWidget.prototype, "componentValue", {
        get: function () {
            var compValue = this.componentInstance.dataValue;
            if (Array.isArray(compValue)) {
                compValue = compValue[this.valueIndex];
            }
            return compValue;
        },
        enumerable: false,
        configurable: true
    });
    CalendarWidget.prototype.getFlatpickrFormatDate = function (Flatpickr) {
        var _this = this;
        return function (date, format) {
            // Only format this if this is the altFormat and the form is readOnly.
            if (_this.settings.readOnly && (format === _this.settings.altFormat)) {
                if (_this.loadZones()) {
                    return Flatpickr.formatDate(date, format);
                }
                var currentValue = new Date(_this.getValue());
                if (currentValue.toString() === date.toString()) {
                    return (0, utils_1.formatOffset)(_this.timezonesUrl, Flatpickr.formatDate.bind(Flatpickr), new Date(_this.componentValue), format, _this.timezone);
                }
                return (0, utils_1.formatOffset)(_this.timezonesUrl, Flatpickr.formatDate.bind(Flatpickr), date, format, _this.timezone);
            }
            return Flatpickr.formatDate(date, format);
        };
    };
    CalendarWidget.prototype.destroy = function (all) {
        if (all === void 0) { all = false; }
        if (this.calendar) {
            this.calendar.destroy();
        }
        _super.prototype.destroy.call(this, all);
    };
    return CalendarWidget;
}(InputWidget_1.default));
exports.default = CalendarWidget;
//# sourceMappingURL=CalendarWidget.js.map