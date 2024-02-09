"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Component_1 = __importDefault(require("../_classes/component/Component"));
var lodash_1 = __importDefault(require("lodash"));
var HTMLComponent = /** @class */ (function (_super) {
    __extends(HTMLComponent, _super);
    function HTMLComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HTMLComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Component_1.default.schema.apply(Component_1.default, __spreadArray([{
                label: 'HTML',
                type: 'htmlelement',
                tag: 'p',
                attrs: [],
                content: '',
                input: false,
                persistent: false
            }], extend, false));
    };
    Object.defineProperty(HTMLComponent, "builderInfo", {
        get: function () {
            return {
                title: 'HTML Element',
                group: 'layout',
                icon: 'code',
                weight: 0,
                documentation: '/userguide/form-building/layout-components#html-element',
                showPreview: false,
                schema: HTMLComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    HTMLComponent.savedValueTypes = function () {
        return [];
    };
    Object.defineProperty(HTMLComponent.prototype, "defaultSchema", {
        get: function () {
            return HTMLComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HTMLComponent.prototype, "content", {
        get: function () {
            if (this.builderMode) {
                return this.component.content;
            }
            // i18n returns error exactly with word 'select', spaces will be trimmed
            if (this.component.content.replace(/(<(\/?[^>]+)>)/g, '').trim() === 'select') {
                return " ".concat(this.component.content, " ");
            }
            var submission = lodash_1.default.get(this.root, 'submission', {});
            var content = this.component.content ? this.interpolate(this.sanitize(this.component.content, this.shouldSanitizeValue), {
                metadata: submission.metadata || {},
                submission: submission,
                data: this.rootValue,
                row: this.data
            }) : '';
            return content;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(HTMLComponent.prototype, "singleTags", {
        get: function () {
            return ['br', 'img', 'hr'];
        },
        enumerable: false,
        configurable: true
    });
    HTMLComponent.prototype.checkRefreshOn = function (changed) {
        _super.prototype.checkRefreshOn.call(this, changed);
        if (!this.builderMode && this.component.refreshOnChange && this.element &&
            !lodash_1.default.isUndefined(changed) && ((lodash_1.default.isBoolean(changed) && changed) || !lodash_1.default.isEmpty(changed)) &&
            this.conditionallyVisible(this.data, this.row)) {
            this.setContent(this.element, this.renderContent());
        }
    };
    HTMLComponent.prototype.renderContent = function () {
        var _this = this;
        var submission = lodash_1.default.get(this.root, 'submission', {});
        return this.renderTemplate('html', {
            component: this.component,
            tag: this.component.tag,
            attrs: (this.component.attrs || []).map(function (attr) {
                return {
                    attr: attr.attr,
                    value: _this.interpolate(attr.value, {
                        metadata: submission.metadata || {},
                        submission: submission,
                        data: _this.rootValue,
                        row: _this.data
                    })
                };
            }),
            content: this.content,
            singleTags: this.singleTags,
        });
    };
    HTMLComponent.prototype.render = function () {
        return _super.prototype.render.call(this, this.renderContent());
    };
    HTMLComponent.prototype.attach = function (element) {
        this.loadRefs(element, { html: 'single' });
        return _super.prototype.attach.call(this, element);
    };
    return HTMLComponent;
}(Component_1.default));
exports.default = HTMLComponent;
//# sourceMappingURL=HTML.js.map