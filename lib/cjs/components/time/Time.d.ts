export default class TimeComponent extends TextFieldComponent {
    rawData: string | never[];
    get dataFormat(): any;
    get skipMaskValidation(): boolean;
    isNotCompleteInput(value: any): any;
    removeValue(index: any): void;
    resetRawData(index: any): void;
    setRawValue(value: any, index: any): void;
    getRawValue(index: any): string | never[];
    getValueAt(index: any): any;
    setValueAt(index: any, value: any): void;
    getStringAsValue(view: any): any;
    getValueAsString(value: any): any;
    getInputMaskFromFormat(format: any): any;
}
import TextFieldComponent from '../textfield/TextField';
