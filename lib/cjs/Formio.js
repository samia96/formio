"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formio = void 0;
const core_1 = require("@formio/core");
Object.defineProperty(exports, "Formio", { enumerable: true, get: function () { return core_1.Formio; } });
const CDN_1 = __importDefault(require("./CDN"));
const providers_1 = __importDefault(require("./providers"));
core_1.Formio.cdn = new CDN_1.default();
core_1.Formio.Providers = providers_1.default;
core_1.Formio.version = 'FORMIO_VERSION';
const isNil = (val) => val === null || val === undefined;
core_1.Formio.prototype.uploadFile = function (storage, file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, uploadStartCallback, abortCallback, multipartOptions) {
    const requestArgs = {
        provider: storage,
        method: 'upload',
        file: file,
        fileName: fileName,
        dir: dir
    };
    fileKey = fileKey || 'file';
    const request = core_1.Formio.pluginWait('preRequest', requestArgs)
        .then(() => {
        return core_1.Formio.pluginGet('fileRequest', requestArgs)
            .then((result) => {
            if (storage && isNil(result)) {
                const Provider = providers_1.default.getProvider('storage', storage);
                if (Provider) {
                    const provider = new Provider(this);
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
    const requestArgs = {
        method: 'download',
        file: file
    };
    const request = core_1.Formio.pluginWait('preRequest', requestArgs)
        .then(() => {
        return core_1.Formio.pluginGet('fileRequest', requestArgs)
            .then((result) => {
            if (file.storage && isNil(result)) {
                const Provider = providers_1.default.getProvider('storage', file.storage);
                if (Provider) {
                    const provider = new Provider(this);
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
    const requestArgs = {
        method: 'delete',
        file: file
    };
    const request = core_1.Formio.pluginWait('preRequest', requestArgs)
        .then(() => {
        return core_1.Formio.pluginGet('fileRequest', requestArgs)
            .then((result) => {
            if (file.storage && isNil(result)) {
                const Provider = providers_1.default.getProvider('storage', file.storage);
                if (Provider) {
                    const provider = new Provider(this);
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
