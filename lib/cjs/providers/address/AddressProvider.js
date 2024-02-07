"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressProvider = void 0;
const lodash_1 = __importDefault(require("lodash"));
const Formio_1 = require("../../Formio");
class AddressProvider {
    static get name() {
        return 'address';
    }
    static get displayName() {
        return 'Address';
    }
    constructor(options = {}) {
        this.beforeMergeOptions(options);
        this.options = lodash_1.default.merge({}, this.defaultOptions, options);
    }
    beforeMergeOptions() {
        return;
    }
    get defaultOptions() {
        return {};
    }
    get queryProperty() {
        return 'query';
    }
    get responseProperty() {
        return null;
    }
    get displayValueProperty() {
        return null;
    }
    serialize(params) {
        return lodash_1.default.toPairs(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');
    }
    getRequestOptions(options = {}) {
        return lodash_1.default.merge({}, this.options, options);
    }
    // eslint-disable-next-line no-unused-vars
    getRequestUrl(options = {}) {
        throw new Error('Method AddressProvider#getRequestUrl(options) is abstract.');
    }
    makeRequest(options = {}) {
        return Formio_1.Formio.makeStaticRequest(this.getRequestUrl(options), 'GET', null, {
            noToken: true,
        });
    }
    search(query, options = {}) {
        const requestOptions = this.getRequestOptions(options);
        const params = requestOptions.params = requestOptions.params || {};
        params[this.queryProperty] = query;
        return this.makeRequest(requestOptions)
            .then((result) => this.responseProperty ? lodash_1.default.get(result, this.responseProperty, []) : result);
    }
    getDisplayValue(address) {
        return this.displayValueProperty ? lodash_1.default.get(address, this.displayValueProperty, '') : String(address);
    }
}
exports.AddressProvider = AddressProvider;
