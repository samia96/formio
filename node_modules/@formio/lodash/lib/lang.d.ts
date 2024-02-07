/**
 * A no-operation function.
 */
export declare function noop(): void;
/**
 * Determines equality of a value or complex object.
 * @param a
 * @param b
 */
export declare function isEqual(a: any, b: any): boolean;
export declare function isString(val: any): val is string;
export declare function isEmpty(val: object): boolean;
export declare function isInteger(val: any): boolean;
export declare function isNaN(val: any): boolean;
export declare function isNil(val: any): val is null | undefined;
export declare function isNull(val: any): val is null;
export declare function isArray<T>(val: any): val is T[];
export declare function isObjectLike(val: any): boolean;
export declare function isObject(val: any): val is object;
export declare function isPlainObject(value: any): boolean;
export declare function isNumber(val: any): val is number;
export declare function isBoolean(val: any): val is boolean;
export declare function isRegExp(val: any): val is RegExp;
