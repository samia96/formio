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
var Webform_1 = __importDefault(require("./Webform"));
var Component_1 = __importDefault(require("./components/_classes/component/Component"));
var tippy_js_1 = __importDefault(require("tippy.js"));
var Components_1 = __importDefault(require("./components/Components"));
var Formio_1 = require("./Formio");
var utils_1 = require("./utils/utils");
var formUtils_1 = require("./utils/formUtils");
var builder_1 = __importDefault(require("./utils/builder"));
var lodash_1 = __importDefault(require("lodash"));
var dom_autoscroller_1 = __importDefault(require("dom-autoscroller"));
var Templates_1 = __importDefault(require("./templates/Templates"));
require("./components/builder");
// We need this here because dragula pulls in CustomEvent class that requires global to exist.
if (typeof window !== 'undefined' && typeof window.global === 'undefined') {
    window.global = window;
}
var dragula_min_js_1 = __importDefault(require("dragula/dist/dragula.min.js"));
var WebformBuilder = /** @class */ (function (_super) {
    __extends(WebformBuilder, _super);
    // eslint-disable-next-line max-statements
    function WebformBuilder() {
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
        options.display = options.display || 'form';
        _this = _super.call(this, null, options) || this;
        _this.moveHandler = function (e) {
            if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13) {
                e.stopPropagation();
                e.preventDefault();
            }
            if (e.keyCode === 38) {
                _this.updateComponentPlacement(true);
            }
            if (e.keyCode === 40) {
                _this.updateComponentPlacement(false);
            }
            if (e.keyCode === 13) {
                _this.stopMoving(_this.selectedComponent);
            }
        };
        _this.setElement(element);
        _this.dragulaLib = dragula_min_js_1.default;
        _this.builderHeight = 0;
        _this.schemas = {};
        _this.repeatablePaths = [];
        _this.sideBarScroll = lodash_1.default.get(_this.options, 'sideBarScroll', true);
        _this.sideBarScrollOffset = lodash_1.default.get(_this.options, 'sideBarScrollOffset', 0);
        _this.dragDropEnabled = true;
        // Setup the builder options.
        _this.builder = lodash_1.default.defaultsDeep({}, _this.options.builder, _this.defaultGroups);
        // Turn off if explicitely said to do so...
        lodash_1.default.each(_this.defaultGroups, function (config, key) {
            if (config === false) {
                _this.builder[key] = false;
            }
        });
        // Add the groups.////
        _this.groups = {};
        _this.groupOrder = [];
        var _loop_1 = function (group) {
            if (this_1.builder[group]) {
                this_1.builder[group].key = group;
                this_1.groups[group] = this_1.builder[group];
                this_1.groups[group].components = this_1.groups[group].components || {};
                this_1.groups[group].componentOrder = this_1.groups[group].componentOrder || [];
                this_1.groups[group].subgroups = Object.keys(this_1.groups[group].groups || {}).map(function (groupKey) {
                    _this.groups[group].groups[groupKey].componentOrder = Object.keys(_this.groups[group].groups[groupKey].components).map(function (key) { return key; });
                    return _this.groups[group].groups[groupKey];
                });
                this_1.groupOrder.push(this_1.groups[group]);
            }
        };
        var this_1 = this;
        for (var group in _this.builder) {
            _loop_1(group);
        }
        _this.groupOrder = _this.groupOrder
            .filter(function (group) { return group && !group.ignore; })
            .sort(function (a, b) { return a.weight - b.weight; })
            .map(function (group) { return group.key; });
        for (var type in Components_1.default.components) {
            var component = Components_1.default.components[type];
            if (component.builderInfo && component.builderInfo.schema) {
                _this.schemas[type] = component.builderInfo.schema;
                component.type = type;
                var builderInfo = component.builderInfo;
                builderInfo.key = component.type;
                _this.addBuilderComponentInfo(builderInfo);
            }
        }
        // Filter out any extra components.
        // Add the components in each group.
        for (var group in _this.groups) {
            var info = _this.groups[group];
            for (var key in info.components) {
                var compKey = group === 'resource' ? "component-".concat(key) : key;
                var comp = info.components[compKey];
                if (comp === true &&
                    Components_1.default.components[key] &&
                    Components_1.default.components[key].builderInfo) {
                    comp = Components_1.default.components[key].builderInfo;
                }
                if (comp && comp.schema) {
                    _this.schemas[key] = comp.schema;
                    info.components[compKey] = comp;
                    info.components[compKey].key = key;
                }
                else {
                    // Do not include this component in the components array.
                    delete info.components[compKey];
                }
            }
            // Order the components.
            _this.orderComponents(info);
        }
        _this.options.hooks = _this.options.hooks || {};
        _this.options.hooks.renderComponent = function (html, _a) {
            var _b;
            var component = _a.component, self = _a.self;
            if (self.type === 'form' && !self.key) {
                var template = _this.hook('renderComponentFormTemplate', html.replace('formio-component-form', ''));
                // The main webform shouldn't have this class as it adds extra styles.
                return template;
            }
            if (_this.options.disabled && _this.options.disabled.includes(self.key) || self.parent.noDragDrop) {
                return html;
            }
            return _this.renderTemplate('builderComponent', {
                html: html,
                disableBuilderActions: (_b = self === null || self === void 0 ? void 0 : self.component) === null || _b === void 0 ? void 0 : _b.disableBuilderActions,
                childComponent: component,
            });
        };
        _this.options.hooks.renderComponents = function (html, _a) {
            var components = _a.components, self = _a.self;
            // if Datagrid and already has a component, don't make it droppable.
            if (self.type === 'datagrid' && components.length > 0 || self.noDragDrop) {
                return html;
            }
            if (!components ||
                (!components.length && !components.nodrop) ||
                (self.type === 'form' && components.length <= 1 && (components.length === 0 || components[0].type === 'button'))) {
                html = _this.renderTemplate('builderPlaceholder', {
                    position: 0
                }) + html;
            }
            return _this.renderTemplate('builderComponents', {
                key: self.key,
                type: self.type,
                html: html,
            });
        };
        _this.options.hooks.renderInput = function (html, _a) {
            var self = _a.self;
            if (self.type === 'hidden') {
                return html + self.name;
            }
            return html;
        };
        _this.options.hooks.renderLoading = function (html, _a) {
            var self = _a.self;
            if (self.type === 'form' && self.key) {
                return self.name;
            }
            return html;
        };
        _this.options.hooks.attachComponents = function (element, components, container, component) {
            // Don't attach if no element was found or component doesn't participate in drag'n'drop.
            if (!element) {
                return;
            }
            if (component.noDragDrop) {
                return element;
            }
            // Attach container and component to element for later reference.
            var containerElement = element.querySelector("[ref=\"".concat(component.component.key, "-container\"]")) || element;
            containerElement.formioContainer = container;
            containerElement.formioComponent = component;
            // Add container to draggable list.
            if (_this.dragula && _this.allowDrop(element)) {
                _this.dragula.containers.push(containerElement);
            }
            // If this is an existing datagrid element, don't make it draggable.
            if ((component.type === 'datagrid' || component.type === 'datamap') && components.length > 0) {
                return element;
            }
            // Since we added a wrapper, need to return the original element so that we can find the components inside it.
            return element.children[0];
        };
        _this.options.hooks.attachDatagrid = function (element, component) {
            var _a;
            component.loadRefs(element, (_a = {},
                _a["".concat(component.key, "-container")] = 'single',
                _a));
            var dataGridContainer = component.refs["".concat(component.key, "-container")];
            if (dataGridContainer) {
                component.attachComponents(dataGridContainer.parentNode, [], component.component.components);
            }
            // Need to set up horizontal rearrangement of fields.
        };
        _this.options.hooks.attachComponent = _this.attachComponent.bind(_this);
        // Load resources tagged as 'builder'
        var query = {
            params: {
                type: 'resource',
                limit: 1000000,
                select: '_id,title,name,components'
            }
        };
        if (_this.options && _this.options.resourceTag) {
            query.params.tags = [_this.options.resourceTag];
        }
        else if (!_this.options || !_this.options.hasOwnProperty('resourceTag')) {
            query.params.tags = ['builder'];
        }
        var formio = new Formio_1.Formio(Formio_1.Formio.projectUrl);
        var isResourcesDisabled = _this.options.builder && _this.options.builder.resource === false;
        formio.loadProject().then(function (project) {
            if (project && (lodash_1.default.get(project, 'settings.addConfigToForms', false) || lodash_1.default.get(project, 'addConfigToForms', false))) {
                var config = project.config || {};
                _this.options.formConfig = config;
                var pathToFormConfig = 'webform._form.config';
                var webformConfig = lodash_1.default.get(_this, pathToFormConfig);
                if (_this.webform && !webformConfig) {
                    lodash_1.default.set(_this, pathToFormConfig, config);
                }
            }
        }).catch(function (err) {
            console.warn("Could not load project settings: ".concat(err.message || err));
        });
        if (!formio.noProject && !isResourcesDisabled && formio.formsUrl) {
            var resourceOptions_1 = _this.options.builder && _this.options.builder.resource;
            formio.loadForms(query)
                .then(function (resources) {
                if (resources.length) {
                    _this.builder.resource = {
                        title: resourceOptions_1 ? resourceOptions_1.title : 'Existing Resource Fields',
                        key: 'resource',
                        weight: resourceOptions_1 ? resourceOptions_1.weight : 50,
                        subgroups: [],
                        components: [],
                        componentOrder: []
                    };
                    _this.groups.resource = {
                        title: resourceOptions_1 ? resourceOptions_1.title : 'Existing Resource Fields',
                        key: 'resource',
                        weight: resourceOptions_1 ? resourceOptions_1.weight : 50,
                        subgroups: [],
                        components: [],
                        componentOrder: []
                    };
                    if (!_this.groupOrder.includes('resource')) {
                        _this.groupOrder.push('resource');
                    }
                    _this.addExistingResourceFields(resources);
                }
            });
        }
        // Notify components if they need to modify their render.
        _this.options.attachMode = 'builder';
        _this.webform = _this.webform || _this.createForm(_this.options);
        _this.pathComponentsMapping = {};
        _this.arrayDataComponentPaths = [];
        _this.nestedDataComponents = [];
        _this.arrayDataComponents = [];
        return _this;
    }
    WebformBuilder.prototype.allowDrop = function () {
        return true;
    };
    WebformBuilder.prototype.addExistingResourceFields = function (resources) {
        var _this = this;
        lodash_1.default.each(resources, function (resource, index) {
            var resourceKey = "resource-".concat(resource.name);
            var subgroup = {
                key: resourceKey,
                title: resource.title,
                components: [],
                componentOrder: [],
                default: index === 0,
            };
            (0, formUtils_1.eachComponent)(resource.components, function (component) {
                if (component.type === 'button')
                    return;
                if (_this.options &&
                    _this.options.resourceFilter &&
                    (!component.tags || component.tags.indexOf(_this.options.resourceFilter) === -1))
                    return;
                var componentName = component.label;
                if (!componentName && component.key) {
                    componentName = lodash_1.default.upperFirst(component.key);
                }
                subgroup.componentOrder.push("component-".concat(component.key));
                subgroup.components["component-".concat(component.key)] = lodash_1.default.merge((0, utils_1.fastCloneDeep)(Components_1.default.components[component.type]
                    ? Components_1.default.components[component.type].builderInfo
                    : Components_1.default.components['unknown'].builderInfo), {
                    key: component.key,
                    title: componentName,
                    group: 'resource',
                    subgroup: resourceKey,
                }, {
                    schema: __assign(__assign({}, component), { label: component.label, key: component.key, lockKey: true, source: (!_this.options.noSource ? resource._id : undefined), isNew: true })
                });
            }, true);
            _this.groups.resource.subgroups.push(subgroup);
        });
        this.triggerRedraw();
    };
    WebformBuilder.prototype.attachTooltip = function (component, title) {
        return (0, tippy_js_1.default)(component, {
            allowHTML: true,
            trigger: 'mouseenter focus',
            placement: 'top',
            delay: [200, 0],
            zIndex: 10000,
            content: title
        });
    };
    WebformBuilder.prototype.attachComponent = function (element, component) {
        var _this = this;
        if (component instanceof WebformBuilder) {
            return;
        }
        // Add component to element for later reference.
        element.formioComponent = component;
        component.loadRefs(element, {
            removeComponent: 'single',
            editComponent: 'single',
            moveComponent: 'single',
            copyComponent: 'single',
            pasteComponent: 'single',
            editJson: 'single'
        });
        if (component.refs.copyComponent) {
            this.attachTooltip(component.refs.copyComponent, this.t('Copy'));
            component.addEventListener(component.refs.copyComponent, 'click', function () {
                return _this.copyComponent(component);
            });
        }
        if (component.refs.pasteComponent) {
            var pasteToolTip_1 = this.attachTooltip(component.refs.pasteComponent, this.t('Paste below'));
            component.addEventListener(component.refs.pasteComponent, 'click', function () {
                pasteToolTip_1.hide();
                _this.pasteComponent(component);
            });
        }
        if (component.refs.moveComponent) {
            this.attachTooltip(component.refs.moveComponent, this.t('Move'));
            if (this.keyboardActionsEnabled) {
                component.addEventListener(component.refs.moveComponent, 'click', function () {
                    _this.moveComponent(component);
                });
            }
        }
        var parent = this.getParentElement(element);
        if (component.refs.editComponent) {
            this.attachTooltip(component.refs.editComponent, this.t('Edit'));
            component.addEventListener(component.refs.editComponent, 'click', function () {
                return _this.editComponent(component.schema, parent, false, false, component.component, { inDataGrid: component.isInDataGrid });
            });
        }
        if (component.refs.editJson) {
            this.attachTooltip(component.refs.editJson, this.t('Edit JSON'));
            component.addEventListener(component.refs.editJson, 'click', function () {
                return _this.editComponent(component.schema, parent, false, true, component.component);
            });
        }
        if (component.refs.removeComponent) {
            this.attachTooltip(component.refs.removeComponent, this.t('Remove'));
            component.addEventListener(component.refs.removeComponent, 'click', function () {
                return _this.removeComponent(component.schema, parent, component.component, component);
            });
        }
        return element;
    };
    WebformBuilder.prototype.createForm = function (options) {
        this.webform = new Webform_1.default(this.element, options);
        if (this.element) {
            this.loadRefs(this.element, {
                form: 'single'
            });
            if (this.refs.form) {
                this.webform.element = this.refs.form;
            }
        }
        return this.webform;
    };
    Object.defineProperty(WebformBuilder.prototype, "ready", {
        /**
         * Called when everything is ready.
         *
         * @returns {Promise} - Wait for webform to be ready.
         */
        get: function () {
            return this.webform.ready;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebformBuilder.prototype, "defaultGroups", {
        get: function () {
            return {
            // basic: {
            //   title: 'Basic',
            //   weight: 0,
            //   default: true,
            // },
            // advanced: {
            //   title: 'Advanced',
            //   weight: 10
            // },
            // layout: {
            //   title: 'Layout',
            //   weight: 20
            // },
            // data: {
            //   title: 'Data',
            //   weight: 30
            // },
            // premium: {
            //   title: 'Premium',
            //   weight: 40
            // }
            };
        },
        enumerable: false,
        configurable: true
    });
    WebformBuilder.prototype.redraw = function () {
        return Webform_1.default.prototype.redraw.call(this);
    };
    Object.defineProperty(WebformBuilder.prototype, "form", {
        get: function () {
            return this.webform.form;
        },
        set: function (value) {
            this.setForm(value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebformBuilder.prototype, "schema", {
        get: function () {
            return this.webform.schema;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WebformBuilder.prototype, "container", {
        get: function () {
            return this.webform.form.components;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * When a component sets its api key, we need to check if it is unique within its namespace. Find the namespace root
     * so we can calculate this correctly.
     * @param component
     */
    WebformBuilder.prototype.findNamespaceRoot = function (component) {
        var path = (0, utils_1.getArrayFromComponentPath)(component.path);
        // First get the component with nested parents.
        var comp = this.webform.getComponent(path);
        comp = Array.isArray(comp) ? comp[0] : comp;
        var namespaceKey = this.recurseNamespace(comp);
        // If there is no key, it is the root form.
        if (!namespaceKey || this.form.key === namespaceKey) {
            return this.form.components;
        }
        var componentSchema = component.component;
        // If the current component is the namespace, we don't need to find it again.
        if (namespaceKey === component.key) {
            return __spreadArray(__spreadArray([], componentSchema.components, true), [componentSchema], false);
        }
        // Get the namespace component so we have the original object.
        var namespaceComponent = (0, formUtils_1.getComponent)(this.form.components, namespaceKey, true);
        return namespaceComponent ? namespaceComponent.components : comp.components;
    };
    WebformBuilder.prototype.recurseNamespace = function (component) {
        // If there is no parent, we are at the root level.
        if (!component) {
            return null;
        }
        // Some components are their own namespace.
        if (['address', 'container', 'datagrid', 'editgrid', 'dynamicWizard', 'tree'].includes(component.type) || component.tree || component.arrayTree) {
            return component.key;
        }
        // Anything else, keep going up.
        return this.recurseNamespace(component.parent);
    };
    WebformBuilder.prototype.render = function () {
        var _this = this;
        return this.renderTemplate('builder', {
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
                    keyboardActionsEnabled: _this.keyboardActionsEnabled,
                }); }),
            }),
            form: this.webform.render(),
        });
    };
    WebformBuilder.prototype.attach = function (element) {
        var _this = this;
        this.on('change', function (form) {
            _this.populateRecaptchaSettings(form);
        });
        return _super.prototype.attach.call(this, element).then(function () {
            _this.loadRefs(element, {
                form: 'single',
                sidebar: 'single',
                'sidebar-search': 'single',
                'sidebar-groups': 'single',
                'container': 'multiple',
                'sidebar-anchor': 'multiple',
                'sidebar-group': 'multiple',
                'sidebar-container': 'multiple',
                'sidebar-component': 'multiple',
            });
            if (_this.sideBarScroll && Templates_1.default.current.handleBuilderSidebarScroll) {
                Templates_1.default.current.handleBuilderSidebarScroll.call(_this, _this);
            }
            // Add the paste status in form
            if (typeof window !== 'undefined' && window.sessionStorage) {
                var data = window.sessionStorage.getItem('formio.clipboard');
                if (data) {
                    _this.addClass(_this.refs.form, 'builder-paste-mode');
                }
            }
            if (!(0, utils_1.bootstrapVersion)(_this.options)) {
                var getAttribute_1 = function (anchor, attribute) {
                    var elem = anchor.getAttribute("data-".concat(attribute));
                    if (!elem) {
                        elem = anchor.getAttribute("data-bs-".concat(attribute));
                    }
                    return elem;
                };
                var hideShow_1 = function (group, show) {
                    if (show) {
                        group.classList.add(['show']);
                        group.style.display = 'inherit';
                    }
                    else {
                        group.classList.remove(['show']);
                        group.style.display = 'none';
                    }
                };
                // Initialize
                _this.refs['sidebar-group'].forEach(function (group) {
                    hideShow_1(group, getAttribute_1(group, 'default') === 'true');
                });
                // Click event
                _this.refs['sidebar-anchor'].forEach(function (anchor, index) {
                    _this.addEventListener(anchor, 'click', function () {
                        var clickedParentId = getAttribute_1(anchor, 'parent').slice('#builder-sidebar-'.length);
                        var clickedId = getAttribute_1(anchor, 'target').slice('#group-'.length);
                        _this.refs['sidebar-group'].forEach(function (group, groupIndex) {
                            var openByDefault = getAttribute_1(group, 'default') === 'true';
                            var groupId = group.getAttribute('id').slice('group-'.length);
                            var groupParent = getAttribute_1(group, 'parent').slice('#builder-sidebar-'.length);
                            hideShow_1(group, ((openByDefault && groupParent === clickedId) || groupId === clickedParentId || groupIndex === index));
                        });
                    }, true);
                });
            }
            if (_this.keyboardActionsEnabled) {
                _this.refs['sidebar-component'].forEach(function (component) {
                    _this.addEventListener(component, 'keydown', function (event) {
                        if (event.keyCode === 13) {
                            _this.addNewComponent(component);
                        }
                    });
                });
            }
            _this.addEventListener(_this.refs['sidebar-search'], 'input', lodash_1.default.debounce(function (e) {
                var searchString = e.target.value;
                _this.searchFields(searchString);
            }, 300));
            if (_this.dragDropEnabled) {
                _this.initDragula();
            }
            var drake = _this.dragula;
            if (_this.refs.form) {
                (0, dom_autoscroller_1.default)([window], {
                    margin: 20,
                    maxSpeed: 6,
                    scrollWhenOutside: true,
                    autoScroll: function () {
                        return this.down && (drake === null || drake === void 0 ? void 0 : drake.dragging);
                    }
                });
                return _this.webform.attach(_this.refs.form);
            }
        });
    };
    WebformBuilder.prototype.searchFields = function (searchString) {
        var _this = this;
        if (searchString === void 0) { searchString = ''; }
        var searchValue = searchString.toLowerCase();
        var sidebar = this.refs['sidebar'];
        var sidebarGroups = this.refs['sidebar-groups'];
        if (!sidebar || !sidebarGroups) {
            return;
        }
        var filterGroupBy = function (group, searchValue) {
            if (searchValue === void 0) { searchValue = ''; }
            var result = lodash_1.default.toPlainObject(group);
            var _a = result.subgroups, subgroups = _a === void 0 ? [] : _a, components = result.components;
            var filteredComponents = [];
            for (var key in components) {
                var isMatchedToTitle = _this.t(components[key].title).toLowerCase().match(searchValue);
                var isMatchedToKey = components[key].key.toLowerCase().match(searchValue);
                if (isMatchedToTitle || isMatchedToKey) {
                    filteredComponents.push(components[key]);
                }
            }
            _this.orderComponents(result, filteredComponents);
            if (searchValue) {
                result.default = true;
            }
            if (result.componentOrder.length || subgroups.length) {
                return result;
            }
            return null;
        };
        var filterGroupOrder = function (groupOrder, searchValue) {
            var result = lodash_1.default.cloneDeep(groupOrder);
            return result.filter(function (key) { return filterGroupBy(_this.groups[key], searchValue); });
        };
        var filterSubgroups = function (groups, searchValue) {
            var result = lodash_1.default.clone(groups);
            return result
                .map(function (subgroup) { return filterGroupBy(subgroup, searchValue); })
                .filter(function (subgroup) { return !lodash_1.default.isNull(subgroup); });
        };
        var toTemplate = function (groupKey) {
            return {
                group: filterGroupBy(_this.groups[groupKey], searchValue),
                groupKey: groupKey,
                groupId: sidebar.id || sidebarGroups.id,
                subgroups: filterSubgroups(_this.groups[groupKey].subgroups, searchValue)
                    .map(function (group) { return _this.renderTemplate('builderSidebarGroup', {
                    group: group,
                    groupKey: group.key,
                    groupId: "group-container-".concat(groupKey),
                    subgroups: []
                }); }),
            };
        };
        sidebarGroups.innerHTML = filterGroupOrder(this.groupOrder, searchValue)
            .map(function (groupKey) { return _this.renderTemplate('builderSidebarGroup', toTemplate(groupKey)); })
            .join('');
        this.loadRefs(this.element, {
            'sidebar-groups': 'single',
            'sidebar-anchor': 'multiple',
            'sidebar-group': 'multiple',
            'sidebar-container': 'multiple',
        });
        this.updateDragAndDrop();
        if (searchValue === '') {
            this.triggerRedraw();
        }
    };
    WebformBuilder.prototype.orderComponents = function (groupInfo, foundComponents) {
        var components = foundComponents || groupInfo.components;
        var isResource = groupInfo.key.indexOf('resource-') === 0;
        if (components) {
            groupInfo.componentOrder = Object.keys(components)
                .map(function (key) { return components[key]; })
                .filter(function (component) { return component && !component.ignore && !component.ignoreForForm; })
                .sort(function (a, b) { return a.weight - b.weight; })
                .map(function (component) { return isResource ? "component-".concat(component.key) : component.key; });
        }
    };
    WebformBuilder.prototype.updateDragAndDrop = function () {
        if (this.dragDropEnabled) {
            this.initDragula();
        }
        if (this.refs.form) {
            return this.webform.attach(this.refs.form);
        }
    };
    WebformBuilder.prototype.initDragula = function () {
        var _this = this;
        var options = this.options;
        if (this.dragula) {
            this.dragula.destroy();
        }
        var containersArray = Array.prototype.slice.call(this.refs['sidebar-container']).filter(function (item) {
            return item.id !== 'group-container-resource';
        });
        if (!dragula_min_js_1.default) {
            return;
        }
        this.dragula = (0, dragula_min_js_1.default)(containersArray, {
            moves: function (el) {
                var moves = true;
                var list = Array.from(el.classList).filter(function (item) { return item.indexOf('formio-component-') === 0; });
                list.forEach(function (item) {
                    var key = item.slice('formio-component-'.length);
                    if (options.disabled && options.disabled.includes(key)) {
                        moves = false;
                    }
                });
                if (el.classList.contains('no-drag')) {
                    moves = false;
                }
                return moves;
            },
            copy: function (el) {
                return el.classList.contains('drag-copy');
            },
            accepts: function (el, target) {
                return !el.contains(target) && !target.classList.contains('no-drop');
            }
        }).on('drop', function (element, target, source, sibling) { return _this.onDrop(element, target, source, sibling); });
    };
    WebformBuilder.prototype.detach = function () {
        if (this.dragula) {
            this.dragula.destroy();
        }
        this.dragula = null;
        if (this.sideBarScroll && Templates_1.default.current.clearBuilderSidebarScroll) {
            Templates_1.default.current.clearBuilderSidebarScroll.call(this, this);
        }
        _super.prototype.detach.call(this);
    };
    WebformBuilder.prototype.getComponentInfo = function (key, group) {
        var info;
        // Need to check in first order as resource component key can be the same as from webform default components
        if (group && group.slice(0, group.indexOf('-')) === 'resource') {
            // This is an existing resource field.
            var resourceGroups = this.groups.resource.subgroups;
            var resourceGroup = lodash_1.default.find(resourceGroups, { key: group });
            if (resourceGroup && resourceGroup.components.hasOwnProperty("component-".concat(key))) {
                info = (0, utils_1.fastCloneDeep)(resourceGroup.components["component-".concat(key)].schema);
            }
        }
        // This is a new component
        else if (this.schemas.hasOwnProperty(key)) {
            info = (0, utils_1.fastCloneDeep)(this.schemas[key]);
        }
        else if (this.groups.hasOwnProperty(group)) {
            var groupComponents = this.groups[group].components;
            if (groupComponents.hasOwnProperty(key)) {
                info = (0, utils_1.fastCloneDeep)(groupComponents[key].schema);
            }
        }
        else if (group === 'searchFields') { //Search components go into this group
            var resourceGroups = this.groups.resource.subgroups;
            for (var ix = 0; ix < resourceGroups.length; ix++) {
                var resourceGroup = resourceGroups[ix];
                if (resourceGroup.components.hasOwnProperty("component-".concat(key))) {
                    info = (0, utils_1.fastCloneDeep)(resourceGroup.components["component-".concat(key)].schema);
                    break;
                }
            }
        }
        if (info) {
            //if this is a custom component that was already assigned a key, don't stomp on it
            if (!Components_1.default.components.hasOwnProperty(info.type) && info.key) {
                return info;
            }
            info.key = this.generateKey(info);
        }
        return info;
    };
    WebformBuilder.prototype.getComponentsPath = function (component, parent) {
        // Get path to the component in the parent component.
        var path = 'components';
        var columnIndex = 0;
        var tableRowIndex = 0;
        var tableColumnIndex = 0;
        var tabIndex = 0;
        switch (parent.type) {
            case 'table':
                tableRowIndex = lodash_1.default.findIndex(parent.rows, function (row) { return row.some(function (column) { return column.components.some(function (comp) { return comp.key === component.key; }); }); });
                tableColumnIndex = lodash_1.default.findIndex(parent.rows[tableRowIndex], (function (column) { return column.components.some(function (comp) { return comp.key === component.key; }); }));
                path = "rows[".concat(tableRowIndex, "][").concat(tableColumnIndex, "].components");
                break;
            case 'columns':
                columnIndex = lodash_1.default.findIndex(parent.columns, function (column) { return column.components.some(function (comp) { return comp.key === component.key; }); });
                path = "columns[".concat(columnIndex, "].components");
                break;
            case 'tabs':
                tabIndex = lodash_1.default.findIndex(parent.components, function (tab) { return tab.components.some(function (comp) { return comp.key === component.key; }); });
                path = "components[".concat(tabIndex, "].components");
                break;
        }
        return path;
    };
    /* eslint-disable max-statements */
    WebformBuilder.prototype.onDrop = function (element, target, source, sibling) {
        var _this = this;
        var _a;
        if (!target) {
            return;
        }
        // If you try to drop within itself.
        if (element.contains(target)) {
            return;
        }
        var key = element.getAttribute('data-key');
        var type = element.getAttribute('data-type');
        var group = element.getAttribute('data-group');
        var info, isNew, path, index;
        if (key && group) {
            // This is a new component.
            info = this.getComponentInfo(key, group);
            if (!info && type) {
                info = this.getComponentInfo(type, group);
            }
            isNew = true;
        }
        else if (source.formioContainer) {
            index = lodash_1.default.findIndex(source.formioContainer, { key: element.formioComponent.component.key });
            if (index !== -1) {
                // Grab and remove the component from the source container.
                info = source.formioContainer.splice(lodash_1.default.findIndex(source.formioContainer, { key: element.formioComponent.component.key }), 1);
                // Since splice returns an array of one object, we need to destructure it.
                info = info[0];
            }
        }
        // If we haven't found the component, stop.
        if (!info) {
            return;
        }
        // Show an error if siblings are disabled for a component and such a component already exists.
        var compKey = (group === 'resource') ? "component-".concat(key) : key;
        var draggableComponent = ((_a = this.groups[group]) === null || _a === void 0 ? void 0 : _a.components[compKey]) || {};
        if (draggableComponent.disableSiblings) {
            var isCompAlreadyExists_1 = false;
            (0, formUtils_1.eachComponent)(this.webform.components, function (component) {
                if (component.type === draggableComponent.schema.type) {
                    isCompAlreadyExists_1 = true;
                    return;
                }
            }, true);
            if (isCompAlreadyExists_1) {
                this.webform.redraw();
                this.webform.setAlert('danger', "You cannot add more than one ".concat(draggableComponent.key, " component to one page."));
                return;
            }
        }
        if (target !== source) {
            // Ensure the key remains unique in its new container.
            builder_1.default.uniquify(this.findNamespaceRoot(target.formioComponent), info);
        }
        var parent = target.formioComponent;
        // Insert in the new container.
        if (target.formioContainer) {
            if (sibling) {
                if (!sibling.getAttribute('data-noattach')) {
                    index = lodash_1.default.findIndex(target.formioContainer, { key: lodash_1.default.get(sibling, 'formioComponent.component.key') });
                    index = (index === -1) ? 0 : index;
                }
                else {
                    index = sibling.getAttribute('data-position');
                }
                if (index !== -1) {
                    target.formioContainer.splice(index, 0, info);
                }
            }
            else {
                target.formioContainer.push(info);
            }
            path = this.getComponentsPath(info, parent.component);
            index = lodash_1.default.findIndex(lodash_1.default.get(parent.schema, path), { key: info.key });
            if (index === -1) {
                index = 0;
            }
        }
        if (parent && parent.addChildComponent) {
            parent.addChildComponent(info, element, target, source, sibling);
        }
        var componentInDataGrid = parent.type === 'datagrid';
        if (isNew && !this.options.noNewEdit && !info.noNewEdit) {
            this.editComponent(info, target, isNew, null, null, { inDataGrid: componentInDataGrid });
        }
        // Only rebuild the parts needing to be rebuilt.
        var rebuild;
        if (target !== source) {
            if (source.formioContainer && source.contains(target)) {
                rebuild = source.formioComponent.rebuild();
            }
            else if (target.contains(source)) {
                rebuild = target.formioComponent.rebuild();
            }
            else {
                if (source.formioContainer) {
                    rebuild = source.formioComponent.rebuild();
                }
                rebuild = target.formioComponent.rebuild();
            }
        }
        else {
            // If they are the same, only rebuild one.
            rebuild = target.formioComponent.rebuild();
        }
        if (!rebuild) {
            rebuild = Promise.resolve();
        }
        return rebuild.then(function () {
            _this.emit('addComponent', info, parent, path, index, isNew && !_this.options.noNewEdit && !info.noNewEdit);
            if (!isNew || _this.options.noNewEdit || info.noNewEdit) {
                _this.emit('change', _this.form);
            }
        });
    };
    WebformBuilder.prototype.setForm = function (form) {
        var _this = this;
        var _a;
        if (!form.components) {
            form.components = [];
        }
        if (form && form.properties) {
            this.options.properties = form.properties;
        }
        this.keyboardActionsEnabled = lodash_1.default.get(this.options, 'keyboardBuilder', false) || ((_a = this.options.properties) === null || _a === void 0 ? void 0 : _a.keyboardBuilder);
        var isShowSubmitButton = !this.options.noDefaultSubmitButton
            && (!form.components.length || !form.components.find(function (comp) { return comp.key === 'submit'; }));
        // Ensure there is at least a submit button.
        if (isShowSubmitButton) {
            form.components.push({
                type: 'button',
                label: 'Submit',
                key: 'submit',
                size: 'md',
                block: false,
                action: 'submit',
                disableOnInvalid: true,
                theme: 'primary'
            });
        }
        if (this.webform) {
            var shouldRebuild_1 = !this.webform.form.components ||
                (form.components.length !== this.webform.form.components.length);
            return this.webform.setForm(form, { keepAsReference: true }).then(function () {
                if (_this.refs.form) {
                    _this.builderHeight = _this.refs.form.offsetHeight;
                }
                if (!shouldRebuild_1) {
                    return _this.form;
                }
                return _this.rebuild().then(function () { return _this.form; });
            });
        }
        return Promise.resolve(form);
    };
    WebformBuilder.prototype.populateRecaptchaSettings = function (form) {
        //populate isEnabled for recaptcha form settings
        var isRecaptchaEnabled = false;
        if (this.form.components) {
            (0, formUtils_1.eachComponent)(form.components, function (component) {
                if (isRecaptchaEnabled) {
                    return;
                }
                if (component.type === 'recaptcha') {
                    isRecaptchaEnabled = true;
                    return false;
                }
            });
            if (isRecaptchaEnabled) {
                lodash_1.default.set(form, 'settings.recaptcha.isEnabled', true);
            }
            else if (lodash_1.default.get(form, 'settings.recaptcha.isEnabled')) {
                lodash_1.default.set(form, 'settings.recaptcha.isEnabled', false);
            }
        }
    };
    WebformBuilder.prototype.removeComponent = function (component, parent, original, componentInstance) {
        var _this = this;
        if (!parent) {
            return;
        }
        var remove = true;
        var removingComponentsGroup = !component.skipRemoveConfirm &&
            ((Array.isArray(component.components) && component.components.length) ||
                (Array.isArray(component.rows) && component.rows.length) ||
                (Array.isArray(component.columns) && component.columns.length));
        if (this.options.alwaysConfirmComponentRemoval || removingComponentsGroup) {
            var message = removingComponentsGroup ? 'Removing this component will also remove all of its children. Are you sure you want to do this?'
                : 'Are you sure you want to remove this component?';
            remove = window.confirm(this.t(message));
        }
        if (!original) {
            original = parent.formioContainer.find(function (comp) { return comp.id === component.id; });
        }
        var index = parent.formioContainer ? parent.formioContainer.indexOf(original) : 0;
        if (remove && index !== -1) {
            var path_1 = this.getComponentsPath(component, parent.formioComponent.component);
            if (parent.formioContainer) {
                parent.formioContainer.splice(index, 1);
            }
            else if (parent.formioComponent && parent.formioComponent.removeChildComponent) {
                parent.formioComponent.removeChildComponent(component);
            }
            if (component.input && componentInstance && componentInstance.parent) {
                lodash_1.default.unset(componentInstance._data, componentInstance.key);
            }
            var rebuild = parent.formioComponent.rebuild() || Promise.resolve();
            rebuild.then(function () {
                _this.emit('removeComponent', component, parent.formioComponent.schema, path_1, index);
                _this.emit('change', _this.form);
            });
        }
        return remove;
    };
    WebformBuilder.prototype.replaceDoubleQuotes = function (data, fieldsToRemoveDoubleQuotes) {
        if (fieldsToRemoveDoubleQuotes === void 0) { fieldsToRemoveDoubleQuotes = []; }
        if (data) {
            fieldsToRemoveDoubleQuotes.forEach(function (key) {
                if (data[key]) {
                    data[key] = data[key].replace(/"/g, "'");
                }
            });
            return data;
        }
    };
    WebformBuilder.prototype.updateComponent = function (component, changed) {
        var _this = this;
        // Update the preview.
        if (this.preview) {
            this.preview.form = {
                components: [lodash_1.default.omit(__assign({}, component), [
                        'hidden',
                        'conditional',
                        'calculateValue',
                        'logic',
                        'autofocus',
                        'customConditional',
                    ])],
                config: this.options.formConfig || {}
            };
            var fieldsToRemoveDoubleQuotes_1 = ['label', 'tooltip'];
            this.preview.form.components.forEach(function (component) { return _this.replaceDoubleQuotes(component, fieldsToRemoveDoubleQuotes_1); });
            var previewElement = this.componentEdit.querySelector('[ref="preview"]');
            if (previewElement) {
                this.setContent(previewElement, this.preview.render());
                this.preview.attach(previewElement);
            }
        }
        // Change the "default value" field to be reflective of this component.
        var defaultValueComponent = (0, formUtils_1.getComponent)(this.editForm.components, 'defaultValue', true);
        if (defaultValueComponent && component.type !== 'hidden') {
            var defaultChanged = changed && ((changed.component && changed.component.key === 'defaultValue')
                || (changed.instance && defaultValueComponent.hasComponent && defaultValueComponent.hasComponent(changed.instance)));
            if (!defaultChanged) {
                lodash_1.default.assign(defaultValueComponent.component, lodash_1.default.omit(__assign({}, component), [
                    'key',
                    'label',
                    'labelPosition',
                    'labelMargin',
                    'labelWidth',
                    'placeholder',
                    'tooltip',
                    'hidden',
                    'autofocus',
                    'validate',
                    'disabled',
                    'defaultValue',
                    'customDefaultValue',
                    'calculateValue',
                    'conditional',
                    'customConditional',
                    'id'
                ]));
                var parentComponent = defaultValueComponent.parent;
                var tabIndex_1 = -1;
                var index_1 = -1;
                parentComponent.tabs.some(function (tab, tIndex) {
                    tab.some(function (comp, compIndex) {
                        if (comp.id === defaultValueComponent.id) {
                            tabIndex_1 = tIndex;
                            index_1 = compIndex;
                            return true;
                        }
                        return false;
                    });
                });
                if (tabIndex_1 !== -1 && index_1 !== -1 && changed && !lodash_1.default.isNil(changed.value)) {
                    var sibling = parentComponent.tabs[tabIndex_1][index_1 + 1];
                    parentComponent.removeComponent(defaultValueComponent);
                    var newComp = parentComponent.addComponent(defaultValueComponent.component, defaultValueComponent.data, sibling);
                    lodash_1.default.pull(newComp.validators, 'required');
                    parentComponent.tabs[tabIndex_1].splice(index_1, 1, newComp);
                    newComp.checkValidity = function () { return true; };
                    newComp.build(defaultValueComponent.element);
                }
            }
            else {
                var dataPath = changed.instance._data.key;
                var path = (0, utils_1.getArrayFromComponentPath)(changed.instance.path);
                path.shift();
                if (path.length) {
                    path.unshift(component.key);
                    dataPath = (0, utils_1.getStringFromComponentPath)(path);
                }
                lodash_1.default.set(this.preview._data, dataPath, changed.value);
                lodash_1.default.set(this.webform._data, dataPath, changed.value);
            }
        }
        // Called when we update a component.
        this.emit('updateComponent', component);
    };
    WebformBuilder.prototype.findRepeatablePaths = function () {
        var repeatablePaths = [];
        var keys = new Map();
        (0, formUtils_1.eachComponent)(this.form.components, function (comp, path) {
            if (!comp.key) {
                return;
            }
            if (keys.has(comp.key)) {
                if (keys.get(comp.key).includes(path)) {
                    repeatablePaths.push(path);
                }
                else {
                    keys.set(comp.key, __spreadArray(__spreadArray([], keys.get(comp.key), true), [path], false));
                }
            }
            else {
                keys.set(comp.key, [path]);
            }
        }, true);
        return repeatablePaths;
    };
    WebformBuilder.prototype.highlightInvalidComponents = function () {
        var repeatablePaths = this.findRepeatablePaths();
        var hasInvalidComponents = false;
        this.webform.everyComponent(function (comp) {
            var _a, _b;
            var path = comp.path;
            if (repeatablePaths.includes(path)) {
                comp.setCustomValidity("API Key is not unique: ".concat(comp.key));
                hasInvalidComponents = true;
            }
            else if ((_b = (_a = comp.error) === null || _a === void 0 ? void 0 : _a.message) === null || _b === void 0 ? void 0 : _b.startsWith('API Key is not unique')) {
                comp.setCustomValidity('');
            }
        });
        this.emit('builderFormValidityChange', hasInvalidComponents);
    };
    /**
     * Called when a new component is saved.
     *
     * @param parent
     * @param component
     * @return {boolean}
     */
    WebformBuilder.prototype.saveComponent = function (component, parent, isNew, original) {
        var _this = this;
        this.editForm.detach();
        var parentContainer = parent ? parent.formioContainer : this.container;
        var parentComponent = parent ? parent.formioComponent : this;
        this.dialog.close();
        var path = parentContainer ? this.getComponentsPath(component, parentComponent.component) : '';
        if (!original) {
            original = parent.formioContainer.find(function (comp) { return comp.id === component.id; });
        }
        var index = parentContainer ? parentContainer.indexOf(original) : 0;
        if (index !== -1) {
            var submissionData = this.editForm.submission.data;
            submissionData = submissionData.componentJson || submissionData;
            var fieldsToRemoveDoubleQuotes = ['label', 'tooltip'];
            this.replaceDoubleQuotes(submissionData, fieldsToRemoveDoubleQuotes);
            this.hook('beforeSaveComponentSettings', submissionData);
            var comp_1 = null;
            parentComponent.getComponents().forEach(function (component) {
                if (component.component.key === original.key) {
                    comp_1 = component;
                }
            });
            var originalComp_1 = comp_1.component;
            var originalComponentSchema_1 = comp_1.schema;
            var isParentSaveChildMethod = this.isParentSaveChildMethod(parent.formioComponent);
            if (parentContainer && !isParentSaveChildMethod) {
                parentContainer[index] = submissionData;
                if (comp_1) {
                    comp_1.component = submissionData;
                }
            }
            else if (isParentSaveChildMethod) {
                parent.formioComponent.saveChildComponent(submissionData);
            }
            var rebuild = parentComponent.rebuild() || Promise.resolve();
            return rebuild.then(function () {
                var schema = parentContainer ? parentContainer[index] : (comp_1 ? comp_1.schema : []);
                _this.emitSaveComponentEvent(schema, originalComp_1, parentComponent.schema, path, index, isNew, originalComponentSchema_1);
                _this.emit('change', _this.form);
                _this.highlightInvalidComponents();
                if (_this.isComponentCreated) {
                    var component_1 = parent.formioComponent.components[0];
                    _this.moveComponent(component_1);
                    _this.isComponentCreated = false;
                }
            });
        }
        this.highlightInvalidComponents();
        return Promise.resolve();
    };
    WebformBuilder.prototype.emitSaveComponentEvent = function (schema, originalComp, parentComponentSchema, path, index, isNew, originalComponentSchema) {
        this.emit('saveComponent', schema, originalComp, parentComponentSchema, path, index, isNew, originalComponentSchema);
    };
    WebformBuilder.prototype.attachEditComponentControls = function (component, parent, isNew, original, ComponentClass) {
        var _this = this;
        var type = document.querySelector(".mb-2.formio-form-group.has-feedback.formio-component.formio-component-select.formio-component-selectRadio");
        var card = document.querySelector(".tab-component-tabs.nav.nav-tabs.card-header-tabs");
        var requ = document.querySelector(".form-check.checkbox");
        requ.classList.add('form-switch');
        var requie = document.querySelector(".form-check.checkbox.form-switch");
        card.appendChild(requie);
        // const labe = document.querySelector(".mb-2.formio-form-group.has-feedback.formio-component.formio-component-textarea.formio-component-description")
        // const start = document.querySelector(".mb-2.formio-form-group.has-feedback.formio-component.formio-component-datagrid.formio-component-stars")
        // const heart = document.querySelector(".mb-2.formio-form-group.has-feedback.formio-component.formio-component-datagrid.formio-component-hearts")
        //const se = document.querySelector(".mb-2.formio-form-group.has-feedback.formio-component.formio-component-select.formio-component-dataSrc")
        var val = document.querySelector('.mb-2.formio-form-group.has-feedback.formio-component.formio-component-datagrid.formio-component-values');
        var la = document.querySelector('.mb-2.formio-form-group.has-feedback.formio-component.formio-component-textarea.formio-component-label');
        var selec = document.querySelector('.mb-2.formio-form-group.has-feedback.formio-component.formio-component-datagrid.formio-component-data.values');
        var wig = document.querySelector('.mb-2.formio-form-group.has-feedback.formio-component.formio-component-select.formio-component-widget');
        if (val instanceof Node || selec instanceof Node) {
            la.appendChild(val);
            // wig.style.display='none';
            // labe.appendChild(start);
            // labe.appendChild(heart);
        }
        else {
            // console.error('.');
        }
        var firstColumn = document.querySelector(".col.component-edit-tabs.col-sm-6");
        var secondColumn = document.querySelector('.col.col-sm-6');
        var premiereligne = document.querySelector('.lead');
        var deu = document.querySelector('.float-end');
        premiereligne.style.display = 'none';
        // deu.style.display = 'none';
        secondColumn.style.visibility = 'hidden';
        var cancelButtons = this.componentEdit.querySelectorAll('[ref="cancelButton"]');
        console.log(cancelButtons);
        cancelButtons.forEach(function (cancelButton) {
            cancelButton.style.background = '#E4E4E4';
            cancelButton.style.color = 'black';
            cancelButton.style.border = 'none';
            firstColumn.appendChild(cancelButton);
            _this.editForm.addEventListener(cancelButton, 'click', function (event) {
                event.preventDefault();
                _this.editForm.detach();
                _this.emit('cancelComponent', component);
                _this.dialog.close();
                _this.highlightInvalidComponents();
            });
        });
        var removeButtons = this.componentEdit.querySelectorAll('[ref="removeButton"]');
        removeButtons.forEach(function (removeButton) {
            removeButton.style.display = 'none';
            _this.editForm.addEventListener(removeButton, 'click', function (event) {
                event.preventDefault();
                // Since we are already removing the component, don't trigger another remove.
                _this.saved = true;
                _this.editForm.detach();
                _this.removeComponent(component, parent, original);
                _this.dialog.close();
                _this.highlightInvalidComponents();
            });
        });
        var saveButtons = this.componentEdit.querySelectorAll('[ref="saveButton"]');
        saveButtons.forEach(function (saveButton) {
            saveButton.style.background = '#FFCB78';
            saveButton.style.color = 'light';
            saveButton.style.border = 'none';
            firstColumn.appendChild(saveButton);
            _this.editForm.addEventListener(saveButton, 'click', function (event) {
                event.preventDefault();
                if (!_this.editForm.checkValidity(_this.editForm.data, true, _this.editForm.data)) {
                    _this.editForm.setPristine(false);
                    _this.editForm.showErrors();
                    return false;
                }
                _this.saved = true;
                _this.saveComponent(component, parent, isNew, original);
            });
        });
        var previewButtons = this.componentEdit.querySelectorAll('[ref="previewButton"]');
        previewButtons.forEach(function (previewButton) {
            previewButton.style.display = 'none';
            _this.editForm.addEventListener(previewButton, 'click', function (event) {
                event.preventDefault();
                _this.showPreview = !_this.showPreview;
                _this.editForm.detach();
                _this.setContent(_this.componentEdit, _this.renderTemplate('builderEditForm', {
                    componentInfo: ComponentClass.builderInfo,
                    editForm: _this.editForm.render(),
                    preview: _this.preview ? _this.preview.render() : false,
                    showPreview: _this.showPreview,
                    helplinks: _this.helplinks,
                }));
                _this.editForm.attach(_this.componentEdit.querySelector('[ref="editForm"]'));
                _this.attachEditComponentControls(component, parent, isNew, original, ComponentClass);
            });
        });
    };
    WebformBuilder.prototype.editComponent = function (component, parent, isNew, isJsonEdit, original, flags) {
        var _this = this;
        var _a, _b;
        if (flags === void 0) { flags = {}; }
        if (!component.key) {
            return;
        }
        this.saved = false;
        var componentCopy = (0, utils_1.fastCloneDeep)(component);
        var ComponentClass = Components_1.default.components[componentCopy.type];
        var isCustom = ComponentClass === undefined;
        isJsonEdit = isJsonEdit || isCustom;
        ComponentClass = isCustom ? Components_1.default.components.unknown : ComponentClass;
        // Make sure we only have one dialog open at a time.
        if (this.dialog) {
            this.dialog.close();
            this.highlightInvalidComponents();
        }
        // This is the render step.
        var editFormOptions = lodash_1.default.clone(lodash_1.default.get(this, 'options.editForm', {}));
        if (this.editForm) {
            this.editForm.destroy();
        }
        // Allow editForm overrides per component.
        var overrides = lodash_1.default.get(this.options, "editForm.".concat(componentCopy.type), {});
        // Pass along the form being edited.
        editFormOptions.editForm = this.form;
        editFormOptions.editComponent = component;
        editFormOptions.flags = flags;
        this.hook('editComponentParentInstance', editFormOptions, parent);
        this.editForm = new Webform_1.default(__assign(__assign(__assign(__assign({}, lodash_1.default.omit(this.options, ['hooks', 'builder', 'events', 'attachMode', 'skipInit'])), { language: this.options.language }), editFormOptions), { evalContext: __assign(__assign({}, ((editFormOptions === null || editFormOptions === void 0 ? void 0 : editFormOptions.evalContext) || ((_a = this.options) === null || _a === void 0 ? void 0 : _a.evalContext) || {})), { buildingForm: this.form }) }));
        this.hook('editFormProperties', parent);
        this.editForm.form = (isJsonEdit && !isCustom) ? {
            components: [
                {
                    type: 'textarea',
                    as: 'json',
                    editor: 'ace',
                    weight: 10,
                    input: true,
                    key: 'componentJson',
                    label: 'Component JSON',
                    tooltip: 'Edit the JSON for this component.'
                },
                {
                    type: 'checkbox',
                    key: 'showFullSchema',
                    label: 'Full Schema'
                }
            ]
        } : ComponentClass.editForm(lodash_1.default.cloneDeep(overrides));
        var instanceOptions = {
            inFormBuilder: true,
        };
        this.hook('instanceOptionsPreview', instanceOptions);
        var instance = new ComponentClass(componentCopy, instanceOptions);
        var schema = this.hook('builderComponentSchema', component, instance);
        this.editForm.submission = isJsonEdit ? {
            data: {
                componentJson: schema,
                showFullSchema: this.options.showFullJsonSchema
            },
        } : {
            data: instance.component,
        };
        if (this.preview) {
            this.preview.destroy();
        }
        if (!ComponentClass.builderInfo.hasOwnProperty('preview') || ComponentClass.builderInfo.preview) {
            this.preview = new Webform_1.default(lodash_1.default.omit(__assign(__assign({}, this.options), { preview: true }), [
                'hooks',
                'builder',
                'events',
                'attachMode',
                'calculateValue'
            ]));
            this.hook('previewFormSettitngs', schema, isJsonEdit);
        }
        this.showPreview = (_b = ComponentClass.builderInfo.showPreview) !== null && _b !== void 0 ? _b : true;
        this.componentEdit = this.ce('div', { 'class': 'component-edit-container' });
        this.setContent(this.componentEdit, this.renderTemplate('builderEditForm', {
            componentInfo: ComponentClass.builderInfo,
            editForm: this.editForm.render(),
            preview: this.preview ? this.preview.render() : false,
            showPreview: this.showPreview,
            helplinks: this.helplinks
        }));
        this.dialog = this.createModal(this.componentEdit, lodash_1.default.get(this.options, 'dialogAttr', {}));
        // This is the attach step.
        this.editForm.attach(this.componentEdit.querySelector('[ref="editForm"]'));
        this.hook('editFormWrapper');
        this.updateComponent(componentCopy);
        this.editForm.on('change', function (event) {
            if (event.changed) {
                if (event.changed.component && event.changed.component.key === 'showFullSchema') {
                    var value = event.changed.value;
                    _this.editForm.submission = {
                        data: {
                            componentJson: value ? instance.component : component,
                            showFullSchema: value
                        },
                    };
                    return;
                }
                // See if this is a manually modified key. Treat custom component keys as manually modified
                if ((event.changed.component && (event.changed.component.key === 'key')) || isJsonEdit) {
                    componentCopy.keyModified = true;
                }
                var isComponentLabelChanged = false;
                if (event.changed.instance) {
                    isComponentLabelChanged = ['label', 'title'].includes(event.changed.instance.path);
                }
                else if (event.changed.component) {
                    isComponentLabelChanged = ['label', 'title'].includes(event.changed.component.key);
                }
                if (isComponentLabelChanged) {
                    // Ensure this component has a key.
                    if (isNew) {
                        if (!event.data.keyModified) {
                            _this.editForm.everyComponent(function (component) {
                                if (component.key === 'key' && component.parent.component.key === 'tabs') {
                                    component.setValue(_this.updateComponentKey(event.data));
                                    return false;
                                }
                            });
                        }
                        if (_this.form) {
                            var formComponents = _this.findNamespaceRoot(parent.formioComponent);
                            // excluding component which key uniqueness is to be checked to prevent the comparing of the same keys
                            formComponents = formComponents.filter(function (comp) { return editFormOptions.editComponent.id !== comp.id; });
                            // Set a unique key for this component.
                            builder_1.default.uniquify(formComponents, event.data);
                        }
                    }
                }
                // If the edit form has any nested form inside, we get a partial data (nested form's data) in the
                // event.data property
                var editFormData = void 0;
                if (event.changed.instance && event.changed.instance.root && event.changed.instance.root.id !== _this.editForm.id) {
                    editFormData = _this.editForm.data;
                }
                // Update the component.
                _this.updateComponent(event.data.componentJson || editFormData || event.data, event.changed);
            }
        });
        this.attachEditComponentControls(component, parent, isNew, original, ComponentClass);
        var dialogClose = function () {
            _this.editForm.destroy(true);
            if (_this.preview) {
                _this.preview.destroy(true);
                _this.preview = null;
            }
            if (isNew && !_this.saved) {
                _this.removeComponent(component, parent, original);
                _this.highlightInvalidComponents();
            }
            // Clean up.
            _this.removeEventListener(_this.dialog, 'close', dialogClose);
            _this.dialog = null;
        };
        this.addEventListener(this.dialog, 'close', dialogClose);
        // Called when we edit a component.
        this.emit('editComponent', component);
    };
    WebformBuilder.prototype.updateComponentKey = function (data) {
        return lodash_1.default.camelCase(data.title ||
            data.label ||
            data.placeholder ||
            data.type).replace(/^[0-9]*/, '');
    };
    WebformBuilder.prototype.moveComponent = function (component) {
        var _a;
        if (this.selectedComponent) {
            var prevSelected = this.selectedComponent;
            (_a = prevSelected.element) === null || _a === void 0 ? void 0 : _a.classList.remove('builder-component-selected');
            this.removeEventListener(document, 'keydown');
        }
        component.element.focus();
        component.element.classList.add('builder-component-selected');
        this.selectedComponent = component;
        this.addEventListener(document, 'keydown', this.moveHandler.bind(this));
    };
    WebformBuilder.prototype.updateComponentPlacement = function (direction) {
        var component = this.selectedComponent;
        var index, info;
        var step = direction ? -1 : 1;
        if (component) {
            var element = component.element;
            var sibling = direction ? element.previousElementSibling : element.nextElementSibling;
            var source = element.parentNode;
            var containerLength = source.formioContainer.length;
            if (containerLength && containerLength <= 1) {
                return;
            }
            if (source.formioContainer) {
                index = lodash_1.default.findIndex(source.formioContainer, { key: element.formioComponent.component.key });
                if (index !== -1) {
                    info = source.formioContainer.splice(lodash_1.default.findIndex(source.formioContainer, { key: element.formioComponent.component.key }), 1);
                    info = info[0];
                    source.removeChild(element);
                }
            }
            var len = source.formioComponent.components.length;
            index = (index === -1) ? 0 : index + step;
            if (index === -1) {
                source.formioContainer.push(info);
                source.appendChild(element);
            }
            else if (index === len) {
                var key = source.formioContainer[0].key;
                index = lodash_1.default.findIndex(source.formioComponent.components, { key: key });
                var firstElement = source.formioComponent.components[index].element;
                source.formioContainer.splice(0, 0, info);
                source.insertBefore(element, firstElement);
            }
            else if (index !== -1) {
                source.formioContainer.splice(index, 0, info);
                direction
                    ? source.insertBefore(element, sibling)
                    : source.insertBefore(element, sibling.nextElementSibling);
            }
            element.focus();
        }
    };
    WebformBuilder.prototype.stopMoving = function (comp) {
        var parent = comp.element.parentNode;
        this.removeEventListener(document, 'keydown');
        parent.formioComponent.rebuild();
        this.selectedComponent = null;
    };
    WebformBuilder.prototype.addNewComponent = function (element) {
        var _this = this;
        var _a;
        var source = document.querySelector('.formio-builder-form');
        var key = element.getAttribute('data-key');
        var group = element.getAttribute('data-group');
        var isNew = true;
        var info;
        if (key && group) {
            info = this.getComponentInfo(key, group);
        }
        if (isNew && !this.options.noNewEdit && !info.noNewEdit) {
            builder_1.default.uniquify(this.findNamespaceRoot(source.formioComponent), info);
            this.editComponent(info, source, isNew, null, null);
        }
        var firstComponent = (_a = source.formioComponent.components[0]) === null || _a === void 0 ? void 0 : _a.element;
        if (firstComponent) {
            source.formioContainer.splice(0, 0, info);
        }
        else {
            source.formioContainer.push(info);
        }
        source.formioComponent.rebuild().then(function () {
            _this.isComponentCreated = true;
        });
    };
    /**
     * Creates copy of component schema and stores it under sessionStorage.
     * @param {Component} component
     * @return {*}
     */
    WebformBuilder.prototype.copyComponent = function (component) {
        if (!window.sessionStorage) {
            return console.warn('Session storage is not supported in this browser.');
        }
        this.addClass(this.refs.form, 'builder-paste-mode');
        window.sessionStorage.setItem('formio.clipboard', JSON.stringify(component.schema));
    };
    /**
     * Paste copied component after the current component.
     * @param {Component} component
     * @return {*}
     */
    WebformBuilder.prototype.pasteComponent = function (component) {
        if (!window.sessionStorage) {
            return console.warn('Session storage is not supported in this browser.');
        }
        this.removeClass(this.refs.form, 'builder-paste-mode');
        if (window.sessionStorage) {
            var data = window.sessionStorage.getItem('formio.clipboard');
            if (data) {
                var schema = JSON.parse(data);
                var parent = this.getParentElement(component.element);
                if (parent) {
                    builder_1.default.uniquify(this.findNamespaceRoot(parent.formioComponent), schema);
                    var path = '';
                    var index = 0;
                    var isParentSaveChildMethod = this.isParentSaveChildMethod(parent.formioComponent);
                    if (parent.formioContainer && !isParentSaveChildMethod) {
                        index = parent.formioContainer.indexOf(component.component);
                        path = this.getComponentsPath(schema, parent.formioComponent.component);
                        parent.formioContainer.splice(index + 1, 0, schema);
                    }
                    else if (isParentSaveChildMethod) {
                        parent.formioComponent.saveChildComponent(schema, false);
                    }
                    parent.formioComponent.rebuild();
                    this.emitSaveComponentEvent(schema, schema, parent.formioComponent.component, path, (index + 1), true, schema);
                }
                this.emit('change', this.form);
            }
        }
    };
    WebformBuilder.prototype.isParentSaveChildMethod = function (parentComp) {
        return !!(parentComp && parentComp.saveChildComponent);
    };
    WebformBuilder.prototype.getParentElement = function (element) {
        var container = element;
        do {
            container = container.parentNode;
        } while (container && !container.formioComponent);
        return container;
    };
    WebformBuilder.prototype.addBuilderComponentInfo = function (component) {
        if (!component || !component.group || !this.groups[component.group]) {
            return;
        }
        component = lodash_1.default.clone(component);
        var groupInfo = this.groups[component.group];
        if (!groupInfo.components.hasOwnProperty(component.key)) {
            groupInfo.components[component.key] = component;
        }
        return component;
    };
    WebformBuilder.prototype.init = function () {
        if (this.webform) {
            this.webform.init();
        }
        return _super.prototype.init.call(this);
    };
    WebformBuilder.prototype.clear = function () {
        if (this.webform.initialized) {
            this.webform.clear();
        }
    };
    WebformBuilder.prototype.destroy = function (all) {
        if (all === void 0) { all = false; }
        if (this.webform.initialized) {
            this.webform.destroy(all);
        }
        _super.prototype.destroy.call(this, all);
    };
    WebformBuilder.prototype.addBuilderGroup = function (name, group) {
        if (!this.groups[name]) {
            this.groups[name] = group;
            this.groupOrder.push(name);
            this.triggerRedraw();
        }
        else {
            this.updateBuilderGroup(name, group);
        }
    };
    WebformBuilder.prototype.updateBuilderGroup = function (name, group) {
        if (this.groups[name]) {
            this.groups[name] = group;
            this.triggerRedraw();
        }
    };
    WebformBuilder.prototype.generateKey = function (info) {
        return info.key || lodash_1.default.camelCase(info.title ||
            info.label ||
            info.placeholder ||
            info.type);
    };
    return WebformBuilder;
}(Component_1.default));
exports.default = WebformBuilder;
//# sourceMappingURL=WebformBuilder.js.map