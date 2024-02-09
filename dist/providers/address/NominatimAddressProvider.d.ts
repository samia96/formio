export class NominatimAddressProvider extends AddressProvider {
    get defaultOptions(): {
        params: {
            addressdetails: string;
            format: string;
        };
    };
    get displayValueProperty(): string;
    getRequestUrl(options?: {}): string;
}
import { AddressProvider } from './AddressProvider';
