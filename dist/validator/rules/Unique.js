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
var utils_1 = require("../../utils/utils");
var lodash_1 = __importDefault(require("lodash"));
var Rule_1 = __importDefault(require("./Rule"));
var Unique = /** @class */ (function (_super) {
    __extends(Unique, _super);
    function Unique() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.defaultMessage = '{{field}} must be unique';
        return _this;
    }
    Unique.prototype.check = function (value) {
        var _this = this;
        // Skip if value is empty object or falsy
        if (!value || lodash_1.default.isObjectLike(value) && lodash_1.default.isEmpty(value)) {
            return true;
        }
        // Skip if we don't have a database connection
        if (!this.config.db) {
            return true;
        }
        return new Promise(function (resolve) {
            var form = _this.config.form;
            var submission = _this.config.submission;
            var path = "data.".concat(_this.component.path);
            // Build the query
            var query = { form: form._id };
            if (lodash_1.default.isString(value)) {
                query[path] = {
                    $regex: new RegExp("^".concat((0, utils_1.escapeRegExCharacters)(value), "$")),
                    $options: 'i'
                };
            }
            else if (lodash_1.default.isPlainObject(value) &&
                value.address &&
                value.address['address_components'] &&
                value.address['place_id']) {
                query["".concat(path, ".address.place_id")] = {
                    $regex: new RegExp("^".concat((0, utils_1.escapeRegExCharacters)(value.address['place_id']), "$")),
                    $options: 'i'
                };
            }
            // Compare the contents of arrays vs the order.
            else if (lodash_1.default.isArray(value)) {
                query[path] = { $all: value };
            }
            else if (lodash_1.default.isObject(value) || lodash_1.default.isNumber(value)) {
                query[path] = { $eq: value };
            }
            // Only search for non-deleted items
            query.deleted = { $eq: null };
            // Try to find an existing value within the form
            _this.config.db.findOne(query, function (err, result) {
                if (err) {
                    return resolve(false);
                }
                else if (result) {
                    // Only OK if it matches the current submission
                    return resolve(submission._id && (result._id.toString() === submission._id));
                }
                else {
                    return resolve(true);
                }
            });
        }).catch(function () { return false; });
    };
    return Unique;
}(Rule_1.default));
exports.default = Unique;
//# sourceMappingURL=Unique.js.map