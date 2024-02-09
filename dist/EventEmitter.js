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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var eventemitter3_1 = require("eventemitter3");
var utils = __importStar(require("./utils/utils"));
var EventEmitter = /** @class */ (function (_super) {
    __extends(EventEmitter, _super);
    function EventEmitter(conf) {
        if (conf === void 0) { conf = {}; }
        var _this = this;
        var _a = conf.loadLimit, loadLimit = _a === void 0 ? 1000 : _a, _b = conf.eventsSafeInterval, eventsSafeInterval = _b === void 0 ? 300 : _b;
        _this = _super.call(this) || this;
        _this.onAny = function (fn) {
            _this.on('any', fn);
        };
        _this.offAny = function (fn) {
            _this.off('any', fn);
        };
        var overloadHandler = function () {
            console.warn("There were more than ".concat(loadLimit, " events emitted in ").concat(eventsSafeInterval, " ms. It might be caused by events' infinite loop"), _this.id);
        };
        var dispatch = utils.observeOverload(overloadHandler, {
            limit: loadLimit,
            delay: eventsSafeInterval
        });
        _this.emit = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            _super.prototype.emit.apply(_this, args);
            _super.prototype.emit.apply(_this, __spreadArray(['any'], args, false));
            dispatch();
        };
        return _this;
    }
    return EventEmitter;
}(eventemitter3_1.EventEmitter));
exports.default = EventEmitter;
//# sourceMappingURL=EventEmitter.js.map