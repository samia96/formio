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
var lodash_1 = __importDefault(require("lodash"));
var utils_1 = require("../../../utils/utils");
var ComponentModal = /** @class */ (function () {
    function ComponentModal(component, element, isOpened, currentValue) {
        this.isOpened = isOpened;
        this.component = component;
        this.element = element;
        this.currentValue = (0, utils_1.fastCloneDeep)(currentValue !== null && currentValue !== void 0 ? currentValue : this.component.getValue());
        this.dataLoaded = false;
        this.init();
    }
    ComponentModal.render = function (component, data, topLevel) {
        var children = component.renderTemplate('component', data, topLevel);
        return component.renderTemplate('componentModal', __assign(__assign({}, data), { children: children }));
    };
    Object.defineProperty(ComponentModal.prototype, "refs", {
        get: function () {
            return this.component.refs;
        },
        enumerable: false,
        configurable: true
    });
    ComponentModal.prototype.init = function () {
        var _this = this;
        this.openModalListener = this.openModalHandler.bind(this);
        this.showDialogListener = function (event) {
            if (_this.isValueChanged() && !_this.component.disabled) {
                _this.showDialog();
            }
            else {
                _this.closeModalHandler(event);
            }
        };
        this.closeModalListener = this.closeModalHandler.bind(this);
        this.saveModalListener = this.saveModalValueHandler.bind(this);
        this.closeDialogListener = this.closeDialog.bind(this);
        this.saveDialogListener = this.saveDialog.bind(this);
        this.loadRefs();
    };
    ComponentModal.prototype.setValue = function (value) {
        if (this.dataLoaded && this.currentValue === value) {
            return;
        }
        this.currentValue = (0, utils_1.fastCloneDeep)(value);
        this.dataLoaded = true;
        this.updateView();
    };
    ComponentModal.prototype.setOpenModalElement = function (template) {
        var _a;
        if ((_a = this.component) === null || _a === void 0 ? void 0 : _a.visible) {
            this.openModalTemplate = template;
            this.component.setContent(this.refs.openModalWrapper, template);
            this.loadRefs();
            this.setEventListeners();
            if (this.isOpened) {
                this.refs.modalWrapper.classList.add('formio-dialog-disabled-animation');
                this.openModal();
            }
        }
    };
    Object.defineProperty(ComponentModal.prototype, "templateRefs", {
        get: function () {
            return {
                modalOverlay: 'single',
                modalContents: 'single',
                modalClose: 'single',
                openModalWrapper: 'single',
                openModal: 'single',
                modalSave: 'single',
                modalWrapper: 'single',
            };
        },
        enumerable: false,
        configurable: true
    });
    ComponentModal.prototype.loadRefs = function () {
        this.component.loadRefs(this.element, this.templateRefs);
    };
    ComponentModal.prototype.removeEventListeners = function () {
        this.component.removeEventListener(this.refs.openModal, 'click', this.openModalListener);
        this.component.removeEventListener(this.refs.modalOverlay, 'click', this.refs.modalSave ? this.showDialogListener : this.saveModalListener);
        this.component.removeEventListener(this.refs.modalClose, 'click', this.showDialogListener);
        this.component.removeEventListener(this.refs.modalSave, 'click', this.saveModalListener);
    };
    ComponentModal.prototype.setEventListeners = function () {
        this.removeEventListeners();
        this.component.addEventListener(this.refs.openModal, 'click', this.openModalListener);
        this.component.addEventListener(this.refs.modalOverlay, 'click', this.refs.modalSave ? this.showDialogListener : this.saveModalListener);
        this.component.addEventListener(this.refs.modalClose, 'click', this.showDialogListener);
        this.component.addEventListener(this.refs.modalSave, 'click', this.saveModalListener);
    };
    ComponentModal.prototype.isValueChanged = function () {
        var componentValue = this.component.getValue();
        var currentValue = this.currentValue;
        //excluding metadata comparison for components that have it in dataValue (for ex. nested forms)
        if (componentValue && componentValue.data && componentValue.metadata) {
            componentValue = this.component.getValue().data;
            currentValue = this.currentValue.data;
        }
        return !lodash_1.default.isEqual((0, utils_1.fastCloneDeep)(componentValue), currentValue);
    };
    ComponentModal.prototype.setOpenEventListener = function () {
        var _a;
        this.component.removeEventListener(this.refs.openModal, 'click', this.openModalListener);
        this.component.loadRefs((_a = this.refs.openModalWrapper) !== null && _a !== void 0 ? _a : this.element, {
            'openModal': 'single',
        });
        this.component.addEventListener(this.refs.openModal, 'click', this.openModalListener);
    };
    ComponentModal.prototype.openModalHandler = function (event) {
        event.preventDefault();
        this.openModal();
    };
    ComponentModal.prototype.positionOverElement = function () {
        // Position the modal just over the element on the page.
        var elementOffset = this.element.getBoundingClientRect().top;
        var modalHeight = this.refs.modalContents.getBoundingClientRect().height;
        var modalTop = elementOffset - modalHeight - 10;
        modalTop = modalTop > 0 ? modalTop : 10;
        this.refs.modalWrapper.style.paddingTop = "".concat(modalTop, "px");
    };
    ComponentModal.prototype.openModal = function () {
        this.isOpened = true;
        this.refs.modalWrapper.classList.remove('component-rendering-hidden');
        if (this.component.component.type === 'signature') {
            // Position signature modals just above the signature button.
            this.positionOverElement();
        }
    };
    ComponentModal.prototype.updateView = function () {
        var template = lodash_1.default.isEqual(this.currentValue, this.component.defaultValue)
            ? this.openModalTemplate
            : this.component.getModalPreviewTemplate();
        this.component.setContent(this.refs.openModalWrapper, template);
        this.setOpenEventListener();
    };
    ComponentModal.prototype.closeModal = function () {
        this.refs.modalWrapper.classList.remove('formio-dialog-disabled-animation');
        this.refs.modalWrapper.classList.add('component-rendering-hidden');
        this.isOpened = false;
        this.updateView();
    };
    ComponentModal.prototype.closeModalHandler = function (event) {
        event.preventDefault();
        if (!this.component.disabled) {
            this.component.setValue(lodash_1.default.cloneDeep(this.currentValue), { resetValue: true });
        }
        this.closeModal();
    };
    ComponentModal.prototype.showDialog = function () {
        this.dialogElement = this.component.ce('div');
        var dialogContent = "\n      <h3 ref=\"dialogHeader\">".concat(this.component.t('Do you want to clear changes?'), "</h3>\n      <div style=\"display:flex; justify-content: flex-end;\">\n        <button ref=\"dialogCancelButton\" class=\"btn btn-secondary\">").concat(this.component.t('Cancel'), "</button>\n        <button ref=\"dialogYesButton\" class=\"btn btn-danger\">").concat(this.component.t('Yes, delete it'), "</button>\n      </div>\n    ");
        this.dialogElement.innerHTML = dialogContent;
        this.dialogElement.refs = {};
        this.component.loadRefs.call(this.dialogElement, this.dialogElement, {
            dialogHeader: 'single',
            dialogCancelButton: 'single',
            dialogYesButton: 'single',
        });
        this.dialog = this.component.createModal(this.dialogElement);
        this.component.addEventListener(this.dialogElement.refs.dialogYesButton, 'click', this.saveDialogListener);
        this.component.addEventListener(this.dialogElement.refs.dialogCancelButton, 'click', this.closeDialogListener);
    };
    ComponentModal.prototype.closeDialog = function (event) {
        event.preventDefault();
        this.dialog.close();
        this.component.removeEventListener(this.dialogElement.refs.dialogYesButton, 'click', this.saveDialogListener);
        this.component.removeEventListener(this.dialogElement.refs.dialogCancelButton, 'click', this.closeDialogListener);
    };
    ComponentModal.prototype.saveDialog = function (event) {
        this.closeDialog(event);
        this.closeModalHandler(event);
    };
    ComponentModal.prototype.saveModalValueHandler = function (event) {
        var _a;
        event.preventDefault();
        this.currentValue = (0, utils_1.fastCloneDeep)((_a = this.component.dataValue) !== null && _a !== void 0 ? _a : this.component.getValue());
        this.closeModal();
    };
    return ComponentModal;
}());
exports.default = ComponentModal;
//# sourceMappingURL=ComponentModal.js.map