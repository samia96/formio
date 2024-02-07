"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAddressProvider = void 0;
/* globals google */
const Formio_1 = require("../../Formio");
const lodash_1 = __importDefault(require("lodash"));
const AddressProvider_1 = require("./AddressProvider");
class GoogleAddressProvider extends AddressProvider_1.AddressProvider {
    static get name() {
        return 'google';
    }
    static get displayName() {
        return 'Google Maps';
    }
    constructor(options = {}) {
        var _a;
        super(options);
        this.setAutocompleteOptions();
        let src = 'https://maps.googleapis.com/maps/api/js?v=quarterly&libraries=places&callback=googleMapsCallback';
        if ((_a = options.params) === null || _a === void 0 ? void 0 : _a.key) {
            src += `&key=${options.params.key}`;
        }
        Formio_1.Formio.requireLibrary(this.getLibraryName(), 'google.maps.places', src);
    }
    get displayValueProperty() {
        return 'formattedPlace';
    }
    get alternativeDisplayValueProperty() {
        return 'formatted_address';
    }
    set autocompleteOptions(options) {
        this._autocompleteOptions = options;
    }
    get autocompleteOptions() {
        return this._autocompleteOptions;
    }
    setAutocompleteOptions() {
        let options = lodash_1.default.get(this.options, 'params.autocompleteOptions', {});
        if (!lodash_1.default.isObject(options)) {
            options = {};
        }
        this.addRequiredProviderOptions(options);
        this.autocompleteOptions = options;
    }
    beforeMergeOptions(options) {
        // providing support of old Google Provider option
        this.convertRegionToAutocompleteOption(options);
    }
    getLibraryName() {
        return 'googleMaps';
    }
    convertRegionToAutocompleteOption(options) {
        const providerOptions = options;
        let region = lodash_1.default.get(providerOptions, 'params.region', '');
        if (region && !lodash_1.default.has(options, 'params.autocompleteOptions')) {
            region = region.toUpperCase().trim();
            // providing compatibility with ISO 3166-1 Alpha-2 county codes (for checking compatibility https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
            const countryCodes = { 'UK': 'GB' };
            if (countryCodes[region]) {
                region = countryCodes[region];
            }
            lodash_1.default.set(providerOptions, 'params.autocompleteOptions.componentRestrictions.country', [region]);
        }
    }
    getRequiredAddressProperties() {
        return ['address_components', 'formatted_address', 'geometry', 'place_id', 'plus_code', 'types'];
    }
    addRequiredProviderOptions(options) {
        const addressProperties = this.getRequiredAddressProperties();
        if (lodash_1.default.isArray(options.fields) && options.fields.length > 0) {
            options.fields.forEach(optionalField => {
                if (!addressProperties.some(addressProp => optionalField === addressProp)) {
                    addressProperties.push(optionalField);
                }
            });
        }
        options.fields = addressProperties;
    }
    filterPlace(place) {
        place = place || {};
        const filteredPlace = {};
        if (this.autocompleteOptions) {
            this.autocompleteOptions.fields.forEach(field => {
                if (place[field]) {
                    filteredPlace[field] = place[field];
                }
            });
        }
        return filteredPlace;
    }
    attachAutocomplete(elem, index, onSelectAddress) {
        Formio_1.Formio.libraryReady(this.getLibraryName()).then(() => {
            const autocomplete = new google.maps.places.Autocomplete(elem, this.autocompleteOptions);
            autocomplete.addListener('place_changed', () => {
                const place = this.filterPlace(autocomplete.getPlace());
                place.formattedPlace = lodash_1.default.get(autocomplete, 'gm_accessors_.place.se.formattedPrediction', place[this.alternativeDisplayValueProperty]);
                onSelectAddress(place, elem, index);
            });
        });
    }
    search() {
        return Promise.resolve();
    }
    makeRequest() {
        return Promise.resolve();
    }
    getDisplayValue(address) {
        const displayedProperty = lodash_1.default.has(address, this.displayValueProperty)
            ? this.displayValueProperty
            : this.alternativeDisplayValueProperty;
        return lodash_1.default.get(address, displayedProperty, '');
    }
}
exports.GoogleAddressProvider = GoogleAddressProvider;
