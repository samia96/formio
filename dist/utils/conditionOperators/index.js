"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var IsNotEqualTo_1 = __importDefault(require("./IsNotEqualTo"));
var IsEmptyValue_1 = __importDefault(require("./IsEmptyValue"));
var IsNotEmptyValue_1 = __importDefault(require("./IsNotEmptyValue"));
var LessThan_1 = __importDefault(require("./LessThan"));
var GreaterThan_1 = __importDefault(require("./GreaterThan"));
var IsEqualTo_1 = __importDefault(require("./IsEqualTo"));
var DateGreaterThan_1 = __importDefault(require("./DateGreaterThan"));
var DateLessThan_1 = __importDefault(require("./DateLessThan"));
var Includes_1 = __importDefault(require("./Includes"));
var StartsWith_1 = __importDefault(require("./StartsWith"));
var NotIncludes_1 = __importDefault(require("./NotIncludes"));
var EndsWith_1 = __importDefault(require("./EndsWith"));
var DateGreaterThanOrEqual_1 = __importDefault(require("./DateGreaterThanOrEqual"));
var DateLessThanOrEqual_1 = __importDefault(require("./DateLessThanOrEqual"));
var LessThanOrEqual_1 = __importDefault(require("./LessThanOrEqual"));
var GreaterThanOrEqual_1 = __importDefault(require("./GreaterThanOrEqual"));
var IsDateEqual_1 = __importDefault(require("./IsDateEqual"));
var IsNotDateEqual_1 = __importDefault(require("./IsNotDateEqual"));
var ConditionOperators = (_a = {},
    _a["".concat(IsNotEqualTo_1.default.operatorKey)] = IsNotEqualTo_1.default,
    _a["".concat(IsEqualTo_1.default.operatorKey)] = IsEqualTo_1.default,
    _a["".concat(IsEmptyValue_1.default.operatorKey)] = IsEmptyValue_1.default,
    _a["".concat(IsNotEmptyValue_1.default.operatorKey)] = IsNotEmptyValue_1.default,
    _a["".concat(LessThan_1.default.operatorKey)] = LessThan_1.default,
    _a["".concat(GreaterThan_1.default.operatorKey)] = GreaterThan_1.default,
    _a["".concat(DateGreaterThan_1.default.operatorKey)] = DateGreaterThan_1.default,
    _a["".concat(DateLessThan_1.default.operatorKey)] = DateLessThan_1.default,
    _a["".concat(Includes_1.default.operatorKey)] = Includes_1.default,
    _a["".concat(StartsWith_1.default.operatorKey)] = StartsWith_1.default,
    _a["".concat(EndsWith_1.default.operatorKey)] = EndsWith_1.default,
    _a["".concat(NotIncludes_1.default.operatorKey)] = NotIncludes_1.default,
    _a["".concat(DateGreaterThanOrEqual_1.default.operatorKey)] = DateGreaterThanOrEqual_1.default,
    _a["".concat(DateLessThanOrEqual_1.default.operatorKey)] = DateLessThanOrEqual_1.default,
    _a["".concat(LessThanOrEqual_1.default.operatorKey)] = LessThanOrEqual_1.default,
    _a["".concat(GreaterThanOrEqual_1.default.operatorKey)] = GreaterThanOrEqual_1.default,
    _a["".concat(IsDateEqual_1.default.operatorKey)] = IsDateEqual_1.default,
    _a["".concat(IsNotDateEqual_1.default.operatorKey)] = IsNotDateEqual_1.default,
    _a);
exports.default = ConditionOperators;
//# sourceMappingURL=index.js.map