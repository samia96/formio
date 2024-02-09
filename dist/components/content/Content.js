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
var ContentComponent = /** @class */ (function (_super) {
    __extends(ContentComponent, _super);
    function ContentComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ContentComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Component_1.default.schema.apply(Component_1.default, __spreadArray([{
                label: 'Content',
                type: 'content',
                key: 'content',
                input: false,
                html: ''
            }], extend, false));
    };
    Object.defineProperty(ContentComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Content',
                group: 'layout',
                icon: 'html5',
                preview: false,
                showPreview: false,
                documentation: '/userguide/form-building/layout-components#content',
                weight: 5,
                schema: ContentComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    ContentComponent.savedValueTypes = function () {
        return [];
    };
    Object.defineProperty(ContentComponent.prototype, "defaultSchema", {
        get: function () {
            return ContentComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ContentComponent.prototype, "content", {
        get: function () {
            if (this.builderMode) {
                return this.component.html || 'Content';
            }
            var submission = lodash_1.default.get(this.root, 'submission', {});
            return this.component.html ? this.interpolate(this.component.html, {
                metadata: submission.metadata || {},
                submission: submission,
                data: this.rootValue,
                row: this.data
            }) : '';
        },
        enumerable: false,
        configurable: true
    });
    ContentComponent.prototype.render = function () {
        return _super.prototype.render.call(this, this.renderTemplate('html', {
            tag: 'div',
            attrs: [],
            content: this.content,
        }));
    };
    Object.defineProperty(ContentComponent.prototype, "dataReady", {
        get: function () {
            var _a;
            return ((_a = this.root) === null || _a === void 0 ? void 0 : _a.submissionReady) || Promise.resolve();
        },
        enumerable: false,
        configurable: true
    });
    ContentComponent.prototype.attach = function (element) {
        var _this = this;
        this.loadRefs(element, { html: 'single' });
        this.dataReady.then(function () {
            if (_this.refs.html) {
                _this.setContent(_this.refs.html, _this.content);
            }
        });
        if (this.component.refreshOnChange) {
            this.on('change', function () {
                if (_this.refs.html) {
                    _this.setContent(_this.refs.html, _this.content);
                }
            }, true);
        }
        return _super.prototype.attach.call(this, element);
    };
    Object.defineProperty(ContentComponent.prototype, "emptyValue", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    return ContentComponent;
}(Component_1.default));
exports.default = ContentComponent;
//# sourceMappingURL=Content.js.map