export class AzureAddressProvider extends AddressProvider {
    get defaultOptions(): {
        params: {
            'api-version': string;
            typeahead: string;
        };
    };
    get responseProperty(): string;
    get displayValueProperty(): string;
    getRequestUrl(options?: {}): string;
}
import { AddressProvider } from './AddressProvider';
