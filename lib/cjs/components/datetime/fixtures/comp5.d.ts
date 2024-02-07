declare namespace _default {
    const _id: string;
    const type: string;
    const components: ({
        label: string;
        format: string;
        tableView: boolean;
        enableMinDateInput: boolean;
        datePicker: {
            minDate: string;
            disableFunction: string;
            disableWeekends: boolean;
            disableWeekdays: boolean;
        };
        enableMaxDateInput: boolean;
        key: string;
        type: string;
        input: boolean;
        widget: {
            type: string;
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
            minDate: string;
            disableWeekends: boolean;
            disableWeekdays: boolean;
            disableFunction: string;
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
        format?: undefined;
        enableMinDateInput?: undefined;
        datePicker?: undefined;
        enableMaxDateInput?: undefined;
        widget?: undefined;
    })[];
    const title: string;
    const display: string;
    const name: string;
    const path: string;
}
export default _default;
