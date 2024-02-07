"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Operators {
    static addOperator(name, operator) {
        Operators.operators[name] = operator;
    }
    static addOperators(operators) {
        Operators.operators = Object.assign(Object.assign({}, Operators.operators), operators);
    }
    static getOperator(name) {
        return Operators.operators[name];
    }
    static getOperators() {
        return Operators.operators;
    }
}
Operators.operators = {};
exports.default = Operators;
