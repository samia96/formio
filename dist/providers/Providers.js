"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var address_1 = __importDefault(require("./address"));
var auth_1 = __importDefault(require("./auth"));
var storage_1 = __importDefault(require("./storage"));
var Providers = /** @class */ (function () {
    function Providers() {
    }
    Providers.addProvider = function (type, name, provider) {
        Providers.providers[type] = Providers.providers[type] || {};
        Providers.providers[type][name] = provider;
    };
    Providers.addProviders = function (type, providers) {
        Providers.providers[type] = lodash_1.default.merge(Providers.providers[type], providers);
    };
    Providers.getProvider = function (type, name) {
        if (Providers.providers[type] && Providers.providers[type][name]) {
            return Providers.providers[type][name];
        }
    };
    Providers.getProviders = function (type) {
        if (Providers.providers[type]) {
            return Providers.providers[type];
        }
    };
    Providers.providers = {
        address: address_1.default,
        auth: auth_1.default,
        storage: storage_1.default,
    };
    return Providers;
}());
exports.default = Providers;
//# sourceMappingURL=Providers.js.map