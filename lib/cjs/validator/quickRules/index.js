"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class QuickRules {
    static addQuickRule(name, quickRule) {
        QuickRules.quickRules[name] = quickRule;
    }
    static addQuickRules(quickRules) {
        QuickRules.quickRules = Object.assign(Object.assign({}, QuickRules.quickRules), quickRules);
    }
    static getQuickRule(name) {
        return QuickRules.quickRules[name];
    }
    static getQuickRules() {
        return QuickRules.quickRules;
    }
}
QuickRules.quickRules = {};
exports.default = QuickRules;
