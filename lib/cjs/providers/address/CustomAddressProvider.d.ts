export class CustomAddressProvider extends AddressProvider {
    get queryProperty(): any;
    get responseProperty(): any;
    get displayValueProperty(): any;
    getRequestUrl(options?: {}): string;
}
import { AddressProvider } from './AddressProvider';
