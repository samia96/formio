"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormioUploadAdapterPlugin = void 0;
var utils_1 = require("../../utils/utils");
/**
 * UploadAdapter for CKEditor https://ckeditor.com/docs/ckeditor5/latest/framework/guides/deep-dive/upload-adapter.html
 */
var FormioUploadAdapter = /** @class */ (function () {
    function FormioUploadAdapter(loader, fileService, component) {
        this.loader = loader;
        this.fileService = fileService;
        this.component = component;
    }
    FormioUploadAdapter.prototype.upload = function () {
        var _this = this;
        return this.loader.file
            .then(function (file) { return new Promise(function (resolve, reject) {
            var _a;
            var _b = _this.component.component, uploadStorage = _b.uploadStorage, uploadUrl = _b.uploadUrl, uploadOptions = _b.uploadOptions, uploadDir = _b.uploadDir, fileKey = _b.fileKey;
            var uploadParams = [
                uploadStorage,
                file,
                (0, utils_1.uniqueName)(file.name),
                uploadDir || '',
                function (evt) { return _this.onUploadProgress(evt); },
                uploadUrl,
                uploadOptions,
                fileKey,
                null,
                null
            ];
            var uploadPromise = (_a = _this.fileService).uploadFile.apply(_a, __spreadArray(__spreadArray([], uploadParams, false), [function () { return _this.component.emit('fileUploadingStart', uploadPromise); }], false)).then(function (result) {
                return _this.fileService.downloadFile(result);
            }).then(function (result) {
                return resolve({
                    default: result.url
                });
            }).catch(function (err) {
                console.warn('An Error occured while uploading file', err);
                reject(err);
            }).finally(function () {
                _this.component.emit('fileUploadingEnd', uploadPromise);
            });
        }); });
    };
    FormioUploadAdapter.prototype.abort = function () { };
    FormioUploadAdapter.prototype.onUploadProgress = function (evt) {
        if (evt.lengthComputable) {
            this.loader.uploadTotal = evt.total;
            this.loader.uploaded = evt.loaded;
        }
    };
    return FormioUploadAdapter;
}());
var getFormioUploadAdapterPlugin = function (fileService, component) { return function (editor) {
    editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
        return new FormioUploadAdapter(loader, fileService, component);
    };
}; };
exports.getFormioUploadAdapterPlugin = getFormioUploadAdapterPlugin;
//# sourceMappingURL=uploadAdapter.js.map