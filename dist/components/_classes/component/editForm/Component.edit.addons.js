"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var addons_1 = require("../../../../addons");
var addons_2 = __importDefault(require("../../../../addons"));
exports.default = [
    {
        type: 'editgrid',
        addAnother: 'Add Addon',
        saveRow: 'Save Addon',
        weight: 28,
        input: true,
        key: 'addons',
        label: 'Addons',
        templates: {
            // eslint-disable-next-line quotes
            header: "<div class=\"row\">\n                <div class=\"col-6\">{{ t(components[0].label) }}</div>\n                <div class=\"col-4\">Settings</div>\n              </div>",
            // eslint-disable-next-line quotes
            row: "<div class=\"row\">\n              <div class=\"col-6\">\n                {{ row.name.label }}\n              </div>\n              <div class=\"col-4 text-muted\">\n                Click Edit to see addon's settings\n              </div>\n\n              {% if (!instance.options.readOnly && !instance.disabled) { %}\n                <div class=\"col-2\">\n                  <div class=\"btn-group pull-right\">\n                    <button class=\"btn btn-default btn-light btn-sm editRow\"><i class=\"{{ iconClass('edit') }}\"></i></button>\n                    {% if (!instance.hasRemoveButtons || instance.hasRemoveButtons()) { %}\n                      <button class=\"btn btn-danger btn-sm removeRow\"><i class=\"{{ iconClass('trash') }}\"></i></button>\n                    {% } %}\n                  </div>\n                </div>\n              {% } %}\n            </div>",
        },
        components: __spreadArray([
            {
                label: 'Name',
                tableView: true,
                key: 'name',
                type: 'select',
                dataSrc: 'custom',
                data: {
                    custom: function (_a) {
                        var _b, _c;
                        var instance = _a.instance;
                        var componentType = (_c = (_b = instance === null || instance === void 0 ? void 0 : instance.root) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.type;
                        var availableAddons = Object.keys(addons_2.default).filter(function (key) {
                            var _a, _b, _c;
                            if ((_c = (_b = (_a = addons_2.default[key]) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.supportedComponents) === null || _c === void 0 ? void 0 : _c.includes(componentType)) {
                                return true;
                            }
                            return false;
                        });
                        return availableAddons.map(function (addonKey) { return ({
                            value: addonKey,
                            label: addons_2.default[addonKey].info.label || addonKey,
                        }); });
                    },
                },
                input: true,
                validate: {
                    required: true,
                },
            }
        ], addons_1.editForms, true)
    }
];
//# sourceMappingURL=Component.edit.addons.js.map