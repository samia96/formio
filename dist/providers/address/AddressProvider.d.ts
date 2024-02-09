export class AddressProvider {
    static get name(): string;
    static get displayName(): string;
    constructor(options?: {});
    options: any;
    beforeMergeOptions(): void;
    get defaultOptions(): {};
    get queryProperty(): string;
    get responseProperty(): null;
    get displayValueProperty(): null;
    serialize(params: any): any;
    getRequestOptions(options?: {}): any;
    getRequestUrl(options?: {}): void;
    makeRequest(options?: {}): any;
    search(query: any, options?: {}): any;
    getDisplayValue(address: any): any;
}
