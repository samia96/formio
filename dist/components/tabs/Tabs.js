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
var lodash_1 = __importDefault(require("lodash"));
var NestedComponent_1 = __importDefault(require("../_classes/nested/NestedComponent"));
var TabsComponent = /** @class */ (function (_super) {
    __extends(TabsComponent, _super);
    function TabsComponent() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var _this = _super.apply(this, args) || this;
        _this.currentTab = 0;
        _this.noField = true;
        return _this;
    }
    TabsComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return NestedComponent_1.default.schema.apply(NestedComponent_1.default, __spreadArray([{
                label: 'Tabs',
                type: 'tabs',
                input: false,
                key: 'tabs',
                persistent: false,
                tableView: false,
                components: [
                    {
                        label: 'Tab 1',
                        key: 'tab1',
                        components: [],
                    },
                ],
                verticalLayout: false,
            }], extend, false));
    };
    Object.defineProperty(TabsComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Tabs',
                group: 'layout',
                icon: 'folder-o',
                weight: 50,
                documentation: '/userguide/form-building/layout-components#tabs',
                showPreview: false,
                schema: TabsComponent.schema(),
            };
        },
        enumerable: false,
        configurable: true
    });
    TabsComponent.savedValueTypes = function () {
        return [];
    };
    Object.defineProperty(TabsComponent.prototype, "defaultSchema", {
        get: function () {
            return TabsComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabsComponent.prototype, "schema", {
        get: function () {
            var _this = this;
            var schema = _super.prototype.schema;
            // We need to clone this because the builder uses the "components" reference and this would reset that reference.
            var components = lodash_1.default.cloneDeep(this.component.components);
            schema.components = components.map(function (tab, index) {
                tab.components = _this.tabs[index].map(function (component) { return component.schema; });
                return tab;
            });
            return schema;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabsComponent.prototype, "tabKey", {
        get: function () {
            return "tab-".concat(this.key);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabsComponent.prototype, "tabLikey", {
        get: function () {
            return "tabLi-".concat(this.key);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TabsComponent.prototype, "tabLinkKey", {
        get: function () {
            return "tabLink-".concat(this.key);
        },
        enumerable: false,
        configurable: true
    });
    TabsComponent.prototype.init = function () {
        var _this = this;
        this.components = [];
        this.tabs = [];
        lodash_1.default.each(this.component.components, function (tab, index) {
            _this.tabs[index] = [];
            // Initialize empty tabs.
            tab.components = tab.components || [];
            lodash_1.default.each(tab.components, function (comp) {
                var component = _this.createComponent(comp);
                component.tab = index;
                _this.tabs[index].push(component);
            });
        });
    };
    TabsComponent.prototype.render = function () {
        var _this = this;
        return _super.prototype.render.call(this, this.renderTemplate('tab', {
            tabKey: this.tabKey,
            tabLikey: this.tabLikey,
            tabLinkKey: this.tabLinkKey,
            currentTab: this.currentTab,
            tabComponents: this.tabs.map(function (tab) { return _this.renderComponents(tab); }),
        }, (this.options.flatten || this.options.pdf ? 'flat' : null)));
    };
    TabsComponent.prototype.attach = function (element) {
        var _a;
        var _this = this;
        this.loadRefs(element, (_a = {},
            _a[this.tabLinkKey] = 'multiple',
            _a[this.tabKey] = 'multiple',
            _a[this.tabLikey] = 'multiple',
            _a));
        ['change', 'error'].forEach(function (event) { return _this.on(event, _this.handleTabsValidation.bind(_this)); });
        var superAttach = _super.prototype.attach.call(this, element);
        this.refs[this.tabLinkKey].forEach(function (tabLink, index) {
            _this.addEventListener(tabLink, 'click', function (event) {
                event.preventDefault();
                _this.setTab(index);
            });
        });
        this.refs[this.tabKey].forEach(function (tab, index) {
            _this.attachComponents(tab, _this.tabs[index], _this.component.components[index].components);
        });
        return superAttach;
    };
    TabsComponent.prototype.detach = function (all) {
        _super.prototype.detach.call(this, all);
    };
    /**
     * Set the current tab.
     *
     * @param index
     */
    TabsComponent.prototype.setTab = function (index) {
        var _this = this;
        if (!this.tabs || !this.tabs[index] || !this.refs[this.tabKey] || !this.refs[this.tabKey][index]) {
            return;
        }
        this.currentTab = index;
        lodash_1.default.each(this.refs[this.tabKey], function (tab) {
            _this.removeClass(tab, 'formio-tab-panel-active');
            tab.style.display = 'none';
        });
        this.addClass(this.refs[this.tabKey][index], 'formio-tab-panel-active');
        this.refs[this.tabKey][index].style.display = 'block';
        lodash_1.default.each(this.refs[this.tabLinkKey], function (tabLink, tabIndex) {
            if (_this.refs[_this.tabLinkKey][tabIndex]) {
                _this.removeClass(tabLink, 'active');
                _this.removeClass(tabLink, 'formio-tab-link-active');
            }
            if (_this.refs[_this.tabLikey][tabIndex]) {
                _this.removeClass(_this.refs[_this.tabLikey][tabIndex], 'active');
                _this.removeClass(_this.refs[_this.tabLikey][tabIndex], 'formio-tab-link-container-active');
            }
        });
        if (this.refs[this.tabLikey][index]) {
            this.addClass(this.refs[this.tabLikey][index], 'active');
            this.addClass(this.refs[this.tabLikey][index], 'formio-tab-link-container-active');
        }
        if (this.refs[this.tabLinkKey][index]) {
            this.addClass(this.refs[this.tabLinkKey][index], 'active');
            this.addClass(this.refs[this.tabLinkKey][index], 'formio-tab-link-active');
        }
        this.triggerChange();
    };
    TabsComponent.prototype.beforeFocus = function (component) {
        if ('beforeFocus' in this.parent) {
            this.parent.beforeFocus(this);
        }
        var tabIndex = this.tabs.findIndex(function (tab) {
            return tab.some(function (comp) { return comp === component; });
        });
        if (tabIndex !== -1 && this.currentTab !== tabIndex) {
            this.setTab(tabIndex);
        }
    };
    TabsComponent.prototype.setErrorClasses = function (elements, dirty, hasErrors, hasMessages, element) {
        var _this = this;
        if (element === void 0) { element = this.element; }
        if (this.component.modalEdit) {
            _super.prototype.setErrorClasses.call(this, elements, dirty, hasErrors, hasMessages, element);
        }
        elements.forEach(function (element) {
            _this.addClass(element, 'is-invalid');
            if (element.getAttribute('ref') !== 'openModal') {
                if (_this.options.highlightErrors) {
                    _this.addClass(element, 'tab-error');
                }
                else {
                    _this.addClass(element, 'has-error');
                }
            }
        });
    };
    TabsComponent.prototype.clearErrorClasses = function (elements) {
        var _this = this;
        if (this.options.server || !this.rendered) {
            return;
        }
        if (this.component.modalEdit) {
            var element = Array.isArray(elements) || elements instanceof NodeList ? this.element : elements;
            _super.prototype.clearErrorClasses.call(this, element);
        }
        elements = Array.isArray(elements) || elements instanceof NodeList ? elements : [elements];
        elements.forEach(function (element) {
            _this.removeClass(element, 'is-invalid');
            _this.removeClass(element, 'tab-error');
            _this.removeClass(element, 'has-error');
        });
    };
    TabsComponent.prototype.handleTabsValidation = function () {
        if (!this.refs[this.tabLinkKey] || !this.refs[this.tabLinkKey].length || !this.tabs.length) {
            return;
        }
        this.clearErrorClasses(this.refs[this.tabLinkKey]);
        var invalidTabsIndexes = this.tabs.reduce(function (invalidTabs, tab, tabIndex) {
            var hasComponentWithError = tab.some(function (comp) { return !!comp.error; });
            return hasComponentWithError ? __spreadArray(__spreadArray([], invalidTabs, true), [tabIndex], false) : invalidTabs;
        }, []);
        if (!invalidTabsIndexes.length) {
            return;
        }
        var invalidTabs = __spreadArray([], this.refs[this.tabLinkKey], true).filter(function (_, tabIndex) { return invalidTabsIndexes.includes(tabIndex); });
        this.setErrorClasses(invalidTabs);
    };
    return TabsComponent;
}(NestedComponent_1.default));
exports.default = TabsComponent;
//# sourceMappingURL=Tabs.js.map