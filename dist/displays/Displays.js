"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var PDF_1 = __importDefault(require("../PDF"));
var Webform_1 = __importDefault(require("../Webform"));
var Wizard_1 = __importDefault(require("../Wizard"));
var Displays = /** @class */ (function () {
    function Displays() {
    }
    Displays.addDisplay = function (name, display) {
        Displays.displays[name] = display;
    };
    Displays.addDisplays = function (displays) {
        Displays.displays = lodash_1.default.merge(Displays.displays, displays);
    };
    Displays.getDisplay = function (name) {
        return Displays.displays[name];
    };
    Displays.getDisplays = function () {
        return Displays.displays;
    };
    Displays.displays = {
        pdf: PDF_1.default,
        webform: Webform_1.default,
        wizard: Wizard_1.default,
    };
    return Displays;
}());
exports.default = Displays;
//# sourceMappingURL=Displays.js.map