"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Component_1 = __importDefault(require("./_classes/component/Component"));
var utils_1 = __importDefault(require("./_classes/component/editForm/utils"));
var Component_form_1 = __importDefault(require("./_classes/component/Component.form"));
var lodash_1 = __importDefault(require("lodash"));
var Components = /** @class */ (function () {
    function Components() {
    }
    Object.defineProperty(Components, "EditFormUtils", {
        get: function () {
            return Components._editFormUtils;
        },
        set: function (value) {
            Components._editFormUtils = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Components, "baseEditForm", {
        get: function () {
            return Components._baseEditForm;
        },
        set: function (value) {
            Components._baseEditForm = value;
        },
        enumerable: false,
        configurable: true
    });
    Components.recalculateComponents = function () {
        if (window && window.Formio && window.Formio.AllComponents) {
            Components.setComponents(window.Formio.AllComponents);
        }
    };
    Object.defineProperty(Components, "components", {
        get: function () {
            if (!Components._components) {
                Components._components = {};
            }
            return Components._components;
        },
        enumerable: false,
        configurable: true
    });
    Components.setComponents = function (comps) {
        // Set the tableView method on BaseComponent.
        if (comps.base) {
            // Implement the tableView method.
            comps.base.tableView = function (value, options) {
                var comp = Components.create(options.component, options.options || {}, options.data || {}, true);
                return comp.getView(value);
            };
        }
        lodash_1.default.assign(Components.components, comps);
    };
    Components.addComponent = function (name, comp) {
        return Components.setComponent(name, comp);
    };
    Components.setComponent = function (name, comp) {
        Components.components[name] = comp;
    };
    Components.create = function (component, options, data) {
        var comp = null;
        if (component.type && Components.components.hasOwnProperty(component.type)) {
            comp = new Components.components[component.type](component, options, data);
        }
        else if (component.arrayTree) {
            // eslint-disable-next-line new-cap
            comp = new Components.components['datagrid'](component, options, data);
        }
        else if (component.tree) {
            // eslint-disable-next-line new-cap
            comp = new Components.components['nesteddata'](component, options, data);
        }
        else if (Array.isArray(component.components)) {
            // eslint-disable-next-line new-cap
            comp = new Components.components['nested'](component, options, data);
        }
        else if (options && options.server) {
            // eslint-disable-next-line new-cap
            comp = new Components.components['hidden'](component, options, data);
        }
        else {
            comp = new Component_1.default(component, options, data);
        }
        return comp;
    };
    Components._editFormUtils = utils_1.default;
    Components._baseEditForm = Component_form_1.default;
    return Components;
}());
exports.default = Components;
//# sourceMappingURL=Components.js.map