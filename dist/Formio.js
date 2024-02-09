"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formio = void 0;
var core_1 = require("@formio/core");
Object.defineProperty(exports, "Formio", { enumerable: true, get: function () { return core_1.Formio; } });
var CDN_1 = __importDefault(require("./CDN"));
var providers_1 = __importDefault(require("./providers"));
core_1.Formio.cdn = new CDN_1.default();
core_1.Formio.Providers = providers_1.default;
core_1.Formio.version = 'FORMIO_VERSION';
var isNil = function (val) { return val === null || val === undefined; };
core_1.Formio.prototype.uploadFile = function (storage, file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, uploadStartCallback, abortCallback, multipartOptions) {
    var _this = this;
    var requestArgs = {
        provider: storage,
        method: 'upload',
        file: file,
        fileName: fileName,
        dir: dir
    };
    fileKey = fileKey || 'file';
    var request = core_1.Formio.pluginWait('preRequest', requestArgs)
        .then(function () {
        return core_1.Formio.pluginGet('fileRequest', requestArgs)
            .then(function (result) {
            if (storage && isNil(result)) {
                var Provider = providers_1.default.getProvider('storage', storage);
                if (Provider) {
                    var provider = new Provider(_this);
                    if (uploadStartCallback) {
                        uploadStartCallback();
                    }
                    return provider.uploadFile(file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, abortCallback, multipartOptions);
                }
                else {
                    throw ('Storage provider not found');
                }
            }
            return result || { url: '' };
        });
    });
    return core_1.Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
};
core_1.Formio.prototype.downloadFile = function (file, options) {
    var _this = this;
    var requestArgs = {
        method: 'download',
        file: file
    };
    var request = core_1.Formio.pluginWait('preRequest', requestArgs)
        .then(function () {
        return core_1.Formio.pluginGet('fileRequest', requestArgs)
            .then(function (result) {
            if (file.storage && isNil(result)) {
                var Provider = providers_1.default.getProvider('storage', file.storage);
                if (Provider) {
                    var provider = new Provider(_this);
                    return provider.downloadFile(file, options);
                }
                else {
                    throw ('Storage provider not found');
                }
            }
            return result || { url: '' };
        });
    });
    return core_1.Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
};
core_1.Formio.prototype.deleteFile = function (file, options) {
    var _this = this;
    var requestArgs = {
        method: 'delete',
        file: file
    };
    var request = core_1.Formio.pluginWait('preRequest', requestArgs)
        .then(function () {
        return core_1.Formio.pluginGet('fileRequest', requestArgs)
            .then(function (result) {
            if (file.storage && isNil(result)) {
                var Provider = providers_1.default.getProvider('storage', file.storage);
                if (Provider) {
                    var provider = new Provider(_this);
                    return provider.deleteFile(file, options);
                }
                else {
                    throw ('Storage provider not found');
                }
            }
            return result || { url: '' };
        });
    });
    return core_1.Formio.pluginAlter('wrapFileRequestPromise', request, requestArgs);
};
// For reverse compatability.
core_1.Formio.Promise = Promise;
//# sourceMappingURL=Formio.js.map