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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureAddressProvider = void 0;
var AddressProvider_1 = require("./AddressProvider");
var AzureAddressProvider = /** @class */ (function (_super) {
    __extends(AzureAddressProvider, _super);
    function AzureAddressProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(AzureAddressProvider, "name", {
        get: function () {
            return 'azure';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AzureAddressProvider, "displayName", {
        get: function () {
            return 'Azure Maps';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AzureAddressProvider.prototype, "defaultOptions", {
        get: function () {
            return {
                params: {
                    'api-version': '1.0',
                    typeahead: 'true',
                },
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AzureAddressProvider.prototype, "responseProperty", {
        get: function () {
            return 'results';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AzureAddressProvider.prototype, "displayValueProperty", {
        get: function () {
            return 'address.freeformAddress';
        },
        enumerable: false,
        configurable: true
    });
    AzureAddressProvider.prototype.getRequestUrl = function (options) {
        if (options === void 0) { options = {}; }
        var params = options.params;
        return "https://atlas.microsoft.com/search/address/json?".concat(this.serialize(params));
    };
    return AzureAddressProvider;
}(AddressProvider_1.AddressProvider));
exports.AzureAddressProvider = AzureAddressProvider;
//# sourceMappingURL=AzureAddressProvider.js.map