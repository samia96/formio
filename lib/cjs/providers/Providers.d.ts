export default class Providers {
    static providers: {
        address: {
            [x: string]: typeof import("./address/CustomAddressProvider").CustomAddressProvider | typeof import("./address/GoogleAddressProvider").GoogleAddressProvider;
        };
        auth: {};
        storage: {
            base64: typeof import("./storage/base64").default;
            s3: typeof import("./storage/s3").default;
            url: typeof import("./storage/url").default;
            azure: typeof import("./storage/azure").default;
            indexeddb: typeof import("./storage/indexeddb").default;
            googledrive: typeof import("./storage/googleDrive").default;
        };
    };
    static addProvider(type: any, name: any, provider: any): void;
    static addProviders(type: any, providers: any): void;
    static getProvider(type: any, name: any): any;
    static getProviders(type: any): any;
}
