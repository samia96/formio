"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const address_1 = __importDefault(require("./address"));
const auth_1 = __importDefault(require("./auth"));
const storage_1 = __importDefault(require("./storage"));
class Providers {
    static addProvider(type, name, provider) {
        Providers.providers[type] = Providers.providers[type] || {};
        Providers.providers[type][name] = provider;
    }
    static addProviders(type, providers) {
        Providers.providers[type] = lodash_1.default.merge(Providers.providers[type], providers);
    }
    static getProvider(type, name) {
        if (Providers.providers[type] && Providers.providers[type][name]) {
            return Providers.providers[type][name];
        }
    }
    static getProviders(type) {
        if (Providers.providers[type]) {
            return Providers.providers[type];
        }
    }
}
Providers.providers = {
    address: address_1.default,
    auth: auth_1.default,
    storage: storage_1.default,
};
exports.default = Providers;
