"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var Licenses = /** @class */ (function () {
    function Licenses() {
    }
    Licenses.addLicense = function (name, license) {
        Licenses.licenses[name] = license;
    };
    Licenses.getLicense = function (name) {
        return Licenses.licenses[name];
    };
    Licenses.removeLicense = function (name) {
        lodash_1.default.unset(Licenses.licenses, name);
    };
    Licenses.getLicenses = function () {
        return Licenses.licenses;
    };
    Licenses.licenses = {};
    return Licenses;
}());
exports.default = Licenses;
//# sourceMappingURL=Licenses.js.map