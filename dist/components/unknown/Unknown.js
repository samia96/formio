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
var Component_1 = __importDefault(require("../_classes/component/Component"));
var UnknownComponent = /** @class */ (function (_super) {
    __extends(UnknownComponent, _super);
    function UnknownComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnknownComponent.schema = function () {
        return {
            type: 'custom',
            key: 'custom',
            protected: false,
            persistent: true
        };
    };
    Object.defineProperty(UnknownComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Custom',
                icon: 'cubes',
                group: 'premium',
                documentation: '/userguide/form-building/premium-components#custom',
                weight: 120,
                schema: UnknownComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UnknownComponent.prototype, "defaultSchema", {
        get: function () {
            return UnknownComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    return UnknownComponent;
}(Component_1.default));
exports.default = UnknownComponent;
//# sourceMappingURL=Unknown.js.map