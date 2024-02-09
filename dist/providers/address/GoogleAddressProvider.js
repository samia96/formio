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
exports.GoogleAddressProvider = void 0;
/* globals google */
var Formio_1 = require("../../Formio");
var lodash_1 = __importDefault(require("lodash"));
var AddressProvider_1 = require("./AddressProvider");
var GoogleAddressProvider = /** @class */ (function (_super) {
    __extends(GoogleAddressProvider, _super);
    function GoogleAddressProvider(options) {
        if (options === void 0) { options = {}; }
        var _this = this;
        var _a;
        _this = _super.call(this, options) || this;
        _this.setAutocompleteOptions();
        var src = 'https://maps.googleapis.com/maps/api/js?v=quarterly&libraries=places&callback=googleMapsCallback';
        if ((_a = options.params) === null || _a === void 0 ? void 0 : _a.key) {
            src += "&key=".concat(options.params.key);
        }
        Formio_1.Formio.requireLibrary(_this.getLibraryName(), 'google.maps.places', src);
        return _this;
    }
    Object.defineProperty(GoogleAddressProvider, "name", {
        get: function () {
            return 'google';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GoogleAddressProvider, "displayName", {
        get: function () {
            return 'Google Maps';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GoogleAddressProvider.prototype, "displayValueProperty", {
        get: function () {
            return 'formattedPlace';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GoogleAddressProvider.prototype, "alternativeDisplayValueProperty", {
        get: function () {
            return 'formatted_address';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GoogleAddressProvider.prototype, "autocompleteOptions", {
        get: function () {
            return this._autocompleteOptions;
        },
        set: function (options) {
            this._autocompleteOptions = options;
        },
        enumerable: false,
        configurable: true
    });
    GoogleAddressProvider.prototype.setAutocompleteOptions = function () {
        var options = lodash_1.default.get(this.options, 'params.autocompleteOptions', {});
        if (!lodash_1.default.isObject(options)) {
            options = {};
        }
        this.addRequiredProviderOptions(options);
        this.autocompleteOptions = options;
    };
    GoogleAddressProvider.prototype.beforeMergeOptions = function (options) {
        // providing support of old Google Provider option
        this.convertRegionToAutocompleteOption(options);
    };
    GoogleAddressProvider.prototype.getLibraryName = function () {
        return 'googleMaps';
    };
    GoogleAddressProvider.prototype.convertRegionToAutocompleteOption = function (options) {
        var providerOptions = options;
        var region = lodash_1.default.get(providerOptions, 'params.region', '');
        if (region && !lodash_1.default.has(options, 'params.autocompleteOptions')) {
            region = region.toUpperCase().trim();
            // providing compatibility with ISO 3166-1 Alpha-2 county codes (for checking compatibility https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes)
            var countryCodes = { 'UK': 'GB' };
            if (countryCodes[region]) {
                region = countryCodes[region];
            }
            lodash_1.default.set(providerOptions, 'params.autocompleteOptions.componentRestrictions.country', [region]);
        }
    };
    GoogleAddressProvider.prototype.getRequiredAddressProperties = function () {
        return ['address_components', 'formatted_address', 'geometry', 'place_id', 'plus_code', 'types'];
    };
    GoogleAddressProvider.prototype.addRequiredProviderOptions = function (options) {
        var addressProperties = this.getRequiredAddressProperties();
        if (lodash_1.default.isArray(options.fields) && options.fields.length > 0) {
            options.fields.forEach(function (optionalField) {
                if (!addressProperties.some(function (addressProp) { return optionalField === addressProp; })) {
                    addressProperties.push(optionalField);
                }
            });
        }
        options.fields = addressProperties;
    };
    GoogleAddressProvider.prototype.filterPlace = function (place) {
        place = place || {};
        var filteredPlace = {};
        if (this.autocompleteOptions) {
            this.autocompleteOptions.fields.forEach(function (field) {
                if (place[field]) {
                    filteredPlace[field] = place[field];
                }
            });
        }
        return filteredPlace;
    };
    GoogleAddressProvider.prototype.attachAutocomplete = function (elem, index, onSelectAddress) {
        var _this = this;
        Formio_1.Formio.libraryReady(this.getLibraryName()).then(function () {
            var autocomplete = new google.maps.places.Autocomplete(elem, _this.autocompleteOptions);
            autocomplete.addListener('place_changed', function () {
                var place = _this.filterPlace(autocomplete.getPlace());
                place.formattedPlace = lodash_1.default.get(autocomplete, 'gm_accessors_.place.se.formattedPrediction', place[_this.alternativeDisplayValueProperty]);
                onSelectAddress(place, elem, index);
            });
        });
    };
    GoogleAddressProvider.prototype.search = function () {
        return Promise.resolve();
    };
    GoogleAddressProvider.prototype.makeRequest = function () {
        return Promise.resolve();
    };
    GoogleAddressProvider.prototype.getDisplayValue = function (address) {
        var displayedProperty = lodash_1.default.has(address, this.displayValueProperty)
            ? this.displayValueProperty
            : this.alternativeDisplayValueProperty;
        return lodash_1.default.get(address, displayedProperty, '');
    };
    return GoogleAddressProvider;
}(AddressProvider_1.AddressProvider));
exports.GoogleAddressProvider = GoogleAddressProvider;
//# sourceMappingURL=GoogleAddressProvider.js.map