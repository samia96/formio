"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xhr_1 = __importDefault(require("./xhr"));
function azure(formio) {
    return {
        uploadFile: function (file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, abortCallback) {
            return xhr_1.default.upload(formio, 'azure', function (xhr, response) {
                xhr.openAndSetHeaders('PUT', response.url);
                xhr.setRequestHeader('Content-Type', file.type);
                xhr.setRequestHeader('x-ms-blob-type', 'BlockBlob');
                return file;
            }, file, fileName, dir, progressCallback, groupPermissions, groupId, abortCallback).then(function (response) {
                return {
                    storage: 'azure',
                    name: xhr_1.default.path([dir, fileName]),
                    size: file.size,
                    type: file.type,
                    groupPermissions: groupPermissions,
                    groupId: groupId,
                    key: response.key,
                };
            });
        },
        downloadFile: function (file) {
            return formio.makeRequest('file', "".concat(formio.formUrl, "/storage/azure?name=").concat(xhr_1.default.trim(file.name)), 'GET');
        },
        deleteFile: function deleteFile(fileInfo) {
            var url = "".concat(formio.formUrl, "/storage/azure?name=").concat(xhr_1.default.trim(fileInfo.name), "&key=").concat(xhr_1.default.trim(fileInfo.key));
            return formio.makeRequest('', url, 'delete');
        }
    };
}
azure.title = 'Azure File Services';
exports.default = azure;
//# sourceMappingURL=azure.js.map