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
var Formio_1 = require("./Formio");
var WebformBuilder_1 = __importDefault(require("./WebformBuilder"));
var utils_1 = require("./utils/utils");
var formUtils_1 = require("./utils/formUtils");
var builder_1 = __importDefault(require("./utils/builder"));
var PDF_1 = __importDefault(require("./PDF"));
var PDFBuilder = /** @class */ (function (_super) {
    __extends(PDFBuilder, _super);
    function PDFBuilder() {
        var _this = this;
        var element, options;
        if (arguments[0] instanceof HTMLElement || arguments[1]) {
            element = arguments[0];
            options = arguments[1];
        }
        else {
            options = arguments[0];
        }
        // Force superclass to skip the automatic init; we'll trigger it manually
        options.skipInit = true;
        options.display = 'pdf';
        if (element) {
            _this = _super.call(this, element, options) || this;
        }
        else {
            _this = _super.call(this, options) || this;
        }
        _this.dragDropEnabled = false;
        return _this;
    }
    Object.defineProperty(PDFBuilder.prototype, "defaultGroups", {
        get: function () {
            return {
                pdf: {
                    title: 'PDF Fields',
                    weight: 0,
                    default: true,
                    components: {
                        textfield: true,
                        number: true,
                        password: true,
                        email: true,
                        phoneNumber: true,
                        currency: true,
                        checkbox: true,
                        signature: true,
                        select: true,
                        textarea: true,
                        datetime: true,
                        file: true,
                        htmlelement: true,
                        signrequestsignature: true
                    }
                },
                basic: false,
                advanced: false,
                layout: false,
                data: false,
                premium: false,
                resource: false
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PDFBuilder.prototype, "hasPDF", {
        get: function () {
            return lodash_1.default.has(this.webform.form, 'settings.pdf');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(PDFBuilder.prototype, "projectUrl", {
        get: function () {
            return this.options.projectUrl || Formio_1.Formio.getProjectUrl();
        },
        enumerable: false,
        configurable: true
    });
    PDFBuilder.prototype.init = function () {
        this.options.attachMode = 'builder';
        this.webform = this.webform || this.createForm(this.options);
        this.webform.init();
    };
    PDFBuilder.prototype.render = function () {
        var _this = this;
        var result = this.renderTemplate('pdfBuilder', {
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
            form: this.hasPDF ?
                this.webform.render() :
                this.renderTemplate('pdfBuilderUpload', {})
        });
        return result;
    };
    PDFBuilder.prototype.attach = function (element) {
        var _this = this;
        // PDF Upload
        if (!this.hasPDF) {
            this.loadRefs(element, {
                'fileDrop': 'single',
                'fileBrowse': 'single',
                'hiddenFileInputElement': 'single',
                'uploadError': 'single',
                'uploadProgress': 'single',
                'uploadProgressWrapper': 'single',
                'dragDropText': 'single'
            });
            this.addEventListener(this.refs['pdf-upload-button'], 'click', function (event) {
                event.preventDefault();
            });
            // Init the upload error.
            if (!this.projectUrl) {
                this.setUploadError('Form options.projectUrl not set. Please set the "projectUrl" property of the options for this form or use Formio.setProjectUrl(). This setting is necessary to upload a pdf background.');
            }
            else {
                this.setUploadError();
            }
            if (this.refs.fileDrop) {
                var element_1 = this;
                this.addEventListener(this.refs.fileDrop, 'dragover', function (event) {
                    this.className = 'fileSelector fileDragOver';
                    event.preventDefault();
                });
                this.addEventListener(this.refs.fileDrop, 'dragleave', function (event) {
                    this.className = 'fileSelector';
                    event.preventDefault();
                });
                this.addEventListener(this.refs.fileDrop, 'drop', function (event) {
                    this.className = 'fileSelector';
                    event.preventDefault();
                    element_1.upload(event.dataTransfer.files[0]);
                    return false;
                });
            }
            if (this.refs.fileBrowse && this.refs.hiddenFileInputElement) {
                this.addEventListener(this.refs.fileBrowse, 'click', function (event) {
                    event.preventDefault();
                    // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
                    // a click event on it.
                    if (typeof _this.refs.hiddenFileInputElement.trigger === 'function') {
                        _this.refs.hiddenFileInputElement.trigger('click');
                    }
                    else {
                        _this.refs.hiddenFileInputElement.click();
                    }
                });
                this.addEventListener(this.refs.hiddenFileInputElement, 'change', function () {
                    if (!_this.refs.hiddenFileInputElement.value) {
                        return;
                    }
                    _this.upload(_this.refs.hiddenFileInputElement.files[0]);
                    _this.refs.hiddenFileInputElement.value = '';
                });
            }
            return Promise.resolve();
        }
        // Normal PDF Builder
        return _super.prototype.attach.call(this, element).then(function () {
            _this.loadRefs(_this.element, {
                iframeDropzone: 'single',
                'sidebar-container': 'multiple',
                'sidebar': 'single',
            });
            _this.afterAttach();
            return _this.element;
        });
    };
    PDFBuilder.prototype.afterAttach = function () {
        var _this = this;
        this.on('saveComponent', function (component) {
            _this.webform.postMessage({ name: 'updateElement', data: component });
        });
        this.on('removeComponent', function (component) {
            _this.webform.postMessage({ name: 'removeElement', data: component });
        });
        this.initIframeEvents();
        this.updateDropzoneDimensions();
        var sidebar = this.refs.sidebar;
        if (sidebar) {
            this.addClass(sidebar, 'disabled');
            this.webform.on('iframe-ready', function () {
                _this.pdfLoaded = true;
                _this.updateDragAndDrop();
                _this.removeClass(sidebar, 'disabled');
            }, true);
        }
    };
    PDFBuilder.prototype.upload = function (file) {
        var _this = this;
        var formio = new Formio_1.Formio(this.projectUrl);
        if (this.refs.dragDropText) {
            this.refs.dragDropText.style.display = 'none';
        }
        if (this.refs.uploadProgressWrapper) {
            this.refs.uploadProgressWrapper.style.display = 'inherit';
        }
        formio.uploadFile('url', file, file, '', function (event) {
            if (_this.refs.uploadProgress) {
                var progress = Math.floor((event.loaded / event.total) * 100);
                _this.refs.uploadProgress.style.width = "".concat(progress, "%");
                if (progress > 98) {
                    _this.refs.uploadProgress.innerHTML = _this.t('Converting PDF. Please wait.');
                }
                else {
                    _this.refs.uploadProgress.innerHTML = "".concat(_this.t('Uploading'), " ").concat(progress, "%");
                }
            }
        }, "".concat(this.projectUrl, "/upload"), {}, 'file')
            .then(function (result) {
            var _a, _b, _c, _d;
            var autoConversionComponentsAssigned = false;
            if (((_a = result.data.formfields) === null || _a === void 0 ? void 0 : _a.components) && result.data.formfields.components.length) {
                var formInitState = ((_b = _this.webform.form.components[0]) === null || _b === void 0 ? void 0 : _b.key) === 'submit';
                var wizardInitState = ((_c = _this.webform.form.components[0]) === null || _c === void 0 ? void 0 : _c.key) === 'page1' &&
                    ((_d = _this.webform.form.components[0]) === null || _d === void 0 ? void 0 : _d.components.length) === 0;
                var emptyFormState = _this.webform.form.components.length === 0;
                if (formInitState || wizardInitState || emptyFormState) {
                    autoConversionComponentsAssigned = true;
                    _this.webform.form.components = result.data.formfields.components;
                }
            }
            if (_this.refs.dragDropText) {
                _this.refs.dragDropText.style.display = 'inherit';
            }
            if (_this.refs.uploadProgressWrapper) {
                _this.refs.uploadProgressWrapper.style.display = 'none';
            }
            lodash_1.default.set(_this.webform.form, 'settings.pdf', {
                id: result.data.file,
                src: result.data.filesServer ? "".concat(result.data.filesServer).concat(result.data.path) : "".concat(new URL(_this.projectUrl).origin, "/pdf-proxy").concat(result.data.path),
                nonFillableConversionUsed: autoConversionComponentsAssigned && result.data.formfields.nonFillableConversionUsed
            });
            _this.emit('pdfUploaded', result.data);
            _this.redraw();
        })
            .catch(function (err) { return _this.setUploadError(err); });
    };
    PDFBuilder.prototype.setUploadError = function (message) {
        if (!this.refs.uploadError) {
            return;
        }
        this.refs.uploadError.style.display = message ? '' : 'none';
        this.refs.uploadError.innerHTML = message;
    };
    PDFBuilder.prototype.createForm = function (options) {
        var _this = this;
        // Instantiate the webform from the PDF class instead of Webform
        options.skipInit = false;
        options.hideLoader = true;
        this.webform = new PDF_1.default(this.element, options);
        this.webform.on('attach', function () {
            // If the dropzone exists but has been removed in a PDF rebuild, reinstate it
            if (_this.refs.iframeDropzone && !__spreadArray([], _this.refs.form.children, true).includes(_this.refs.iframeDropzone)) {
                _this.prependTo(_this.refs.iframeDropzone, _this.refs.form);
            }
        });
        return this.webform;
    };
    PDFBuilder.prototype.destroy = function (all) {
        if (all === void 0) { all = false; }
        _super.prototype.destroy.call(this, all);
        this.webform.destroy(all);
    };
    // d8b 8888888888                                                                              888
    // Y8P 888                                                                                     888
    //     888                                                                                     888
    // 888 8888888 888d888 8888b.  88888b.d88b.   .d88b.        .d88b.  888  888  .d88b.  88888b.  888888 .d8888b
    // 888 888     888P"      "88b 888 "888 "88b d8P  Y8b      d8P  Y8b 888  888 d8P  Y8b 888 "88b 888    88K
    // 888 888     888    .d888888 888  888  888 88888888      88888888 Y88  88P 88888888 888  888 888    "Y8888b.
    // 888 888     888    888  888 888  888  888 Y8b.          Y8b.      Y8bd8P  Y8b.     888  888 Y88b.       X88
    // 888 888     888    "Y888888 888  888  888  "Y8888        "Y8888    Y88P    "Y8888  888  888  "Y888  88888P'
    PDFBuilder.prototype.getParentContainer = function (component) {
        var container = [];
        var originalComponent = null;
        (0, formUtils_1.eachComponent)(this.webform._form.components, function (comp, path, components) {
            if (comp.id === component.component.id) {
                container = components;
                originalComponent = comp;
                return true;
            }
        }, true);
        return {
            formioComponent: component.parent,
            formioContainer: container,
            originalComponent: originalComponent
        };
    };
    PDFBuilder.prototype.initIframeEvents = function () {
        var _this = this;
        this.webform.off('iframe-elementUpdate');
        this.webform.off('iframe-componentUpdate');
        this.webform.off('iframe-componentClick');
        this.webform.on('iframe-elementUpdate', function (schema) {
            var component = _this.webform.getComponentById(schema.id);
            if (component && component.component) {
                var isNew = true;
                component.component.overlay = {
                    page: schema.page,
                    left: schema.left,
                    top: schema.top,
                    height: schema.height,
                    width: schema.width
                };
                if (!_this.options.noNewEdit && !component.component.noNewEdit) {
                    _this.editComponent(component.component, _this.getParentContainer(component), isNew);
                }
                _this.emit('updateComponent', component.component);
            }
            return component;
        });
        this.webform.on('iframe-componentUpdate', function (schema) {
            var component = _this.webform.getComponentById(schema.id);
            if (component && component.component) {
                component.component.overlay = {
                    page: schema.overlay.page,
                    left: schema.overlay.left,
                    top: schema.overlay.top,
                    height: schema.overlay.height,
                    width: schema.overlay.width
                };
                _this.emit('updateComponent', component.component);
                _this.emit('change', _this.form);
            }
            return component;
        });
        this.webform.on('iframe-componentClick', function (schema) {
            var component = _this.webform.getComponentById(schema.id);
            if (component) {
                _this.editComponent(component.component, _this.getParentContainer(component));
            }
        }, true);
    };
    // 8888888b.                                                                   888                   d8b
    // 888  "Y88b                                                                  888                   Y8P
    // 888    888                                                                  888
    // 888    888 888d888 .d88b.  88888b. 88888888  .d88b.  88888b.   .d88b.       888  .d88b.   .d88b.  888  .d8888b
    // 888    888 888P"  d88""88b 888 "88b   d88P  d88""88b 888 "88b d8P  Y8b      888 d88""88b d88P"88b 888 d88P"
    // 888    888 888    888  888 888  888  d88P   888  888 888  888 88888888      888 888  888 888  888 888 888
    // 888  .d88P 888    Y88..88P 888 d88P d88P    Y88..88P 888  888 Y8b.          888 Y88..88P Y88b 888 888 Y88b.
    // 8888888P"  888     "Y88P"  88888P" 88888888  "Y88P"  888  888  "Y8888       888  "Y88P"   "Y88888 888  "Y8888P
    //                            888                                                                888
    //                            888                                                           Y8b d88P
    //                            888                                                            "Y88P"
    PDFBuilder.prototype.initDropzoneEvents = function () {
        if (!this.refs.iframeDropzone) {
            return;
        }
        // This is required per HTML spec in order for the drop event to fire
        this.removeEventListener(this.refs.iframeDropzone, 'dragover');
        this.removeEventListener(this.refs.iframeDropzone, 'drop');
        this.addEventListener(this.refs.iframeDropzone, 'dragover', function (e) {
            e.preventDefault();
            return false;
        });
        this.addEventListener(this.refs.iframeDropzone, 'drop', this.onDropzoneDrop.bind(this));
    };
    PDFBuilder.prototype.updateDragAndDrop = function () {
        if (!this.pdfLoaded) {
            return;
        }
        this.initDropzoneEvents();
        this.prepSidebarComponentsForDrag();
    };
    PDFBuilder.prototype.prepSidebarComponentsForDrag = function () {
        var _this = this;
        if (!this.refs['sidebar-container']) {
            return;
        }
        this.refs['sidebar-container'].forEach(function (container) {
            __spreadArray([], container.children, true).forEach(function (el) {
                el.draggable = true;
                el.setAttribute('draggable', true);
                _this.removeEventListener(el, 'dragstart');
                _this.removeEventListener(el, 'dragend');
                _this.addEventListener(el, 'dragstart', _this.onDragStart.bind(_this), true);
                _this.addEventListener(el, 'dragend', _this.onDragEnd.bind(_this), true);
                _this.addEventListener(el, 'drag', function (e) {
                    e.target.style.cursor = 'none';
                });
            });
        });
    };
    PDFBuilder.prototype.updateDropzoneDimensions = function () {
        if (!this.refs.iframeDropzone) {
            return;
        }
        var iframeRect = (0, utils_1.getElementRect)(this.webform.refs.iframeContainer);
        this.refs.iframeDropzone.style.height = iframeRect && iframeRect.height ? "".concat(iframeRect.height, "px") : '1000px';
        this.refs.iframeDropzone.style.width = iframeRect && iframeRect.width ? "".concat(iframeRect.width, "px") : '100%';
    };
    PDFBuilder.prototype.onDragStart = function (e) {
        // Taking the current offset of a dragged item relative to the cursor
        var _a = e.offsetX, offsetX = _a === void 0 ? 0 : _a, _b = e.offsetY, offsetY = _b === void 0 ? 0 : _b;
        this.itemOffsetX = offsetX;
        this.itemOffsetY = offsetY;
        e.dataTransfer.setData('text', '');
        this.updateDropzoneDimensions();
        this.addClass(this.refs.iframeDropzone, 'enabled');
        this.dropEmitted = false;
    };
    PDFBuilder.prototype.onDropzoneDrop = function (e) {
        this.dropEmitted = true;
        this.dropEvent = e;
        e.preventDefault();
        return false;
    };
    PDFBuilder.prototype.onDragEnd = function (e) {
        // IMPORTANT - must retrieve offsets BEFORE disabling the dropzone - offsets will
        // reflect absolute positioning if accessed after the target element is hidden
        var iframeRect = this.webform.refs.iframeContainer.getBoundingClientRect();
        var layerX = this.dropEvent ? this.dropEvent.layerX : null;
        var layerY = this.dropEvent ? this.dropEvent.layerY : null;
        var WIDTH = 100;
        var HEIGHT = 20;
        // Always disable the dropzone on drag end
        this.removeClass(this.refs.iframeDropzone, 'enabled');
        // If there hasn't been a drop event on the dropzone, we're done
        if (!this.dropEvent) {
            // a 'drop' event may not be emited in the chrome browser when using a Mac, therefore an additional check has been added
            // eslint-disable-next-line no-undef
            if (!this.dropEmitted && ((0, utils_1.getBrowserInfo)().chrome || (0, utils_1.getBrowserInfo)().edge) && globalThis.navigator.userAgentData.platform === 'macOS' && iframeRect.left < e.clientX && iframeRect.top < e.clientY) {
                this.dropEvent = e;
                this.dropEvent.dataTransfer.effectAllowed = 'all';
                this.dropEmitted = true;
            }
            else {
                return;
            }
        }
        var element = e.target;
        var type = element.getAttribute('data-type');
        var key = element.getAttribute('data-key');
        var group = element.getAttribute('data-group');
        var schema = (0, utils_1.fastCloneDeep)(this.schemas[type]);
        if (key && group) {
            var info = this.getComponentInfo(key, group);
            lodash_1.default.merge(schema, info);
        }
        // Set a unique key for this component.
        builder_1.default.uniquify([this.webform._form], schema);
        this.webform._form.components.push(schema);
        schema.overlay = {
            top: layerY ? (layerY - this.itemOffsetY + HEIGHT) : (e.clientY - iframeRect.top - (this.itemOffsetY - HEIGHT) * 2),
            left: layerX ? (layerX - this.itemOffsetX) : (e.clientX - iframeRect.left - this.itemOffsetX * 2),
            width: WIDTH,
            height: HEIGHT
        };
        this.webform.addComponent(schema, {}, null, true);
        this.webform.postMessage({ name: 'addElement', data: schema });
        this.emit('addComponent', schema, this.webform, schema.key, this.webform.component.components.length, !this.options.noNewEdit && !schema.noNewEdit);
        // Delete the stored drop event now that it's been handled
        this.dropEvent = null;
        e.target.style.cursor = 'default';
    };
    PDFBuilder.prototype.highlightInvalidComponents = function () {
        var _this = this;
        var repeatablePaths = this.findRepeatablePaths();
        // update elements which path was duplicated if any pathes have been changed
        if (!lodash_1.default.isEqual(this.repeatablePaths, repeatablePaths)) {
            (0, formUtils_1.eachComponent)(this.webform.getComponents(), function (comp, path) {
                if (_this.repeatablePaths.includes(path)) {
                    _this.webform.postMessage({ name: 'updateElement', data: comp.component });
                }
            });
            this.repeatablePaths = repeatablePaths;
        }
        if (!repeatablePaths.length) {
            return;
        }
        (0, formUtils_1.eachComponent)(this.webform.getComponents(), function (comp, path) {
            if (_this.repeatablePaths.includes(path)) {
                _this.webform.postMessage({
                    name: 'showBuilderErrors',
                    data: {
                        compId: comp.component.id,
                        errorMessage: "API Key is not unique: ".concat(comp.key),
                    }
                });
            }
        });
    };
    return PDFBuilder;
}(WebformBuilder_1.default));
exports.default = PDFBuilder;
//# sourceMappingURL=PDFBuilder.js.map