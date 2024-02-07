"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Transformers {
    static addTransformer(name, transformer) {
        Transformers.transformers[name] = transformer;
    }
    static addTransformers(transformers) {
        Transformers.transformers = Object.assign(Object.assign({}, Transformers.transformers), transformers);
    }
    static getTransformer(name) {
        return Transformers.transformers[name];
    }
    static getTransformers() {
        return Transformers.transformers;
    }
}
Transformers.transformers = {};
exports.default = Transformers;
