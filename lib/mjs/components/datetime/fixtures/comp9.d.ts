declare namespace _default {
    const _id: string;
    const title: string;
    const name: string;
    const path: string;
    const type: string;
    const display: string;
    const components: ({
        label: string;
        displayInTimezone: string;
        format: string;
        tableView: boolean;
        datePicker: {
            disableWeekends: boolean;
            disableWeekdays: boolean;
        };
        enableTime: boolean;
        enableMinDateInput: boolean;
        enableMaxDateInput: boolean;
        key: string;
        type: string;
        timezone: string;
        input: boolean;
        widget: {
            type: string;
            timezone: string;
            displayInTimezone: string;
            locale: string;
            useLocaleSettings: boolean;
            allowInput: boolean;
            mode: string;
            enableTime: boolean;
            noCalendar: boolean;
            format: string;
            hourIncrement: number;
            minuteIncrement: number;
            time_24hr: boolean;
            minDate: null;
            disableWeekends: boolean;
            disableWeekdays: boolean;
            maxDate: null;
        };
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        displayInTimezone?: undefined;
        format?: undefined;
        datePicker?: undefined;
        enableTime?: undefined;
        enableMinDateInput?: undefined;
        enableMaxDateInput?: undefined;
        timezone?: undefined;
        widget?: undefined;
    })[];
    const settings: {};
    const properties: {};
    const project: string;
}
export default _default;
