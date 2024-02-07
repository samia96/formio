"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const fetch_ponyfill_1 = __importDefault(require("fetch-ponyfill"));
const { fetch, Headers, Request } = (0, fetch_ponyfill_1.default)({
    Promise: Promise
});
const lodash_1 = __importDefault(require("lodash"));
const Rule_1 = __importDefault(require("./Rule"));
class Select extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} contains an invalid selection';
    }
    check(value, data, row, async) {
        // Skip if value is empty
        if (!value || lodash_1.default.isEmpty(value)) {
            return true;
        }
        // Skip if we're not async-capable
        if (!async) {
            return true;
        }
        const schema = this.component.component;
        // Initialize the request options
        const requestOptions = {
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
            .map((val, key) => `${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
            .join('&')
            .value();
        // Set custom headers.
        if (schema.data && schema.data.headers) {
            lodash_1.default.each(schema.data.headers, header => {
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
            .then(response => {
            if (!response.ok) {
                return false;
            }
            return response.json();
        })
            .then((results) => {
            return results && results.length;
        })
            .catch(() => false);
    }
}
exports.default = Select;
