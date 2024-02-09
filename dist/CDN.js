"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// All external libs URLs should be injected through this class.
// CDN libs URLs are accessible throuh CDN object properties
// like Formio.cdn.ace === 'http://cdn.form.io/ace/1.4.12'.
// For latest version use empty string
var CDN = /** @class */ (function () {
    function CDN(baseUrl) {
        this.baseUrl = baseUrl || 'https://cdn.form.io';
        this.overrides = {};
        this.libs = {
            'js': '',
            'ace': '1.4.12',
            'bootstrap': '4.6.2',
            'ckeditor': '19.0.0',
            'flatpickr': '4.6.8',
            'flatpickr-formio': '4.6.13-formio.3',
            'font-awesome': '4.7.0',
            'grid': 'latest',
            'moment-timezone': 'latest',
            'quill': '2.0.0-dev.3',
            'shortcut-buttons-flatpickr': '0.4.0',
            'uswds': '2.4.8',
            'core': ''
        };
        this.updateUrls();
    }
    CDN.prototype.getVersion = function (lib) {
        return this.libs[lib];
    };
    // Sets a specific library version
    CDN.prototype.setVersion = function (lib, version) {
        this.libs[lib] = version;
        this.updateUrls();
    };
    // Sets base CDN url for all libraries
    CDN.prototype.setBaseUrl = function (url) {
        this.baseUrl = url;
        this.updateUrls();
    };
    // Allows to override CDN url for a specific library
    CDN.prototype.setOverrideUrl = function (lib, url) {
        this.overrides[lib] = url;
        this.updateUrls();
    };
    // Removes override for a specific library
    CDN.prototype.removeOverride = function (lib) {
        delete this.overrides[lib];
        this.updateUrls();
    };
    // Removes all overrides
    CDN.prototype.removeOverrides = function () {
        this.overrides = {};
        this.updateUrls();
    };
    CDN.prototype.buildUrl = function (cdnUrl, lib, version) {
        var url;
        if (version === 'latest' || version === '') {
            url = "".concat(cdnUrl, "/").concat(lib);
        }
        else {
            url = "".concat(cdnUrl, "/").concat(lib, "/").concat(version);
        }
        return url;
    };
    CDN.prototype.updateUrls = function () {
        for (var lib in this.libs) {
            if (lib in this.overrides) {
                this[lib] = this.buildUrl(this.overrides[lib], lib, this.libs[lib]);
            }
            else {
                this[lib] = this.buildUrl(this.baseUrl, lib, this.libs[lib]);
            }
        }
    };
    return CDN;
}());
exports.default = CDN;
//# sourceMappingURL=CDN.js.map