export default class Multivalue extends Field {
    get addAnother(): any;
    useWrapper(): any;
    render(): any;
    renderElement(): string;
    renderRow(value: any, index: any): any;
    attach(dom: any): Promise<any[]>;
    /**
     * Attach inputs to the element.
     *
     * @param element
     * @param index
     */
    attachElement(element: any, index: any): void;
    onSelectMaskHandler(event: any): void;
    getMaskPattern(maskName: any): any;
    multiMasks: {} | undefined;
    attachMultiMask(index: any): boolean;
    updateMask(input: any, mask: any): void;
    /**
     * Adds a new empty value to the data array.
     */
    addNewValue(value: any): void;
    /**
     * Adds a new empty value to the data array, and add a new row to contain it.
     */
    addValue(): void;
}
import Field from '../field/Field';
