export class GoogleAddressProvider extends AddressProvider {
    get displayValueProperty(): string;
    get alternativeDisplayValueProperty(): string;
    set autocompleteOptions(arg: any);
    get autocompleteOptions(): any;
    _autocompleteOptions: any;
    setAutocompleteOptions(): void;
    beforeMergeOptions(options: any): void;
    getLibraryName(): string;
    convertRegionToAutocompleteOption(options: any): void;
    getRequiredAddressProperties(): string[];
    addRequiredProviderOptions(options: any): void;
    filterPlace(place: any): {};
    attachAutocomplete(elem: any, index: any, onSelectAddress: any): void;
    search(): Promise<void>;
    makeRequest(): Promise<void>;
}
import { AddressProvider } from './AddressProvider';
