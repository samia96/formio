"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var AzureAddressProvider_1 = require("./AzureAddressProvider");
var CustomAddressProvider_1 = require("./CustomAddressProvider");
var GoogleAddressProvider_1 = require("./GoogleAddressProvider");
var NominatimAddressProvider_1 = require("./NominatimAddressProvider");
exports.default = (_a = {},
    _a[AzureAddressProvider_1.AzureAddressProvider.name] = AzureAddressProvider_1.AzureAddressProvider,
    _a[CustomAddressProvider_1.CustomAddressProvider.name] = CustomAddressProvider_1.CustomAddressProvider,
    _a[GoogleAddressProvider_1.GoogleAddressProvider.name] = GoogleAddressProvider_1.GoogleAddressProvider,
    _a[NominatimAddressProvider_1.NominatimAddressProvider.name] = NominatimAddressProvider_1.NominatimAddressProvider,
    _a);
//# sourceMappingURL=index.js.map