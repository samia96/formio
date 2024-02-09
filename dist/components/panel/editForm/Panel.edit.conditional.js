"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = __importDefault(require("../../_classes/component/editForm/utils"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var omit_1 = __importDefault(require("lodash/omit"));
var difference_1 = __importDefault(require("lodash/difference"));
var keys_1 = __importDefault(require("lodash/keys"));
/* eslint-disable quotes, max-len */
var title = 'Advanced Next Page';
var jsonProp = 'nextPage';
var jsProp = 'nextPage';
var jsDocHTML = ("\n  <p>You must assign the <strong>next</strong> variable with the API key of the next page.</p>\n  <p>The global variable <strong>data</strong> is provided, and allows you to access the data of any form component, by using its API key.</p>\n  <p>Also <strong>moment</strong> library is available, and allows you to manipulate dates in a convenient way.</p>\n  <h5>Example</h5><pre>next = data.addComment ? 'page3' : 'page4';</pre>\n");
var jsonDocHTML = ("\n  <p>Submission data is available as JsonLogic variables, with the same api key as your components.</p>\n");
var settingComponent = utils_1.default.javaScriptValue(title, jsProp, jsonProp, 110, jsDocHTML, jsonDocHTML);
exports.default = [
    __assign(__assign({}, settingComponent), { customConditional: function (context) {
            var isWizardPanel = false;
            if (context.instance.options.editForm.display === 'wizard') {
                var components = context.instance.options.editForm.components;
                var component_1 = context.instance.options.editComponent;
                if (components && component_1) {
                    isWizardPanel = components.some(function (comp) {
                        var diff = (0, difference_1.default)((0, keys_1.default)(comp), (0, keys_1.default)(component_1)) || [];
                        diff.push('components');
                        return (0, isEqual_1.default)((0, omit_1.default)(comp, diff), (0, omit_1.default)(component_1, diff));
                    });
                }
            }
            return isWizardPanel;
        } })
];
/* eslint-enable quotes, max-len */
//# sourceMappingURL=Panel.edit.conditional.js.map