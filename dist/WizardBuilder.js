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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var WebformBuilder_1 = __importDefault(require("./WebformBuilder"));
var Webform_1 = __importDefault(require("./Webform"));
var builder_1 = __importDefault(require("./utils/builder"));
var lodash_1 = __importDefault(require("lodash"));
var utils_1 = require("./utils/utils");
var WizardBuilder = /** @class */ (function (_super) {
    __extends(WizardBuilder, _super);
    function WizardBuilder() {
        var _this = this;
        var element, options;
        if (arguments[0] instanceof HTMLElement || arguments[1]) {
            element = arguments[0];
            options = arguments[1];
        }
        else {
            options = arguments[0];
        }
        // Reset skipInit in case PDFBuilder has set it.
        options.skipInit = false;
        options.display = 'wizard';
        _this = _super.call(this, element, options) || this;
        _this._form = {
            components: [
                _this.getPageConfig(1),
            ],
        };
        _this.page = 0;
        var _loop_1 = function (group) {
            if (this_1.groups[group] && this_1.groups[group].components) {
                this_1.groups[group].componentOrder = Object.keys(this_1.groups[group].components)
                    .map(function (key) { return _this.groups[group].components[key]; })
                    .filter(function (component) { return component && !component.ignore; })
                    .sort(function (a, b) { return a.weight - b.weight; })
                    .map(function (component) { return component.key; });
            }
        };
        var this_1 = this;
        // Need to create a component order for each group.
        for (var group in _this.groups) {
            _loop_1(group);
        }
        var originalRenderComponentsHook = _this.options.hooks.renderComponents;
        _this.options.hooks.renderComponents = function (html, _a) {
            var components = _a.components, self = _a.self;
            if (self.type === 'form' && !self.root) {
                return html;
            }
            else {
                return originalRenderComponentsHook(html, { components: components, self: self });
            }
        };
        var originalAttachComponentsHook = _this.options.hooks.attachComponents;
        _this.options.hooks.attachComponents = function (element, components, container, component) {
            if (component.type === 'form' && !component.root) {
                return element;
            }
            return originalAttachComponentsHook(element, components, container, component);
        };
        // Wizard pages don't replace themselves in the right array. Do that here.
        _this.on('saveComponent', function (component, originalComponent) {
            var webformComponents = _this.webform.components.map(function (_a) {
                var component = _a.component;
                return component;
            });
            if (_this._form.components.includes(originalComponent)) {
                _this._form.components[_this._form.components.indexOf(originalComponent)] = component;
                _this.rebuild();
            }
            else if (webformComponents.includes(originalComponent)) {
                _this._form.components.push(component);
                _this.rebuild();
            }
            else {
                // Fallback to look for panel based on key.
                var formComponentIndex = _this._form.components.findIndex(function (comp) { return originalComponent.key === comp.key; });
                if (formComponentIndex !== -1) {
                    _this._form.components[formComponentIndex] = component;
                    _this.rebuild();
                }
            }
        }, true);
        return _this;
    }
    WizardBuilder.prototype.removeComponent = function (component, parent, original) {
        var remove = _super.prototype.removeComponent.call(this, component, parent, original);
        // If user agrees to remove the whole group of the components and it could be a Wizard page, find it and remove
        if (remove && component.type === 'panel') {
            var pageIndex = this.pages.findIndex(function (page) { return page.key === component.key; });
            var componentIndex = this._form.components.findIndex(function (comp) { return comp.key === component.key; });
            if (pageIndex !== -1) {
                this.removePage(pageIndex, componentIndex);
            }
        }
        return remove;
    };
    WizardBuilder.prototype.allowDrop = function (element) {
        return (this.webform && this.webform.refs && this.webform.refs.webform === element) ? false : true;
    };
    Object.defineProperty(WizardBuilder.prototype, "pages", {
        get: function () {
            return lodash_1.default.filter(this._form.components, { type: 'panel' });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WizardBuilder.prototype, "currentPage", {
        get: function () {
            var pages = this.pages;
            return (pages && (pages.length >= this.page)) ? pages[this.page] : null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WizardBuilder.prototype, "form", {
        get: function () {
            return this._form;
        },
        set: function (value) {
            this._form = value;
            if (!this._form.components || !Array.isArray(this._form.components)) {
                this._form.components = [];
            }
            if (this.pages.length === 0) {
                var components = this._form.components.filter(function (component) { return component.type !== 'button'; });
                this._form.components = [this.getPageConfig(1, components)];
            }
            else {
                var components = this._form.components
                    .filter(function (component) { return component.type !== 'button' || component.action !== 'submit'; });
                this._form.components = components;
            }
            this.rebuild();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WizardBuilder.prototype, "schema", {
        get: function () {
            lodash_1.default.assign(this.currentPage, this.webform._form.components[0]);
            var webform = new Webform_1.default(this.options);
            webform.setForm(this._form, { noEmit: true });
            return webform.schema;
        },
        enumerable: false,
        configurable: true
    });
    WizardBuilder.prototype.render = function () {
        var _this = this;
        return this.renderTemplate('builderWizard', {
            sidebar: this.renderTemplate('builderSidebar', {
                scrollEnabled: this.sideBarScroll,
                groupOrder: this.groupOrder,
                groupId: "builder-sidebar-".concat(this.id),
                groups: this.groupOrder.map(function (groupKey) { return _this.renderTemplate('builderSidebarGroup', {
                    group: _this.groups[groupKey],
                    groupKey: groupKey,
                    groupId: "builder-sidebar-".concat(_this.id),
                    subgroups: _this.groups[groupKey].subgroups.map(function (group) { return _this.renderTemplate('builderSidebarGroup', {
                        group: group,
                        groupKey: group.key,
                        groupId: "group-container-".concat(groupKey),
                        subgroups: []
                    }); }),
                }); }),
            }),
            pages: this.pages,
            form: this.webform.render(),
        });
    };
    WizardBuilder.prototype.attach = function (element) {
        var _this = this;
        this.loadRefs(element, {
            addPage: 'multiple',
            gotoPage: 'multiple',
        });
        this.refs.gotoPage.forEach(function (page, index) {
            page.parentNode.dragInfo = { index: index };
        });
        if (this.dragulaLib) {
            this.navigationDragula = this.dragulaLib([this.element.querySelector('.wizard-pages')], {
                moves: function (el) { return (!el.classList.contains('wizard-add-page')); },
                accepts: function (el, target, source, sibling) { return (sibling ? true : false); },
            })
                .on('drop', this.onReorder.bind(this));
        }
        this.refs.addPage.forEach(function (link) {
            _this.addEventListener(link, 'click', function (event) {
                event.preventDefault();
                _this.addPage();
            });
        });
        this.refs.gotoPage.forEach(function (link, index) {
            _this.addEventListener(link, 'click', function (event) {
                event.preventDefault();
                _this.setPage(index);
            });
        });
        return _super.prototype.attach.call(this, element);
    };
    WizardBuilder.prototype.detach = function () {
        if (this.navigationDragula) {
            this.navigationDragula.destroy();
        }
        this.navigationDragula = null;
        _super.prototype.detach.call(this);
    };
    WizardBuilder.prototype.rebuild = function () {
        var _a;
        var page = this.currentPage;
        this.webform.setForm({
            display: 'form',
            type: 'form',
            components: page ? [page] : [],
            controller: ((_a = this._form) === null || _a === void 0 ? void 0 : _a.controller) || ''
        }, { keepAsReference: true });
        return this.redraw();
    };
    WizardBuilder.prototype.addPage = function (page) {
        var newPage = page && page.schema ? (0, utils_1.fastCloneDeep)(page.schema) : this.getPageConfig(this.pages.length + 1);
        builder_1.default.uniquify(this._form.components, newPage);
        this._form.components.push(newPage);
        this.emitSaveComponentEvent(newPage, newPage, this._form, 'components', (this._form.components.length - 1), true, newPage);
        this.emit('change', this._form);
        return this.rebuild();
    };
    WizardBuilder.prototype.removePage = function (pageIndex, componentIndex) {
        this._form.components.splice(componentIndex, 1);
        this.emit('change', this._form);
        if (pageIndex === this.pages.length) {
            // If the last page is removed.
            if (pageIndex === 0) {
                this._form.components.push(this.getPageConfig(1));
                return this.rebuild();
            }
            else {
                return this.setPage(pageIndex - 1);
            }
        }
        else {
            return this.rebuild();
        }
    };
    WizardBuilder.prototype.onReorder = function (element, _target, _source, sibling) {
        var _this = this;
        var isSiblingAnAddPageButton = sibling === null || sibling === void 0 ? void 0 : sibling.classList.contains('wizard-add-page');
        // We still can paste before Add Page button
        if (!element.dragInfo || (sibling && !sibling.dragInfo && !isSiblingAnAddPageButton)) {
            console.warn('There is no Drag Info available for either dragged or sibling element');
            return;
        }
        var oldPosition = element.dragInfo.index;
        //should drop at next sibling position; no next sibling means drop to last position
        var newPosition = (sibling && sibling.dragInfo ? sibling.dragInfo.index : this.pages.length);
        var movedBelow = newPosition > oldPosition;
        var formComponents = (0, utils_1.fastCloneDeep)(this._form.components);
        var draggedRowData = this._form.components[oldPosition];
        //insert element at new position
        formComponents.splice(newPosition, 0, draggedRowData);
        //remove element from old position (if was moved above, after insertion it's at +1 index)
        formComponents.splice(movedBelow ? oldPosition : oldPosition + 1, 1);
        this._form.components = (0, utils_1.fastCloneDeep)(formComponents);
        return this.rebuild().then(function () {
            _this.emit('change', _this._form);
        });
    };
    WizardBuilder.prototype.setPage = function (index) {
        if (index === this.page) {
            return;
        }
        this.page = index;
        return this.rebuild();
    };
    WizardBuilder.prototype.getPageConfig = function (index, components) {
        if (components === void 0) { components = []; }
        return {
            title: "Page ".concat(index),
            label: "Page ".concat(index),
            type: 'panel',
            key: "page".concat(index),
            components: components,
        };
    };
    WizardBuilder.prototype.pasteComponent = function (component) {
        if (component instanceof WizardBuilder) {
            return;
        }
        if (this._form.components.find(function (comp) { return lodash_1.default.isEqual(component.component, comp); })) {
            this.addPage(component);
        }
        else {
            return _super.prototype.pasteComponent.call(this, component);
        }
    };
    return WizardBuilder;
}(WebformBuilder_1.default));
exports.default = WizardBuilder;
//# sourceMappingURL=WizardBuilder.js.map