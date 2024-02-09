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
var Field_1 = __importDefault(require("../_classes/field/Field"));
var utils_1 = require("../../utils/utils");
var downloadjs_1 = __importDefault(require("downloadjs"));
var lodash_1 = __importDefault(require("lodash"));
var fileProcessor_1 = __importDefault(require("../../providers/processor/fileProcessor"));
var browser_md5_file_1 = __importDefault(require("browser-md5-file"));
var Camera;
var webViewCamera = 'undefined' !== typeof window ? navigator.camera : Camera;
// canvas.toBlob polyfill.
var htmlCanvasElement;
if (typeof window !== 'undefined') {
    htmlCanvasElement = window.HTMLCanvasElement;
}
else if (typeof global !== 'undefined') {
    htmlCanvasElement = global.HTMLCanvasElement;
}
if (htmlCanvasElement && !htmlCanvasElement.prototype.toBlob) {
    Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
            var canvas = this;
            setTimeout(function () {
                var binStr = atob(canvas.toDataURL(type, quality).split(',')[1]), len = binStr.length, arr = new Uint8Array(len);
                for (var i = 0; i < len; i++) {
                    arr[i] = binStr.charCodeAt(i);
                }
                callback(new Blob([arr], { type: type || 'image/png' }));
            });
        }
    });
}
var createRandomString = function () { return Math.random().toString(36).substring(2, 15); };
var FileComponent = /** @class */ (function (_super) {
    __extends(FileComponent, _super);
    function FileComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FileComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Field_1.default.schema.apply(Field_1.default, __spreadArray([{
                type: 'file',
                label: 'Upload',
                key: 'file',
                image: false,
                privateDownload: false,
                imageSize: '200',
                filePattern: '*',
                fileMinSize: '0KB',
                fileMaxSize: '1GB',
                uploadOnly: false,
            }], extend, false));
    };
    Object.defineProperty(FileComponent, "builderInfo", {
        get: function () {
            return {
                title: 'File',
                group: 'premium',
                icon: 'file',
                documentation: '/userguide/form-building/premium-components#file',
                weight: 100,
                schema: FileComponent.schema(),
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent, "serverConditionSettings", {
        get: function () {
            return FileComponent.conditionOperatorsSettings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent, "conditionOperatorsSettings", {
        get: function () {
            return __assign(__assign({}, _super.conditionOperatorsSettings), { operators: ['isEmpty', 'isNotEmpty'] });
        },
        enumerable: false,
        configurable: true
    });
    FileComponent.savedValueTypes = function (schema) {
        schema = schema || {};
        return (0, utils_1.getComponentSavedTypes)(schema) || [utils_1.componentValueTypes.object];
    };
    FileComponent.prototype.init = function () {
        _super.prototype.init.call(this);
        webViewCamera = navigator.camera || Camera;
        var fileReaderSupported = (typeof FileReader !== 'undefined');
        var formDataSupported = typeof window !== 'undefined' ? Boolean(window.FormData) : false;
        var progressSupported = (typeof window !== 'undefined' && window.XMLHttpRequest) ? ('upload' in new XMLHttpRequest) : false;
        this.support = {
            filereader: fileReaderSupported,
            formdata: formDataSupported,
            hasWarning: !fileReaderSupported || !formDataSupported || !progressSupported,
            progress: progressSupported,
        };
        this.cameraMode = false;
        this.fileDropHidden = false;
        this.filesToSync = {
            filesToUpload: [],
            filesToDelete: [],
        };
        this.isSyncing = false;
        this.abortUploads = [];
    };
    Object.defineProperty(FileComponent.prototype, "dataReady", {
        get: function () {
            return this.filesReady || Promise.resolve();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "defaultSchema", {
        get: function () {
            return FileComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    FileComponent.prototype.loadImage = function (fileInfo) {
        if (this.component.privateDownload) {
            fileInfo.private = true;
        }
        return this.fileService.downloadFile(fileInfo).then(function (result) { return result.url; });
    };
    Object.defineProperty(FileComponent.prototype, "emptyValue", {
        get: function () {
            return [];
        },
        enumerable: false,
        configurable: true
    });
    FileComponent.prototype.getValueAsString = function (value) {
        if (lodash_1.default.isArray(value)) {
            return lodash_1.default.map(value, 'originalName').join(', ');
        }
        return lodash_1.default.get(value, 'originalName', '');
    };
    FileComponent.prototype.getValue = function () {
        return this.dataValue;
    };
    Object.defineProperty(FileComponent.prototype, "defaultValue", {
        get: function () {
            var value = _super.prototype.defaultValue;
            return Array.isArray(value) ? value : [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "hasTypes", {
        get: function () {
            return this.component.fileTypes &&
                Array.isArray(this.component.fileTypes) &&
                this.component.fileTypes.length !== 0 &&
                (this.component.fileTypes[0].label !== '' || this.component.fileTypes[0].value !== '');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "fileDropHidden", {
        get: function () {
            return this._fileBrowseHidden;
        },
        set: function (value) {
            if (typeof value !== 'boolean' || this.component.multiple) {
                return;
            }
            this._fileBrowseHidden = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "shouldSyncFiles", {
        get: function () {
            return Boolean(this.filesToSync.filesToDelete.length || this.filesToSync.filesToUpload.length);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "autoSync", {
        get: function () {
            return lodash_1.default.get(this, 'component.autoSync', false);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "columnsSize", {
        get: function () {
            var actionsColumn = this.disabled ? 0 : this.autoSync ? 2 : 1;
            var typeColumn = this.hasTypes ? 2 : 0;
            var sizeColumn = 2;
            var nameColumn = 12 - actionsColumn - typeColumn - sizeColumn;
            return {
                name: nameColumn,
                size: sizeColumn,
                type: typeColumn,
                actions: actionsColumn,
            };
        },
        enumerable: false,
        configurable: true
    });
    FileComponent.prototype.render = function () {
        var _a = this.filesToSync, filesToDelete = _a.filesToDelete, filesToUpload = _a.filesToUpload;
        return _super.prototype.render.call(this, this.renderTemplate('file', {
            fileSize: this.fileSize,
            files: this.dataValue || [],
            filesToDelete: filesToDelete,
            filesToUpload: filesToUpload,
            disabled: this.disabled,
            support: this.support,
            fileDropHidden: this.fileDropHidden,
            showSyncButton: this.autoSync && (filesToDelete.length || filesToUpload.length),
            isSyncing: this.isSyncing,
            columns: this.columnsSize,
        }));
    };
    FileComponent.prototype.getVideoStream = function (constraints) {
        return navigator.mediaDevices.getUserMedia({
            video: __assign({ width: { min: 640, ideal: 1920 }, height: { min: 360, ideal: 1080 }, aspectRatio: { ideal: 16 / 9 } }, constraints),
            audio: false,
        });
    };
    FileComponent.prototype.stopVideoStream = function (videoStream) {
        videoStream.getVideoTracks().forEach(function (track) { return track.stop(); });
    };
    FileComponent.prototype.getFrame = function (videoPlayer) {
        return new Promise(function (resolve) {
            var canvas = document.createElement('canvas');
            canvas.height = videoPlayer.videoHeight;
            canvas.width = videoPlayer.videoWidth;
            var context = canvas.getContext('2d');
            context.drawImage(videoPlayer, 0, 0);
            canvas.toBlob(resolve);
        });
    };
    FileComponent.prototype.startVideo = function () {
        var _this_1 = this;
        this.getVideoStream()
            .then(function (stream) {
            _this_1.videoStream = stream;
            var videoPlayer = _this_1.refs.videoPlayer;
            if (!videoPlayer) {
                console.warn('Video player not found in template.');
                _this_1.cameraMode = false;
                _this_1.redraw();
                return;
            }
            videoPlayer.srcObject = stream;
            var width = parseInt(_this_1.component.webcamSize) || 320;
            videoPlayer.setAttribute('width', width);
            videoPlayer.play();
        })
            .catch(function (err) {
            console.error(err);
            _this_1.cameraMode = false;
            _this_1.redraw();
        });
    };
    FileComponent.prototype.stopVideo = function () {
        if (this.videoStream) {
            this.stopVideoStream(this.videoStream);
            this.videoStream = null;
        }
    };
    FileComponent.prototype.takePicture = function () {
        var _this_1 = this;
        var videoPlayer = this.refs.videoPlayer;
        if (!videoPlayer) {
            console.warn('Video player not found in template.');
            this.cameraMode = false;
            this.redraw();
            return;
        }
        this.getFrame(videoPlayer)
            .then(function (frame) {
            frame.name = "photo-".concat(Date.now(), ".png");
            _this_1.handleFilesToUpload([frame]);
            _this_1.cameraMode = false;
            _this_1.redraw();
        });
    };
    FileComponent.prototype.browseFiles = function (attrs) {
        var _this_1 = this;
        if (attrs === void 0) { attrs = {}; }
        return new Promise(function (resolve) {
            var fileInput = _this_1.ce('input', __assign({ type: 'file', style: 'height: 0; width: 0; visibility: hidden;', tabindex: '-1' }, attrs));
            document.body.appendChild(fileInput);
            fileInput.addEventListener('change', function () {
                resolve(fileInput.files);
                document.body.removeChild(fileInput);
            }, true);
            // There is no direct way to trigger a file dialog. To work around this, create an input of type file and trigger
            // a click event on it.
            if (typeof fileInput.trigger === 'function') {
                fileInput.trigger('click');
            }
            else {
                fileInput.click();
            }
        });
    };
    Object.defineProperty(FileComponent.prototype, "cameraMode", {
        get: function () {
            return this._cameraMode;
        },
        set: function (value) {
            this._cameraMode = value;
            if (value) {
                this.startVideo();
            }
            else {
                this.stopVideo();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "useWebViewCamera", {
        get: function () {
            return this.imageUpload && webViewCamera;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "imageUpload", {
        get: function () {
            return Boolean(this.component.image);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "browseOptions", {
        get: function () {
            var options = {};
            if (this.component.multiple) {
                options.multiple = true;
            }
            if (this.component.capture) {
                options.capture = this.component.capture;
            }
            //use "accept" attribute only for desktop devices because of its limited support by mobile browsers
            var filePattern = this.component.filePattern.trim() || '';
            if (!this.isMobile.any) {
                var imagesPattern = 'image/*';
                if (this.imageUpload && (!filePattern || filePattern === '*')) {
                    options.accept = imagesPattern;
                }
                else if (this.imageUpload && !filePattern.includes(imagesPattern)) {
                    options.accept = "".concat(imagesPattern, ",").concat(filePattern);
                }
                else {
                    options.accept = filePattern;
                }
            }
            // if input capture is set, we need the "accept" attribute to determine which device to launch
            else if (this.component.capture) {
                if (filePattern.includes('video')) {
                    options.accept = 'video/*';
                }
                else if (filePattern.includes('audio')) {
                    options.accept = 'audio/*';
                }
                else {
                    options.accept = 'image/*';
                }
            }
            return options;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(FileComponent.prototype, "actions", {
        get: function () {
            return {
                abort: this.abortRequest.bind(this),
            };
        },
        enumerable: false,
        configurable: true
    });
    FileComponent.prototype.attach = function (element) {
        var _this_1 = this;
        this.loadRefs(element, {
            fileDrop: 'single',
            fileBrowse: 'single',
            galleryButton: 'single',
            cameraButton: 'single',
            takePictureButton: 'single',
            toggleCameraMode: 'single',
            videoPlayer: 'single',
            fileLink: 'multiple',
            removeLink: 'multiple',
            fileToSyncRemove: 'multiple',
            fileImage: 'multiple',
            fileType: 'multiple',
            fileProcessingLoader: 'single',
            syncNow: 'single',
            restoreFile: 'multiple',
            progress: 'multiple',
        });
        // Ensure we have an empty input refs. We need this for the setValue method to redraw the control when it is set.
        this.refs.input = [];
        var superAttach = _super.prototype.attach.call(this, element);
        if (this.refs.fileDrop) {
            // if (!this.statuses.length) {
            //   this.refs.fileDrop.removeAttribute('hidden');
            // }
            var _this_2 = this;
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
                _this_2.handleFilesToUpload(event.dataTransfer.files);
            });
        }
        this.addEventListener(element, 'click', function (event) {
            _this_1.handleAction(event);
        });
        if (this.refs.fileBrowse) {
            this.addEventListener(this.refs.fileBrowse, 'click', function (event) {
                event.preventDefault();
                _this_1.browseFiles(_this_1.browseOptions)
                    .then(function (files) {
                    _this_1.handleFilesToUpload(files);
                });
            });
        }
        this.refs.fileLink.forEach(function (fileLink, index) {
            _this_1.addEventListener(fileLink, 'click', function (event) {
                event.preventDefault();
                _this_1.getFile(_this_1.dataValue[index]);
            });
        });
        this.refs.removeLink.forEach(function (removeLink, index) {
            _this_1.addEventListener(removeLink, 'click', function (event) {
                event.preventDefault();
                var fileInfo = _this_1.dataValue[index];
                _this_1.handleFileToRemove(fileInfo);
            });
        });
        this.refs.fileToSyncRemove.forEach(function (fileToSyncRemove, index) {
            _this_1.addEventListener(fileToSyncRemove, 'click', function (event) {
                event.preventDefault();
                _this_1.filesToSync.filesToUpload.splice(index, 1);
                _this_1.redraw();
            });
        });
        this.refs.restoreFile.forEach(function (fileToRestore, index) {
            _this_1.addEventListener(fileToRestore, 'click', function (event) {
                event.preventDefault();
                var fileInfo = _this_1.filesToSync.filesToDelete[index];
                delete fileInfo.status;
                delete fileInfo.message;
                _this_1.filesToSync.filesToDelete.splice(index, 1);
                _this_1.dataValue.push(fileInfo);
                _this_1.triggerChange();
                _this_1.redraw();
            });
        });
        if (this.refs.galleryButton && webViewCamera) {
            this.addEventListener(this.refs.galleryButton, 'click', function (event) {
                event.preventDefault();
                webViewCamera.getPicture(function (success) {
                    window.resolveLocalFileSystemURL(success, function (fileEntry) {
                        fileEntry.file(function (file) {
                            var reader = new FileReader();
                            reader.onloadend = function (evt) {
                                var blob = new Blob([new Uint8Array(evt.target.result)], { type: file.type });
                                blob.name = file.name;
                                _this_1.handleFilesToUpload([blob]);
                            };
                            reader.readAsArrayBuffer(file);
                        });
                    });
                }, function (err) {
                    console.error(err);
                }, {
                    sourceType: webViewCamera.PictureSourceType.PHOTOLIBRARY,
                });
            });
        }
        if (this.refs.cameraButton && webViewCamera) {
            this.addEventListener(this.refs.cameraButton, 'click', function (event) {
                event.preventDefault();
                webViewCamera.getPicture(function (success) {
                    window.resolveLocalFileSystemURL(success, function (fileEntry) {
                        fileEntry.file(function (file) {
                            var reader = new FileReader();
                            reader.onloadend = function (evt) {
                                var blob = new Blob([new Uint8Array(evt.target.result)], { type: file.type });
                                blob.name = file.name;
                                _this_1.handleFilesToUpload([blob]);
                            };
                            reader.readAsArrayBuffer(file);
                        });
                    });
                }, function (err) {
                    console.error(err);
                }, {
                    sourceType: webViewCamera.PictureSourceType.CAMERA,
                    encodingType: webViewCamera.EncodingType.PNG,
                    mediaType: webViewCamera.MediaType.PICTURE,
                    saveToPhotoAlbum: true,
                    correctOrientation: false,
                });
            });
        }
        if (this.refs.takePictureButton) {
            this.addEventListener(this.refs.takePictureButton, 'click', function (event) {
                event.preventDefault();
                _this_1.takePicture();
            });
        }
        if (this.refs.toggleCameraMode) {
            this.addEventListener(this.refs.toggleCameraMode, 'click', function (event) {
                event.preventDefault();
                _this_1.cameraMode = !_this_1.cameraMode;
                _this_1.redraw();
            });
        }
        this.refs.fileType.forEach(function (fileType, index) {
            if (!_this_1.dataValue[index]) {
                return;
            }
            _this_1.dataValue[index].fileType = _this_1.dataValue[index].fileType || _this_1.component.fileTypes[0].label;
            _this_1.addEventListener(fileType, 'change', function (event) {
                event.preventDefault();
                var fileType = _this_1.component.fileTypes.find(function (typeObj) { return typeObj.value === event.target.value; });
                _this_1.dataValue[index].fileType = fileType.label;
            });
        });
        this.addEventListener(this.refs.syncNow, 'click', function (event) {
            event.preventDefault();
            _this_1.syncFiles();
        });
        var fileService = this.fileService;
        if (fileService) {
            var loadingImages_1 = [];
            this.filesReady = new Promise(function (resolve, reject) {
                _this_1.filesReadyResolve = resolve;
                _this_1.filesReadyReject = reject;
            });
            this.refs.fileImage.forEach(function (image, index) {
                loadingImages_1.push(_this_1.loadImage(_this_1.dataValue[index]).then(function (url) { return (image.src = url); }));
            });
            if (loadingImages_1.length) {
                Promise.all(loadingImages_1).then(function () {
                    _this_1.filesReadyResolve();
                }).catch(function () { return _this_1.filesReadyReject(); });
            }
            else {
                this.filesReadyResolve();
            }
        }
        return superAttach;
    };
    /* eslint-disable max-len */
    FileComponent.prototype.fileSize = function (a, b, c, d, e) {
        return "".concat((b = Math, c = b.log, d = 1024, e = c(a) / c(d) | 0, a / b.pow(d, e)).toFixed(2), " ").concat(e ? "".concat('kMGTPEZY'[--e], "B") : 'Bytes');
    };
    /* eslint-enable max-len */
    /* eslint-disable max-depth */
    FileComponent.prototype.globStringToRegex = function (str) {
        str = str.replace(/\s/g, '');
        var regexp = '', excludes = [];
        if (str.length > 2 && str[0] === '/' && str[str.length - 1] === '/') {
            regexp = str.substring(1, str.length - 1);
        }
        else {
            var split = str.split(',');
            if (split.length > 1) {
                for (var i = 0; i < split.length; i++) {
                    var r = this.globStringToRegex(split[i]);
                    if (r.regexp) {
                        regexp += "(".concat(r.regexp, ")");
                        if (i < split.length - 1) {
                            regexp += '|';
                        }
                    }
                    else {
                        excludes = excludes.concat(r.excludes);
                    }
                }
            }
            else {
                if (str.startsWith('!')) {
                    excludes.push("^((?!".concat(this.globStringToRegex(str.substring(1)).regexp, ").)*$"));
                }
                else {
                    if (str.startsWith('.')) {
                        str = "*".concat(str);
                    }
                    regexp = "^".concat(str.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\-]', 'g'), '\\$&'), "$");
                    regexp = regexp.replace(/\\\*/g, '.*').replace(/\\\?/g, '.');
                }
            }
        }
        return { regexp: regexp, excludes: excludes };
    };
    /* eslint-enable max-depth */
    FileComponent.prototype.translateScalars = function (str) {
        if (typeof str === 'string') {
            if (str.search(/kb/i) === str.length - 2) {
                return parseFloat(str.substring(0, str.length - 2) * 1024);
            }
            if (str.search(/mb/i) === str.length - 2) {
                return parseFloat(str.substring(0, str.length - 2) * 1024 * 1024);
            }
            if (str.search(/gb/i) === str.length - 2) {
                return parseFloat(str.substring(0, str.length - 2) * 1024 * 1024 * 1024);
            }
            if (str.search(/b/i) === str.length - 1) {
                return parseFloat(str.substring(0, str.length - 1));
            }
            if (str.search(/s/i) === str.length - 1) {
                return parseFloat(str.substring(0, str.length - 1));
            }
            if (str.search(/m/i) === str.length - 1) {
                return parseFloat(str.substring(0, str.length - 1) * 60);
            }
            if (str.search(/h/i) === str.length - 1) {
                return parseFloat(str.substring(0, str.length - 1) * 3600);
            }
        }
        return str;
    };
    FileComponent.prototype.validatePattern = function (file, val) {
        if (!val) {
            return true;
        }
        var pattern = this.globStringToRegex(val);
        var valid = true;
        if (pattern.regexp && pattern.regexp.length) {
            var regexp = new RegExp(pattern.regexp, 'i');
            valid = (!lodash_1.default.isNil(file.type) && regexp.test(file.type)) ||
                (!lodash_1.default.isNil(file.name) && regexp.test(file.name));
        }
        valid = pattern.excludes.reduce(function (result, excludePattern) {
            var exclude = new RegExp(excludePattern, 'i');
            return result && (lodash_1.default.isNil(file.type) || !exclude.test(file.type)) &&
                (lodash_1.default.isNil(file.name) || !exclude.test(file.name));
        }, valid);
        return valid;
    };
    FileComponent.prototype.validateMinSize = function (file, val) {
        return file.size + 0.1 >= this.translateScalars(val);
    };
    FileComponent.prototype.validateMaxSize = function (file, val) {
        return file.size - 0.1 <= this.translateScalars(val);
    };
    FileComponent.prototype.abortRequest = function (id) {
        var abortUpload = this.abortUploads.find(function (abortUpload) { return abortUpload.id === id; });
        if (abortUpload) {
            abortUpload.abort();
        }
    };
    FileComponent.prototype.handleAction = function (event) {
        var target = event.target;
        if (!target.id) {
            return;
        }
        var _a = target.id.split('-'), action = _a[0], id = _a[1];
        if (!action || !id || !this.actions[action]) {
            return;
        }
        this.actions[action](id);
    };
    FileComponent.prototype.getFileName = function (file) {
        return (0, utils_1.uniqueName)(file.name, this.component.fileNameTemplate, this.evalContext());
    };
    FileComponent.prototype.getInitFileToSync = function (file) {
        var escapedFileName = file.name ? file.name.replaceAll('<', '&lt;').replaceAll('>', '&gt;') : file.name;
        return {
            id: createRandomString(),
            // Get a unique name for this file to keep file collisions from occurring.
            dir: this.interpolate(this.component.dir || ''),
            name: this.getFileName(file),
            originalName: escapedFileName,
            fileKey: this.component.fileKey || 'file',
            storage: this.component.storage,
            options: this.component.options,
            file: file,
            size: file.size,
            status: 'info',
            message: this.t('Processing file. Please wait...'),
            hash: '',
        };
    };
    FileComponent.prototype.handleSubmissionRevisions = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var bmf, hash;
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.root.form.submissionRevisions !== 'true') {
                            return [2 /*return*/, ''];
                        }
                        bmf = new browser_md5_file_1.default();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                _this_1.emit('fileUploadingStart');
                                bmf.md5(file, function (err, md5) {
                                    if (err) {
                                        return reject(err);
                                    }
                                    return resolve(md5);
                                });
                            })];
                    case 1:
                        hash = _a.sent();
                        this.emit('fileUploadingEnd');
                        return [2 /*return*/, hash];
                }
            });
        });
    };
    FileComponent.prototype.validateFileName = function (file) {
        // Check if file with the same name is being uploaded
        var fileWithSameNameUploading = this.filesToSync.filesToUpload
            .some(function (fileToSync) { var _a; return ((_a = fileToSync.file) === null || _a === void 0 ? void 0 : _a.name) === file.name; });
        var fileWithSameNameUploaded = this.dataValue
            .some(function (fileStatus) { return fileStatus.originalName === file.name; });
        return fileWithSameNameUploaded || fileWithSameNameUploading
            ? {
                status: 'error',
                message: this.t("File with the same name is already ".concat(fileWithSameNameUploading ? 'being ' : '', "uploaded")),
            }
            : {};
    };
    FileComponent.prototype.validateFileSettings = function (file) {
        // Check file pattern
        if (this.component.filePattern && !this.validatePattern(file, this.component.filePattern)) {
            return {
                status: 'error',
                message: this.t('File is the wrong type; it must be {{ pattern }}', {
                    pattern: this.component.filePattern,
                }),
            };
        }
        // Check file minimum size
        if (this.component.fileMinSize && !this.validateMinSize(file, this.component.fileMinSize)) {
            return {
                status: 'error',
                message: this.t('File is too small; it must be at least {{ size }}', {
                    size: this.component.fileMinSize,
                }),
            };
        }
        // Check file maximum size
        if (this.component.fileMaxSize && !this.validateMaxSize(file, this.component.fileMaxSize)) {
            return {
                status: 'error',
                message: this.t('File is too big; it must be at most {{ size }}', {
                    size: this.component.fileMaxSize,
                }),
            };
        }
        return {};
    };
    FileComponent.prototype.validateFileService = function () {
        var fileService = this.fileService;
        return !fileService
            ? {
                status: 'error',
                message: this.t('File Service not provided.'),
            }
            : {};
    };
    FileComponent.prototype.validateFile = function (file) {
        var fileServiceValidation = this.validateFileService();
        if (fileServiceValidation.status === 'error') {
            return fileServiceValidation;
        }
        var fileNameValidation = this.validateFileName(file);
        if (fileNameValidation.status === 'error') {
            return fileNameValidation;
        }
        return this.validateFileSettings(file);
    };
    FileComponent.prototype.getGroupPermissions = function () {
        var groupKey = null;
        var groupPermissions = null;
        //Iterate through form components to find group resource if one exists
        this.root.everyComponent(function (element) {
            var _a, _b;
            if (((_a = element.component) === null || _a === void 0 ? void 0 : _a.submissionAccess) || ((_b = element.component) === null || _b === void 0 ? void 0 : _b.defaultPermission)) {
                groupPermissions = !element.component.submissionAccess ? [
                    {
                        type: element.component.defaultPermission,
                        roles: [],
                    },
                ] : element.component.submissionAccess;
                groupPermissions.forEach(function (permission) {
                    groupKey = ['admin', 'write', 'create'].includes(permission.type) ? element.component.key : null;
                });
            }
        });
        return { groupKey: groupKey, groupPermissions: groupPermissions };
    };
    FileComponent.prototype.triggerFileProcessor = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var processedFile, fileProcessorHandler, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        processedFile = null;
                        if (!this.root.options.fileProcessor) return [3 /*break*/, 5];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        if (this.refs.fileProcessingLoader) {
                            this.refs.fileProcessingLoader.style.display = 'block';
                        }
                        fileProcessorHandler = (0, fileProcessor_1.default)(this.fileService, this.root.options.fileProcessor);
                        return [4 /*yield*/, fileProcessorHandler(file, this.component.properties)];
                    case 2:
                        processedFile = _a.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        err_1 = _a.sent();
                        this.fileDropHidden = false;
                        return [2 /*return*/, {
                                status: 'error',
                                message: this.t('File processing has been failed.'),
                            }];
                    case 4:
                        if (this.refs.fileProcessingLoader) {
                            this.refs.fileProcessingLoader.style.display = 'none';
                        }
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/, {
                            file: processedFile,
                        }];
                }
            });
        });
    };
    FileComponent.prototype.prepareFileToUpload = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var fileToSync, _a, _b, status, message, _c, groupKey, groupPermissions, processedFile;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        fileToSync = this.getInitFileToSync(file);
                        _a = fileToSync;
                        return [4 /*yield*/, this.handleSubmissionRevisions(file)];
                    case 1:
                        _a.hash = _d.sent();
                        _b = this.validateFile(file), status = _b.status, message = _b.message;
                        if (status === 'error') {
                            fileToSync.isValidationError = true;
                            fileToSync.status = status;
                            fileToSync.message = message;
                            return [2 /*return*/, this.filesToSync.filesToUpload.push(fileToSync)];
                        }
                        if (this.component.privateDownload) {
                            file.private = true;
                        }
                        _c = this.getGroupPermissions(), groupKey = _c.groupKey, groupPermissions = _c.groupPermissions;
                        return [4 /*yield*/, this.triggerFileProcessor(file)];
                    case 2:
                        processedFile = _d.sent();
                        if (processedFile.status === 'error') {
                            fileToSync.status === 'error';
                            fileToSync.message = processedFile.message;
                            return [2 /*return*/, this.filesToSync.filesToUpload.push(fileToSync)];
                        }
                        if (this.autoSync) {
                            fileToSync.message = this.t('Ready to be uploaded into storage');
                        }
                        this.filesToSync.filesToUpload.push(__assign(__assign({}, fileToSync), { message: fileToSync.message, file: processedFile.file || file, url: this.interpolate(this.component.url, { file: fileToSync }), groupPermissions: groupPermissions, groupResourceId: groupKey ? this.currentForm.submission.data[groupKey]._id : null }));
                        return [2 /*return*/];
                }
            });
        });
    };
    FileComponent.prototype.prepareFilesToUpload = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            var _this_1 = this;
            return __generator(this, function (_a) {
                // Only allow one upload if not multiple.
                if (!this.component.multiple) {
                    files = Array.prototype.slice.call(files, 0, 1);
                }
                if (this.component.storage && files && files.length) {
                    this.fileDropHidden = true;
                    return [2 /*return*/, Promise.all(__spreadArray([], files, true).map(function (file) { return __awaiter(_this_1, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.prepareFileToUpload(file)];
                                    case 1:
                                        _a.sent();
                                        this.redraw();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                }
                else {
                    return [2 /*return*/, Promise.resolve()];
                }
                return [2 /*return*/];
            });
        });
    };
    FileComponent.prototype.handleFilesToUpload = function (files) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.prepareFilesToUpload(files)];
                    case 1:
                        _a.sent();
                        if (!!this.autoSync) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.syncFiles()];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileComponent.prototype.prepareFileToDelete = function (fileInfo) {
        this.filesToSync.filesToDelete.push(__assign(__assign({}, fileInfo), { status: 'info', message: this.autoSync
                ? this.t('Ready to be removed from storage')
                : this.t('Preparing file to remove') }));
        var index = this.dataValue.findIndex(function (file) { return file.name === fileInfo.name; });
        this.splice(index);
        this.redraw();
    };
    FileComponent.prototype.handleFileToRemove = function (fileInfo) {
        this.prepareFileToDelete(fileInfo);
        if (!this.autoSync) {
            this.syncFiles();
        }
    };
    FileComponent.prototype.deleteFile = function (fileInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, options, fileService, formio;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.component.options, options = _a === void 0 ? {} : _a;
                        if (!(fileInfo && (['url', 'indexeddb', 's3', 'azure', 'googledrive'].includes(this.component.storage)))) return [3 /*break*/, 4];
                        fileService = this.fileService;
                        if (!(fileService && typeof fileService.deleteFile === 'function')) return [3 /*break*/, 2];
                        return [4 /*yield*/, fileService.deleteFile(fileInfo, options)];
                    case 1: return [2 /*return*/, _b.sent()];
                    case 2:
                        formio = this.options.formio || (this.root && this.root.formio);
                        if (!formio) return [3 /*break*/, 4];
                        return [4 /*yield*/, formio.makeRequest('', fileInfo.url, 'delete')];
                    case 3: return [2 /*return*/, _b.sent()];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    FileComponent.prototype.delete = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.filesToSync.filesToDelete.length) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, Promise.all(this.filesToSync.filesToDelete.map(function (fileToSync) { return __awaiter(_this_1, void 0, void 0, function () {
                                var response_1;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 2, 3, 4]);
                                            if (fileToSync.isValidationError) {
                                                return [2 /*return*/, { fileToSync: fileToSync }];
                                            }
                                            return [4 /*yield*/, this.deleteFile(fileToSync)];
                                        case 1:
                                            _a.sent();
                                            fileToSync.status = 'success';
                                            fileToSync.message = this.t('Succefully removed');
                                            return [3 /*break*/, 4];
                                        case 2:
                                            response_1 = _a.sent();
                                            fileToSync.status = 'error';
                                            fileToSync.message = typeof response_1 === 'string' ? response_1 : response_1.toString();
                                            return [3 /*break*/, 4];
                                        case 3:
                                            this.redraw();
                                            return [7 /*endfinally*/];
                                        case 4: return [2 /*return*/, { fileToSync: fileToSync }];
                                    }
                                });
                            }); }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FileComponent.prototype.updateProgress = function (fileInfo, progressEvent) {
        fileInfo.progress = parseInt(100.0 * progressEvent.loaded / progressEvent.total);
        if (fileInfo.status !== 'progress') {
            fileInfo.status = 'progress';
            delete fileInfo.message;
            this.redraw();
        }
        else {
            var progress = Array.prototype.find.call(this.refs.progress, function (progressElement) { return progressElement.id === fileInfo.id; });
            progress.innerHTML = "<span class=\"visually-hidden\">".concat(fileInfo.progress, "% ").concat(this.t('Complete'), "</span>");
            progress.style.width = "".concat(fileInfo.progress, "%");
            progress.ariaValueNow = fileInfo.progress.toString();
        }
    };
    FileComponent.prototype.getMultipartOptions = function (fileToSync) {
        var _this_1 = this;
        var count = 0;
        return this.component.useMultipartUpload && this.component.multipart ? __assign(__assign({}, this.component.multipart), { progressCallback: function (total) {
                count++;
                fileToSync.status = 'progress';
                fileToSync.progress = parseInt(100 * count / total);
                delete fileToSync.message;
                _this_1.redraw();
            }, changeMessage: function (message) {
                fileToSync.message = message;
                _this_1.redraw();
            } }) : false;
    };
    FileComponent.prototype.uploadFile = function (fileToSync) {
        return __awaiter(this, void 0, void 0, function () {
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fileService.uploadFile(fileToSync.storage, fileToSync.file, fileToSync.name, fileToSync.dir, 
                        // Progress callback
                        this.updateProgress.bind(this, fileToSync), fileToSync.url, fileToSync.options, fileToSync.fileKey, fileToSync.groupPermissions, fileToSync.groupResourceId, function () { }, 
                        // Abort upload callback
                        function (abort) { return _this_1.abortUploads.push({
                            id: fileToSync.id,
                            abort: abort,
                        }); }, this.getMultipartOptions(fileToSync))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FileComponent.prototype.upload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this_1 = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.filesToSync.filesToUpload.length) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, Promise.all(this.filesToSync.filesToUpload.map(function (fileToSync) { return __awaiter(_this_1, void 0, void 0, function () {
                                var fileInfo, response_2;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            fileInfo = null;
                                            _a.label = 1;
                                        case 1:
                                            _a.trys.push([1, 3, 4, 5]);
                                            if (fileToSync.isValidationError) {
                                                return [2 /*return*/, {
                                                        fileToSync: fileToSync,
                                                        fileInfo: fileInfo,
                                                    }];
                                            }
                                            return [4 /*yield*/, this.uploadFile(fileToSync)];
                                        case 2:
                                            fileInfo = _a.sent();
                                            fileToSync.status = 'success';
                                            fileToSync.message = this.t('Succefully uploaded');
                                            fileInfo.originalName = fileToSync.originalName;
                                            fileInfo.hash = fileToSync.hash;
                                            return [3 /*break*/, 5];
                                        case 3:
                                            response_2 = _a.sent();
                                            fileToSync.status = 'error';
                                            delete fileToSync.progress;
                                            fileToSync.message = typeof response_2 === 'string'
                                                ? response_2
                                                : response_2.type === 'abort'
                                                    ? this.t('Request was aborted')
                                                    : response_2.toString();
                                            return [3 /*break*/, 5];
                                        case 4:
                                            delete fileToSync.progress;
                                            this.redraw();
                                            return [7 /*endfinally*/];
                                        case 5: return [2 /*return*/, {
                                                fileToSync: fileToSync,
                                                fileInfo: fileInfo,
                                            }];
                                    }
                                });
                            }); }))];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FileComponent.prototype.syncFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, filesToDelete, _c, filesToUpload, data, err_2;
            var _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this.isSyncing = true;
                        this.fileDropHidden = true;
                        this.redraw();
                        _e.label = 1;
                    case 1:
                        _e.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, Promise.all([this.delete(), this.upload()])];
                    case 2:
                        _a = _e.sent(), _b = _a[0], filesToDelete = _b === void 0 ? [] : _b, _c = _a[1], filesToUpload = _c === void 0 ? [] : _c;
                        this.filesToSync.filesToDelete = filesToDelete
                            .filter(function (file) { var _a; return ((_a = file.fileToSync) === null || _a === void 0 ? void 0 : _a.status) === 'error'; })
                            .map(function (file) { return file.fileToSync; });
                        this.filesToSync.filesToUpload = filesToUpload
                            .filter(function (file) { var _a; return ((_a = file.fileToSync) === null || _a === void 0 ? void 0 : _a.status) === 'error'; })
                            .map(function (file) { return file.fileToSync; });
                        if (!this.hasValue()) {
                            this.dataValue = [];
                        }
                        data = filesToUpload
                            .filter(function (file) { var _a; return ((_a = file.fileToSync) === null || _a === void 0 ? void 0 : _a.status) === 'success'; })
                            .map(function (file) { return file.fileInfo; });
                        (_d = this.dataValue).push.apply(_d, data);
                        this.triggerChange();
                        return [2 /*return*/, Promise.resolve()];
                    case 3:
                        err_2 = _e.sent();
                        return [2 /*return*/, Promise.reject()];
                    case 4:
                        this.isSyncing = false;
                        this.fileDropHidden = false;
                        this.abortUploads = [];
                        this.redraw();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    FileComponent.prototype.getFile = function (fileInfo) {
        var _a = this.component.options, options = _a === void 0 ? {} : _a;
        var fileService = this.fileService;
        if (!fileService) {
            return alert('File Service not provided');
        }
        if (this.component.privateDownload) {
            fileInfo.private = true;
        }
        fileService.downloadFile(fileInfo, options).then(function (file) {
            if (file) {
                if (['base64', 'indexeddb'].includes(file.storage)) {
                    (0, downloadjs_1.default)(file.url, file.originalName || file.name, file.type);
                }
                else {
                    window.open(file.url, '_blank');
                }
            }
        })
            .catch(function (response) {
            // Is alert the best way to do this?
            // User is expecting an immediate notification due to attempting to download a file.
            alert(response);
        });
    };
    FileComponent.prototype.focus = function () {
        if ('beforeFocus' in this.parent) {
            this.parent.beforeFocus(this);
        }
        if (this.refs.fileBrowse) {
            this.refs.fileBrowse.focus();
        }
    };
    FileComponent.prototype.beforeSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!this.autoSync) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, this.syncFiles()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this.shouldSyncFiles
                                ? Promise.reject('Synchronization is failed')
                                : Promise.resolve()];
                    case 2:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1.message)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    FileComponent.prototype.destroy = function (all) {
        this.stopVideo();
        _super.prototype.destroy.call(this, all);
    };
    return FileComponent;
}(Field_1.default));
exports.default = FileComponent;
//# sourceMappingURL=File.js.map