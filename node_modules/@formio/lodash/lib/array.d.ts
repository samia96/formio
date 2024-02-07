export declare function chunk(input: any, size: any): any;
export declare function compact(input: any): any;
/**
 * @link https://lodash.com/docs/4.17.15#concat
 * @param input
 * @param args
 * @returns
 */
export declare function concat(input: any, ...args: any): any;
export declare function difference(...arrays: any): any;
export declare function drop(arr: any, index?: any): any;
export declare function dropRight(arr: any, index?: any): any;
/**
 * Iterate through a collection or array.
 * @param collection
 * @param _each
 */
export declare function each(collection: any, _each: any): void;
/**
 * Perform a find operation.
 * @param arr
 * @param query
 */
export declare function find(arr: any, query?: any, findIndex?: boolean): any;
/**
 * Find an index.
 *
 * @param arr
 * @param query
 * @returns
 */
export declare function findIndex(arr: any, query?: any): any;
/**
 * Returns a function to perform matches.
 * @param query
 * @returns
 */
export declare function matches(query: any): (comp: any) => boolean;
/**
 * Perform a find operation on each item in an array.
 * @param arr
 * @param query
 * @param fn
 */
export declare function findEach(arr: any, query: any, fn: any): void;
/**
 * Perform a filter operation.
 * @param arr
 * @param fn
 */
export declare function filter(arr: any, fn?: any): any;
/**
 * Get the last item in an array.
 * @param arr
 */
export declare function last(arr: Array<any>): any;
/**
 * https://lodash.com/docs/4.17.15#head
 * @param arr
 * @returns
 */
export declare function head(arr: Array<any>): any;
/**
 * https://lodash.com/docs/4.17.15#map
 * @param arr
 * @param fn
 * @returns
 */
export declare function map(arr: any, fn: any): any;
/**
 * Get the intersection of two objects.
 * @param a
 * @param b
 */
export declare function intersection(a: any, b: any): any;
