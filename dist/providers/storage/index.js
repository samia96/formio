"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var base64_1 = __importDefault(require("./base64"));
var s3_1 = __importDefault(require("./s3"));
var azure_1 = __importDefault(require("./azure"));
var url_1 = __importDefault(require("./url"));
var indexeddb_1 = __importDefault(require("./indexeddb"));
var googleDrive_1 = __importDefault(require("./googleDrive"));
exports.default = {
    base64: base64_1.default,
    s3: s3_1.default,
    url: url_1.default,
    azure: azure_1.default,
    indexeddb: indexeddb_1.default,
    googledrive: googleDrive_1.default
};
//# sourceMappingURL=index.js.map