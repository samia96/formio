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
var Webform_1 = __importDefault(require("./Webform"));
var Formio_1 = require("./Formio");
var utils_1 = require("./utils/utils");
var Wizard = /** @class */ (function (_super) {
    __extends(Wizard, _super);
    /**
     * Constructor for wizard based forms
     * @param element Dom element to place this wizard.
     * @param {Object} options Options object, supported options are:
     *    - breadcrumbSettings.clickable: true (default) determines if the breadcrumb bar is clickable or not
     *    - buttonSettings.show*(Previous, Next, Cancel): true (default) determines if the button is shown or not
     *    - allowPrevious: false (default) determines if the breadcrumb bar is clickable or not for visited tabs
     */
    function Wizard() {
        var _this = this;
        var element, options;
        if (arguments[0] instanceof HTMLElement || arguments[1]) {
            element = arguments[0];
            options = arguments[1] || {};
        }
        else {
            options = arguments[0] || {};
        }
        options.display = 'wizard';
        _this = _super.call(this, element, options) || this;
        _this.pages = [];
        _this.prefixComps = [];
        _this.suffixComps = [];
        _this.components = [];
        _this.originalComponents = [];
        _this.page = 0;
        _this.currentPanel = null;
        _this.currentPanels = null;
        _this.currentNextPage = 0;
        _this._seenPages = [0];
        _this.subWizards = [];
        _this.allPages = [];
        _this.lastPromise = Promise.resolve();
        _this.enabledIndex = 0;
        _this.editMode = false;
        _this.originalOptions = lodash_1.default.cloneDeep(_this.options);
        return _this;
    }
    Wizard.prototype.isLastPage = function () {
        var next = this.getNextPage();
        if (lodash_1.default.isNumber(next)) {
            return next === -1;
        }
        return lodash_1.default.isNull(next);
    };
    Wizard.prototype.getPages = function (args) {
        var _this = this;
        if (args === void 0) { args = {}; }
        var _a = args.all, all = _a === void 0 ? false : _a;
        var pages = this.hasExtraPages ? this.components : this.pages;
        var filteredPages = pages
            .filter(all ? lodash_1.default.identity : function (p, index) { return _this._seenPages.includes(index); });
        return filteredPages;
    };
    Object.defineProperty(Wizard.prototype, "hasExtraPages", {
        get: function () {
            return !lodash_1.default.isEmpty(this.subWizards);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "data", {
        get: function () {
            return _super.prototype.data;
        },
        set: function (value) {
            var _this = this;
            this._data = value;
            lodash_1.default.each(this.getPages({ all: true }), function (component) {
                component.data = _this.componentContext(component);
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "localData", {
        get: function () {
            var _a, _b;
            return ((_b = (_a = this.pages[this.page]) === null || _a === void 0 ? void 0 : _a.root) === null || _b === void 0 ? void 0 : _b.submission.data) || this.submission.data;
        },
        enumerable: false,
        configurable: true
    });
    Wizard.prototype.checkConditions = function (data, flags, row) {
        var visible = _super.prototype.checkConditions.call(this, data, flags, row);
        this.establishPages(data);
        return visible;
    };
    Wizard.prototype.getComponents = function () {
        return this.submitting
            ? this.getPages({ all: this.isLastPage() })
            : _super.prototype.getComponents.call(this);
    };
    Wizard.prototype.resetValue = function () {
        this.getPages({ all: true }).forEach(function (page) { return page.resetValue(); });
        this.setPristine(true);
    };
    Wizard.prototype.init = function () {
        var _this = this;
        var _a, _b, _c;
        // Check for and initlize button settings object
        this.options.buttonSettings = lodash_1.default.defaults(this.options.buttonSettings, {
            showPrevious: true,
            showNext: true,
            showSubmit: true,
            showCancel: !this.options.readOnly
        });
        if (!this.isSecondInit) {
            this.isClickableDefined = (_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.breadcrumbSettings) === null || _b === void 0 ? void 0 : _b.hasOwnProperty('clickable');
            this.isSecondInit = true;
        }
        this.options.breadcrumbSettings = lodash_1.default.defaults(this.options.breadcrumbSettings, {
            clickable: true
        });
        this.options.allowPrevious = this.options.allowPrevious || false;
        this.page = 0;
        var onReady = _super.prototype.init.call(this);
        this.setComponentSchema();
        if ((_c = this.pages) === null || _c === void 0 ? void 0 : _c[this.page]) {
            this.component = this.pages[this.page].component;
        }
        this.on('subWizardsUpdated', function (subForm) {
            var subWizard = _this.subWizards.find(function (subWizard) { var _a; return (subForm === null || subForm === void 0 ? void 0 : subForm.id) && ((_a = subWizard.subForm) === null || _a === void 0 ? void 0 : _a.id) === (subForm === null || subForm === void 0 ? void 0 : subForm.id); });
            if (_this.subWizards.length && subWizard) {
                subWizard.subForm.setValue(subForm._submission, {}, true);
                _this.establishPages();
                _this.redraw();
            }
        });
        return onReady;
    };
    Object.defineProperty(Wizard.prototype, "wizardKey", {
        get: function () {
            return "wizard-".concat(this.id);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "wizard", {
        get: function () {
            return this.form;
        },
        set: function (form) {
            this.setForm(form);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "buttons", {
        get: function () {
            var _this = this;
            var buttons = {};
            [
                { name: 'cancel', method: 'cancel' },
                { name: 'previous', method: 'prevPage' },
                { name: 'next', method: 'nextPage' },
                { name: 'submit', method: 'submit' }
            ].forEach(function (button) {
                if (_this.hasButton(button.name)) {
                    buttons[button.name] = button;
                }
            });
            return buttons;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "buttonOrder", {
        get: function () {
            var _a, _b, _c;
            var defaultButtonOrder = [
                'cancel',
                'previous',
                'next',
                'submit'
            ];
            return (_c = (_b = (_a = this.options.properties) === null || _a === void 0 ? void 0 : _a.wizardButtonOrder) === null || _b === void 0 ? void 0 : _b.toLowerCase().split(', ')) !== null && _c !== void 0 ? _c : defaultButtonOrder;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Wizard.prototype, "renderContext", {
        get: function () {
            var _a, _b;
            return {
                disableWizardSubmit: this.form.disableWizardSubmit,
                wizardKey: this.wizardKey,
                isBreadcrumbClickable: this.isBreadcrumbClickable(),
                isSubForm: !!this.parent && !((_b = (_a = this.root) === null || _a === void 0 ? void 0 : _a.component) === null || _b === void 0 ? void 0 : _b.type) === 'wizard',
                panels: this.allPages.length ? this.allPages.map(function (page) { return page.component; }) : this.pages.map(function (page) { return page.component; }),
                buttons: this.buttons,
                currentPage: this.page,
                buttonOrder: this.buttonOrder,
            };
        },
        enumerable: false,
        configurable: true
    });
    Wizard.prototype.prepareNavigationSettings = function (ctx) {
        var currentPanel = this.currentPanel;
        if (currentPanel && currentPanel.buttonSettings) {
            Object.keys(currentPanel.buttonSettings).forEach(function () {
                Object.keys(ctx.buttons).forEach(function (key) {
                    if (typeof currentPanel.buttonSettings[key] !== 'undefined' && !currentPanel.buttonSettings[key] || ctx.isSubForm) {
                        ctx.buttons[key] = null;
                    }
                });
            });
        }
        return this.renderTemplate('wizardNav', ctx);
    };
    Wizard.prototype.prepareHeaderSettings = function (ctx, headerType) {
        var _a;
        var shouldHideBreadcrumbs = ((_a = this.currentPanel) === null || _a === void 0 ? void 0 : _a.breadcrumb) === 'none' ||
            lodash_1.default.get(this.form, 'settings.wizardBreadcrumbsType', '') === 'none';
        if (shouldHideBreadcrumbs || ctx.isSubForm) {
            return null;
        }
        return this.renderTemplate(headerType, ctx);
    };
    Wizard.prototype.render = function () {
        var _this = this;
        var ctx = this.renderContext;
        if (this.component.key) {
            ctx.panels.map(function (panel) {
                if (panel.key === _this.component.key) {
                    _this.currentPanel = panel;
                    ctx.wizardPageTooltip = _this.getFormattedTooltip(panel.tooltip);
                }
            });
        }
        var wizardNav = this.prepareNavigationSettings(ctx);
        var wizardHeaderType = "wizardHeader".concat(lodash_1.default.get(this.form, 'settings.wizardHeaderType', ''));
        var wizardHeaderLocation = lodash_1.default.get(this.form, 'settings.wizardHeaderLocation', 'left');
        var wizardHeader = this.prepareHeaderSettings(ctx, wizardHeaderType);
        return this.renderTemplate('wizard', __assign(__assign({}, ctx), { className: _super.prototype.getClassName.call(this), wizardHeader: wizardHeader, wizardHeaderType: wizardHeaderType, wizardHeaderLocation: wizardHeaderLocation, wizardNav: wizardNav, components: this.renderComponents(__spreadArray(__spreadArray(__spreadArray([], this.prefixComps, true), this.currentPage.components, true), this.suffixComps, true)) }), this.builderMode ? 'builder' : 'form');
    };
    Wizard.prototype.redrawNavigation = function () {
        var _a;
        if (this.element) {
            var navElement = this.element.querySelector("#".concat(this.wizardKey, "-nav"));
            if (navElement) {
                this.detachNav();
                navElement.outerHTML = this.renderTemplate('wizardNav', this.renderContext);
                navElement = this.element.querySelector("#".concat(this.wizardKey, "-nav"));
                this.loadRefs(navElement, (_a = {},
                    _a["".concat(this.wizardKey, "-cancel")] = 'single',
                    _a["".concat(this.wizardKey, "-previous")] = 'single',
                    _a["".concat(this.wizardKey, "-next")] = 'single',
                    _a["".concat(this.wizardKey, "-submit")] = 'single',
                    _a));
                this.attachNav();
            }
        }
    };
    Wizard.prototype.redrawHeader = function () {
        var _a;
        if (this.element) {
            var headerElement = this.element.querySelector("#".concat(this.wizardKey, "-header"));
            if (headerElement) {
                this.detachHeader();
                headerElement.outerHTML = this.renderTemplate("wizardHeader".concat(lodash_1.default.get(this.form, 'settings.wizardHeaderType', '')), this.renderContext);
                headerElement = this.element.querySelector("#".concat(this.wizardKey, "-header"));
                this.loadRefs(headerElement, (_a = {},
                    _a["".concat(this.wizardKey, "-link")] = 'multiple',
                    _a["".concat(this.wizardKey, "-tooltip")] = 'multiple',
                    _a));
                this.attachHeader();
            }
        }
    };
    Wizard.prototype.attach = function (element) {
        var _a;
        var _this = this;
        var _b;
        this.setElement(element);
        this.loadRefs(element, (_a = {},
            _a[this.wizardKey] = 'single',
            _a["".concat(this.wizardKey, "-header")] = 'single',
            _a["".concat(this.wizardKey, "-cancel")] = 'single',
            _a["".concat(this.wizardKey, "-previous")] = 'single',
            _a["".concat(this.wizardKey, "-next")] = 'single',
            _a["".concat(this.wizardKey, "-submit")] = 'single',
            _a["".concat(this.wizardKey, "-link")] = 'multiple',
            _a["".concat(this.wizardKey, "-tooltip")] = 'multiple',
            _a));
        if ((this.options.readOnly || this.editMode) && !this.enabledIndex) {
            this.enabledIndex = ((_b = this.pages) === null || _b === void 0 ? void 0 : _b.length) - 1;
        }
        this.hook('attachWebform', element, this);
        var promises = this.attachComponents(this.refs[this.wizardKey], __spreadArray(__spreadArray(__spreadArray([], this.prefixComps, true), this.currentPage.components, true), this.suffixComps, true));
        this.attachNav();
        this.attachHeader();
        return promises.then(function () {
            _this.emit('render', { component: _this.currentPage, page: _this.page });
            if (_this.component.scrollToTop) {
                _this.scrollPageToTop();
            }
        });
    };
    Wizard.prototype.scrollPageToTop = function () {
        var _a;
        var pageTop = (_a = this.refs["".concat(this.wizardKey, "-header")]) !== null && _a !== void 0 ? _a : this.refs[this.wizardKey];
        if (!pageTop) {
            return;
        }
        if ('scrollIntoView' in pageTop) {
            pageTop.scrollIntoView(true);
        }
        else {
            this.scrollIntoView(pageTop);
        }
    };
    Wizard.prototype.isBreadcrumbClickable = function () {
        var _this = this;
        var currentPage = null;
        this.pages.map(function (page) {
            if (lodash_1.default.isEqual(_this.currentPage.component, page.component)) {
                currentPage = page;
            }
        });
        return this.isClickableDefined ? this.options.breadcrumbSettings.clickable : lodash_1.default.get(currentPage, 'component.breadcrumbClickable', true);
    };
    Wizard.prototype.isAllowPrevious = function () {
        var _this = this;
        var currentPage = null;
        this.pages.map(function (page) {
            if (lodash_1.default.isEqual(_this.currentPage.component, page.component)) {
                currentPage = page;
            }
        });
        return lodash_1.default.get(currentPage.component, 'allowPrevious', this.options.allowPrevious);
    };
    Wizard.prototype.handleNaviageteOnEnter = function (event) {
        if (event.keyCode === 13) {
            var clickEvent = new CustomEvent('click');
            var buttonElement = this.refs["".concat(this.wizardKey, "-").concat(this.buttons.next.name)];
            if (buttonElement) {
                buttonElement.dispatchEvent(clickEvent);
            }
        }
    };
    Wizard.prototype.handleSaveOnEnter = function (event) {
        if (event.keyCode === 13) {
            var clickEvent = new CustomEvent('click');
            var buttonElement = this.refs["".concat(this.wizardKey, "-").concat(this.buttons.submit.name)];
            if (buttonElement) {
                buttonElement.dispatchEvent(clickEvent);
            }
        }
    };
    Wizard.prototype.attachNav = function () {
        var _this = this;
        if (this.component.navigateOnEnter) {
            this.addEventListener(document, 'keyup', this.handleNaviageteOnEnter.bind(this));
        }
        if (this.component.saveOnEnter) {
            this.addEventListener(document, 'keyup', this.handleSaveOnEnter.bind(this));
        }
        lodash_1.default.each(this.buttons, function (button) {
            var buttonElement = _this.refs["".concat(_this.wizardKey, "-").concat(button.name)];
            _this.addEventListener(buttonElement, 'click', function (event) {
                event.preventDefault();
                // Disable the button until done.
                buttonElement.setAttribute('disabled', 'disabled');
                _this.setLoading(buttonElement, true);
                // Call the button method, then re-enable the button.
                _this[button.method]().then(function () {
                    buttonElement.removeAttribute('disabled');
                    _this.setLoading(buttonElement, false);
                }).catch(function () {
                    buttonElement.removeAttribute('disabled');
                    _this.setLoading(buttonElement, false);
                });
            });
        });
    };
    Wizard.prototype.emitWizardPageSelected = function (index) {
        this.emit('wizardPageSelected', this.pages[index], index);
    };
    Wizard.prototype.attachHeader = function () {
        var _this = this;
        var _a;
        var isAllowPrevious = this.isAllowPrevious();
        this.attachTooltips(this.refs["".concat(this.wizardKey, "-tooltip")], this.currentPanel.tooltip);
        if (this.isBreadcrumbClickable() || isAllowPrevious) {
            (_a = this.refs["".concat(this.wizardKey, "-link")]) === null || _a === void 0 ? void 0 : _a.forEach(function (link, index) {
                if (!isAllowPrevious || index <= _this.enabledIndex) {
                    _this.addEventListener(link, 'click', function (event) {
                        _this.emit('wizardNavigationClicked', _this.pages[index]);
                        event.preventDefault();
                        return _this.setPage(index).then(function () {
                            _this.emitWizardPageSelected(index);
                        });
                    });
                }
            });
        }
    };
    Wizard.prototype.detachNav = function () {
        var _this = this;
        if (this.component.navigateOnEnter) {
            this.removeEventListener(document, 'keyup', this.handleNaviageteOnEnter.bind(this));
        }
        if (this.component.saveOnEnter) {
            this.removeEventListener(document, 'keyup', this.handleSaveOnEnter.bind(this));
        }
        lodash_1.default.each(this.buttons, function (button) {
            _this.removeEventListener(_this.refs["".concat(_this.wizardKey, "-").concat(button.name)], 'click');
        });
    };
    Wizard.prototype.detachHeader = function () {
        var _this = this;
        if (this.refs["".concat(this.wizardKey, "-link")]) {
            this.refs["".concat(this.wizardKey, "-link")].forEach(function (link) {
                _this.removeEventListener(link, 'click');
            });
        }
    };
    Wizard.prototype.transformPages = function () {
        var _this = this;
        var allComponents = [];
        var components = this.getSortedComponents(this);
        var defferedComponents = [];
        this.allPages = [];
        // Get all components including all nested components and line up in the correct order
        var getAllComponents = function (nestedComp, compsArr, pushAllowed) {
            if (pushAllowed === void 0) { pushAllowed = true; }
            var nestedPages = [];
            var dataArrayComponents = ['datagrid', 'editgrid', 'dynamicWizard'];
            var currentComponents = (nestedComp === null || nestedComp === void 0 ? void 0 : nestedComp.subForm) ? _this.getSortedComponents(nestedComp.subForm) : (nestedComp === null || nestedComp === void 0 ? void 0 : nestedComp.components) || [];
            var visibleComponents = currentComponents.filter(function (comp) { return comp._visible; });
            var filteredComponents = visibleComponents.filter(function (comp) { return !dataArrayComponents.includes(comp.component.type) && (comp.type !== 'form' || comp.isNestedWizard); });
            var additionalComponents = currentComponents.filter(function (comp) { var _a; return ((_a = comp.subForm) === null || _a === void 0 ? void 0 : _a._form.display) !== 'wizard'; });
            var hasNested = false;
            (0, utils_1.eachComponent)(filteredComponents, function (comp) {
                if (comp && comp.component) {
                    if (comp.component.type === 'panel' && (comp === null || comp === void 0 ? void 0 : comp.parent.wizard) && !getAllComponents(comp, compsArr, false)) {
                        if (pushAllowed) {
                            _this.setRootPanelId(comp);
                            nestedPages.push(comp);
                        }
                        hasNested = true;
                    }
                    if (comp.isNestedWizard && comp.subForm) {
                        var hasNestedForm = getAllComponents(comp, nestedPages, pushAllowed);
                        if (!hasNested) {
                            hasNested = hasNestedForm;
                        }
                    }
                }
            }, true);
            if (nestedComp.component.type === 'panel') {
                if (!hasNested && pushAllowed) {
                    _this.setRootPanelId(nestedComp);
                    compsArr.push(nestedComp);
                }
                if (hasNested && additionalComponents.length) {
                    var newComp = lodash_1.default.clone(nestedComp);
                    newComp.components = additionalComponents;
                    _this.setRootPanelId(newComp);
                    defferedComponents.push(newComp);
                }
            }
            if (pushAllowed) {
                compsArr.push.apply(compsArr, __spreadArray(__spreadArray([], defferedComponents, false), nestedPages, false));
                defferedComponents = [];
            }
            return hasNested;
        };
        components.forEach(function (component) {
            if (component.visible) {
                getAllComponents(component, allComponents);
            }
        }, []);
        // recalculate pages only for root wizards, including the situation when the wizard is in a wrapper
        if (this.localRoot && this.id === this.localRoot.id) {
            allComponents.forEach(function (comp, index) {
                comp.eachComponent(function (component) {
                    component.page = index;
                });
            });
        }
        this.allPages = allComponents;
    };
    Wizard.prototype.getSortedComponents = function (_a) {
        var components = _a.components, originalComponents = _a.originalComponents;
        var currentComponents = [];
        var currentPages = [];
        if (components && components.length) {
            components.map(function (page) {
                if (page.component.type === 'panel') {
                    currentPages[page.component.key || page.component.title] = page;
                }
            });
        }
        originalComponents === null || originalComponents === void 0 ? void 0 : originalComponents.forEach(function (item) {
            if (!item.key) {
                item.key = item.title;
            }
            if (currentPages[item.key]) {
                currentComponents.push(currentPages[item.key]);
            }
        });
        return currentComponents;
    };
    Wizard.prototype.findRootPanel = function (component) {
        var _a;
        return ((_a = component.parent) === null || _a === void 0 ? void 0 : _a.parent) ? this.findRootPanel(component.parent) : component;
    };
    Wizard.prototype.setRootPanelId = function (component) {
        var _a;
        if (component.rootPanelId && component.rootPanelId !== component.id) {
            return;
        }
        var parent = ((_a = component.parent) === null || _a === void 0 ? void 0 : _a.parent) ? this.findRootPanel(component.parent) : component;
        component.rootPanelId = parent.id;
    };
    Wizard.prototype.establishPages = function (data) {
        var _this = this;
        if (data === void 0) { data = this.data; }
        this.pages = [];
        this.prefixComps = [];
        this.suffixComps = [];
        var visible = [];
        var currentPages = {};
        var pageOptions = __assign(__assign({}, (lodash_1.default.clone(this.options))), (this.parent ? { root: this } : {}));
        if (this.components && this.components.length) {
            this.components.forEach(function (page) {
                if (page.component.type === 'panel') {
                    currentPages[page.component.key || page.component.title] = page;
                }
            });
        }
        if (this.originalComponents) {
            this.originalComponents.forEach(function (item) {
                if (item.type === 'panel') {
                    if (!item.key) {
                        item.key = item.title;
                    }
                    var page = currentPages[item.key];
                    var forceShow = _this.shouldForceShow(item);
                    var forceHide = _this.shouldForceHide(item);
                    var isVisible = !page
                        ? (0, utils_1.checkCondition)(item, data, data, _this.component, _this) && !item.hidden
                        : page.visible;
                    if (forceShow) {
                        isVisible = true;
                    }
                    else if (forceHide) {
                        isVisible = false;
                    }
                    if (isVisible) {
                        visible.push(item);
                        if (page) {
                            _this.pages.push(page);
                        }
                    }
                    if (!page && isVisible) {
                        page = _this.createComponent(item, pageOptions);
                        page.visible = isVisible;
                        _this.pages.push(page);
                        page.eachComponent(function (component) {
                            component.page = (_this.pages.length - 1);
                        });
                    }
                }
                else if (item.type !== 'button') {
                    if (!_this.pages.length) {
                        _this.prefixComps.push(_this.createComponent(item, pageOptions));
                    }
                    else {
                        _this.suffixComps.push(_this.createComponent(item, pageOptions));
                    }
                }
            });
        }
        if (this.pages.length) {
            this.emit('pagesChanged');
        }
        this.transformPages();
        if (this.allPages && this.allPages.length) {
            this.updatePages();
        }
        return visible;
    };
    Wizard.prototype.updatePages = function () {
        this.pages = this.allPages;
    };
    Wizard.prototype.addComponents = function () {
        this.establishPages();
    };
    Wizard.prototype.setPage = function (num) {
        var _this = this;
        if (num === this.page) {
            return Promise.resolve();
        }
        if (num >= 0 && num < this.pages.length) {
            this.page = num;
            this.pageFieldLogic(num);
            this.getNextPage();
            var parentNum_1 = num;
            if (this.hasExtraPages) {
                var pageFromPages = this.pages[num];
                var pageFromComponents = this.components[num];
                if (!pageFromComponents || (pageFromPages === null || pageFromPages === void 0 ? void 0 : pageFromPages.id) !== pageFromComponents.id) {
                    parentNum_1 = this.components.findIndex(function (comp) {
                        var _a, _b;
                        return comp.id === ((_b = (_a = _this.pages) === null || _a === void 0 ? void 0 : _a[parentNum_1]) === null || _b === void 0 ? void 0 : _b.rootPanelId);
                    });
                }
            }
            if (!this._seenPages.includes(parentNum_1)) {
                this._seenPages = this._seenPages.concat(parentNum_1);
            }
            this.redraw().then(function () {
                _this.checkData(_this.submission.data);
            });
            return Promise.resolve();
        }
        else if (!this.pages.length) {
            this.redraw();
            return Promise.resolve();
        }
        return Promise.reject('Page not found');
    };
    Wizard.prototype.pageFieldLogic = function (page) {
        var _a;
        if ((_a = this.pages) === null || _a === void 0 ? void 0 : _a[page]) {
            // Handle field logic on pages.
            this.component = this.pages[page].component;
            this.originalComponent = (0, utils_1.fastCloneDeep)(this.component);
            this.fieldLogic(this.data);
            // If disabled changed, be sure to distribute the setting.
            this.disabled = this.shouldDisabled;
        }
    };
    Object.defineProperty(Wizard.prototype, "currentPage", {
        get: function () {
            return (this.pages && (this.pages.length >= this.page)) ? this.pages[this.page] : { components: [] };
        },
        enumerable: false,
        configurable: true
    });
    Wizard.prototype.getNextPage = function () {
        var _a;
        if ((_a = this.pages) === null || _a === void 0 ? void 0 : _a[this.page]) {
            var data = this.submission.data;
            var form = this.pages[this.page].component;
            // Check conditional nextPage
            if (form) {
                var page = this.pages.length > (this.page + 1) && !this.showAllErrors ? this.page + 1 : -1;
                if (form.nextPage) {
                    var next = this.evaluate(form.nextPage, {
                        next: page,
                        data: data,
                        page: page,
                        form: form
                    }, 'next');
                    if (next === null) {
                        this.currentNextPage = null;
                        return null;
                    }
                    var pageNum = parseInt(next, 10);
                    if (!isNaN(parseInt(pageNum, 10)) && isFinite(pageNum)) {
                        this.currentNextPage = pageNum;
                        return pageNum;
                    }
                    this.currentNextPage = this.getPageIndexByKey(next);
                    return this.currentNextPage;
                }
                this.currentNextPage = page;
                return page;
            }
            this.currentNextPage = null;
        }
        return null;
    };
    Wizard.prototype.getPreviousPage = function () {
        return this.page - 1;
    };
    Wizard.prototype.beforeSubmit = function () {
        var pages = this.getPages();
        return Promise.all(pages.map(function (page) {
            page.options.beforeSubmit = true;
            return page.beforeSubmit();
        }));
    };
    Wizard.prototype.beforePage = function (next) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.hook(next ? 'beforeNext' : 'beforePrev', _this.currentPage, _this.submission, function (err) {
                if (err) {
                    _this.showErrors(err, true);
                    reject(err);
                }
                var form = _this.currentPage;
                if (form) {
                    form.beforePage(next).then(resolve).catch(reject);
                }
                else {
                    resolve();
                }
            });
        });
    };
    Wizard.prototype.emitNextPage = function () {
        this.emit('nextPage', { page: this.page, submission: this.submission });
    };
    Wizard.prototype.nextPage = function () {
        var _this = this;
        // Read-only forms should not worry about validation before going to next page, nor should they submit.
        if (this.options.readOnly) {
            return this.beforePage(true).then(function () {
                return _this.setPage(_this.getNextPage()).then(function () {
                    _this.emitNextPage();
                });
            });
        }
        // Validate the form, before go to the next page
        if (this.checkValidity(this.localData, true, this.localData, true)) {
            this.checkData(this.submission.data);
            return this.beforePage(true).then(function () {
                return _this.setPage(_this.getNextPage()).then(function () {
                    if (!(_this.options.readOnly || _this.editMode) && _this.enabledIndex < _this.page) {
                        _this.enabledIndex = _this.page;
                        _this.redraw();
                    }
                    _this.emitNextPage();
                });
            });
        }
        else {
            this.currentPage.components.forEach(function (comp) { return comp.setPristine(false); });
            this.scrollIntoView(this.element);
            return Promise.reject(this.showErrors([], true));
        }
    };
    Wizard.prototype.emitPrevPage = function () {
        this.emit('prevPage', { page: this.page, submission: this.submission });
    };
    Wizard.prototype.prevPage = function () {
        var _this = this;
        return this.beforePage().then(function () {
            return _this.setPage(_this.getPreviousPage()).then(function () {
                _this.emitPrevPage();
            });
        });
    };
    Wizard.prototype.cancel = function (noconfirm) {
        var _this = this;
        if (this.options.readOnly) {
            return Promise.resolve();
        }
        if (_super.prototype.cancel.call(this, noconfirm)) {
            this.setPristine(true);
            return this.setPage(0).then(function () {
                if (_this.enabledIndex) {
                    _this.enabledIndex = 0;
                }
                _this.onChange();
                _this.redraw();
                return _this.page;
            });
        }
        return Promise.resolve();
    };
    Wizard.prototype.getPageIndexByKey = function (key) {
        var pageIndex = this.page;
        this.pages.forEach(function (page, index) {
            if (page.component.key === key) {
                pageIndex = index;
                return false;
            }
        });
        return pageIndex;
    };
    Object.defineProperty(Wizard.prototype, "schema", {
        get: function () {
            return this.wizard;
        },
        enumerable: false,
        configurable: true
    });
    Wizard.prototype.setComponentSchema = function () {
        var _this = this;
        var pageKeys = {};
        this.originalComponents = [];
        this.component.components.map(function (item) {
            if (item.type === 'panel') {
                item.key = (0, utils_1.uniqueKey)(pageKeys, (item.key || 'panel'));
                pageKeys[item.key] = true;
                if (_this.wizard.full) {
                    _this.options.show = _this.options.show || {};
                    _this.options.show[item.key] = true;
                }
                else if (_this.wizard.hasOwnProperty('full') && !lodash_1.default.isEqual(_this.originalOptions.show, _this.options.show)) {
                    _this.options.show = __assign({}, (_this.originalOptions.show || {}));
                }
            }
            _this.originalComponents.push(lodash_1.default.clone(item));
        });
        if (!Object.keys(pageKeys).length) {
            var newPage = {
                type: 'panel',
                title: 'Page 1',
                label: 'Page 1',
                key: 'page1',
                components: this.component.components
            };
            this.component.components = [newPage];
            this.originalComponents.push(lodash_1.default.clone(newPage));
        }
    };
    Wizard.prototype.setForm = function (form, flags) {
        if (!form) {
            return;
        }
        return _super.prototype.setForm.call(this, form, flags);
    };
    Wizard.prototype.onSetForm = function (clonedForm, initialForm) {
        this.component.components = (this._parentPath ? initialForm.components : clonedForm.components) || [];
        this.setComponentSchema();
    };
    Wizard.prototype.setEditMode = function (submission) {
        if (!this.editMode && submission._id && !this.options.readOnly) {
            this.editMode = true;
            this.redraw();
        }
    };
    Wizard.prototype.setValue = function (submission, flags, ignoreEstablishment) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        var changed = this.getPages({ all: true }).reduce(function (changed, page) {
            return _this.setNestedValue(page, submission.data, flags, changed) || changed;
        }, false);
        this.mergeData(this.data, submission.data);
        if (changed) {
            this.pageFieldLogic(this.page);
        }
        submission.data = this.data;
        this._submission = submission;
        if (!ignoreEstablishment) {
            this.establishPages(submission.data);
        }
        this.setEditMode(submission);
        return changed;
    };
    Wizard.prototype.isClickable = function (page, index) {
        return this.page !== index && (0, utils_1.firstNonNil)([
            lodash_1.default.get(page, 'breadcrumbClickable'),
            this.options.breadcrumbSettings.clickable
        ]);
    };
    Wizard.prototype.hasButton = function (name, nextPage) {
        if (nextPage === void 0) { nextPage = this.getNextPage(); }
        // get page options with global options as default values
        var _a = lodash_1.default.get(this.currentPage, 'component.buttonSettings', {}), _b = _a.previous, previous = _b === void 0 ? this.options.buttonSettings.showPrevious : _b, _c = _a.cancel, cancel = _c === void 0 ? this.options.buttonSettings.showCancel : _c, _d = _a.submit, submit = _d === void 0 ? this.options.buttonSettings.showSubmit : _d, _e = _a.next, next = _e === void 0 ? this.options.buttonSettings.showNext : _e;
        switch (name) {
            case 'previous':
                return previous && (this.getPreviousPage() > -1);
            case 'next':
                return next && (nextPage !== null) && (nextPage !== -1);
            case 'cancel':
                return cancel && !this.options.readOnly;
            case 'submit':
                return submit && !this.options.readOnly && ((nextPage === null) || (this.page === (this.pages.length - 1)));
            default:
                return true;
        }
    };
    Wizard.prototype.pageId = function (page) {
        if (page.key) {
            // Some panels have the same key....
            return "".concat(page.key, "-").concat(page.title);
        }
        else if (page.components &&
            page.components.length > 0) {
            return this.pageId(page.components[0]);
        }
        else {
            return page.title;
        }
    };
    Wizard.prototype.onChange = function (flags, changed, modified, changes) {
        var _this = this;
        var _a, _b;
        _super.prototype.onChange.call(this, flags, changed, modified, changes);
        if (this.alert && !this.submitted) {
            this.checkValidity(this.localData, false, this.localData, true);
            this.showErrors([], true, true);
        }
        // If the pages change, need to redraw the header.
        var currentPanels;
        var panels;
        var currentNextPage = this.currentNextPage;
        if (this.hasExtraPages) {
            currentPanels = this.pages.map(function (page) { return page.component.key; });
            this.establishPages();
            panels = this.pages.map(function (page) { return page.component.key; });
        }
        else {
            currentPanels = this.currentPanels || this.pages.map(function (page) { return page.component.key; });
            panels = this.establishPages().map(function (panel) { return panel.key; });
            this.currentPanels = panels;
            if (((_a = this.currentPanel) === null || _a === void 0 ? void 0 : _a.key) && ((_b = this.currentPanels) === null || _b === void 0 ? void 0 : _b.length)) {
                this.setPage(this.currentPanels.findIndex(function (panel) { return panel === _this.currentPanel.key; }));
            }
        }
        if (!lodash_1.default.isEqual(panels, currentPanels) || (flags && flags.fromSubmission)) {
            this.redrawHeader();
        }
        // If the next page changes, then make sure to redraw navigation.
        if (currentNextPage !== this.getNextPage()) {
            this.redrawNavigation();
        }
        if (this.options.readOnly && (this.prefixComps.length || this.suffixComps.length)) {
            this.redraw();
        }
    };
    Wizard.prototype.redraw = function () {
        var _a, _b;
        if ((_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.component) === null || _b === void 0 ? void 0 : _b.modalEdit) {
            return this.parent.redraw();
        }
        return _super.prototype.redraw.call(this);
    };
    Wizard.prototype.checkValidity = function (data, dirty, row, currentPageOnly) {
        if (!this.checkCondition(row, data)) {
            this.setCustomValidity('');
            return true;
        }
        var components = !currentPageOnly || this.isLastPage()
            ? this.getComponents()
            : this.currentPage.components;
        return components.reduce(function (check, comp) { return comp.checkValidity(data, dirty, row) && check; }, true);
    };
    Object.defineProperty(Wizard.prototype, "errors", {
        get: function () {
            if (!this.isLastPage()) {
                return this.currentPage.errors;
            }
            return _super.prototype.errors;
        },
        enumerable: false,
        configurable: true
    });
    Wizard.prototype.focusOnComponent = function (key) {
        var _this = this;
        var pageIndex = 0;
        var page = this.pages.filter(function (page, index) {
            var hasComponent = false;
            page.getComponent(key, function (comp) {
                if (comp.path === key) {
                    pageIndex = index;
                    hasComponent = true;
                }
            });
            return hasComponent;
        })[0];
        if (page && page !== this.currentPage) {
            return this.setPage(pageIndex).then(function () {
                _this.checkValidity(_this.submission.data, true, _this.submission.data);
                _this.showErrors();
                _super.prototype.focusOnComponent.call(_this, key);
            });
        }
        return _super.prototype.focusOnComponent.call(this, key);
    };
    return Wizard;
}(Webform_1.default));
exports.default = Wizard;
Wizard.setBaseUrl = Formio_1.Formio.setBaseUrl;
Wizard.setApiUrl = Formio_1.Formio.setApiUrl;
Wizard.setAppUrl = Formio_1.Formio.setAppUrl;
//# sourceMappingURL=Wizard.js.map