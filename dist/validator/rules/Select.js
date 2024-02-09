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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("../../utils/utils");
var fetch_ponyfill_1 = __importDefault(require("fetch-ponyfill"));
var _a = (0, fetch_ponyfill_1.default)({
    Promise: Promise
}), fetch = _a.fetch, Headers = _a.Headers, Request = _a.Request;
var lodash_1 = __importDefault(require("lodash"));
var Rule_1 = __importDefault(require("./Rule"));
var Select = /** @class */ (function (_super) {
    __extends(Select, _super);
    function Select() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} contains an invalid selection';
        return _this;
    }
    Select.prototype.check = function (value, data, row, async) {
        // Skip if value is empty
        if (!value || lodash_1.default.isEmpty(value)) {
            return true;
        }
        // Skip if we're not async-capable
        if (!async) {
            return true;
        }
        var schema = this.component.component;
        // Initialize the request options
        var requestOptions = {
            url: this.settings.url,
            method: 'GET',
            qs: {},
            json: true,
            headers: {}
        };
        // If the url is a boolean value
        if (lodash_1.default.isBoolean(requestOptions.url)) {
            requestOptions.url = !!requestOptions.url;
            if (!requestOptions.url ||
                schema.dataSrc !== 'url' ||
                !schema.data.url ||
                !schema.searchField) {
                return true;
            }
            // Get the validation url
            requestOptions.url = schema.data.url;
            // Add the search field
            requestOptions.qs[schema.searchField] = value;
            // Add the filters
            if (schema.filter) {
                requestOptions.url += (!requestOptions.url.includes('?') ? '?' : '&') + schema.filter;
            }
            // If they only wish to return certain fields.
            if (schema.selectFields) {
                requestOptions.qs.select = schema.selectFields;
            }
        }
        if (!requestOptions.url) {
            return true;
        }
        // Make sure to interpolate.
        requestOptions.url = (0, utils_1.interpolate)(requestOptions.url, { data: this.component.data });
        // Add query string to URL
        requestOptions.url += (requestOptions.url.includes('?') ? '&' : '?') + lodash_1.default.chain(requestOptions.qs)
            .map(function (val, key) { return "".concat(encodeURIComponent(key), "=").concat(encodeURIComponent(val)); })
            .join('&')
            .value();
        // Set custom headers.
        if (schema.data && schema.data.headers) {
            lodash_1.default.each(schema.data.headers, function (header) {
                if (header.key) {
                    requestOptions.headers[header.key] = header.value;
                }
            });
        }
        // Set form.io authentication.
        if (schema.authenticate && this.config.token) {
            requestOptions.headers['x-jwt-token'] = this.config.token;
        }
        return fetch(new Request(requestOptions.url, {
            headers: new Headers(requestOptions.headers)
        }))
            .then(function (response) {
            if (!response.ok) {
                return false;
            }
            return response.json();
        })
            .then(function (results) {
            return results && results.length;
        })
            .catch(function () { return false; });
    };
    return Select;
}(Rule_1.default));
exports.default = Select;
//# sourceMappingURL=Select.js.map