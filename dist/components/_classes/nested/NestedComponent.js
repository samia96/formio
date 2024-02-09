'use strict';
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
var Field_1 = __importDefault(require("../field/Field"));
var Components_1 = __importDefault(require("../../Components"));
var utils_1 = require("../../../utils/utils");
var NestedComponent = /** @class */ (function (_super) {
    __extends(NestedComponent, _super);
    function NestedComponent(component, options, data) {
        var _this = _super.call(this, component, options, data) || this;
        _this.type = 'components';
        _this._collapsed = !!_this.component.collapsed;
        return _this;
    }
    NestedComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Field_1.default.schema.apply(Field_1.default, __spreadArray([{
                tree: false,
                lazyLoad: false,
            }], extend, false));
    };
    Object.defineProperty(NestedComponent.prototype, "defaultSchema", {
        get: function () {
            return NestedComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NestedComponent.prototype, "schema", {
        get: function () {
            var schema = _super.prototype.schema;
            var components = lodash_1.default.uniqBy(this.getComponents(), 'component.key');
            schema.components = lodash_1.default.map(components, 'schema');
            return schema;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NestedComponent.prototype, "collapsed", {
        get: function () {
            return this._collapsed;
        },
        set: function (value) {
            this._collapsed = value;
            this.collapse(value);
        },
        enumerable: false,
        configurable: true
    });
    NestedComponent.prototype.collapse = function (value) {
        var promise = this.redraw();
        if (!value) {
            this.checkValidity(this.data, !this.pristine, null, this.pristine);
        }
        return promise;
    };
    Object.defineProperty(NestedComponent.prototype, "visible", {
        get: function () {
            return _super.prototype.visible;
        },
        set: function (value) {
            // DO NOT CALL super here.  There is an issue where clearOnHide was getting triggered with
            // subcomponents because the "parentVisible" flag was set to false when it should really be
            // set to true.
            var visibilityChanged = this._visible !== value;
            this._visible = value;
            var isVisible = this.visible;
            var forceShow = this.shouldForceShow();
            var forceHide = this.shouldForceHide();
            this.components.forEach(function (component) {
                // Set the parent visibility first since we may have nested components within nested components
                // and they need to be able to determine their visibility based on the parent visibility.
                component.parentVisible = isVisible;
                var conditionallyVisible = component.conditionallyVisible();
                if (forceShow || conditionallyVisible) {
                    component.visible = true;
                }
                else if (forceHide || !isVisible || !conditionallyVisible) {
                    component.visible = false;
                }
                // If hiding a nested component, clear all errors below.
                if (!component.visible) {
                    component.error = '';
                }
            });
            if (visibilityChanged) {
                this.clearOnHide();
                this.redraw();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NestedComponent.prototype, "parentVisible", {
        get: function () {
            return _super.prototype.parentVisible;
        },
        set: function (value) {
            var _this = this;
            _super.prototype.parentVisible = value;
            this.components.forEach(function (component) { return component.parentVisible = _this.visible; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NestedComponent.prototype, "disabled", {
        get: function () {
            return _super.prototype.disabled;
        },
        set: function (disabled) {
            _super.prototype.disabled = disabled;
            this.components.forEach(function (component) { return component.parentDisabled = disabled; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NestedComponent.prototype, "parentDisabled", {
        get: function () {
            return _super.prototype.parentDisabled;
        },
        set: function (value) {
            var _this = this;
            _super.prototype.parentDisabled = value;
            this.components.forEach(function (component) {
                component.parentDisabled = _this.disabled;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NestedComponent.prototype, "ready", {
        get: function () {
            return Promise.all(this.getComponents().map(function (component) { return component.ready; }));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NestedComponent.prototype, "currentForm", {
        get: function () {
            return _super.prototype.currentForm;
        },
        set: function (instance) {
            _super.prototype.currentForm = instance;
            this.getComponents().forEach(function (component) {
                component.currentForm = instance;
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NestedComponent.prototype, "rowIndex", {
        get: function () {
            return this._rowIndex;
        },
        set: function (value) {
            this._rowIndex = value;
            this.eachComponent(function (component) {
                component.rowIndex = value;
            });
        },
        enumerable: false,
        configurable: true
    });
    NestedComponent.prototype.componentContext = function () {
        return this._data;
    };
    Object.defineProperty(NestedComponent.prototype, "data", {
        get: function () {
            return this._data;
        },
        set: function (value) {
            var _this = this;
            this._data = value;
            this.eachComponent(function (component) {
                component.data = _this.componentContext(component);
            });
        },
        enumerable: false,
        configurable: true
    });
    NestedComponent.prototype.getComponents = function () {
        return this.components || [];
    };
    /**
     * Perform a deep iteration over every component, including those
     * within other container based components.
     *
     * @param {function} fn - Called for every component.
     */
    NestedComponent.prototype.everyComponent = function (fn, options) {
        var components = this.getComponents();
        lodash_1.default.each(components, function (component, index) {
            if (fn(component, components, index) === false) {
                return false;
            }
            if (typeof component.everyComponent === 'function') {
                if (component.everyComponent(fn, options) === false) {
                    return false;
                }
            }
        });
    };
    NestedComponent.prototype.hasComponent = function (component) {
        var result = false;
        this.everyComponent(function (comp) {
            if (comp === component) {
                result = true;
                return false;
            }
        });
        return result;
    };
    NestedComponent.prototype.flattenComponents = function () {
        var result = {};
        this.everyComponent(function (component) {
            result[component.component.flattenAs || component.key] = component;
        });
        return result;
    };
    /**
     * Perform an iteration over each component within this container component.
     *
     * @param {function} fn - Called for each component
     */
    NestedComponent.prototype.eachComponent = function (fn) {
        lodash_1.default.each(this.getComponents(), function (component, index) {
            if (fn(component, index) === false) {
                return false;
            }
        });
    };
    /**
     * Returns a component provided a key. This performs a deep search within the
     * component tree.
     *
     * @param {string} key - The key of the component to retrieve.
     * @param {function} fn - Called with the component once found.
     * @return {Object} - The component that is located.
     */
    NestedComponent.prototype.getComponent = function (path, fn, originalPath) {
        originalPath = originalPath || (0, utils_1.getStringFromComponentPath)(path);
        path = (0, utils_1.getArrayFromComponentPath)(path);
        var pathStr = originalPath;
        var newPath = lodash_1.default.clone(path);
        var key = newPath.shift();
        var remainingPath = newPath;
        var comp = null;
        var possibleComp = null;
        if (lodash_1.default.isNumber(key)) {
            key = remainingPath.shift();
        }
        if (!lodash_1.default.isString(key)) {
            return comp;
        }
        this.everyComponent(function (component, components) {
            var matchPath = component.hasInput && component.path ? pathStr.includes(component.path) : true;
            if (component.component.key === key) {
                possibleComp = component;
                if (matchPath) {
                    comp = component;
                    if (remainingPath.length > 0 && 'getComponent' in component) {
                        comp = component.getComponent(remainingPath, fn, originalPath);
                    }
                    else if (fn) {
                        fn(component, components);
                    }
                    return false;
                }
            }
        });
        if (!comp) {
            comp = possibleComp;
        }
        return comp;
    };
    /**
     * Return a component provided the Id of the component.
     *
     * @param {string} id - The Id of the component.
     * @param {function} fn - Called with the component once it is retrieved.
     * @return {Object} - The component retrieved.
     */
    NestedComponent.prototype.getComponentById = function (id, fn) {
        var comp = null;
        this.everyComponent(function (component, components) {
            if (component.id === id) {
                comp = component;
                if (fn) {
                    fn(component, components);
                }
                return false;
            }
        });
        return comp;
    };
    /**
     * Return a path of component's value.
     *
     * @param {Object} component - The component instance.
     * @return {string} - The component's value path.
     */
    NestedComponent.prototype.calculateComponentPath = function (component) {
        var path = '';
        if (component.component.key) {
            var thisPath = this;
            while (thisPath && !thisPath.allowData && thisPath.parent) {
                thisPath = thisPath.parent;
            }
            var rowIndex = component.row ? "[".concat(Number.parseInt(component.row), "]") : '';
            path = thisPath.path ? "".concat(thisPath.path).concat(rowIndex, ".") : '';
            path += component._parentPath && component.component.shouldIncludeSubFormPath ? component._parentPath : '';
            path += component.component.key;
            return path;
        }
    };
    /**
     * Create a new component and add it to the components array.
     *
     * @param component
     * @param data
     */
    NestedComponent.prototype.createComponent = function (component, options, data, before, replacedComp) {
        if (!component) {
            return;
        }
        options = options || this.options;
        data = data || this.data;
        options.parent = this;
        options.parentVisible = this.visible;
        options.root = (options === null || options === void 0 ? void 0 : options.root) || this.root || this;
        options.localRoot = this.localRoot;
        options.skipInit = true;
        if (!(options.display === 'pdf' && this.builderMode)) {
            component.id = (0, utils_1.getRandomComponentId)();
        }
        if (!this.isInputComponent && this.component.shouldIncludeSubFormPath) {
            component.shouldIncludeSubFormPath = true;
        }
        var comp = Components_1.default.create(component, options, data, true);
        var path = this.calculateComponentPath(comp);
        if (path) {
            comp.path = path;
        }
        comp.init();
        if (component.internal) {
            return comp;
        }
        if (before) {
            var index = lodash_1.default.findIndex(this.components, { id: before.id });
            if (index !== -1) {
                this.components.splice(index, 0, comp);
            }
            else {
                this.components.push(comp);
            }
        }
        else if (replacedComp) {
            var index = lodash_1.default.findIndex(this.components, { id: replacedComp.id });
            if (index !== -1) {
                this.components[index] = comp;
            }
            else {
                this.components.push(comp);
            }
        }
        else {
            this.components.push(comp);
        }
        return comp;
    };
    NestedComponent.prototype.getContainer = function () {
        return this.element;
    };
    Object.defineProperty(NestedComponent.prototype, "componentComponents", {
        get: function () {
            return this.component.components || [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NestedComponent.prototype, "nestedKey", {
        get: function () {
            return "nested-".concat(this.key);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NestedComponent.prototype, "templateName", {
        get: function () {
            return 'container';
        },
        enumerable: false,
        configurable: true
    });
    NestedComponent.prototype.init = function () {
        this.components = this.components || [];
        this.addComponents();
        return _super.prototype.init.call(this);
    };
    /**
     *
     * @param element
     * @param data
     */
    NestedComponent.prototype.addComponents = function (data, options) {
        var _this = this;
        data = data || this.data;
        this.components = this.components || [];
        options = options || this.options;
        if (options.components) {
            this.components = options.components;
        }
        else {
            var components = this.hook('addComponents', this.componentComponents, this) || [];
            components.forEach(function (component) { return _this.addComponent(component, data); });
        }
    };
    /**
     * Add a new component to the components array.
     *
     * @param {Object} component - The component JSON schema to add.
     * @param {Object} data - The submission data object to house the data for this component.
     * @param {HTMLElement} before - A DOM element to insert this element before.
     * @return {Component} - The created component instance.
     */
    NestedComponent.prototype.addComponent = function (component, data, before, noAdd) {
        data = data || this.data;
        this.components = this.components || [];
        if (this.options.parentPath) {
            component.shouldIncludeSubFormPath = true;
        }
        component = this.hook('addComponent', component, data, before, noAdd);
        var comp = this.createComponent(component, this.options, data, before ? before : null);
        if (noAdd) {
            return comp;
        }
        return comp;
    };
    NestedComponent.prototype.beforeFocus = function () {
        if (this.parent && 'beforeFocus' in this.parent) {
            this.parent.beforeFocus(this);
        }
    };
    NestedComponent.prototype.render = function (children) {
        // If already rendering, don't re-render.
        return _super.prototype.render.call(this, children || this.renderTemplate(this.templateName, {
            children: !this.visible ? '' : this.renderComponents(),
            nestedKey: this.nestedKey,
            collapsed: this.options.pdf ? false : this.collapsed,
        }));
    };
    NestedComponent.prototype.renderComponents = function (components) {
        components = components || this.getComponents();
        var children = components.map(function (component) { return component.render(); });
        return this.renderTemplate('components', {
            children: children,
            components: components,
        });
    };
    NestedComponent.prototype.attach = function (element) {
        var _a;
        var _this = this;
        var superPromise = _super.prototype.attach.call(this, element);
        this.loadRefs(element, (_a = {
                header: 'single',
                collapsed: this.collapsed
            },
            _a[this.nestedKey] = 'single',
            _a));
        var childPromise = Promise.resolve();
        if (this.refs[this.nestedKey]) {
            childPromise = this.attachComponents(this.refs[this.nestedKey]);
        }
        if (!this.visible) {
            this.attachComponentsLogic();
        }
        if (this.component.collapsible && this.refs.header) {
            this.addEventListener(this.refs.header, 'click', function () {
                _this.collapsed = !_this.collapsed;
            });
            this.addEventListener(this.refs.header, 'keydown', function (e) {
                if (e.keyCode === 13 || e.keyCode === 32) {
                    e.preventDefault();
                    _this.collapsed = !_this.collapsed;
                }
            });
        }
        return Promise.all([
            superPromise,
            childPromise,
        ]);
    };
    NestedComponent.prototype.attachComponentsLogic = function (components) {
        components = components || this.components;
        lodash_1.default.each(components, function (comp) {
            comp.attachLogic();
            if (lodash_1.default.isFunction(comp.attachComponentsLogic)) {
                comp.attachComponentsLogic();
            }
        });
    };
    NestedComponent.prototype.attachComponents = function (element, components, container) {
        components = components || this.components;
        container = container || this.component.components;
        element = this.hook('attachComponents', element, components, container, this);
        if (!element) {
            // Return a non-resolving promise.
            return (new Promise(function () { }));
        }
        var index = 0;
        var promises = [];
        Array.prototype.slice.call(element.children).forEach(function (child) {
            if (!child.getAttribute('data-noattach') && components[index]) {
                promises.push(components[index].attach(child));
                index++;
            }
        });
        return Promise.all(promises);
    };
    /**
     * Remove a component from the components array.
     *
     * @param {Component} component - The component to remove from the components.
     * @param {Array<Component>} components - An array of components to remove this component from.
     */
    NestedComponent.prototype.removeComponent = function (component, components, all) {
        if (all === void 0) { all = false; }
        components = components || this.components;
        component.destroy(all);
        lodash_1.default.remove(components, { id: component.id });
    };
    /**
     * Removes a component provided the API key of that component.
     *
     * @param {string} key - The API key of the component to remove.
     * @param {function} fn - Called once the component is removed.
     * @return {null}
     */
    NestedComponent.prototype.removeComponentByKey = function (key, fn) {
        var _this = this;
        var comp = this.getComponent(key, function (component, components) {
            _this.removeComponent(component, components);
            if (fn) {
                fn(component, components);
            }
        });
        if (!comp) {
            if (fn) {
                fn(null);
            }
            return null;
        }
    };
    /**
     * Removes a component provided the Id of the component.
     *
     * @param {string} id - The Id of the component to remove.
     * @param {function} fn - Called when the component is removed.
     * @return {null}
     */
    NestedComponent.prototype.removeComponentById = function (id, fn) {
        var _this = this;
        var comp = this.getComponentById(id, function (component, components) {
            _this.removeComponent(component, components);
            if (fn) {
                fn(component, components);
            }
        });
        if (!comp) {
            if (fn) {
                fn(null);
            }
            return null;
        }
    };
    NestedComponent.prototype.updateValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        return this.components.reduce(function (changed, comp) {
            return comp.updateValue(null, flags) || changed;
        }, _super.prototype.updateValue.call(this, value, flags));
    };
    NestedComponent.prototype.shouldSkipValidation = function (data, dirty, row) {
        // Nested components with no input should not be validated.
        if (!this.component.input) {
            return true;
        }
        else {
            return _super.prototype.shouldSkipValidation.call(this, data, dirty, row);
        }
    };
    NestedComponent.prototype.checkData = function (data, flags, row, components) {
        if (this.builderMode) {
            return true;
        }
        data = data || this.rootValue;
        flags = flags || {};
        row = row || this.data;
        components = components && lodash_1.default.isArray(components) ? components : this.getComponents();
        var isValid = components.reduce(function (valid, comp) {
            return comp.checkData(data, flags, row) && valid;
        }, _super.prototype.checkData.call(this, data, flags, row));
        this.checkModal(isValid, this.isDirty);
        return isValid;
    };
    NestedComponent.prototype.checkConditions = function (data, flags, row) {
        // check conditions of parent component first, because it may influence on visibility of it's children
        var check = _super.prototype.checkConditions.call(this, data, flags, row);
        //row data of parent component not always corresponds to row of nested components, use comp.data as row data for children instead
        this.getComponents().forEach(function (comp) { return comp.checkConditions(data, flags, comp.data); });
        return check;
    };
    NestedComponent.prototype.clearOnHide = function (show) {
        _super.prototype.clearOnHide.call(this, show);
        if (this.component.clearOnHide) {
            if (this.allowData && !this.hasValue() && !(this.options.server && !this.visible)) {
                this.dataValue = this.defaultValue;
            }
            if (this.hasValue()) {
                this.restoreComponentsContext();
            }
        }
        this.getComponents().forEach(function (component) { return component.clearOnHide(show); });
    };
    NestedComponent.prototype.restoreComponentsContext = function () {
        var _this = this;
        this.getComponents().forEach(function (component) { return component.data = _this.dataValue; });
    };
    /**
     * Allow components to hook into the next page trigger to perform their own logic.
     *
     * @return {*}
     */
    NestedComponent.prototype.beforePage = function (next) {
        return Promise.all(this.getComponents().map(function (comp) { return comp.beforePage(next); }));
    };
    /**
     * Allow components to hook into the submission to provide their own async data.
     *
     * @return {*}
     */
    NestedComponent.prototype.beforeSubmit = function () {
        return Promise.all(this.getComponents().map(function (comp) { return comp.beforeSubmit(); }));
    };
    NestedComponent.prototype.calculateValue = function (data, flags, row) {
        // Do not iterate into children and calculateValues if this nested component is conditionally hidden.
        if (!this.conditionallyVisible()) {
            return false;
        }
        return this.getComponents().reduce(function (changed, comp) { return comp.calculateValue(data, flags, row) || changed; }, _super.prototype.calculateValue.call(this, data, flags, row));
    };
    NestedComponent.prototype.isLastPage = function () {
        return this.pages.length - 1 === this.page;
    };
    NestedComponent.prototype.isValid = function (data, dirty) {
        return this.getComponents().reduce(function (valid, comp) { return comp.isValid(data, dirty) && valid; }, _super.prototype.isValid.call(this, data, dirty));
    };
    NestedComponent.prototype.checkChildComponentsValidity = function (data, dirty, row, silentCheck, isParentValid) {
        return this.getComponents().reduce(function (check, comp) { return comp.checkValidity(data, dirty, row, silentCheck) && check; }, isParentValid);
    };
    NestedComponent.prototype.checkValidity = function (data, dirty, row, silentCheck) {
        if (!this.checkCondition(row, data)) {
            this.setCustomValidity('');
            return true;
        }
        var isValid = this.checkChildComponentsValidity(data, dirty, row, silentCheck, _super.prototype.checkValidity.call(this, data, dirty, row, silentCheck));
        this.checkModal(isValid, dirty);
        return isValid;
    };
    NestedComponent.prototype.checkAsyncValidity = function (data, dirty, row, silentCheck) {
        var _this = this;
        return this.ready.then(function () {
            var promises = [_super.prototype.checkAsyncValidity.call(_this, data, dirty, row, silentCheck)];
            _this.eachComponent(function (component) { return promises.push(component.checkAsyncValidity(data, dirty, row, silentCheck)); });
            return Promise.all(promises).then(function (results) { return results.reduce(function (valid, result) { return (valid && result); }, true); });
        });
    };
    NestedComponent.prototype.setPristine = function (pristine) {
        _super.prototype.setPristine.call(this, pristine);
        this.getComponents().forEach(function (comp) { return comp.setPristine(pristine); });
    };
    Object.defineProperty(NestedComponent.prototype, "isPristine", {
        get: function () {
            return this.pristine && this.getComponents().every(function (c) { return c.isPristine; });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NestedComponent.prototype, "isDirty", {
        get: function () {
            return this.dirty && this.getComponents().every(function (c) { return c.isDirty; });
        },
        enumerable: false,
        configurable: true
    });
    NestedComponent.prototype.detach = function () {
        this.components.forEach(function (component) {
            component.detach();
        });
        _super.prototype.detach.call(this);
    };
    NestedComponent.prototype.clear = function () {
        this.components.forEach(function (component) {
            component.clear();
        });
        _super.prototype.clear.call(this);
    };
    NestedComponent.prototype.destroy = function (all) {
        if (all === void 0) { all = false; }
        this.destroyComponents(all);
        _super.prototype.destroy.call(this, all);
    };
    NestedComponent.prototype.destroyComponents = function (all) {
        var _this = this;
        if (all === void 0) { all = false; }
        var components = this.getComponents().slice();
        components.forEach(function (comp) { return _this.removeComponent(comp, _this.components, all); });
        this.components = [];
    };
    Object.defineProperty(NestedComponent.prototype, "errors", {
        get: function () {
            var thisErrors = this.error ? [this.error] : [];
            return this.getComponents()
                .reduce(function (errors, comp) { return errors.concat(comp.errors || []); }, thisErrors)
                .filter(function (err) { return err.level !== 'hidden'; });
        },
        enumerable: false,
        configurable: true
    });
    NestedComponent.prototype.getValue = function () {
        return this.data;
    };
    NestedComponent.prototype.resetValue = function () {
        _super.prototype.resetValue.call(this);
        this.getComponents().forEach(function (comp) { return comp.resetValue(); });
        this.setPristine(true);
    };
    Object.defineProperty(NestedComponent.prototype, "dataReady", {
        get: function () {
            return Promise.all(this.getComponents().map(function (component) { return component.dataReady; }));
        },
        enumerable: false,
        configurable: true
    });
    NestedComponent.prototype.setNestedValue = function (component, value, flags) {
        if (flags === void 0) { flags = {}; }
        component._data = this.componentContext(component);
        if (component.type === 'button') {
            return false;
        }
        if (component.type === 'components') {
            if (component.tree && component.hasValue(value)) {
                return component.setValue(lodash_1.default.get(value, component.key), flags);
            }
            return component.setValue(value, flags);
        }
        else if (value && component.hasValue(value)) {
            return component.setValue(lodash_1.default.get(value, component.key), flags);
        }
        else if ((!this.rootPristine || component.visible) && component.shouldAddDefaultValue) {
            flags.noValidate = !flags.dirty;
            flags.resetValue = true;
            return component.setValue(component.defaultValue, flags);
        }
    };
    NestedComponent.prototype.setValue = function (value, flags) {
        var _this = this;
        if (flags === void 0) { flags = {}; }
        if (!value) {
            return false;
        }
        if (value.submitAsDraft && !value.submit) {
            flags.noValidate = true;
        }
        return this.getComponents().reduce(function (changed, component) {
            return _this.setNestedValue(component, value, flags, changed) || changed;
        }, false);
    };
    Object.defineProperty(NestedComponent.prototype, "lazyLoad", {
        get: function () {
            var _a;
            return (_a = this.component.lazyLoad) !== null && _a !== void 0 ? _a : false;
        },
        enumerable: false,
        configurable: true
    });
    return NestedComponent;
}(Field_1.default));
exports.default = NestedComponent;
//# sourceMappingURL=NestedComponent.js.map