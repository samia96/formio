"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const Component_edit_conditional_1 = __importDefault(require("./editForm/Component.edit.conditional"));
const Component_edit_data_1 = __importDefault(require("./editForm/Component.edit.data"));
const Component_edit_api_1 = __importDefault(require("./editForm/Component.edit.api"));
const Component_edit_display_1 = __importDefault(require("./editForm/Component.edit.display"));
const Component_edit_logic_1 = __importDefault(require("./editForm/Component.edit.logic"));
const Component_edit_validation_1 = __importDefault(require("./editForm/Component.edit.validation"));
const Component_edit_layout_1 = __importDefault(require("./editForm/Component.edit.layout"));
const utils_1 = __importDefault(require("./editForm/utils"));
function default_1(...extend) {
    const components = lodash_1.default.cloneDeep([
        {
            weight: 10,
            type: 'checkbox',
            key: 'validate.required',
            label: 'Required',
            tooltip: 'A required field must be filled in before the form can be submitted.',
            input: true,
        },
        {
            type: 'tabs',
            key: 'tabs',
            components: [
                {
                    label: 'EDITOR',
                    key: 'display',
                    weight: 0,
                    icon: 'terminal',
                    components: Component_edit_display_1.default
                },
                {
                    label: 'Data',
                    key: 'data',
                    weight: 10,
                    components: Component_edit_data_1.default
                },
                // {
                //   label: 'Validation',
                //   key: 'validation',
                //   weight: 20,
                //   components: ComponentEditValidation
                // },
                // {
                //   label: 'API',
                //   key: 'api',
                //   weight: 30,
                //   components: ComponentEditAPI
                // },
                {
                    label: 'CONDITION',
                    key: 'conditional',
                    icon: 'terminal',
                    weight: 40,
                    components: Component_edit_conditional_1.default
                },
                {
                    label: 'LOGIC',
                    key: 'logic',
                    icon: 'glyphicon glyphicon-random',
                    weight: 50,
                    components: Component_edit_logic_1.default
                },
                // {
                //   label: 'Layout',
                //   key: 'layout',
                //   weight: 60,
                //   components: ComponentEditLayout
                // },
            ],
        },
    ]).concat(extend.map((items) => ({
        type: 'tabs',
        key: 'tabs',
        components: lodash_1.default.cloneDeep(items),
    })));
    return {
        components: lodash_1.default.unionWith(components, utils_1.default.unifyComponents).concat({
            type: 'hidden',
            key: 'type'
        })
    };
}
exports.default = default_1;
