export default class TabsComponent extends NestedComponent {
    static get builderInfo(): {
        title: string;
        group: string;
        icon: string;
        weight: number;
        documentation: string;
        showPreview: boolean;
        schema: any;
    };
    static savedValueTypes(): never[];
    constructor(...args: any[]);
    get tabKey(): string;
    get tabLikey(): string;
    get tabLinkKey(): string;
    currentTab: number;
    noField: boolean;
    tabs: any[] | undefined;
    render(): any;
    detach(all: any): void;
    /**
     * Set the current tab.
     *
     * @param index
     */
    setTab(index: any): void;
    beforeFocus(component: any): void;
    handleTabsValidation(): void;
}
import NestedComponent from '../_classes/nested/NestedComponent';
