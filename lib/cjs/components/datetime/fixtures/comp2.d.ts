declare namespace _default {
    export const type: string;
    export namespace validate {
        const custom: string;
        const required: boolean;
    }
    export const shortcutButtons: {
        label: string;
        onClick: string;
    }[];
    export const persistent: boolean;
    const _protected: boolean;
    export { _protected as protected };
    export namespace timePicker {
        const arrowkeys: boolean;
        const mousewheel: boolean;
        const readonlyInput: boolean;
        const showMeridian: boolean;
        const minuteStep: number;
        const hourStep: number;
    }
    export namespace datePicker {
        const datepickerMode: string;
        const yearRange: string;
        const maxMode: string;
        const minMode: string;
        const initDate: string;
        const startingDay: number;
        const showWeeks: boolean;
    }
    const datepickerMode_1: string;
    export { datepickerMode_1 as datepickerMode };
    export const defaultDate: string;
    export const enableTime: boolean;
    export const enableDate: boolean;
    export const format: string;
    export const key: string;
    export const label: string;
    export const tableView: boolean;
    export const input: boolean;
}
export default _default;
