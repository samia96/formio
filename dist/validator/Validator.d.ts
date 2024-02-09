declare const instance: ValidationChecker;
export class ValidationChecker {
    constructor(config?: {});
    config: any;
    validators: {
        required: {
            key: string;
            method: string;
            hasLabel: boolean;
            message(component: any): any;
            check(component: any, setting: any, value: any): any;
        };
        onlyAvailableItems: {
            key: string;
            method: string;
            hasLabel: boolean;
            message(component: any): any;
            check(component: any, setting: any): boolean;
        };
        unique: {
            key: string;
            hasLabel: boolean;
            message(component: any): any;
            check(component: any, setting: any, value: any): true | Promise<any>;
        };
        multiple: {
            key: string;
            hasLabel: boolean;
            message(component: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        select: {
            key: string;
            hasLabel: boolean;
            message(component: any): any;
            check(component: any, setting: any, value: any, data: any, index: any, row: any, async: any): any;
        };
        min: {
            key: string;
            hasLabel: boolean;
            message(component: any, setting: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        max: {
            key: string;
            hasLabel: boolean;
            message(component: any, setting: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        minSelectedCount: {
            key: string;
            message(component: any, setting: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        maxSelectedCount: {
            key: string;
            message(component: any, setting: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        minLength: {
            key: string;
            hasLabel: boolean;
            message(component: any, setting: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        maxLength: {
            key: string;
            hasLabel: boolean;
            message(component: any, setting: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        maxWords: {
            key: string;
            hasLabel: boolean;
            message(component: any, setting: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        minWords: {
            key: string;
            hasLabel: boolean;
            message(component: any, setting: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        email: {
            hasLabel: boolean;
            message(component: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        url: {
            hasLabel: boolean;
            message(component: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        date: {
            hasLabel: boolean;
            message(component: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        day: {
            hasLabel: boolean;
            message(component: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        pattern: {
            key: string;
            hasLabel: boolean;
            message(component: any, setting: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        json: {
            key: string;
            check(component: any, setting: any, value: any, data: any, index: any, row: any): any;
        };
        mask: {
            key: string;
            hasLabel: boolean;
            message(component: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        custom: {
            key: string;
            message(component: any): any;
            check(component: any, setting: any, value: any, data: any, index: any, row: any): any;
        };
        maxDate: {
            key: string;
            hasLabel: boolean;
            message(component: any, setting: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        minDate: {
            key: string;
            hasLabel: boolean;
            message(component: any, setting: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        minYear: {
            key: string;
            hasLabel: boolean;
            message(component: any, setting: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        maxYear: {
            key: string;
            hasLabel: boolean;
            message(component: any, setting: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        calendar: {
            key: string;
            messageText: string;
            hasLabel: boolean;
            message(component: any): any;
            check(component: any, setting: any, value: any, data: any, index: any): boolean | undefined;
        };
        time: {
            key: string;
            messageText: string;
            hasLabel: boolean;
            message(component: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
        availableValueProperty: {
            key: string;
            method: string;
            messageText: string;
            hasLabel: boolean;
            message(component: any): any;
            check(component: any, setting: any, value: any): boolean;
        };
    };
    checkValidator(component: any, validator: any, setting: any, value: any, data: any, index: any, row: any, async: any): any;
    validate(component: any, validatorName: any, value: any, data: any, index: any, row: any, async: any, conditionallyVisible: any, validationObj: any): false | {
        message: string;
        level: string;
        path: any;
        context: {
            validator: any;
            hasLabel: any;
            setting: any;
            key: any;
            label: any;
            value: any;
            index: any;
            input: any;
        };
    } | Promise<false | {
        message: string;
        level: string;
        path: any;
        context: {
            validator: any;
            hasLabel: any;
            setting: any;
            key: any;
            label: any;
            value: any;
            index: any;
            input: any;
        };
    }>;
    checkComponent(component: any, data: any, row: any, includeWarnings?: boolean, async?: boolean): any;
    /**
     * Use the new validations engine to evaluate any errors.
     *
     * @param component
     * @param validations
     * @param data
     * @param row
     * @param values
     * @returns {any[]}
     */
    checkValidations(component: any, validations: any, data: any, row: any, values: any, async: any): any[];
    checkRule(component: any, validation: any, data: any, row: any, values: any, async: any): false | any[];
    get check(): (component: any, data: any, row: any, includeWarnings?: boolean, async?: boolean) => any;
    get(...args: any[]): void;
    each(...args: any[]): void;
    has(...args: any[]): void;
}
export namespace ValidationChecker {
    namespace config {
        const db: null;
        const token: null;
        const form: null;
        const submission: null;
    }
}
export { instance as default };
