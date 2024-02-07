export namespace KEY_CODES {
    const BACK_KEY: number;
    const DELETE_KEY: number;
    const TAB_KEY: number;
    const ENTER_KEY: number;
    const A_KEY: number;
    const ESC_KEY: number;
    const UP_KEY: number;
    const DOWN_KEY: number;
    const PAGE_UP_KEY: number;
    const PAGE_DOWN_KEY: number;
}
export default ChoicesWrapper;
declare class ChoicesWrapper extends Choices {
    constructor(...args: any[]);
    _onTabKey({ activeItems, hasActiveDropdown }: {
        activeItems: any;
        hasActiveDropdown: any;
    }): void;
    isDirectionUsing: boolean;
    shouldOpenDropDown: boolean;
    _onTouchEnd(event: any): void;
    _handleButtonAction(activeItems: any, element: any): void;
    _onEnterKey(args: any): void;
    _onDirectionKey(...args: any[]): void;
    timeout: NodeJS.Timeout | undefined;
    _selectHighlightedChoice(activeItems: any): void;
    _onKeyDown(event: any): void;
    onSelectValue({ event, activeItems, hasActiveDropdown }: {
        event: any;
        activeItems: any;
        hasActiveDropdown: any;
    }): void;
    showDropdown(...args: any[]): void;
    hideDropdown(...args: any[]): void;
    _onBlur(...args: any[]): void;
}
import Choices from '@formio/choices.js';
