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
var signature_pad_1 = __importDefault(require("signature_pad"));
var Input_1 = __importDefault(require("../_classes/input/Input"));
var lodash_1 = __importDefault(require("lodash"));
var utils_1 = require("../../utils/utils");
var SignatureComponent = /** @class */ (function (_super) {
    __extends(SignatureComponent, _super);
    function SignatureComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SignatureComponent.schema = function () {
        var extend = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            extend[_i] = arguments[_i];
        }
        return Input_1.default.schema.apply(Input_1.default, __spreadArray([{
                type: 'signature',
                label: 'Signature',
                key: 'signature',
                footer: 'Sign above',
                width: '100%',
                height: '150px',
                penColor: 'black',
                backgroundColor: 'rgb(245,245,235)',
                minWidth: '0.5',
                maxWidth: '2.5',
                keepOverlayRatio: true,
            }], extend, false));
    };
    Object.defineProperty(SignatureComponent, "builderInfo", {
        get: function () {
            return {
                title: 'Signature',
                group: 'advanced',
                icon: 'pencil',
                weight: 120,
                documentation: '/developers/integrations/esign/esign-integrations#signature-component',
                schema: SignatureComponent.schema()
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignatureComponent, "serverConditionSettings", {
        get: function () {
            return SignatureComponent.conditionOperatorsSettings;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignatureComponent, "conditionOperatorsSettings", {
        get: function () {
            return __assign(__assign({}, _super.conditionOperatorsSettings), { operators: ['isEmpty', 'isNotEmpty'] });
        },
        enumerable: false,
        configurable: true
    });
    SignatureComponent.savedValueTypes = function (schema) {
        schema = schema || {};
        return (0, utils_1.getComponentSavedTypes)(schema) || [utils_1.componentValueTypes.string];
    };
    SignatureComponent.prototype.init = function () {
        var _a, _b, _c, _d, _e;
        _super.prototype.init.call(this);
        this.currentWidth = 0;
        this.scale = 1;
        if (!this.component.width) {
            this.component.width = '100%';
        }
        if (!this.component.height) {
            this.component.height = '200px';
        }
        if (this.component.keepOverlayRatio
            && ((_a = this.options) === null || _a === void 0 ? void 0 : _a.display) === 'pdf'
            && ((_b = this.component.overlay) === null || _b === void 0 ? void 0 : _b.width)
            && ((_c = this.component.overlay) === null || _c === void 0 ? void 0 : _c.height)) {
            this.ratio = ((_d = this.component.overlay) === null || _d === void 0 ? void 0 : _d.width) / ((_e = this.component.overlay) === null || _e === void 0 ? void 0 : _e.height);
            this.component.width = '100%';
            this.component.height = 'auto';
        }
    };
    Object.defineProperty(SignatureComponent.prototype, "emptyValue", {
        get: function () {
            return '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignatureComponent.prototype, "defaultSchema", {
        get: function () {
            return SignatureComponent.schema();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignatureComponent.prototype, "inputInfo", {
        get: function () {
            var info = _super.prototype.inputInfo;
            info.type = 'input';
            info.attr.type = 'hidden';
            return info;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SignatureComponent.prototype, "className", {
        get: function () {
            return "".concat(_super.prototype.className, " signature-pad");
        },
        enumerable: false,
        configurable: true
    });
    SignatureComponent.prototype.labelIsHidden = function () {
        return this.component.hideLabel;
    };
    SignatureComponent.prototype.setValue = function (value, flags) {
        if (flags === void 0) { flags = {}; }
        var changed = _super.prototype.setValue.call(this, value, flags);
        if (this.refs.signatureImage && (this.options.readOnly || this.disabled)) {
            this.refs.signatureImage.setAttribute('src', value);
            this.showCanvas(false);
        }
        if (this.signaturePad) {
            if (!value) {
                this.signaturePad.clear();
            }
            else if (changed) {
                this.triggerChange();
            }
        }
        if (this.signaturePad && this.dataValue && this.signaturePad.isEmpty()) {
            this.setDataToSigaturePad();
        }
        return changed;
    };
    SignatureComponent.prototype.showCanvas = function (show) {
        if (show) {
            if (this.refs.canvas) {
                this.refs.canvas.style.display = 'inherit';
            }
            if (this.refs.signatureImage) {
                this.refs.signatureImage.style.display = 'none';
            }
        }
        else {
            if (this.refs.canvas) {
                this.refs.canvas.style.display = 'none';
            }
            if (this.refs.signatureImage) {
                this.refs.signatureImage.style.display = 'inherit';
                this.refs.signatureImage.style.maxHeight = '100%';
            }
        }
    };
    SignatureComponent.prototype.onDisabled = function () {
        this.showCanvas(!_super.prototype.disabled);
        if (this.signaturePad) {
            if (_super.prototype.disabled) {
                this.signaturePad.off();
                if (this.refs.refresh) {
                    this.refs.refresh.classList.add('disabled');
                }
                if (this.refs.signatureImage && this.dataValue) {
                    this.refs.signatureImage.setAttribute('src', this.dataValue);
                }
            }
            else {
                this.signaturePad.on();
                if (this.refs.refresh) {
                    this.refs.refresh.classList.remove('disabled');
                }
            }
        }
    };
    SignatureComponent.prototype.checkSize = function (force, scale) {
        if (this.refs.padBody && (force || this.refs.padBody && this.refs.padBody.offsetWidth !== this.currentWidth)) {
            this.scale = force ? scale : this.scale;
            this.currentWidth = this.refs.padBody.offsetWidth;
            var width = this.currentWidth * this.scale;
            var height = this.ratio ? width / this.ratio : this.refs.padBody.offsetHeight * this.scale;
            var maxHeight = this.ratio ? height : this.refs.padBody.offsetHeight * this.scale;
            this.refs.canvas.width = width;
            this.refs.canvas.height = height > maxHeight ? maxHeight : height;
            this.refs.canvas.style.maxWidth = "".concat(this.currentWidth * this.scale, "px");
            this.refs.canvas.style.maxHeight = "".concat(maxHeight, "px");
            var ctx = this.refs.canvas.getContext('2d');
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale((1 / this.scale), (1 / this.scale));
            ctx.fillStyle = this.signaturePad.backgroundColor;
            ctx.fillRect(0, 0, this.refs.canvas.width, this.refs.canvas.height);
            this.signaturePad.clear();
            if (this.dataValue) {
                this.setDataToSigaturePad();
            }
            this.showCanvas(true);
        }
    };
    SignatureComponent.prototype.renderElement = function (value, index) {
        return this.renderTemplate('signature', {
            element: _super.prototype.renderElement.call(this, value, index),
            required: lodash_1.default.get(this.component, 'validate.required', false),
        });
    };
    Object.defineProperty(SignatureComponent.prototype, "hasModalSaveButton", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    SignatureComponent.prototype.getModalPreviewTemplate = function () {
        return this.renderTemplate('modalPreview', {
            previewText: this.dataValue ?
                "<img src=".concat(this.dataValue, " ref='openModal' style=\"width: 100%;height: 100%;\" />") :
                this.t('Click to Sign')
        });
    };
    SignatureComponent.prototype.attach = function (element) {
        var _this = this;
        this.loadRefs(element, { canvas: 'single', refresh: 'single', padBody: 'single', signatureImage: 'single' });
        var superAttach = _super.prototype.attach.call(this, element);
        if (this.refs.refresh && this.options.readOnly) {
            this.refs.refresh.classList.add('disabled');
        }
        // Create the signature pad.
        if (this.refs.canvas) {
            this.signaturePad = new signature_pad_1.default(this.refs.canvas, {
                minWidth: this.component.minWidth,
                maxWidth: this.component.maxWidth,
                penColor: this.component.penColor,
                backgroundColor: this.component.backgroundColor
            });
            this.signaturePad.addEventListener('endStroke', function () { return _this.setValue(_this.signaturePad.toDataURL()); });
            this.refs.signatureImage.setAttribute('src', this.signaturePad.toDataURL());
            this.onDisabled();
            // Ensure the signature is always the size of its container.
            if (this.refs.padBody) {
                if (!this.refs.padBody.style.maxWidth) {
                    this.refs.padBody.style.maxWidth = '100%';
                }
                if (!this.builderMode && !this.options.preview) {
                    this.observer = new ResizeObserver(function () {
                        _this.checkSize();
                    });
                    this.observer.observe(this.refs.padBody);
                }
                this.addEventListener(window, 'resize', lodash_1.default.debounce(function () { return _this.checkSize(); }, 10));
                setTimeout(function checkWidth() {
                    if (this.refs.padBody && this.refs.padBody.offsetWidth) {
                        this.checkSize();
                    }
                    else {
                        setTimeout(checkWidth.bind(this), 20);
                    }
                }.bind(this), 20);
            }
        }
        this.addEventListener(this.refs.refresh, 'click', function (event) {
            event.preventDefault();
            _this.showCanvas(true);
            _this.signaturePad.clear();
            _this.setValue(_this.defaultValue);
        });
        this.setValue(this.dataValue);
        return superAttach;
    };
    /* eslint-enable max-statements */
    SignatureComponent.prototype.detach = function () {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
        if (this.signaturePad) {
            this.signaturePad.off();
        }
        this.signaturePad = null;
        this.currentWidth = 0;
        _super.prototype.detach.call(this);
    };
    SignatureComponent.prototype.getValueAsString = function (value) {
        if (lodash_1.default.isUndefined(value) && this.inDataTable) {
            return '';
        }
        return value ? 'Yes' : 'No';
    };
    SignatureComponent.prototype.focus = function () {
        this.refs.padBody.focus();
    };
    SignatureComponent.prototype.setDataToSigaturePad = function () {
        this.signaturePad.fromDataURL(this.dataValue, {
            ratio: 1,
            width: this.refs.canvas.width,
            height: this.refs.canvas.height,
        });
    };
    return SignatureComponent;
}(Input_1.default));
exports.default = SignatureComponent;
//# sourceMappingURL=Signature.js.map