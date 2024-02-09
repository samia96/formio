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
/* global Quill */
var TextField_1 = __importDefault(require("../textfield/TextField"));
var lodash_1 = __importDefault(require("lodash"));
var utils_1 = require("../../utils/utils");
var TextAreaComponent = /** @class */ (function (_super) {
    __extends(TextAreaComponent, _super);
    function TextAreaComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextAreaComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return TextField_1.default.schema.apply(TextField_1.default, __spreadArray([{
                type: 'textarea',
                label: 'Text Area',
                key: 'textArea',
                rows: 3,
                wysiwyg: false,
                editor: '',
                fixedSize: true,
                inputFormat: 'html',
                validate: {
                    minWords: '',
                    maxWords: ''
                }
            }], extend, false));
    };
    Object.defineProperty(TextAreaComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Text Area',
                group: 'basic',
                icon: 'font',
                documentation: '/userguide/form-building/form-components#text-area',
                weight: 20,
                schema: TextAreaComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    TextAreaComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        this.editors = [];
        this.editorsReady = [];
        this.updateSizes = [];
        // Never submit on enter for text areas.
        this.options.submitOnEnter = false;
    };
    Object.defineProperty(TextAreaComponent.prototype, "defaultSchema", {
        get: function () {
            return TextAreaComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextAreaComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.inputInfo;
            info.type = this.component.wysiwyg ? 'div' : 'textarea';
            if (this.component.rows) {
                info.attr.rows = this.component.rows;
            }
            return info;
        },
        enumerable: false,
        configurable: true
    });
    TextAreaComponent.prototype.validateMultiple = function () {
        return !this.isJsonValue;
    };
    TextAreaComponent.prototype.renderElement = function (value, index) {
        var info = this.inputInfo;
        info.attr = info.attr || {};
        info.content = value;
        if ((this.options.readOnly || this.disabled) && !this.isHtmlRenderMode()) {
            var elementStyle = this.info.attr.style || '';
            var children = "<div ref=\"input\" class=\"formio-editor-read-only-content\" ".concat(elementStyle ? "style='".concat(elementStyle, "'") : '', "></div>");
            return this.renderTemplate('well', {
                children: children,
                nestedKey: this.key,
                value: value
            });
        }
        return this.renderTemplate('input', {
            prefix: this.prefix,
            suffix: this.suffix,
            input: info,
            value: value,
            index: index
        });
    };
    Object.defineProperty(TextAreaComponent.prototype, "autoExpand", {
        get: function () {
            return this.component.autoExpand;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Updates the editor value.
     *
     * @param newValue
     */
    TextAreaComponent.prototype.updateEditorValue = function (index, newValue) {
        newValue = this.getConvertedValue(this.trimBlanks(newValue));
        var dataValue = this.dataValue;
        if (this.component.multiple && Array.isArray(dataValue)) {
            var newArray = lodash_1.default.clone(dataValue);
            newArray[index] = newValue;
            newValue = newArray;
        }
        if ((!lodash_1.default.isEqual(newValue, dataValue)) && (!lodash_1.default.isEmpty(newValue) || !lodash_1.default.isEmpty(dataValue))) {
            this.updateValue(newValue, {
                modified: !this.autoModified
            }, index);
        }
        this.autoModified = false;
    };
    TextAreaComponent.prototype.attachElement = function (element, index) {
        var _this_1 = this;
        if (this.autoExpand && (this.isPlain || this.options.readOnly || this.options.htmlView)) {
            if (element.nodeName === 'TEXTAREA') {
                this.addAutoExpanding(element, index);
            }
        }
        if (this.options.readOnly) {
            return element;
        }
        if (this.component.wysiwyg && !this.component.editor) {
            this.component.editor = 'ckeditor';
        }
        var settings = lodash_1.default.isEmpty(this.component.wysiwyg) ?
            this.wysiwygDefault[this.component.editor] || this.wysiwygDefault.default
            : this.component.wysiwyg;
        // Keep track of when this editor is ready.
        this.editorsReady[index] = new Promise(function (editorReady) {
            // Attempt to add a wysiwyg editor. In order to add one, it must be included on the global scope.
            switch (_this_1.component.editor) {
                case 'ace':
                    if (!settings) {
                        settings = {};
                    }
                    settings.mode = _this_1.component.as ? "ace/mode/".concat(_this_1.component.as) : 'ace/mode/javascript';
                    _this_1.addAce(element, settings, function (newValue) { return _this_1.updateEditorValue(index, newValue); }).then(function (ace) {
                        _this_1.editors[index] = ace;
                        var dataValue = _this_1.dataValue;
                        dataValue = (_this_1.component.multiple && Array.isArray(dataValue)) ? dataValue[index] : dataValue;
                        ace.setValue(_this_1.setConvertedValue(dataValue, index));
                        editorReady(ace);
                        return ace;
                    }).catch(function (err) { return console.warn(err); });
                    break;
                case 'quill':
                    // Normalize the configurations for quill.
                    if (settings.hasOwnProperty('toolbarGroups') || settings.hasOwnProperty('toolbar')) {
                        console.warn('The WYSIWYG settings are configured for CKEditor. For this renderer, you will need to use configurations for the Quill Editor. See https://quilljs.com/docs/configuration for more information.');
                        settings = _this_1.wysiwygDefault.quill;
                    }
                    // Add the quill editor.
                    _this_1.addQuill(element, settings, function () { return _this_1.updateEditorValue(index, _this_1.editors[index].root.innerHTML); }).then(function (quill) {
                        _this_1.editors[index] = quill;
                        if (_this_1.component.isUploadEnabled) {
                            var _this_2 = _this_1;
                            quill.getModule('uploader').options.handler = function () {
                                var _a;
                                var args = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    args[_i] = arguments[_i];
                                }
                                //we need initial 'this' because quill calls this method with its own context and we need some inner quill methods exposed in it
                                //we also need current component instance as we use some fields and methods from it as well
                                (_a = _this_2.imageHandler).call.apply(_a, __spreadArray([_this_2, this], args, false));
                            };
                        }
                        quill.root.spellcheck = _this_1.component.spellcheck;
                        if (_this_1.options.readOnly || _this_1.disabled) {
                            quill.disable();
                        }
                        var dataValue = _this_1.dataValue;
                        dataValue = (_this_1.component.multiple && Array.isArray(dataValue)) ? dataValue[index] : dataValue;
                        quill.setContents(quill.clipboard.convert({ html: _this_1.setConvertedValue(dataValue, index) }));
                        editorReady(quill);
                        return quill;
                    }).catch(function (err) { return console.warn(err); });
                    break;
                case 'ckeditor':
                    settings = settings || {};
                    settings.rows = _this_1.component.rows;
                    _this_1.addCKE(element, settings, function (newValue) { return _this_1.updateEditorValue(index, newValue); })
                        .then(function (editor) {
                        _this_1.editors[index] = editor;
                        var dataValue = _this_1.dataValue;
                        dataValue = (_this_1.component.multiple && Array.isArray(dataValue)) ? dataValue[index] : dataValue;
                        var value = _this_1.setConvertedValue(dataValue, index);
                        var isReadOnly = _this_1.options.readOnly || _this_1.disabled;
                        // Use ckeditor 4 in IE browser
                        if ((0, utils_1.getBrowserInfo)().ie) {
                            editor.on('instanceReady', function () {
                                editor.setReadOnly(isReadOnly);
                                editor.setData(value);
                            });
                        }
                        else {
                            var numRows = parseInt(_this_1.component.rows, 10);
                            if (lodash_1.default.isFinite(numRows) && lodash_1.default.has(editor, 'ui.view.editable.editableElement')) {
                                // Default height is 21px with 10px margin + a 14px top margin.
                                var editorHeight = (numRows * 31) + 14;
                                editor.ui.view.editable.editableElement.style.height = "".concat((editorHeight), "px");
                            }
                            editor.isReadOnly = isReadOnly;
                            editor.data.set(value);
                        }
                        editorReady(editor);
                        return editor;
                    });
                    break;
                default:
                    _super.prototype.attachElement.call(_this_1, element, index);
                    break;
            }
        });
        return element;
    };
    TextAreaComponent.prototype.attach = function (element) {
        var attached = _super.prototype.attach.call(this, element);
        // Make sure we restore the value after attaching since wysiwygs and readonly texts need an additional set.
        this.restoreValue();
        return attached;
    };
    TextAreaComponent.prototype.imageHandler = function (moduleInstance, range, files) {
        var _this_1 = this;
        var quillInstance = moduleInstance.quill;
        if (!files || !files.length) {
            console.warn('No files selected');
            return;
        }
        quillInstance.enable(false);
        var _a = this.component, uploadStorage = _a.uploadStorage, uploadUrl = _a.uploadUrl, uploadOptions = _a.uploadOptions, uploadDir = _a.uploadDir, fileKey = _a.fileKey;
        var requestData;
        this.fileService
            .uploadFile(uploadStorage, files[0], (0, utils_1.uniqueName)(files[0].name), uploadDir || '', //should pass empty string if undefined
        null, uploadUrl, uploadOptions, fileKey)
            .then(function (result) {
            requestData = result;
            return _this_1.fileService.downloadFile(result);
        })
            .then(function (result) {
            quillInstance.enable(true);
            var Delta = Quill.import('delta');
            quillInstance.updateContents(new Delta()
                .retain(range.index)
                .delete(range.length)
                .insert({
                image: result.url
            }, {
                alt: JSON.stringify(requestData),
            }), Quill.sources.USER);
        }).catch(function (error) {
            console.warn('Quill image upload failed');
            console.warn(error);
            quillInstance.enable(true);
        });
    };
    Object.defineProperty(TextAreaComponent.prototype, "isPlain", {
        get: function () {
            return (!this.component.wysiwyg && !this.component.editor);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(TextAreaComponent.prototype, "htmlView", {
        get: function () {
            return this.options.readOnly && (this.component.editor || this.component.wysiwyg);
        },
        enumerable: false,
        configurable: true
    });
    TextAreaComponent.prototype.setValueAt = function (index, value, flags) {
        var _this_1 = this;
        if (flags === void 0) { flags = {}; }
        _super.prototype.setValueAt.call(this, index, value, flags);
        if (this.editorsReady[index]) {
            var setEditorsValue = function (flags) { return function (editor) {
                if (!flags.skipWysiwyg) {
                    _this_1.autoModified = true;
                    switch (_this_1.component.editor) {
                        case 'ace':
                            editor.setValue(_this_1.setConvertedValue(value, index));
                            break;
                        case 'quill':
                            if (_this_1.component.isUploadEnabled) {
                                _this_1.setAsyncConvertedValue(value)
                                    .then(function (result) {
                                    var content = editor.clipboard.convert({ html: result });
                                    editor.setContents(content);
                                });
                            }
                            else {
                                var convertedValue = _this_1.setConvertedValue(value, index);
                                var content = editor.clipboard.convert({ html: convertedValue });
                                editor.setContents(content);
                            }
                            break;
                        case 'ckeditor':
                            editor.data.set(_this_1.setConvertedValue(value, index));
                            break;
                    }
                }
            }; };
            this.editorsReady[index].then(setEditorsValue(lodash_1.default.clone(flags)));
        }
    };
    TextAreaComponent.prototype.setValue = function (value, flags) {
        var _this_1 = this;
        if (flags === void 0) { flags = {}; }
        if (this.isPlain || this.options.readOnly || this.disabled) {
            value = (this.component.multiple && Array.isArray(value)) ?
                value.map(function (val, index) { return _this_1.setConvertedValue(val, index); }) :
                this.setConvertedValue(value);
            return _super.prototype.setValue.call(this, value, flags);
        }
        flags.skipWysiwyg = value === '' && flags.resetValue ? false : lodash_1.default.isEqual(value, this.getValue());
        return _super.prototype.setValue.call(this, value, flags);
    };
    TextAreaComponent.prototype.setContent = function (element, content, forceSanitize) {
        _super.prototype.setContent.call(this, element, content, forceSanitize, {
            addAttr: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'],
            addTags: ['iframe'],
        });
    };
    TextAreaComponent.prototype.setReadOnlyValue = function (value, index) {
        index = index || 0;
        if (this.options.readOnly || this.disabled) {
            if (this.refs.input && this.refs.input[index]) {
                if (this.component.inputFormat === 'plain') {
                    this.refs.input[index].innerText = this.isPlain ? value : this.interpolate(value, {}, { noeval: true });
                }
                else {
                    this.setContent(this.refs.input[index], this.isPlain ? value : this.interpolate(value, {}, { noeval: true }), this.shouldSanitizeValue);
                }
            }
        }
    };
    Object.defineProperty(TextAreaComponent.prototype, "isJsonValue", {
        get: function () {
            return this.component.as && this.component.as === 'json';
        },
        enumerable: false,
        configurable: true
    });
    TextAreaComponent.prototype.setConvertedValue = function (value, index) {
        if (this.isJsonValue && !lodash_1.default.isNil(value)) {
            try {
                value = JSON.stringify(value, null, 2);
            }
            catch (err) {
                console.warn(err);
            }
        }
        if (!lodash_1.default.isString(value)) {
            value = '';
        }
        this.setReadOnlyValue(value, index);
        return value;
    };
    TextAreaComponent.prototype.setAsyncConvertedValue = function (value) {
        if (this.isJsonValue && value) {
            try {
                value = JSON.stringify(value, null, 2);
            }
            catch (err) {
                console.warn(err);
            }
        }
        if (!lodash_1.default.isString(value)) {
            value = '';
        }
        var htmlDoc = new DOMParser().parseFromString(value, 'text/html');
        var images = htmlDoc.getElementsByTagName('img');
        if (images.length) {
            return this.setImagesUrl(images)
                .then(function () {
                value = htmlDoc.getElementsByTagName('body')[0].innerHTML;
                return value;
            });
        }
        else {
            return Promise.resolve(value);
        }
    };
    TextAreaComponent.prototype.setImagesUrl = function (images) {
        var _this_1 = this;
        return Promise.all(lodash_1.default.map(images, function (image) {
            var requestData;
            try {
                requestData = JSON.parse(image.getAttribute('alt'));
            }
            catch (error) {
                console.warn(error);
            }
            return _this_1.fileService.downloadFile(requestData)
                .then(function (result) {
                image.setAttribute('src', result.url);
            });
        }));
    };
    TextAreaComponent.prototype.addAutoExpanding = function (textarea, index) {
        var heightOffset = null;
        var previousHeight = null;
        var changeOverflow = function (value) {
            var width = textarea.style.width;
            textarea.style.width = '0px';
            textarea.offsetWidth;
            textarea.style.width = width;
            textarea.style.overflowY = value;
        };
        var preventParentScroll = function (element, changeSize) {
            var nodeScrolls = [];
            while (element && element.parentNode && element.parentNode instanceof Element) {
                if (element.parentNode.scrollTop) {
                    nodeScrolls.push({
                        node: element.parentNode,
                        scrollTop: element.parentNode.scrollTop,
                    });
                }
                element = element.parentNode;
            }
            changeSize();
            nodeScrolls.forEach(function (nodeScroll) {
                nodeScroll.node.scrollTop = nodeScroll.scrollTop;
            });
        };
        var resize = function () {
            if (textarea.scrollHeight === 0) {
                return;
            }
            preventParentScroll(textarea, function () {
                textarea.style.height = '';
                textarea.style.height = "".concat(textarea.scrollHeight + heightOffset, "px");
            });
        };
        var update = lodash_1.default.debounce(function () {
            resize();
            var styleHeight = Math.round(parseFloat(textarea.style.height));
            var computed = window.getComputedStyle(textarea, null);
            var currentHeight = textarea.offsetHeight;
            if (currentHeight < styleHeight && computed.overflowY === 'hidden') {
                changeOverflow('scroll');
            }
            else if (computed.overflowY !== 'hidden') {
                changeOverflow('hidden');
            }
            resize();
            currentHeight = textarea.offsetHeight;
            if (previousHeight !== currentHeight) {
                previousHeight = currentHeight;
                update();
            }
        }, 200);
        var computedStyle = window.getComputedStyle(textarea, null);
        textarea.style.resize = 'none';
        heightOffset = parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.borderBottomWidth) || 0;
        if (window) {
            this.addEventListener(window, 'resize', update);
        }
        this.addEventListener(textarea, 'input', update);
        this.on('initialized', update);
        this.updateSizes[index] = update;
        update();
    };
    TextAreaComponent.prototype.trimBlanks = function (value) {
        if (!value || this.isPlain) {
            return value;
        }
        var trimBlanks = function (value) {
            var nbsp = '<p>&nbsp;</p>';
            var br = '<p><br></p>';
            var brNbsp = '<p><br>&nbsp;</p>';
            var regExp = new RegExp("^".concat(nbsp, "|").concat(nbsp, "$|^").concat(br, "|").concat(br, "$|^").concat(brNbsp, "|").concat(brNbsp, "$"), 'g');
            return typeof value === 'string' ? value.replace(regExp, '') : value;
        };
        if (Array.isArray(value)) {
            value.forEach(function (input, index) {
                value[index] = trimBlanks(input);
            });
        }
        else {
            value = trimBlanks(value);
        }
        return value;
    };
    TextAreaComponent.prototype.onChange = function (flags, fromRoot) {
        var changed = _super.prototype.onChange.call(this, flags, fromRoot);
        this.updateSizes.forEach(function (updateSize) { return updateSize(); });
        return changed;
    };
    TextAreaComponent.prototype.hasChanged = function (newValue, oldValue) {
        return _super.prototype.hasChanged.call(this, this.trimBlanks(newValue), this.trimBlanks(oldValue));
    };
    TextAreaComponent.prototype.isEmpty = function (value) {
        if (value === void 0) { value = this.dataValue; }
        return _super.prototype.isEmpty.call(this, this.trimBlanks(value));
    };
    Object.defineProperty(TextAreaComponent.prototype, "defaultValue", {
        get: function () {
            var defaultValue = _super.prototype.defaultValue;
            if (this.component.editor === 'quill' && !defaultValue) {
                defaultValue = '<p><br></p>';
            }
            return defaultValue;
        },
        enumerable: false,
        configurable: true
    });
    TextAreaComponent.prototype.getConvertedValue = function (value) {
        if (this.isJsonValue && value) {
            try {
                value = JSON.parse(value);
            }
            catch (err) {
                // console.warn(err);
            }
        }
        return value;
    };
    TextAreaComponent.prototype.detach = function () {
        var _this_1 = this;
        // Destroy all editors.
        this.editors.forEach(function (editor) {
            if (editor.destroy) {
                editor.destroy();
            }
        });
        this.editors = [];
        this.editorsReady = [];
        this.updateSizes.forEach(function (updateSize) { return _this_1.removeEventListener(window, 'resize', updateSize); });
        this.updateSizes = [];
        _super.prototype.detach.call(this);
    };
    TextAreaComponent.prototype.getValue = function () {
        if (this.isPlain) {
            return this.getConvertedValue(_super.prototype.getValue.call(this));
        }
        return this.dataValue;
    };
    TextAreaComponent.prototype.focus = function () {
        var _this_1 = this;
        var _a, _b, _c;
        _super.prototype.focus.call(this);
        switch (this.component.editor) {
            case 'ckeditor': {
                // Wait for the editor to be ready.
                (_a = this.editorsReady[0]) === null || _a === void 0 ? void 0 : _a.then(function () {
                    var _a, _b;
                    if ((_b = (_a = _this_1.editors[0].editing) === null || _a === void 0 ? void 0 : _a.view) === null || _b === void 0 ? void 0 : _b.focus) {
                        _this_1.editors[0].editing.view.focus();
                    }
                    _this_1.element.scrollIntoView();
                }).catch(function (err) {
                    console.warn('An editor did not initialize properly when trying to focus:', err);
                });
                break;
            }
            case 'ace': {
                (_b = this.editorsReady[0]) === null || _b === void 0 ? void 0 : _b.then(function () {
                    _this_1.editors[0].focus();
                    _this_1.element.scrollIntoView();
                }).catch(function (err) {
                    console.warn('An editor did not initialize properly when trying to focus:', err);
                });
                break;
            }
            case 'quill': {
                (_c = this.editorsReady[0]) === null || _c === void 0 ? void 0 : _c.then(function () {
                    _this_1.editors[0].focus();
                }).catch(function (err) {
                    console.warn('An editor did not initialize properly when trying to focus:', err);
                });
                break;
            }
        }
    };
    return TextAreaComponent;
}(TextField_1.default));
exports.default = TextAreaComponent;
//# sourceMappingURL=TextArea.js.map