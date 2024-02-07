export default class ListComponent extends Field {
    get isSelectURL(): boolean;
    get selectData(): any;
    get shouldLoad(): any;
    getTemplateKeys(): void;
    templateKeys: any[] | undefined;
    get requestHeaders(): any;
    setItems(): void;
    updateCustomItems(): void;
    loadItems(): void;
    getOptionTemplate(data: any, value: any, index: any): any;
    itemTemplate(data: any, value: any, index: any): any;
    handleLoadingError(err: any): void;
    loading: boolean | undefined;
    networkError: boolean | undefined;
    updateItems(searchInput: any, forceUpdate: any): void;
}
import Field from '../field/Field';
