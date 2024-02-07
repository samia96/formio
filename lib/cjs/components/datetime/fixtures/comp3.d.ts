declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        tableView: boolean;
        enableMinDateInput: boolean;
        datePicker: {
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
            minDate: null;
            disableWeekends: boolean;
            disableWeekdays: boolean;
            maxDate: null;
        };
        showValidations?: undefined;
    } | {
        label: string;
        showValidations: boolean;
        tableView: boolean;
        key: string;
        type: string;
        input: boolean;
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
