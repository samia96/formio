declare namespace _default {
    const title: string;
    const name: string;
    const path: string;
    const type: string;
    const display: string;
    const components: ({
        label: string;
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
        format?: undefined;
        datePicker?: undefined;
        enableTime?: undefined;
        enableMinDateInput?: undefined;
        enableMaxDateInput?: undefined;
        widget?: undefined;
    })[];
    const created: string;
    const modified: string;
    const machineName: string;
}
export default _default;
