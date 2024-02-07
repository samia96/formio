"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValueSources {
    static addValueSource(name, valueSource) {
        ValueSources.valueSources[name] = valueSource;
    }
    static addValueSources(valueSources) {
        ValueSources.valueSources = Object.assign(Object.assign({}, ValueSources.valueSources), valueSources);
    }
    static getValueSource(name) {
        return ValueSources.valueSources[name];
    }
    static getValueSources() {
        return ValueSources.valueSources;
    }
}
ValueSources.valueSources = {};
exports.default = ValueSources;
