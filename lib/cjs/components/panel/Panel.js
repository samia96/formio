"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NestedComponent_1 = __importDefault(require("../_classes/nested/NestedComponent"));
const utils_1 = require("../../utils/utils");
const Form_1 = __importDefault(require("../form/Form"));
class PanelComponent extends NestedComponent_1.default {
    static schema(...extend) {
        return NestedComponent_1.default.schema({
            label: 'Panel',
            type: 'panel',
            key: 'panel',
            title: 'Panel',
            theme: 'default',
            breadcrumb: 'default',
            components: [],
            clearOnHide: false,
            input: false,
            tableView: false,
            persistent: false
        }, ...extend);
    }
    static get builderInfo() {
        return {
            title: 'Panel',
            icon: 'list-alt',
            group: 'layout',
            documentation: '/userguide/form-building/layout-components#panel',
            weight: 30,
            schema: PanelComponent.schema()
        };
    }
    get defaultSchema() {
        return PanelComponent.schema();
    }
    get templateName() {
        return 'panel';
    }
    static savedValueTypes() {
        return [];
    }
    constructor(...args) {
        super(...args);
        this.noField = true;
        this.on('componentError', () => {
            //change collapsed value only when the panel is collapsed to avoid additional redrawing that prevents validation messages
            if ((0, utils_1.hasInvalidComponent)(this) && this.collapsed) {
                this.collapsed = false;
            }
        });
    }
    getComponent(path, fn, originalPath) {
        var _a;
        if (((_a = this.root) === null || _a === void 0 ? void 0 : _a.parent) instanceof Form_1.default) {
            path = path.replace(this._parentPath, '');
        }
        return super.getComponent(path, fn, originalPath);
    }
}
exports.default = PanelComponent;
