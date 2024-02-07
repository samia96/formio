"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureAddressProvider = void 0;
const AddressProvider_1 = require("./AddressProvider");
class AzureAddressProvider extends AddressProvider_1.AddressProvider {
    static get name() {
        return 'azure';
    }
    static get displayName() {
        return 'Azure Maps';
    }
    get defaultOptions() {
        return {
            params: {
                'api-version': '1.0',
                typeahead: 'true',
            },
        };
    }
    get responseProperty() {
        return 'results';
    }
    get displayValueProperty() {
        return 'address.freeformAddress';
    }
    getRequestUrl(options = {}) {
        const { params } = options;
        return `https://atlas.microsoft.com/search/address/json?${this.serialize(params)}`;
    }
}
exports.AzureAddressProvider = AzureAddressProvider;
