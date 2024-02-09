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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var xhr_1 = __importDefault(require("./xhr"));
var util_1 = require("./util");
var AbortController = window.AbortController || require('abortcontroller-polyfill/dist/cjs-ponyfill');
function s3(formio) {
    return {
        uploadFile: function (file, fileName, dir, progressCallback, url, options, fileKey, groupPermissions, groupId, abortCallback, multipartOptions) {
            return __awaiter(this, void 0, void 0, function () {
                var xhrCallback, response;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            xhrCallback = function (xhr, response, abortCallback) { return __awaiter(_this, void 0, void 0, function () {
                                var abortController_1, abortSignal, parts, err_1, fd, key;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            response.data.fileName = fileName;
                                            response.data.key = xhr_1.default.path([response.data.key, dir, fileName]);
                                            if (!response.signed) return [3 /*break*/, 8];
                                            if (!(multipartOptions && Array.isArray(response.signed))) return [3 /*break*/, 6];
                                            abortController_1 = new AbortController();
                                            abortSignal = abortController_1.signal;
                                            if (typeof abortCallback === 'function') {
                                                abortCallback(function () { return abortController_1.abort(); });
                                            }
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 4, , 5]);
                                            return [4 /*yield*/, this.uploadParts(file, response.signed, response.data.headers, response.partSizeActual, multipartOptions, abortSignal)];
                                        case 2:
                                            parts = _a.sent();
                                            return [4 /*yield*/, (0, util_1.withRetries)(this.completeMultipartUpload, [response, parts, multipartOptions], 3)];
                                        case 3:
                                            _a.sent();
                                            return [2 /*return*/];
                                        case 4:
                                            err_1 = _a.sent();
                                            // abort in-progress fetch requests
                                            abortController_1.abort();
                                            // attempt to cancel the multipart upload
                                            this.abortMultipartUpload(response);
                                            throw err_1;
                                        case 5: return [3 /*break*/, 7];
                                        case 6:
                                            xhr.openAndSetHeaders('PUT', response.signed);
                                            xhr.setRequestHeader('Content-Type', file.type);
                                            Object.keys(response.data.headers).forEach(function (key) {
                                                xhr.setRequestHeader(key, response.data.headers[key]);
                                            });
                                            return [2 /*return*/, file];
                                        case 7: return [3 /*break*/, 9];
                                        case 8:
                                            fd = new FormData();
                                            for (key in response.data) {
                                                fd.append(key, response.data[key]);
                                            }
                                            fd.append('file', file);
                                            xhr.openAndSetHeaders('POST', response.url);
                                            return [2 /*return*/, fd];
                                        case 9: return [2 /*return*/];
                                    }
                                });
                            }); };
                            return [4 /*yield*/, xhr_1.default.upload(formio, 's3', xhrCallback, file, fileName, dir, progressCallback, groupPermissions, groupId, abortCallback, multipartOptions)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, {
                                    storage: 's3',
                                    name: fileName,
                                    bucket: response.bucket,
                                    key: response.data.key,
                                    url: xhr_1.default.path([response.url, response.data.key]),
                                    acl: response.data.acl,
                                    size: file.size,
                                    type: file.type
                                }];
                    }
                });
            });
        },
        completeMultipartUpload: function (serverResponse, parts, multipart) {
            return __awaiter(this, void 0, void 0, function () {
                var changeMessage, token, response, message;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            changeMessage = multipart.changeMessage;
                            changeMessage('Completing AWS S3 multipart upload...');
                            token = formio.getToken();
                            return [4 /*yield*/, fetch("".concat(formio.formUrl, "/storage/s3/multipart/complete"), {
                                    method: 'POST',
                                    headers: __assign({ 'Content-Type': 'application/json' }, (token ? { 'x-jwt-token': token } : {})),
                                    body: JSON.stringify({ parts: parts, uploadId: serverResponse.uploadId, key: serverResponse.key })
                                })];
                        case 1:
                            response = _a.sent();
                            return [4 /*yield*/, response.text()];
                        case 2:
                            message = _a.sent();
                            if (!response.ok) {
                                throw new Error(message);
                            }
                            // the AWS S3 SDK CompleteMultipartUpload command can return a HTTP 200 status header but still error;
                            // we need to parse, and according to AWS, to retry
                            if (message.match(/Error/)) {
                                throw new Error(message);
                            }
                            return [2 /*return*/];
                    }
                });
            });
        },
        abortMultipartUpload: function (serverResponse) {
            var uploadId = serverResponse.uploadId, key = serverResponse.key;
            var token = formio.getToken();
            fetch("".concat(formio.formUrl, "/storage/s3/multipart/abort"), {
                method: 'POST',
                headers: __assign({ 'Content-Type': 'application/json' }, (token ? { 'x-jwt-token': token } : {})),
                body: JSON.stringify({ uploadId: uploadId, key: key })
            }).catch(function (err) { return console.error('Error while aborting multipart upload:', err); });
        },
        uploadParts: function (file, urls, headers, partSize, multipart, abortSignal) {
            var changeMessage = multipart.changeMessage, progressCallback = multipart.progressCallback;
            changeMessage('Chunking and uploading parts to AWS S3...');
            var promises = [];
            var _loop_1 = function (i) {
                var start = i * partSize;
                var end = (i + 1) * partSize;
                var blob = i < urls.length ? file.slice(start, end) : file.slice(start);
                var promise = fetch(urls[i], {
                    method: 'PUT',
                    headers: headers,
                    body: blob,
                    signal: abortSignal,
                }).then(function (res) {
                    if (res.ok) {
                        progressCallback(urls.length);
                        var eTag = res.headers.get('etag');
                        if (!eTag) {
                            throw new Error('ETag header not found; it must be exposed in S3 bucket CORS settings');
                        }
                        return { ETag: eTag, PartNumber: i + 1 };
                    }
                    else {
                        throw new Error("Part no ".concat(i, " failed with status ").concat(res.status));
                    }
                });
                promises.push(promise);
            };
            for (var i = 0; i < urls.length; i++) {
                _loop_1(i);
            }
            return Promise.all(promises);
        },
        downloadFile: function (file) {
            if (file.acl !== 'public-read') {
                return formio.makeRequest('file', "".concat(formio.formUrl, "/storage/s3?bucket=").concat(xhr_1.default.trim(file.bucket), "&key=").concat(xhr_1.default.trim(file.key)), 'GET');
            }
            else {
                return Promise.resolve(file);
            }
        },
        deleteFile: function (fileInfo) {
            var url = "".concat(formio.formUrl, "/storage/s3?bucket=").concat(xhr_1.default.trim(fileInfo.bucket), "&key=").concat(xhr_1.default.trim(fileInfo.key));
            return formio.makeRequest('', url, 'delete');
        },
    };
}
s3.title = 'S3';
exports.default = s3;
//# sourceMappingURL=s3.js.map