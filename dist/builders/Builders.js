"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var PDFBuilder_1 = __importDefault(require("../PDFBuilder"));
var WebformBuilder_1 = __importDefault(require("../WebformBuilder"));
var WizardBuilder_1 = __importDefault(require("../WizardBuilder"));
var Builders = /** @class */ (function () {
    function Builders() {
    }
    Builders.addBuilder = function (name, builder) {
        Builders.builders[name] = builder;
    };
    Builders.addBuilders = function (builders) {
        Builders.builders = lodash_1.default.merge(Builders.builders, builders);
    };
    Builders.getBuilder = function (name) {
        return Builders.builders[name];
    };
    Builders.getBuilders = function () {
        return Builders.builders;
    };
    Builders.builders = {
        pdf: PDFBuilder_1.default,
        webform: WebformBuilder_1.default,
        wizard: WizardBuilder_1.default,
    };
    return Builders;
}());
exports.default = Builders;
//# sourceMappingURL=Builders.js.map