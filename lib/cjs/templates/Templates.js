"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const index_1 = __importDefault(require("./index"));
class Templates {
    static get templates() {
        if (!Templates._templates) {
            Templates._templates = index_1.default;
        }
        return Templates._templates;
    }
    static addTemplate(name, template) {
        Templates.templates[name] = template;
    }
    static extendTemplate(name, template) {
        Templates.templates[name] = lodash_1.default.merge({}, Templates.templates[name], template);
    }
    static setTemplate(name, template) {
        Templates.addTemplate(name, template);
    }
    static set current(templates) {
        const defaultTemplates = Templates.current;
        Templates._current = lodash_1.default.merge({}, defaultTemplates, templates);
    }
    static get current() {
        if (Templates._current) {
            return Templates._current;
        }
        return Templates.defaultTemplates;
    }
    static get defaultTemplates() {
        return Templates.templates.hasOwnProperty('bootstrap') ? Templates.templates.bootstrap : {};
    }
    static set framework(framework) {
        if (Templates.templates.hasOwnProperty(framework)) {
            Templates._framework = framework;
            Templates._current = Templates.templates[framework];
        }
    }
    static get framework() {
        return Templates._framework;
    }
}
exports.default = Templates;
