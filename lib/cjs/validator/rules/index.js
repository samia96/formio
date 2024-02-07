"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Custom_1 = __importDefault(require("./Custom"));
const Date_1 = __importDefault(require("./Date"));
const Day_1 = __importDefault(require("./Day"));
const Email_1 = __importDefault(require("./Email"));
const JSON_1 = __importDefault(require("./JSON"));
const Mask_1 = __importDefault(require("./Mask"));
const Max_1 = __importDefault(require("./Max"));
const MaxDate_1 = __importDefault(require("./MaxDate"));
const MaxLength_1 = __importDefault(require("./MaxLength"));
const MaxWords_1 = __importDefault(require("./MaxWords"));
const Min_1 = __importDefault(require("./Min"));
const MinDate_1 = __importDefault(require("./MinDate"));
const MinLength_1 = __importDefault(require("./MinLength"));
const MinWords_1 = __importDefault(require("./MinWords"));
const Pattern_1 = __importDefault(require("./Pattern"));
const Required_1 = __importDefault(require("./Required"));
const Select_1 = __importDefault(require("./Select"));
const Unique_1 = __importDefault(require("./Unique"));
const Url_1 = __importDefault(require("./Url"));
const MinYear_1 = __importDefault(require("./MinYear"));
const MaxYear_1 = __importDefault(require("./MaxYear"));
const Time_1 = __importDefault(require("./Time"));
exports.default = {
    custom: Custom_1.default,
    date: Date_1.default,
    day: Day_1.default,
    email: Email_1.default,
    json: JSON_1.default,
    mask: Mask_1.default,
    max: Max_1.default,
    maxDate: MaxDate_1.default,
    maxLength: MaxLength_1.default,
    maxWords: MaxWords_1.default,
    min: Min_1.default,
    minDate: MinDate_1.default,
    minLength: MinLength_1.default,
    minWords: MinWords_1.default,
    pattern: Pattern_1.default,
    required: Required_1.default,
    select: Select_1.default,
    unique: Unique_1.default,
    url: Url_1.default,
    minYear: MinYear_1.default,
    maxYear: MaxYear_1.default,
    time: Time_1.default,
};
