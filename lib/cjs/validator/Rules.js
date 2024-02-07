"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./rules/index"));
class Rules {
    static addRule(name, rule) {
        Rules.rules[name] = rule;
    }
    static addRules(rules) {
        Rules.rules = Object.assign(Object.assign({}, Rules.rules), rules);
    }
    static getRule(name) {
        return Rules.rules[name];
    }
    static getRules() {
        return Rules.rules;
    }
}
Rules.rules = index_1.default;
exports.default = Rules;
