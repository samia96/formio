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
var lodash_1 = __importDefault(require("lodash"));
var Formio_1 = require("../../Formio");
var ListComponent_1 = __importDefault(require("../_classes/list/ListComponent"));
var Input_1 = __importDefault(require("../_classes/input/Input"));
var Form_1 = __importDefault(require("../../Form"));
var utils_1 = require("../../utils/utils");
var ChoicesWrapper_1 = __importDefault(require("../../utils/ChoicesWrapper"));
var SelectComponent = /** @class */ (function (_super) {
    __extends(SelectComponent, _super);
    function SelectComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SelectComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return ListComponent_1.default.schema.apply(ListComponent_1.default, __spreadArray([{
                type: 'select',
                label: 'Select',
                key: 'select',
                idPath: 'id',
                data: {
                    values: [{ label: '', value: '' }],
                    json: '',
                    url: '',
                    resource: '',
                    custom: ''
                },
                clearOnRefresh: false,
                limit: 100,
                valueProperty: '',
                lazyLoad: true,
                filter: '',
                searchEnabled: true,
                searchDebounce: 0.3,
                searchField: '',
                minSearch: 0,
                readOnlyValue: false,
                selectFields: '',
                selectThreshold: 0.3,
                uniqueOptions: false,
                tableView: true,
                fuseOptions: {
                    include: 'score',
                    threshold: 0.3,
                },
                indexeddb: {
                    filter: {}
                },
                customOptions: {},
                useExactSearch: false,
            }], extend, false));
    };
    Object.defineProperty(SelectComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Select',
                group: 'basic',
                icon: 'th-list',
                weight: 70,
                documentation: '/userguide/form-building/form-components#select',
                schema: SelectComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent, "serverConditionSettings", {
        get: function () {
            return SelectComponent.conditionOperatorsSettings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent, "conditionOperatorsSettings", {
        get: function () {
            return __assign(__assign({}, _super.conditionOperatorsSettings), { valueComponent: function (classComp) {
                    var valueComp = __assign(__assign({}, classComp), { type: 'select' });
                    if ((0, utils_1.isSelectResourceWithObjectValue)(classComp)) {
                        valueComp.reference = false;
                        valueComp.onSetItems = "\n            var templateKeys = utils.getItemTemplateKeys(component.template) || [];\n            items = _.map(items || [], i => {\n              var item = {};\n              _.each(templateKeys, k =>  _.set(item, k, _.get(i, k)));\n              return item;\n            })\n          ";
                    }
                    return valueComp;
                } });
        },
        enumerable: false,
        configurable: true
    });
    SelectComponent.savedValueTypes = function (schema) {
        var boolean = utils_1.componentValueTypes.boolean, string = utils_1.componentValueTypes.string, number = utils_1.componentValueTypes.number, object = utils_1.componentValueTypes.object, array = utils_1.componentValueTypes.array;
        var dataType = schema.dataType, reference = schema.reference;
        var types = (0, utils_1.getComponentSavedTypes)(schema);
        if (types) {
            return types;
        }
        if (reference) {
            return [object];
        }
        if (dataType === 'object') {
            return [object, array];
        }
        if (utils_1.componentValueTypes[dataType]) {
            return [utils_1.componentValueTypes[dataType]];
        }
        return [boolean, string, number, object, array];
    };
    SelectComponent.prototype.init = function () {
        var _this = this;
        _super.prototype.init.call(this);
        this.templateData = {};
        this.validators = this.validators.concat(['select', 'onlyAvailableItems']);
        // Trigger an update.
        var updateArgs = [];
        var triggerUpdate = lodash_1.default.debounce(function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            updateArgs = [];
            return _this.updateItems.apply(_this, args);
        }, 100);
        this.triggerUpdate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // Make sure we always resolve the previous promise before reassign it
            if (typeof _this.itemsLoadedResolve === 'function') {
                _this.itemsLoadedResolve();
            }
            _this.itemsLoaded = new Promise(function (resolve) {
                _this.itemsLoadedResolve = resolve;
            });
            if (args.length) {
                updateArgs = args;
            }
            return triggerUpdate.apply(void 0, updateArgs);
        };
        // Keep track of the select options.
        this.selectOptions = [];
        if (this.itemsFromUrl) {
            this.isFromSearch = false;
            this.searchServerCount = null;
            this.defaultServerCount = null;
            this.isScrollLoading = false;
            this.searchDownloadedResources = [];
            this.defaultDownloadedResources = [];
        }
        // If this component has been activated.//
        this.activated = false;
        this.itemsLoaded = new Promise(function (resolve) {
            _this.itemsLoadedResolve = resolve;
        });
        this.shouldPositionDropdown = this.hasDataGridAncestor();
        if (this.isHtmlRenderMode()) {
            this.activate();
        }
        // Get the template keys for this select component.
        this.getTemplateKeys();
    };
    Object.defineProperty(SelectComponent.prototype, "dataReady", {
        get: function () {
            // If the root submission has been set, and we are still not attached, then assume
            // that our data is ready.
            if (this.root &&
                this.root.submissionSet &&
                !this.attached) {
                return Promise.resolve();
            }
            return this.itemsLoaded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "defaultSchema", {
        get: function () {
            return SelectComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "emptyValue", {
        get: function () {
            if (this.component.multiple) {
                return [];
            }
            // if select has JSON data source type, we are defining if empty value would be an object or a string by checking JSON's first item
            if (this.component.dataSrc === 'json' && this.component.data.json) {
                var firstItem = this.component.data.json[0];
                var firstValue = void 0;
                if (this.valueProperty) {
                    firstValue = lodash_1.default.get(firstItem, this.valueProperty);
                }
                else {
                    firstValue = firstItem;
                }
                if (firstValue && typeof firstValue === 'string') {
                    return '';
                }
                else {
                    return {};
                }
            }
            if (this.valueProperty) {
                return '';
            }
            return {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "valueProperty", {
        get: function () {
            if (this.component.valueProperty) {
                return this.component.valueProperty;
            }
            // Force values datasource to use values without actually setting it on the component settings.
            if (this.component.dataSrc === 'values') {
                return 'value';
            }
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.elementInfo.call(this);
            info.type = 'select';
            info.changeEvent = 'change';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "isSelectResource", {
        get: function () {
            return this.component.dataSrc === 'resource';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "itemsFromUrl", {
        get: function () {
            return this.isSelectResource || this.isSelectURL;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "isInfiniteScrollProvided", {
        get: function () {
            return this.itemsFromUrl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "shouldDisabled", {
        get: function () {
            return _super.prototype.shouldDisabled || this.parentDisabled;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "shouldInitialLoad", {
        get: function () {
            if (this.component.widget === 'html5' &&
                this.isEntireObjectDisplay() &&
                this.component.searchField &&
                this.dataValue) {
                return false;
            }
            return _super.prototype.shouldLoad;
        },
        enumerable: false,
        configurable: true
    });
    SelectComponent.prototype.isEntireObjectDisplay = function () {
        return this.component.dataSrc === 'resource' && this.valueProperty === 'data';
    };
    SelectComponent.prototype.selectValueAndLabel = function (data) {
        var value = this.getOptionValue((this.isEntireObjectDisplay() && !this.itemValue(data)) ? data : this.itemValue(data));
        return {
            value: value,
            label: this.itemTemplate((this.isEntireObjectDisplay() && !lodash_1.default.isObject(data.data)) ? { data: data } : data, value)
        };
    };
    SelectComponent.prototype.itemTemplate = function (data, value) {
        var _this = this;
        if (!lodash_1.default.isNumber(data) && lodash_1.default.isEmpty(data)) {
            return '';
        }
        // If they wish to show the value in read only mode, then just return the itemValue here.
        if (this.options.readOnly && this.component.readOnlyValue) {
            return this.itemValue(data);
        }
        // Perform a fast interpretation if we should not use the template.
        if (data && !this.component.template) {
            var itemLabel = data.label || data;
            var value_1 = (typeof itemLabel === 'string') ? this.t(itemLabel, { _userInput: true }) : itemLabel;
            return this.sanitize(value_1, this.shouldSanitizeValue);
        }
        if (this.component.multiple && lodash_1.default.isArray(this.dataValue) ? this.dataValue.find(function (val) { return value === val; }) : (this.dataValue === value)) {
            var selectData = this.selectData;
            if (selectData) {
                var templateValue = this.component.reference && (value === null || value === void 0 ? void 0 : value._id) ? value._id.toString() : value;
                if (!this.templateData || !this.templateData[templateValue]) {
                    this.getOptionTemplate(data, value);
                }
                if (this.component.multiple) {
                    if (selectData[templateValue]) {
                        data = selectData[templateValue];
                    }
                }
                else {
                    data = selectData;
                }
            }
        }
        if (typeof data === 'string' || typeof data === 'number') {
            return this.sanitize(this.t(data, { _userInput: true }), this.shouldSanitizeValue);
        }
        if (Array.isArray(data)) {
            return data.map(function (val) {
                if (typeof val === 'string' || typeof val === 'number') {
                    return _this.sanitize(_this.t(val, { _userInput: true }), _this.shouldSanitizeValue);
                }
                return val;
            });
        }
        if (data.data) {
            // checking additional fields in the template for the selected Entire Object option
            var hasNestedFields = /item\.data\.\w*/g.test(this.component.template);
            data.data = this.isEntireObjectDisplay() && lodash_1.default.isObject(data.data) && !hasNestedFields
                ? JSON.stringify(data.data)
                : data.data;
        }
        return _super.prototype.itemTemplate.call(this, data, value);
    };
    /**
     * Adds an option to the select dropdown.
     *
     * @param value
     * @param label
     */
    SelectComponent.prototype.addOption = function (value, label, attrs, id) {
        if (attrs === void 0) { attrs = {}; }
        if (id === void 0) { id = (0, utils_1.getRandomComponentId)(); }
        if (lodash_1.default.isNil(label))
            return;
        var idPath = this.component.idPath
            ? this.component.idPath.split('.').reduceRight(function (obj, key) {
                var _a;
                return (_a = {}, _a[key] = obj, _a);
            }, id)
            : {};
        var option = __assign({ value: this.getOptionValue(value), label: label }, idPath);
        var skipOption = this.component.uniqueOptions
            ? !!this.selectOptions.find(function (selectOption) { return lodash_1.default.isEqual(selectOption.value, option.value); })
            : false;
        if (skipOption) {
            return;
        }
        if (value) {
            this.selectOptions.push(option);
        }
        if (this.refs.selectContainer && (this.component.widget === 'html5')) {
            // Replace an empty Object value to an empty String.
            if (option.value && lodash_1.default.isObject(option.value) && lodash_1.default.isEmpty(option.value)) {
                option.value = '';
            }
            // Add element to option so we can reference it later.
            var div = document.createElement('div');
            div.innerHTML = this.sanitize(this.renderTemplate('selectOption', {
                selected: lodash_1.default.isEqual(this.getOptionValue(this.dataValue), option.value),
                option: option,
                attrs: attrs,
                id: id,
                useId: (this.valueProperty === '' || this.isEntireObjectDisplay()) && lodash_1.default.isObject(value) && id,
            }), this.shouldSanitizeValue).trim();
            option.element = div.firstChild;
            this.refs.selectContainer.appendChild(option.element);
        }
    };
    SelectComponent.prototype.addValueOptions = function (items) {
        var _this = this;
        items = items || [];
        var added = false;
        var data = this.dataValue;
        // preset submission value with value property before request.
        if (this.options.pdf && !items.length && this.component.dataSrc === 'url' && this.valueProperty) {
            data = Array.isArray(data)
                ? data.map(function (item) { return lodash_1.default.set({}, _this.valueProperty, item); })
                : lodash_1.default.set({}, this.valueProperty, data);
        }
        if (!this.selectOptions.length) {
            // Add the currently selected choices if they don't already exist.
            var currentChoices = Array.isArray(data) && this.component.multiple ? data : [data];
            added = this.addCurrentChoices(currentChoices, items);
            if (!added && !this.component.multiple) {
                this.addPlaceholder();
            }
        }
        return added;
    };
    SelectComponent.prototype.disableInfiniteScroll = function () {
        if (!this.downloadedResources) {
            return;
        }
        this.downloadedResources.serverCount = this.downloadedResources.length;
        this.serverCount = this.downloadedResources.length;
    };
    /* eslint-disable max-statements */
    SelectComponent.prototype.setItems = function (items, fromSearch) {
        var _this = this;
        var _a, _b;
        // If the items is a string, then parse as JSON.
        if (typeof items == 'string') {
            try {
                items = JSON.parse(items);
            }
            catch (err) {
                console.warn(err.message);
                items = [];
            }
        }
        // Allow js processing (needed for form builder)
        if (this.component.onSetItems) {
            var newItems = typeof this.component.onSetItems === 'function'
                ? this.component.onSetItems(this, items)
                : this.evaluate(this.component.onSetItems, { items: items }, 'items');
            if (newItems) {
                items = newItems;
            }
        }
        if (!this.choices && this.refs.selectContainer) {
            this.empty(this.refs.selectContainer);
        }
        // If they provided select values, then we need to get them instead.
        if (this.component.selectValues) {
            items = lodash_1.default.get(items, this.component.selectValues, items) || [];
        }
        var areItemsEqual;
        if (this.itemsFromUrl) {
            areItemsEqual = this.isSelectURL ? lodash_1.default.isEqual(items, this.downloadedResources) : false;
            var areItemsEnded = this.component.limit > items.length;
            var areItemsDownloaded = areItemsEqual
                && this.downloadedResources
                && this.downloadedResources.length === items.length;
            if (areItemsEnded) {
                this.disableInfiniteScroll();
            }
            else if (areItemsDownloaded) {
                this.selectOptions = [];
            }
            else {
                this.serverCount = items.serverCount;
            }
        }
        if (this.isScrollLoading && items) {
            if (!areItemsEqual) {
                this.downloadedResources = this.downloadedResources
                    ? this.downloadedResources.concat(items)
                    : items;
            }
            this.downloadedResources.serverCount = items.serverCount || this.downloadedResources.serverCount;
        }
        else {
            this.downloadedResources = items || [];
            this.selectOptions = [];
            // If there is new select option with same id as already selected, set the new one
            if (!lodash_1.default.isEmpty(this.dataValue) && this.component.idPath) {
                var selectedOptionId_1 = lodash_1.default.get(this.dataValue, this.component.idPath, null);
                var newOptionWithSameId = !lodash_1.default.isNil(selectedOptionId_1) && items.find(function (item) {
                    var itemId = lodash_1.default.get(item, _this.component.idPath);
                    return itemId === selectedOptionId_1;
                });
                if (newOptionWithSameId) {
                    this.setValue(newOptionWithSameId);
                }
            }
        }
        // Add the value options.
        if (!fromSearch) {
            this.addValueOptions(items);
        }
        if (this.component.widget === 'html5' && !this.component.placeholder) {
            this.addOption(null, '');
        }
        // Iterate through each of the items.
        lodash_1.default.each(items, function (item, index) {
            // preventing references of the components inside the form to the parent form when building forms
            if (_this.root && _this.root.options.editForm && _this.root.options.editForm._id && _this.root.options.editForm._id === item._id)
                return;
            var itemValueAndLabel = _this.selectValueAndLabel(item);
            _this.addOption(itemValueAndLabel.value, itemValueAndLabel.label, {}, lodash_1.default.get(item, _this.component.idPath, String(index)));
        });
        if (this.choices) {
            this.choices.setChoices(this.selectOptions, 'value', 'label', true);
        }
        else if (this.loading) {
            // Re-attach select input.
            // this.appendTo(this.refs.input[0], this.selectContainer);
        }
        // We are no longer loading.
        this.isScrollLoading = false;
        this.loading = false;
        var searching = fromSearch && ((_b = (_a = this.choices) === null || _a === void 0 ? void 0 : _a.input) === null || _b === void 0 ? void 0 : _b.isFocussed);
        if (!searching) {
            // If a value is provided, then select it.
            if (!this.isEmpty() || this.isRemoveButtonPressed) {
                this.setValue(this.dataValue, {
                    noUpdateEvent: true
                });
            }
            else if (this.shouldAddDefaultValue && !this.options.readOnly) {
                // If a default value is provided then select it.
                var defaultValue = this.defaultValue;
                if (!this.isEmpty(defaultValue)) {
                    this.setValue(defaultValue);
                }
            }
        }
        // Say we are done loading the items.
        this.itemsLoadedResolve();
    };
    SelectComponent.prototype.getSingleItemValueForHTMLMode = function (data) {
        var _a;
        var option = (_a = this.selectOptions) === null || _a === void 0 ? void 0 : _a.find(function (_a) {
            var value = _a.value;
            return lodash_1.default.isEqual(value, data);
        });
        if (option) {
            return option.label || data;
        }
        return data;
    };
    SelectComponent.prototype.itemValueForHTMLMode = function (value) {
        var _this = this;
        if (!this.isHtmlRenderMode()) {
            return _super.prototype.itemValueForHTMLMode.call(this, value);
        }
        if (Array.isArray(value)) {
            var values = value.map(function (item) { return Array.isArray(item)
                ? _this.itemValueForHTMLMode(item)
                : _this.getSingleItemValueForHTMLMode(item); });
            return values.join(', ');
        }
        return this.getSingleItemValueForHTMLMode(value);
    };
    Object.defineProperty(SelectComponent.prototype, "defaultValue", {
        /* eslint-enable max-statements */
        get: function () {
            var defaultValue = _super.prototype.defaultValue;
            if (!defaultValue && (this.component.defaultValue === false || this.component.defaultValue === 0)) {
                defaultValue = this.component.defaultValue;
            }
            return defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "loadingError", {
        get: function () {
            return !this.component.refreshOn && !this.component.refreshOnBlur && this.networkError;
        },
        enumerable: false,
        configurable: true
    });
    SelectComponent.prototype.loadItems = function (url, search, headers, options, method, body) {
        var _this = this;
        options = options || {};
        // See if we should load items or not.
        if (!this.shouldLoad || (!this.itemsFromUrl && this.options.readOnly)) {
            this.isScrollLoading = false;
            this.loading = false;
            this.itemsLoadedResolve();
            return;
        }
        // See if they have not met the minimum search requirements.
        var minSearch = parseInt(this.component.minSearch, 10);
        if (this.component.searchField &&
            (minSearch > 0) &&
            (!search || (search.length < minSearch))) {
            // Set empty items.
            return this.setItems([]);
        }
        // Ensure we have a method and remove any body if method is get
        method = method || 'GET';
        if (method.toUpperCase() === 'GET') {
            body = null;
        }
        var limit = this.component.limit || 100;
        var skip = this.isScrollLoading ? this.selectOptions.length : 0;
        var query = this.component.disableLimit ? {} : {
            limit: limit,
            skip: skip,
        };
        // Allow for url interpolation.
        url = this.interpolate(url, {
            formioBase: Formio_1.Formio.getBaseUrl(),
            search: search,
            limit: limit,
            skip: skip,
            page: Math.abs(Math.floor(skip / limit))
        });
        // Add search capability.
        if (this.component.searchField && search) {
            var searchValue = Array.isArray(search)
                ? search.join(',')
                : typeof search === 'object'
                    ? JSON.stringify(search)
                    : search;
            query[this.component.searchField] = this.component.searchField.endsWith('__regex')
                ? lodash_1.default.escapeRegExp(searchValue)
                : searchValue;
        }
        // If they wish to return only some fields.
        if (this.component.selectFields) {
            query.select = this.component.selectFields;
        }
        // Add sort capability
        if (this.component.sort) {
            query.sort = this.component.sort;
        }
        if (!lodash_1.default.isEmpty(query)) {
            // Add the query string.
            url += (!url.includes('?') ? '?' : '&') + Formio_1.Formio.serialize(query, function (item) { return _this.interpolate(item); });
        }
        // Add filter capability
        if (this.component.filter) {
            url += (!url.includes('?') ? '?' : '&') + this.interpolate(this.component.filter);
        }
        // Set ignoreCache if it is
        options.ignoreCache = this.component.ignoreCache;
        // Make the request.
        options.header = headers;
        this.loading = true;
        Formio_1.Formio.makeRequest(this.options.formio, 'select', url, method, body, options)
            .then(function (response) {
            _this.loading = false;
            _this.error = null;
            _this.setItems(response, !!search);
        })
            .catch(function (err) {
            if (_this.itemsFromUrl) {
                _this.setItems([]);
                _this.disableInfiniteScroll();
            }
            _this.isScrollLoading = false;
            _this.handleLoadingError(err);
        });
    };
    SelectComponent.prototype.handleLoadingError = function (err) {
        this.loading = false;
        if (err.networkError) {
            this.networkError = true;
        }
        this.itemsLoadedResolve();
        this.emit('componentError', {
            component: this.component,
            message: err.toString(),
        });
        console.warn("Unable to load resources for ".concat(this.key));
    };
    Object.defineProperty(SelectComponent.prototype, "requestHeaders", {
        /**
         * Get the request headers for this select dropdown.
         */
        get: function () {
            var _this = this;
            // Create the headers object.
            var headers = new Formio_1.Formio.Headers();
            // Add custom headers to the url.
            if (this.component.data && this.component.data.headers) {
                try {
                    lodash_1.default.each(this.component.data.headers, function (header) {
                        if (header.key) {
                            headers.set(header.key, _this.interpolate(header.value));
                        }
                    });
                }
                catch (err) {
                    console.warn(err.message);
                }
            }
            return headers;
        },
        enumerable: false,
        configurable: true
    });
    SelectComponent.prototype.getCustomItems = function () {
        var customItems = this.evaluate(this.component.data.custom, {
            values: []
        }, 'values');
        this.asyncValues = (0, utils_1.isPromise)(customItems);
        return customItems;
    };
    SelectComponent.prototype.asyncCustomValues = function () {
        if (!lodash_1.default.isBoolean(this.asyncValues)) {
            this.getCustomItems();
        }
        return this.asyncValues;
    };
    SelectComponent.prototype.updateCustomItems = function (forceUpdate) {
        var _this = this;
        if (this.asyncCustomValues()) {
            if (!forceUpdate && !this.active) {
                this.itemsLoadedResolve();
                return;
            }
            this.loading = true;
            this.getCustomItems()
                .then(function (items) {
                _this.loading = false;
                _this.setItems(items || []);
            })
                .catch(function (err) {
                _this.handleLoadingError(err);
            });
        }
        else {
            this.setItems(this.getCustomItems() || []);
        }
    };
    SelectComponent.prototype.isEmpty = function (value) {
        if (value === void 0) { value = this.dataValue; }
        return _super.prototype.isEmpty.call(this, value) || value === undefined;
    };
    SelectComponent.prototype.refresh = function (value, _a) {
        var instance = _a.instance;
        if (this.component.clearOnRefresh && (instance && !instance.pristine)) {
            this.setValue(this.emptyValue);
        }
        this.updateItems(null, true);
    };
    Object.defineProperty(SelectComponent.prototype, "additionalResourcesAvailable", {
        get: function () {
            return lodash_1.default.isNil(this.serverCount) || (this.serverCount > this.downloadedResources.length);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "serverCount", {
        get: function () {
            if (this.isFromSearch) {
                return this.searchServerCount;
            }
            return this.defaultServerCount;
        },
        set: function (value) {
            if (this.isFromSearch) {
                this.searchServerCount = value;
            }
            else {
                this.defaultServerCount = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "downloadedResources", {
        get: function () {
            if (this.isFromSearch) {
                return this.searchDownloadedResources;
            }
            return this.defaultDownloadedResources;
        },
        set: function (value) {
            if (this.isFromSearch) {
                this.searchDownloadedResources = value;
            }
            else {
                this.defaultDownloadedResources = value;
            }
        },
        enumerable: false,
        configurable: true
    });
    SelectComponent.prototype.addPlaceholder = function () {
        if (!this.component.placeholder) {
            return;
        }
        this.addOption('', this.component.placeholder, { placeholder: true });
    };
    /**
     * Activate this select control.
     */
    SelectComponent.prototype.activate = function () {
        if (this.loading || !this.active) {
            this.setLoadingItem();
        }
        if (this.active) {
            return;
        }
        this.activated = true;
        this.triggerUpdate();
    };
    SelectComponent.prototype.setLoadingItem = function (addToCurrentList) {
        if (addToCurrentList === void 0) { addToCurrentList = false; }
        if (this.choices) {
            if (addToCurrentList) {
                this.choices.setChoices([{
                        value: "".concat(this.id, "-loading"),
                        label: 'Loading...',
                        disabled: true,
                    }], 'value', 'label');
            }
            else {
                this.choices.setChoices([{
                        value: '',
                        label: "<i class=\"".concat(this.iconClass('refresh'), "\" style=\"font-size:1.3em;\"></i>"),
                        disabled: true,
                    }], 'value', 'label', true);
            }
        }
        else if (this.component.dataSrc === 'url' || this.component.dataSrc === 'resource') {
            this.addOption('', this.t('loading...'));
        }
    };
    Object.defineProperty(SelectComponent.prototype, "active", {
        get: function () {
            return !this.component.lazyLoad || this.activated;
        },
        enumerable: false,
        configurable: true
    });
    SelectComponent.prototype.render = function () {
        var info = this.inputInfo;
        info.attr = info.attr || {};
        info.multiple = this.component.multiple;
        return _super.prototype.render.call(this, this.wrapElement(this.renderTemplate('select', {
            input: info,
            selectOptions: '',
            index: null,
        })));
    };
    SelectComponent.prototype.wrapElement = function (element) {
        return this.component.addResource && !this.options.readOnly
            ? (this.renderTemplate('resourceAdd', {
                element: element
            }))
            : element;
    };
    SelectComponent.prototype.choicesOptions = function () {
        var useSearch = this.component.hasOwnProperty('searchEnabled') ? this.component.searchEnabled : true;
        var placeholderValue = this.t(this.component.placeholder, { _userInput: true });
        var customOptions = this.component.customOptions || {};
        if (typeof customOptions == 'string') {
            try {
                customOptions = JSON.parse(customOptions);
            }
            catch (err) {
                console.warn(err.message);
                customOptions = {};
            }
        }
        var commonFuseOptions = {
            maxPatternLength: 1000,
            distance: 1000,
        };
        return __assign({ removeItemButton: this.component.disabled ? false : lodash_1.default.get(this.component, 'removeItemButton', true), itemSelectText: '', classNames: {
                containerOuter: 'choices form-group formio-choices',
                containerInner: this.transform('class', 'form-control ui fluid selection dropdown')
            }, addItemText: false, allowHTML: true, placeholder: !!this.component.placeholder, placeholderValue: placeholderValue, noResultsText: this.t('No results found'), noChoicesText: this.t('No choices to choose from'), searchPlaceholderValue: this.t('Type to search'), shouldSort: false, position: (this.component.dropdown || 'auto'), searchEnabled: useSearch, searchChoices: !this.component.searchField, searchFields: lodash_1.default.get(this, 'component.searchFields', ['label']), shadowRoot: this.root ? this.root.shadowRoot : null, fuseOptions: this.component.useExactSearch
                ? __assign({ tokenize: true, matchAllTokens: true }, commonFuseOptions) : Object.assign({}, lodash_1.default.get(this, 'component.fuseOptions', {}), __assign({ include: 'score', threshold: lodash_1.default.get(this, 'component.selectThreshold', 0.3) }, commonFuseOptions)), valueComparer: lodash_1.default.isEqual, resetScrollPosition: false }, customOptions);
    };
    /* eslint-disable max-statements */
    SelectComponent.prototype.attach = function (element) {
        var _this = this;
        var _a, _b, _c;
        var superAttach = _super.prototype.attach.call(this, element);
        this.loadRefs(element, {
            selectContainer: 'single',
            addResource: 'single',
            autocompleteInput: 'single'
        });
        //enable autocomplete for select
        var autocompleteInput = this.refs.autocompleteInput;
        if (autocompleteInput) {
            this.addEventListener(autocompleteInput, 'change', function (event) {
                _this.setValue(event.target.value);
            });
        }
        var input = this.refs.selectContainer;
        if (!input) {
            return;
        }
        this.addEventListener(input, this.inputInfo.changeEvent, function () { return _this.updateValue(null, {
            modified: true
        }); });
        this.attachRefreshOnBlur();
        if (this.component.widget === 'html5') {
            this.addFocusBlurEvents(input);
            this.triggerUpdate(null, true);
            if (this.visible) {
                this.setItems(this.selectOptions || []);
            }
            this.focusableElement = input;
            if (this.component.dataSrc === 'custom') {
                this.addEventListener(input, 'focus', function () { return _this.updateCustomItems(); });
            }
            this.addEventListener(input, 'keydown', function (event) {
                var key = event.key;
                if (['Backspace', 'Delete'].includes(key)) {
                    _this.setValue(_this.emptyValue);
                }
            });
            return;
        }
        var tabIndex = input.tabIndex;
        this.addPlaceholder();
        if (this.i18next) {
            input.setAttribute('dir', this.i18next.dir());
        }
        if ((_c = (_b = (_a = this.choices) === null || _a === void 0 ? void 0 : _a.containerOuter) === null || _b === void 0 ? void 0 : _b.element) === null || _c === void 0 ? void 0 : _c.parentNode) {
            this.choices.destroy();
        }
        var choicesOptions = this.choicesOptions();
        if (ChoicesWrapper_1.default) {
            this.choices = new ChoicesWrapper_1.default(input, choicesOptions);
            if (this.selectOptions && this.selectOptions.length) {
                this.choices.setChoices(this.selectOptions, 'value', 'label', true);
            }
            if (this.component.multiple) {
                this.focusableElement = this.choices.input.element;
            }
            else {
                this.focusableElement = this.choices.containerInner.element;
                this.choices.containerOuter.element.setAttribute('tabIndex', '-1');
                this.addEventListener(this.choices.containerOuter.element, 'focus', function () { return _this.focusableElement.focus(); });
            }
            Input_1.default.prototype.addFocusBlurEvents.call(this, this.focusableElement);
            if (this.itemsFromUrl && !this.component.noRefreshOnScroll) {
                this.scrollList = this.choices.choiceList.element;
                this.addEventListener(this.scrollList, 'scroll', function () { return _this.onScroll(); });
            }
            if (choicesOptions.removeItemButton) {
                this.addEventListener(input, 'removeItem', function () {
                    _this.isRemoveButtonPressed = true;
                });
            }
        }
        if (window && this.choices && this.shouldPositionDropdown) {
            this.addEventListener(window.document, 'scroll', function () {
                _this.positionDropdown(true);
            }, false, true);
        }
        this.focusableElement.setAttribute('tabIndex', tabIndex);
        // If a search field is provided, then add an event listener to update items on search.
        if (this.component.searchField) {
            // Make sure to clear the search when no value is provided.
            if (this.choices && this.choices.input && this.choices.input.element) {
                this.addEventListener(this.choices.input.element, 'input', function (event) {
                    _this.isFromSearch = !!event.target.value;
                    if (!event.target.value) {
                        _this.triggerUpdate();
                    }
                    else {
                        _this.serverCount = null;
                        _this.downloadedResources = [];
                    }
                });
            }
            this.addEventListener(input, 'choice', function () {
                if (_this.component.multiple && _this.component.dataSrc === 'resource' && _this.isFromSearch) {
                    _this.triggerUpdate();
                }
                _this.isFromSearch = false;
            });
            // avoid spamming the resource/url endpoint when we have server side filtering enabled.
            var debounceTimeout = this.component.searchField && (this.isSelectResource || this.isSelectURL) ?
                (this.component.searchDebounce === 0 ? 0 : this.component.searchDebounce || this.defaultSchema.searchDebounce) * 1000
                : 0;
            var updateComponent_1 = function (evt) {
                _this.triggerUpdate(evt.detail.value);
            };
            this.addEventListener(input, 'search', lodash_1.default.debounce(function (e) {
                updateComponent_1(e);
                _this.positionDropdown();
            }, debounceTimeout));
            this.addEventListener(input, 'stopSearch', function () { return _this.triggerUpdate(); });
            this.addEventListener(input, 'hideDropdown', function () {
                if (_this.choices && _this.choices.input && _this.choices.input.element) {
                    _this.choices.input.element.value = '';
                }
                _this.updateItems(null, true);
            });
        }
        this.addEventListener(input, 'showDropdown', function () {
            _this.update();
            _this.positionDropdown();
        });
        if (this.shouldPositionDropdown) {
            this.addEventListener(input, 'highlightChoice', function () {
                _this.positionDropdown();
            });
        }
        if (this.choices && choicesOptions.placeholderValue && this.choices._isSelectOneElement) {
            this.addPlaceholderItem(choicesOptions.placeholderValue);
            this.addEventListener(input, 'removeItem', function () {
                _this.addPlaceholderItem(choicesOptions.placeholderValue);
            });
        }
        // Add value options.
        this.addValueOptions();
        this.setChoicesValue(this.dataValue);
        if (this.isSelectResource && this.refs.addResource) {
            this.addEventListener(this.refs.addResource, 'click', function (event) {
                event.preventDefault();
                var formioForm = _this.ce('div');
                var dialog = _this.createModal(formioForm);
                var projectUrl = lodash_1.default.get(_this.root, 'formio.projectUrl', Formio_1.Formio.getProjectUrl());
                var formUrl = "".concat(projectUrl, "/form/").concat(_this.component.data.resource);
                new Form_1.default(formioForm, formUrl, {}).ready
                    .then(function (form) {
                    form.on('submit', function (submission) {
                        // If valueProperty is set, replace the submission with the corresponding value
                        var value = _this.valueProperty ? lodash_1.default.get(submission, _this.valueProperty) : submission;
                        if (_this.component.multiple) {
                            value = __spreadArray(__spreadArray([], _this.dataValue, true), [value], false);
                        }
                        _this.setValue(value);
                        _this.triggerUpdate();
                        dialog.close();
                    });
                });
            });
        }
        // Force the disabled state with getters and setters.
        this.disabled = this.shouldDisabled;
        this.triggerUpdate();
        return superAttach;
    };
    SelectComponent.prototype.setDropdownPosition = function () {
        var _a, _b, _c, _d;
        var dropdown = (_b = (_a = this.choices) === null || _a === void 0 ? void 0 : _a.dropdown) === null || _b === void 0 ? void 0 : _b.element;
        var container = (_d = (_c = this.choices) === null || _c === void 0 ? void 0 : _c.containerOuter) === null || _d === void 0 ? void 0 : _d.element;
        if (!dropdown || !container) {
            return;
        }
        var containerPosition = container.getBoundingClientRect();
        var isFlipped = container.classList.contains('is-flipped');
        lodash_1.default.assign(dropdown.style, {
            top: "".concat(isFlipped ? containerPosition.top - dropdown.offsetHeight : containerPosition.top + containerPosition.height, "px"),
            left: "".concat(containerPosition.left, "px"),
            width: "".concat(containerPosition.width, "px"),
            position: 'fixed',
            bottom: 'unset',
            right: 'unset',
        });
    };
    SelectComponent.prototype.hasDataGridAncestor = function (comp) {
        comp = comp || this;
        if (comp.inDataGrid || comp.type === 'datagrid') {
            return true;
        }
        else if (comp.parent) {
            return this.hasDataGridAncestor(comp.parent);
        }
        else {
            return false;
        }
    };
    SelectComponent.prototype.positionDropdown = function (scroll) {
        var _this = this;
        var _a;
        if (!this.shouldPositionDropdown || !this.choices || (!((_a = this.choices.dropdown) === null || _a === void 0 ? void 0 : _a.isActive) && scroll)) {
            return;
        }
        this.setDropdownPosition();
        this.itemsLoaded.then(function () {
            _this.setDropdownPosition();
        });
    };
    Object.defineProperty(SelectComponent.prototype, "isLoadingAvailable", {
        get: function () {
            return !this.isScrollLoading && this.additionalResourcesAvailable;
        },
        enumerable: false,
        configurable: true
    });
    SelectComponent.prototype.onScroll = function () {
        if (this.isLoadingAvailable) {
            this.isScrollLoading = true;
            this.setLoadingItem(true);
            this.triggerUpdate(this.choices.input.element.value);
        }
    };
    SelectComponent.prototype.attachRefreshOnBlur = function () {
        var _this = this;
        if (this.component.refreshOnBlur) {
            this.on('blur', function (instance) {
                _this.checkRefreshOn([{ instance: instance, value: instance.dataValue }], { fromBlur: true });
            });
        }
    };
    SelectComponent.prototype.addPlaceholderItem = function (placeholderValue) {
        var items = this.choices._store.activeItems;
        if (!items.length) {
            this.choices._addItem({
                value: '',
                label: placeholderValue,
                choiceId: 0,
                groupId: -1,
                customProperties: null,
                placeholder: true,
                keyCode: null
            });
        }
    };
    /* eslint-enable max-statements */
    SelectComponent.prototype.update = function () {
        if (this.component.dataSrc === 'custom') {
            this.updateCustomItems();
        }
        // Activate the control.
        this.activate();
    };
    Object.defineProperty(SelectComponent.prototype, "disabled", {
        get: function () {
            return _super.prototype.disabled;
        },
        set: function (disabled) {
            _super.prototype.disabled = disabled;
            if (!this.choices) {
                return;
            }
            if (disabled) {
                this.setDisabled(this.choices.containerInner.element, true);
                this.focusableElement.removeAttribute('tabIndex');
                this.choices.disable();
            }
            else {
                this.setDisabled(this.choices.containerInner.element, false);
                this.focusableElement.setAttribute('tabIndex', this.component.tabindex || 0);
                this.choices.enable();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SelectComponent.prototype, "visible", {
        get: function () {
            return _super.prototype.visible;
        },
        set: function (value) {
            // If we go from hidden to visible, trigger a refresh.
            if (value && (!this._visible !== !value)) {
                this.triggerUpdate();
            }
            _super.prototype.visible = value;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @param {*} value
     * @param {Array} items
     */
    SelectComponent.prototype.addCurrentChoices = function (values, items, keyValue) {
        var _this = this;
        if (!values) {
            return false;
        }
        var notFoundValuesToAdd = [];
        var added = values.reduce(function (defaultAdded, value) {
            if (!value || lodash_1.default.isEmpty(value)) {
                return defaultAdded;
            }
            var found = false;
            // Make sure that `items` and `this.selectOptions` points
            // to the same reference. Because `this.selectOptions` is
            // internal property and all items are populated by
            // `this.addOption` method, we assume that items has
            // 'label' and 'value' properties. This assumption allows
            // us to read correct value from the item.
            var isSelectOptions = items === _this.selectOptions;
            if (items && items.length) {
                lodash_1.default.each(items, function (choice) {
                    if (choice._id && value._id && (choice._id === value._id)) {
                        found = true;
                        return false;
                    }
                    var itemValue = keyValue ? choice.value : _this.itemValue(choice, isSelectOptions);
                    found |= lodash_1.default.isEqual(itemValue, value);
                    return found ? false : true;
                });
            }
            // Add the default option if no item is found.
            if (!found) {
                notFoundValuesToAdd.push(_this.selectValueAndLabel(value));
                return true;
            }
            return found || defaultAdded;
        }, false);
        if (notFoundValuesToAdd.length) {
            if (this.choices) {
                this.choices.setChoices(notFoundValuesToAdd, 'value', 'label');
            }
            notFoundValuesToAdd.map(function (notFoundValue) {
                _this.addOption(notFoundValue.value, notFoundValue.label);
            });
        }
        return added;
    };
    SelectComponent.prototype.getValueAsString = function (data, options) {
        var _this = this;
        return (this.component.multiple && Array.isArray(data))
            ? data.map(function (v) { return _this.asString(v, options); }).join(', ')
            : this.asString(data, options);
    };
    SelectComponent.prototype.getValue = function () {
        // If the widget isn't active.
        if (this.viewOnly || this.loading
            || (!this.component.lazyLoad && !this.selectOptions.length)
            || !this.element) {
            return this.dataValue;
        }
        var value = this.emptyValue;
        if (this.choices) {
            value = this.choices.getValue(true);
            // Make sure we don't get the placeholder
            if (!this.component.multiple &&
                this.component.placeholder &&
                (value === this.t(this.component.placeholder, { _userInput: true }))) {
                value = this.emptyValue;
            }
        }
        else if (this.refs.selectContainer) {
            value = this.refs.selectContainer.value;
            if (this.valueProperty === '' || this.isEntireObjectDisplay()) {
                if (value === '') {
                    return {};
                }
                var option = this.selectOptions[value] ||
                    this.selectOptions.find(function (option) { return option.id === value; });
                if (option && lodash_1.default.isObject(option.value)) {
                    value = option.value;
                }
            }
        }
        else {
            value = this.dataValue;
        }
        // Choices will return undefined if nothing is selected. We really want '' to be empty.
        if (value === undefined || value === null) {
            value = '';
        }
        return value;
    };
    SelectComponent.prototype.redraw = function () {
        var done = _super.prototype.redraw.call(this);
        this.triggerUpdate();
        return done;
    };
    SelectComponent.prototype.normalizeSingleValue = function (value, retainObject) {
        var _this = this;
        var _a;
        if (lodash_1.default.isNil(value)) {
            return;
        }
        var valueIsObject = lodash_1.default.isObject(value);
        //check if value equals to default emptyValue
        if (valueIsObject && Object.keys(value).length === 0) {
            return value;
        }
        // Check to see if we need to save off the template data into our metadata.
        if (retainObject) {
            var templateValue = this.component.reference && (value === null || value === void 0 ? void 0 : value._id) ? value._id.toString() : value;
            var shouldSaveData = !valueIsObject || this.component.reference;
            if (templateValue && shouldSaveData && (this.templateData && this.templateData[templateValue]) && ((_a = this.root) === null || _a === void 0 ? void 0 : _a.submission)) {
                var submission = this.root.submission;
                if (!submission.metadata) {
                    submission.metadata = {};
                }
                if (!submission.metadata.selectData) {
                    submission.metadata.selectData = {};
                }
                var templateData_1 = this.templateData[templateValue];
                if (this.component.multiple) {
                    templateData_1 = {};
                    var dataValue = this.dataValue;
                    if (dataValue && lodash_1.default.isArray(dataValue) && dataValue.length) {
                        dataValue.forEach(function (dataValueItem) {
                            var dataValueItemValue = _this.component.reference ? dataValueItem._id.toString() : dataValueItem;
                            templateData_1[dataValueItemValue] = _this.templateData[dataValueItemValue];
                        });
                    }
                }
                lodash_1.default.set(submission.metadata.selectData, this.path, templateData_1);
            }
        }
        var dataType = this.component.dataType || 'auto';
        var normalize = {
            value: value,
            number: function () {
                var numberValue = Number(this.value);
                var isEquivalent = value.toString() === numberValue.toString();
                if (!Number.isNaN(numberValue) && Number.isFinite(numberValue) && value !== '' && isEquivalent) {
                    this.value = numberValue;
                }
                return this;
            },
            boolean: function () {
                if (lodash_1.default.isString(this.value)
                    && (this.value.toLowerCase() === 'true'
                        || this.value.toLowerCase() === 'false')) {
                    this.value = (this.value.toLowerCase() === 'true');
                }
                return this;
            },
            string: function () {
                this.value = String(this.value);
                return this;
            },
            object: function () {
                return this;
            },
            auto: function () {
                if (lodash_1.default.isObject(this.value)) {
                    this.value = this.object().value;
                }
                else {
                    this.value = this.string().number().boolean().value;
                }
                return this;
            }
        };
        try {
            return normalize[dataType]().value;
        }
        catch (err) {
            console.warn('Failed to normalize value', err);
            return value;
        }
    };
    /**
     * Normalize values coming into updateValue.
     *
     * @param value
     * @return {*}
     */
    SelectComponent.prototype.normalizeValue = function (value) {
        var _this = this;
        if (this.component.multiple && Array.isArray(value)) {
            return value.map(function (singleValue) { return _this.normalizeSingleValue(singleValue, true); });
        }
        return _super.prototype.normalizeValue.call(this, this.normalizeSingleValue(value, true));
    };
    SelectComponent.prototype.setValue = function (value, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        var previousValue = this.dataValue;
        if (this.component.widget === 'html5' && (lodash_1.default.isEqual(value, previousValue) || lodash_1.default.isEqual(previousValue, {}) && lodash_1.default.isEqual(flags, {})) && !flags.fromSubmission) {
            return false;
        }
        var changed = this.updateValue(value, flags);
        value = this.dataValue;
        var hasPreviousValue = !this.isEmpty(previousValue);
        var hasValue = !this.isEmpty(value);
        // Undo typing when searching to set the value.
        if (this.component.multiple && Array.isArray(value)) {
            value = value.map(function (value) {
                if (typeof value === 'boolean' || typeof value === 'number') {
                    return value.toString();
                }
                return value;
            });
        }
        else {
            if (typeof value === 'boolean' || typeof value === 'number') {
                value = value.toString();
            }
        }
        if (this.isHtmlRenderMode() && flags && flags.fromSubmission && changed) {
            this.itemsLoaded.then(function () {
                _this.redraw();
            });
            return changed;
        }
        // Do not set the value if we are loading... that will happen after it is done.
        if (this.loading) {
            return changed;
        }
        // Determine if we need to perform an initial lazyLoad api call if searchField is provided.
        if (this.isInitApiCallNeeded(hasValue)) {
            this.loading = true;
            this.lazyLoadInit = true;
            var searchProperty = this.component.searchField || this.component.valueProperty;
            this.triggerUpdate(lodash_1.default.get(value.data || value, searchProperty, value), true);
            return changed;
        }
        // Add the value options.
        this.itemsLoaded.then(function () {
            _this.addValueOptions();
            _this.setChoicesValue(value, hasPreviousValue, flags);
        });
        return changed;
    };
    SelectComponent.prototype.isInitApiCallNeeded = function (hasValue) {
        return this.component.lazyLoad &&
            !this.lazyLoadInit &&
            !this.active &&
            !this.selectOptions.length &&
            hasValue &&
            this.shouldInitialLoad &&
            this.visible && (this.component.searchField || this.component.valueProperty);
    };
    SelectComponent.prototype.setChoicesValue = function (value, hasPreviousValue, flags) {
        if (flags === void 0) { flags = {}; }
        var hasValue = !this.isEmpty(value) || flags.fromSubmission;
        hasPreviousValue = (hasPreviousValue === undefined) ? true : hasPreviousValue;
        if (this.choices) {
            // Now set the value.
            if (hasValue) {
                this.choices.removeActiveItems();
                // Add the currently selected choices if they don't already exist.
                var currentChoices = Array.isArray(value) && this.component.multiple ? value : [value];
                if (!this.addCurrentChoices(currentChoices, this.selectOptions, true)) {
                    this.choices.setChoices(this.selectOptions, 'value', 'label', true);
                }
                this.choices.setChoiceByValue(currentChoices);
            }
            else if (hasPreviousValue || flags.resetValue) {
                this.choices.removeActiveItems();
            }
        }
        else {
            if (hasValue) {
                var values_1 = Array.isArray(value) ? value : [value];
                if (!lodash_1.default.isEqual(this.dataValue, this.defaultValue) && this.selectOptions.length < 2
                    || (this.selectData && flags.fromSubmission)) {
                    var _a = this.selectValueAndLabel(this.dataValue), value_2 = _a.value, label = _a.label;
                    this.addOption(value_2, label);
                }
                lodash_1.default.each(this.selectOptions, function (selectOption) {
                    lodash_1.default.each(values_1, function (val) {
                        if (selectOption.value === '') {
                            selectOption.value = {};
                        }
                        if (lodash_1.default.isEqual(val, selectOption.value) && selectOption.element) {
                            selectOption.element.selected = true;
                            selectOption.element.setAttribute('selected', 'selected');
                            return false;
                        }
                    });
                });
            }
            else {
                lodash_1.default.each(this.selectOptions, function (selectOption) {
                    if (selectOption.element) {
                        selectOption.element.selected = false;
                        selectOption.element.removeAttribute('selected');
                    }
                });
            }
        }
    };
    Object.defineProperty(SelectComponent.prototype, "itemsLoaded", {
        get: function () {
            return this._itemsLoaded || Promise.resolve();
        },
        set: function (promise) {
            this._itemsLoaded = promise;
        },
        enumerable: false,
        configurable: true
    });
    SelectComponent.prototype.validateValueAvailability = function (setting, value) {
        var _this = this;
        if (!(0, utils_1.boolValue)(setting) || !value) {
            return true;
        }
        var values = this.getOptionsValues();
        if (values) {
            if (lodash_1.default.isObject(value)) {
                var compareComplexValues_1 = function (optionValue) {
                    var normalizedOptionValue = _this.normalizeSingleValue(optionValue, true);
                    if (!lodash_1.default.isObject(normalizedOptionValue)) {
                        return false;
                    }
                    try {
                        return (JSON.stringify(normalizedOptionValue) === JSON.stringify(value));
                    }
                    catch (err) {
                        console.warn.error('Error while comparing items', err);
                        return false;
                    }
                };
                return values.findIndex(function (optionValue) { return compareComplexValues_1(optionValue); }) !== -1;
            }
            return values.findIndex(function (optionValue) { return _this.normalizeSingleValue(optionValue) === value; }) !== -1;
        }
        return false;
    };
    /**
     * Performs required transformations on the initial value to use in selectOptions
     * @param {*} value
     */
    SelectComponent.prototype.getOptionValue = function (value) {
        return lodash_1.default.isObject(value) && this.isEntireObjectDisplay()
            ? this.normalizeSingleValue(value)
            : lodash_1.default.isObject(value) && (this.valueProperty || this.component.key !== 'resource')
                ? value
                : lodash_1.default.isObject(value) && !this.valueProperty
                    ? this.interpolate(this.component.template, { item: value }).replace(/<\/?[^>]+(>|$)/g, '')
                    : lodash_1.default.isNull(value)
                        ? this.emptyValue
                        : String(this.normalizeSingleValue(value));
    };
    /**
     * If component has static values (values, json) or custom values, returns an array of them
     * @returns {Array<*>|undefined}
     */
    SelectComponent.prototype.getOptionsValues = function () {
        var _this = this;
        var rawItems = [];
        switch (this.component.dataSrc) {
            case 'values':
                rawItems = this.component.data.values;
                break;
            case 'json':
                rawItems = this.component.data.json;
                break;
            case 'custom':
                rawItems = this.getCustomItems();
                break;
        }
        if (typeof rawItems === 'string') {
            try {
                rawItems = JSON.parse(rawItems);
            }
            catch (err) {
                console.warn(err.message);
                rawItems = [];
            }
        }
        if (!Array.isArray(rawItems)) {
            return;
        }
        return rawItems.map(function (item) { return _this.getOptionValue(_this.itemValue(item)); });
    };
    /**
     * Deletes the value of the component.
     */
    SelectComponent.prototype.deleteValue = function () {
        this.setValue('', {
            noUpdateEvent: true
        });
        this.unset();
    };
    /**
     * Check if a component is eligible for multiple validation
     *
     * @return {boolean}
     */
    SelectComponent.prototype.validateMultiple = function () {
        // Select component will contain one input when flagged as multiple.
        return false;
    };
    /**
     * Output this select dropdown as a string value.
     * @return {*}
     */
    SelectComponent.prototype.isBooleanOrNumber = function (value) {
        return typeof value === 'number' || typeof value === 'boolean';
    };
    SelectComponent.prototype.getNormalizedValues = function () {
        var _this = this;
        if (!this.component || !this.component.data || !this.component.data.values) {
            return;
        }
        return this.component.data.values.map(function (value) { return ({ label: value.label, value: String(_this.normalizeSingleValue(value.value)) }); });
    };
    SelectComponent.prototype.asString = function (value, options) {
        var _this = this;
        var _a;
        if (options === void 0) { options = {}; }
        value = value !== null && value !== void 0 ? value : this.getValue();
        //need to convert values to strings to be able to compare values with available options that are strings
        var convertToString = function (data, valueProperty) {
            if (valueProperty) {
                if (Array.isArray(data)) {
                    data.forEach(function (item) { return item[valueProperty] = item[valueProperty].toString(); });
                }
                else {
                    data[valueProperty] = data[valueProperty].toString();
                }
                return data;
            }
            if (_this.isBooleanOrNumber(data)) {
                data = data.toString();
            }
            if (Array.isArray(data) && data.some(function (item) { return _this.isBooleanOrNumber(item); })) {
                data = data.map(function (item) {
                    if (_this.isBooleanOrNumber(item)) {
                        item = item.toString();
                    }
                });
            }
            return data;
        };
        value = convertToString(value);
        if (['values', 'custom'].includes(this.component.dataSrc) && !this.asyncCustomValues()) {
            var _b = this.component.dataSrc === 'values'
                ? {
                    items: convertToString(this.getNormalizedValues(), 'value'),
                    valueProperty: 'value',
                }
                : {
                    items: convertToString(this.getCustomItems(), this.valueProperty),
                    valueProperty: this.valueProperty,
                }, items_1 = _b.items, valueProperty_1 = _b.valueProperty;
            var getFromValues = function () {
                var initialValue = lodash_1.default.find(items_1, [valueProperty_1, value]);
                var values = _this.defaultSchema.data.values || [];
                return lodash_1.default.isEqual(initialValue, values[0]) ? '-' : initialValue;
            };
            value = (this.component.multiple && Array.isArray(value))
                ? lodash_1.default.filter(items_1, function (item) { return value.includes(item.value); })
                : valueProperty_1
                    ? (_a = getFromValues()) !== null && _a !== void 0 ? _a : { value: value, label: value }
                    : value;
        }
        if (lodash_1.default.isString(value)) {
            return value;
        }
        var getTemplateValue = function (v) {
            var itemTemplate = _this.itemTemplate(v);
            return options.csv && itemTemplate
                ? (0, utils_1.unescapeHTML)(itemTemplate)
                : itemTemplate;
        };
        if (Array.isArray(value)) {
            var items_2 = [];
            value.forEach(function (item) { return items_2.push(getTemplateValue(item)); });
            if (this.component.dataSrc === 'resource' && items_2.length > 0) {
                return items_2.join(', ');
            }
            else if (items_2.length > 0) {
                return items_2.join('<br />');
            }
            else {
                return '-';
            }
        }
        if (this.isEntireObjectDisplay() && lodash_1.default.isObject(value)) {
            return JSON.stringify(value);
        }
        return !lodash_1.default.isNil(value)
            ? getTemplateValue(value)
            : '-';
    };
    SelectComponent.prototype.detach = function () {
        var _a, _b;
        this.off('blur');
        if (this.choices) {
            if ((_b = (_a = this.choices.containerOuter) === null || _a === void 0 ? void 0 : _a.element) === null || _b === void 0 ? void 0 : _b.parentNode) {
                this.choices.destroy();
            }
            this.choices = null;
        }
        _super.prototype.detach.call(this);
    };
    SelectComponent.prototype.focus = function () {
        if (this.focusableElement) {
            _super.prototype.focus.call(this);
            this.focusableElement.focus();
        }
    };
    SelectComponent.prototype.setErrorClasses = function (elements, dirty, hasError, hasMessages, element) {
        if (element === void 0) { element = this.element; }
        _super.prototype.setErrorClasses.call(this, elements, dirty, hasError, hasMessages, element);
        if (this.choices) {
            _super.prototype.setErrorClasses.call(this, [this.choices.containerInner.element], dirty, hasError, hasMessages, element);
        }
        else {
            _super.prototype.setErrorClasses.call(this, [this.refs.selectContainer], dirty, hasError, hasMessages, element);
        }
    };
    return SelectComponent;
}(ListComponent_1.default));
exports.default = SelectComponent;
//# sourceMappingURL=Select.js.map