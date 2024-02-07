export class Formio {
    static baseUrl: any;
    static projectUrl: any;
    static language: any;
    static config: {};
    static cdn: null;
    static proxy: boolean;
    static version: string;
    static setBaseUrl(url: any): Promise<void>;
    static setProjectUrl(url: any): Promise<void>;
    static debug(...args: any[]): void;
    static clearCache(): void;
    static global(prop: any): any;
    static createElement(type: any, attrs: any, children: any): any;
    static addScript(wrapper: any, src: any, name: any): Promise<any>;
    static addStyles(wrapper: any, href: any): Promise<void>;
    static submitDone(instance: any, submission: any): Promise<void>;
    static formioScript(script: any, builder: any): any;
    static init(element: any, options?: {}, builder?: boolean): Promise<any>;
    static createForm(element: any, form: any, options: any): Promise<any>;
    static builder(element: any, form: any, options: any): Promise<any>;
}
export namespace Formio {
    export { Form };
    export { FormBuilder };
}
export class Form {
    constructor(element: any, form: any, options: any);
    form: any;
    element: any;
    options: any;
    instance: {
        proxy: boolean;
        ready: Promise<any> | undefined;
        destroy: () => void;
    };
    init(): void;
    ready: Promise<any> | undefined;
    create(): Promise<any>;
    setDisplay(display: any): Promise<any> | undefined;
}
export class FormBuilder extends Form {
}
