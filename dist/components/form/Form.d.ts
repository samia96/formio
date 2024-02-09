export default class FormComponent extends Component {
    static get builderInfo(): {
        title: string;
        icon: string;
        group: string;
        documentation: string;
        weight: number;
        schema: any;
    };
    static savedValueTypes(): string[];
    init(): any;
    formObj: any;
    valueChanged: boolean | undefined;
    subForm: any;
    formSrc: any;
    get dataReady(): any;
    get emptyValue(): {
        data: {};
    };
    get ready(): any;
    get useOriginalRevision(): any;
    setFormRevision(rev: any): void;
    subFormRevision: any;
    getComponent(path: any, fn: any): any;
    getSubOptions(options?: {}): {};
    render(): any;
    asString(value: any): any;
    attach(element: any): Promise<any>;
    get hasLoadedForm(): any;
    get isRevisionChanged(): any;
    subFormReady: any;
    /**
     * Pass everyComponent to subform.
     * @param args
     * @returns {*|void}
     */
    everyComponent(...args: any[]): any | void;
    setSubFormDisabled(subForm: any): void;
    updateSubWizards(subForm: any): void;
    /**
     * Create a subform instance.
     *
     * @return {*}
     */
    createSubForm(fromAttach: any): any;
    hideSubmitButton(component: any): void;
    /**
     * Load the subform.
     */
    loadSubForm(fromAttach: any): any;
    subFormLoading: boolean | undefined;
    get subFormData(): any;
    checkComponentValidity(data: any, dirty: any, row: any, options: any): any;
    checkComponentConditions(data: any, flags: any, row: any): any;
    calculateValue(data: any, flags: any, row: any): any;
    setPristine(pristine: any): void;
    /**
     * Determine if the subform should be submitted.
     * @return {*|boolean}
     */
    get shouldSubmit(): any;
    /**
     * Returns the data for the subform.
     *
     * @return {*}
     */
    getSubFormData(): any;
    /**
     * Submit the subform if configured to do so.
     *
     * @return {*}
     */
    submitSubForm(rejectOnError: any): any;
    /**
     * Submit the form before the next page is triggered.
     */
    beforePage(next: any): any;
    isSubFormLazyLoad(): any;
    isHidden(): boolean;
    setValue(submission: any, flags?: {}): boolean;
    setSubFormValue(submission: any, flags: any): void;
    areAllComponentsEmpty(data: any): boolean;
    updateSubFormVisibility(): void;
    /**
     * Determines if this form is a Nested Wizard
     * which means it should be a Wizard itself and should be a direct child of a Wizard's page
     * @returns {boolean}
     */
    get isNestedWizard(): boolean;
    isInternalEvent(event: any): boolean;
    createEmitter(): EventEmitter<string | symbol, any>;
}
import Component from '../_classes/component/Component';
import EventEmitter from 'eventemitter3';
