export default class PDF extends Webform {
    constructor(element: any, options: any);
    components: any[];
    init(): void;
    submitButton: any;
    attachComponents(element: any, components: any, container: any): Promise<void>;
    attach(element: any): Promise<void>;
    iframeReady: Promise<any> | undefined;
    iframeReadyResolve: ((value: any) => void) | undefined;
    iframeReadyReject: ((reason?: any) => void) | undefined;
    iframeElement: any;
    /**
     * Get the submission from the iframe.
     *
     * @return {Promise<any>}
     */
    getSubmission(): Promise<any>;
    /**
     * Ensure we have the submission from the iframe before we submit the form.
     *
     * @param options
     * @return {*}
     */
    submitForm(options?: {}): any;
    getSrc(): string;
    setForm(form: any, flags?: {}): any;
    /**
     * Set's the value of this form component.
     *
     * @param submission
     * @param flags
     */
    setValue(submission: any, flags?: {}): boolean;
    postMessage(message: any): void;
    iframeFormSetUp: boolean | undefined;
    focusOnComponent(key: any): void;
    showErrors(error: any, triggerEvent: any): void;
    isSubmitButtonHidden(): boolean;
}
import Webform from './Webform';
