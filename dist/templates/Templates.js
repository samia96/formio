"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var index_1 = __importDefault(require("./index"));
var Templates = /** @class */ (function () {
    function Templates() {
    }
    Object.defineProperty(Templates, "templates", {
        get: function () {
            if (!Templates._templates) {
                Templates._templates = index_1.default;
            }
            return Templates._templates;
        },
        enumerable: false,
        configurable: true
    });
    Templates.addTemplate = function (name, template) {
        Templates.templates[name] = template;
    };
    Templates.extendTemplate = function (name, template) {
        Templates.templates[name] = lodash_1.default.merge({}, Templates.templates[name], template);
    };
    Templates.setTemplate = function (name, template) {
        Templates.addTemplate(name, template);
    };
    Object.defineProperty(Templates, "current", {
        get: function () {
            if (Templates._current) {
                return Templates._current;
            }
            return Templates.defaultTemplates;
        },
        set: function (templates) {
            var defaultTemplates = Templates.current;
            Templates._current = lodash_1.default.merge({}, defaultTemplates, templates);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Templates, "defaultTemplates", {
        get: function () {
            return Templates.templates.hasOwnProperty('bootstrap') ? Templates.templates.bootstrap : {};
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Templates, "framework", {
        get: function () {
            return Templates._framework;
        },
        set: function (framework) {
            if (Templates.templates.hasOwnProperty(framework)) {
                Templates._framework = framework;
                Templates._current = Templates.templates[framework];
            }
        },
        enumerable: false,
        configurable: true
    });
    return Templates;
}());
exports.default = Templates;
//# sourceMappingURL=Templates.js.map