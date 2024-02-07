/**
 * Get the keys of an Object.
 * @param obj
 */
export declare function keys(obj: any): string[];
/**
 * Return the values of an object or an array.
 * @param obj
 * @returns
 */
export declare function values(obj: any): unknown[];
/**
 * Retrieve the path parts provided a path string.
 * @param path
 */
export declare function pathParts(path: string): string[];
/**
 * Get the value from an object or an array provided a path.
 *
 * @param obj
 * @param path
 * @param def
 */
export declare function get(obj: any, path: string, def?: any): any;
export declare function property(path: string): (obj: any) => any;
export declare function propertyOf(obj: any): (path: string) => any;
/**
 * Determine if a value is set.
 *
 * @param obj
 * @param path
 */
export declare function has(obj: any, path: string): boolean;
/**
 * Sets the value of an item within an array or object.
 * @param obj
 * @param path
 * @param value
 */
export declare function set(obj: any, path: string, value: any): any;
/**
 * Merges a complex data object.
 *
 * @param a
 * @param b
 * @param options
 */
export declare function merge(...args: any): any;
/**
 * Performs a fast clone deep operation.
 *
 * @param obj
 */
export declare function fastCloneDeep(obj: any): any;
/**
 * Performs a shallow clone of an object.
 * @param src
 */
export declare function clone(src: any): any;
/**
 * Performs a recursive cloneDeep operation.
 * @param src
 * @returns
 */
export declare function cloneDeep(src: any): any;
/**
 * Sets the defaults of an object.
 *
 * @param obj
 * @param defs
 */
export declare function defaults(obj: any, defs: any): any;
/**
 * Pick an item in an object.
 * @param object
 * @param keys
 */
export declare function pick(object: any, keys?: any): any;
