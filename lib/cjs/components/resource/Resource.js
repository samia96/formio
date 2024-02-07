"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Select_1 = __importDefault(require("../select/Select"));
class ResourceComponent extends Select_1.default {
    static schema(...extend) {
        return Select_1.default.schema({
            type: 'resource',
            label: 'Resource',
            key: 'resource',
            dataSrc: 'resource',
            resource: '',
            project: '',
            template: '<span>{{ item.data }}</span>',
        }, ...extend);
    }
    static get builderInfo() {
        return {
            title: 'Resource',
            icon: 'files-o',
            weight: 90,
            documentation: '/userguide/form-building/form-components#resource',
            schema: ResourceComponent.schema(),
        };
    }
    init() {
        super.init();
        this.component.dataSrc = 'resource';
        this.component.data = {
            resource: this.component.resource,
        };
    }
    get defaultSchema() {
        return ResourceComponent.schema();
    }
}
exports.default = ResourceComponent;
