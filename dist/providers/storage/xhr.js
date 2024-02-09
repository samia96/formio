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
exports.setXhrHeaders = void 0;
var trim_1 = __importDefault(require("lodash/trim"));
var setXhrHeaders = function (formio, xhr) {
    var headers = formio.options.headers;
    if (headers) {
        var ValidHeaders = {
            'Content-Disposition': true,
            'Authorization': true,
        };
        for (var header in headers) {
            if (ValidHeaders[header]) {
                xhr.setRequestHeader(header, headers[header]);
            }
        }
    }
};
exports.setXhrHeaders = setXhrHeaders;
var XHR = {
    trim: function (text) {
        return (0, trim_1.default)(text, '/');
    },
    path: function (items) {
        return items.filter(function (item) { return !!item; }).map(XHR.trim).join('/');
    },
    upload: function (formio, type, xhrCallback, file, fileName, dir, progressCallback, groupPermissions, groupId, abortCallback, multipartOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var token, response, err_1, error, message, serverResponse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = formio.getToken();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, fetch("".concat(formio.formUrl, "/storage/").concat(type), {
                                method: 'POST',
                                headers: __assign({ 'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8' }, (token ? { 'x-jwt-token': token } : {})),
                                body: JSON.stringify({
                                    name: XHR.path([dir, fileName]),
                                    size: file.size,
                                    type: file.type,
                                    groupPermissions: groupPermissions,
                                    groupId: groupId,
                                    multipart: multipartOptions
                                })
                            })];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        // only throws on network errors
                        err_1.networkError = true;
                        throw err_1;
                    case 4:
                        if (!!response.ok) return [3 /*break*/, 6];
                        if (response.status === 504) {
                            error = new Error('Network request failed');
                            error.networkError = true;
                            throw error;
                        }
                        return [4 /*yield*/, response.text()];
                    case 5:
                        message = _a.sent();
                        throw new Error(message || 'Unable to sign file.');
                    case 6: return [4 /*yield*/, response.json()];
                    case 7:
                        serverResponse = _a.sent();
                        return [4 /*yield*/, XHR.makeXhrRequest(formio, xhrCallback, serverResponse, progressCallback, abortCallback)];
                    case 8: return [2 /*return*/, _a.sent()];
                }
            });
        });
    },
    makeXhrRequest: function (formio, xhrCallback, serverResponse, progressCallback, abortCallback) {
        return new Promise(function (resolve, reject) {
            // Send the file with data.
            var xhr = new XMLHttpRequest();
            xhr.openAndSetHeaders = function () {
                var params = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    params[_i] = arguments[_i];
                }
                xhr.open.apply(xhr, params);
                (0, exports.setXhrHeaders)(formio, xhr);
            };
            Promise.resolve(xhrCallback(xhr, serverResponse, abortCallback)).then(function (payload) {
                // if payload is nullish we can assume the provider took care of the entire upload process
                if (!payload) {
                    return resolve(serverResponse);
                }
                // Fire on network error.
                xhr.onerror = function (err) {
                    err.networkError = true;
                    reject(err);
                };
                // Fire on network abort.
                xhr.onabort = function (err) {
                    err.networkError = true;
                    reject(err);
                };
                // Set the onabort error callback.
                xhr.onabort = reject;
                if (typeof progressCallback === 'function') {
                    xhr.upload.onprogress = progressCallback;
                }
                if (typeof abortCallback === 'function') {
                    abortCallback(function () { return xhr.abort(); });
                }
                // Fired when the response has made it back from the server.
                xhr.onload = function () {
                    if (xhr.status >= 200 && xhr.status < 300) {
                        resolve(serverResponse);
                    }
                    else if (xhr.status === 504) {
                        var error = new Error('Network request failed');
                        error.networkError = true;
                        reject(error);
                    }
                    else {
                        reject(xhr.response || 'Unable to upload file');
                    }
                };
                // Get the request and send it to the server.
                xhr.send(payload);
            }).catch(reject);
        });
    }
};
exports.default = XHR;
//# sourceMappingURL=xhr.js.map