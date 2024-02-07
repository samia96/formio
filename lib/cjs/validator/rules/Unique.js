"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils/utils");
const lodash_1 = __importDefault(require("lodash"));
const Rule_1 = __importDefault(require("./Rule"));
class Unique extends Rule_1.default {
    constructor() {
        super(...arguments);
        this.defaultMessage = '{{field}} must be unique';
    }
    check(value) {
        // Skip if value is empty object or falsy
        if (!value || lodash_1.default.isObjectLike(value) && lodash_1.default.isEmpty(value)) {
            return true;
        }
        // Skip if we don't have a database connection
        if (!this.config.db) {
            return true;
        }
        return new Promise(resolve => {
            const form = this.config.form;
            const submission = this.config.submission;
            const path = `data.${this.component.path}`;
            // Build the query
            const query = { form: form._id };
            if (lodash_1.default.isString(value)) {
                query[path] = {
                    $regex: new RegExp(`^${(0, utils_1.escapeRegExCharacters)(value)}$`),
                    $options: 'i'
                };
            }
            else if (lodash_1.default.isPlainObject(value) &&
                value.address &&
                value.address['address_components'] &&
                value.address['place_id']) {
                query[`${path}.address.place_id`] = {
                    $regex: new RegExp(`^${(0, utils_1.escapeRegExCharacters)(value.address['place_id'])}$`),
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
            this.config.db.findOne(query, (err, result) => {
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
        }).catch(() => false);
    }
}
exports.default = Unique;
