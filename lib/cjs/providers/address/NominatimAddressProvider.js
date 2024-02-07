"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NominatimAddressProvider = void 0;
const AddressProvider_1 = require("./AddressProvider");
class NominatimAddressProvider extends AddressProvider_1.AddressProvider {
    static get name() {
        return 'nominatim';
    }
    static get displayName() {
        return 'OpenStreetMap Nominatim';
    }
    get defaultOptions() {
        return {
            params: {
                addressdetails: '1',
                format: 'json',
            },
        };
    }
    get queryProperty() {
        return 'q';
    }
    get displayValueProperty() {
        return 'display_name';
    }
    getRequestUrl(options = {}) {
        const { params } = options;
        return `https://nominatim.openstreetmap.org/search?${this.serialize(params)}`;
    }
}
exports.NominatimAddressProvider = NominatimAddressProvider;
