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
var Field_1 = __importDefault(require("../field/Field"));
var Formio_1 = require("../../../Formio");
var lodash_1 = __importDefault(require("lodash"));
var utils_1 = require("../../../utils/utils");
var ListComponent = /** @class */ (function (_super) {
    __extends(ListComponent, _super);
    function ListComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Field_1.default.schema.apply(Field_1.default, __spreadArray([{
                dataSrc: 'values',
                authenticate: false,
                ignoreCache: false,
                template: '<span>{{ item.label }}</span>',
                validate: {
                    onlyAvailableItems: false
                },
            }], extend, false));
    };
    Object.defineProperty(ListComponent.prototype, "isSelectURL", {
        get: function () {
            return this.component.dataSrc === 'url';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "selectData", {
        get: function () {
            var selectData = lodash_1.default.get(this.root, 'submission.metadata.selectData', {});
            return lodash_1.default.get(selectData, this.path);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListComponent.prototype, "shouldLoad", {
        get: function () {
            if (this.loadingError) {
                return false;
            }
            // Live forms should always load.
            if (!this.options.readOnly) {
                return true;
            }
            // If there are template keys, then we need to see if we have the data.
            if (this.templateKeys && this.templateKeys.length) {
                // See if we already have the data we need.
                var dataValue_1 = this.dataValue;
                var selectData_1 = this.selectData;
                return this.templateKeys.reduce(function (shouldLoad, key) {
                    var hasValue = lodash_1.default.has(dataValue_1, key) ||
                        (lodash_1.default.isArray(selectData_1) ? selectData_1.every(function (data) { return lodash_1.default.has(data, key); }) : lodash_1.default.has(selectData_1, key));
                    return shouldLoad || !hasValue;
                }, false);
            }
            // Return that we should load.
            return true;
        },
        enumerable: false,
        configurable: true
    });
    ListComponent.prototype.getTemplateKeys = function () {
        var template = this.component.template;
        this.templateKeys = this.options.readOnly && template
            ? (0, utils_1.getItemTemplateKeys)(template)
            : [];
    };
    Object.defineProperty(ListComponent.prototype, "requestHeaders", {
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
    // Must be implemented in child classes.
    ListComponent.prototype.setItems = function () { };
    ListComponent.prototype.updateCustomItems = function () { };
    ListComponent.prototype.loadItems = function () { };
    ListComponent.prototype.getOptionTemplate = function (data, value, index) {
        if (!this.component.template) {
            return data.label;
        }
        var options = {
            noeval: true,
            data: {}
        };
        var template = this.sanitize(this.component.template
            ? this.interpolate(this.component.template, { item: data }, options)
            : data.label, this.shouldSanitizeValue);
        var templateValue = this.component.reference && (value === null || value === void 0 ? void 0 : value._id) ? value._id.toString() : value;
        if (templateValue && !lodash_1.default.isObject(templateValue) && options.data.item) {
            // If the value is not an object, then we need to save the template data off for when it is selected.
            this.templateData[templateValue] = options.data.item;
        }
        if (lodash_1.default.isNumber(index)) {
            this.templateData[index] = options.data.item;
        }
        return template;
    };
    ListComponent.prototype.itemTemplate = function (data, value, index) {
        if (lodash_1.default.isEmpty(data)) {
            return '';
        }
        var template = this.sanitize(this.getOptionTemplate(data, value, index), this.shouldSanitizeValue);
        if (template) {
            var label = template.replace(/<\/?[^>]+(>|$)/g, '');
            if (!label)
                return;
            return template.replace(label, this.t(label, { _userInput: true }));
        }
        else {
            return this.sanitize(JSON.stringify(data), this.shouldSanitizeValue);
        }
    };
    ListComponent.prototype.handleLoadingError = function (err) {
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
    /* eslint-disable max-statements */
    ListComponent.prototype.updateItems = function (searchInput, forceUpdate) {
        var _this = this;
        if (!this.component.data) {
            console.warn("Select component ".concat(this.key, " does not have data configuration."));
            this.itemsLoadedResolve();
            return;
        }
        // Only load the data if it is visible.
        if (!this.visible) {
            this.itemsLoadedResolve();
            return;
        }
        switch (this.component.dataSrc) {
            case 'values':
                this.setItems(this.component.data.values);
                break;
            case 'json':
                this.setItems(this.component.data.json);
                break;
            case 'custom':
                this.updateCustomItems(forceUpdate);
                break;
            case 'resource': {
                // If there is no resource, or we are lazyLoading, wait until active.
                if (!this.component.data.resource || (!forceUpdate && !this.active)) {
                    this.itemsLoadedResolve();
                    return;
                }
                var resourceUrl = this.options.formio ? this.options.formio.formsUrl : "".concat(Formio_1.Formio.getProjectUrl(), "/form");
                resourceUrl += ("/".concat(this.component.data.resource, "/submission"));
                if (forceUpdate || this.additionalResourcesAvailable || !this.serverCount) {
                    try {
                        this.loadItems(resourceUrl, searchInput, this.requestHeaders);
                    }
                    catch (err) {
                        console.warn("Unable to load resources for ".concat(this.key));
                    }
                }
                else {
                    this.setItems(this.downloadedResources);
                }
                break;
            }
            case 'url': {
                if (!forceUpdate && !this.active && !this.calculatedValue && this.component.type === 'select') {
                    // If we are lazyLoading, wait until activated.
                    this.itemsLoadedResolve();
                    return;
                }
                var url = this.component.data.url;
                var method = void 0;
                var body = void 0;
                if (url.startsWith('/')) {
                    // if URL starts with '/project', we should use base URL to avoid issues with URL formed like <base_url>/<project_name>/project/<project_id>/...
                    var baseUrl = url.startsWith('/project') ? Formio_1.Formio.getBaseUrl() : Formio_1.Formio.getProjectUrl() || Formio_1.Formio.getBaseUrl();
                    url = baseUrl + url;
                }
                if (!this.component.data.method) {
                    method = 'GET';
                }
                else {
                    method = this.component.data.method;
                    if (method.toUpperCase() === 'POST') {
                        body = this.component.data.body;
                    }
                    else {
                        body = null;
                    }
                }
                var options = this.component.authenticate ? {} : { noToken: true };
                this.loadItems(url, searchInput, this.requestHeaders, options, method, body);
                break;
            }
            case 'indexeddb': {
                if (typeof window === 'undefined') {
                    return;
                }
                if (!window.indexedDB) {
                    window.alert("Your browser doesn't support current version of indexedDB");
                }
                if (this.component.indexeddb && this.component.indexeddb.database && this.component.indexeddb.table) {
                    var request_1 = window.indexedDB.open(this.component.indexeddb.database);
                    request_1.onupgradeneeded = function (event) {
                        if (_this.component.customOptions) {
                            var db_1 = event.target.result;
                            var objectStore = db_1.createObjectStore(_this.component.indexeddb.table, { keyPath: 'myKey', autoIncrement: true });
                            objectStore.transaction.oncomplete = function () {
                                var transaction = db_1.transaction(_this.component.indexeddb.table, 'readwrite');
                                _this.component.customOptions.forEach(function (item) {
                                    transaction.objectStore(_this.component.indexeddb.table).put(item);
                                });
                            };
                        }
                    };
                    request_1.onerror = function () {
                        window.alert(request_1.errorCode);
                    };
                    request_1.onsuccess = function (event) {
                        var db = event.target.result;
                        var transaction = db.transaction(_this.component.indexeddb.table, 'readwrite');
                        var objectStore = transaction.objectStore(_this.component.indexeddb.table);
                        new Promise(function (resolve) {
                            var responseItems = [];
                            objectStore.getAll().onsuccess = function (event) {
                                event.target.result.forEach(function (item) {
                                    responseItems.push(item);
                                });
                                resolve(responseItems);
                            };
                        }).then(function (items) {
                            if (!lodash_1.default.isEmpty(_this.component.indexeddb.filter)) {
                                items = lodash_1.default.filter(items, _this.component.indexeddb.filter);
                            }
                            _this.setItems(items);
                        });
                    };
                }
            }
        }
    };
    return ListComponent;
}(Field_1.default));
exports.default = ListComponent;
//# sourceMappingURL=ListComponent.js.map