declare namespace _default {
    const type: string;
    const display: string;
    const components: {
        label: string;
        key: string;
        type: string;
        input: boolean;
        tableView: boolean;
        components: ({
            label: string;
            widget: string;
            tableView: boolean;
            data: {
                values: {
                    label: string;
                    value: string;
                }[];
            };
            key: string;
            type: string;
            input: boolean;
            values?: undefined;
            format?: undefined;
            hidden?: undefined;
            enableMinDateInput?: undefined;
            datePicker?: undefined;
            enableMaxDateInput?: undefined;
            timePicker?: undefined;
            logic?: undefined;
            clearOnHide?: undefined;
            disabled?: undefined;
        } | {
            label: string;
            tableView: boolean;
            values: {
                label: string;
                value: string;
                shortcut: string;
            }[];
            key: string;
            type: string;
            input: boolean;
            widget?: undefined;
            data?: undefined;
            format?: undefined;
            hidden?: undefined;
            enableMinDateInput?: undefined;
            datePicker?: undefined;
            enableMaxDateInput?: undefined;
            timePicker?: undefined;
            logic?: undefined;
            clearOnHide?: undefined;
            disabled?: undefined;
        } | {
            label: string;
            format: string;
            hidden: boolean;
            tableView: boolean;
            enableMinDateInput: boolean;
            datePicker: {
                disableWeekends: boolean;
                disableWeekdays: boolean;
            };
            enableMaxDateInput: boolean;
            timePicker: {
                showMeridian: boolean;
            };
            key: string;
            logic: {
                name: string;
                trigger: {
                    type: string;
                    javascript: string;
                };
                actions: {
                    name: string;
                    type: string;
                    property: {
                        label: string;
                        value: string;
                        type: string;
                    };
                    state: boolean;
                }[];
            }[];
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
            data?: undefined;
            values?: undefined;
            clearOnHide?: undefined;
            disabled?: undefined;
        } | {
            label: string;
            hidden: boolean;
            clearOnHide: boolean;
            disabled: boolean;
            tableView: boolean;
            key: string;
            logic: ({
                name: string;
                trigger: {
                    type: string;
                    simple: {
                        show: boolean;
                        when: string;
                        eq: string;
                    };
                    event?: undefined;
                };
                actions: {
                    name: string;
                    type: string;
                    value: string;
                }[];
            } | {
                name: string;
                trigger: {
                    type: string;
                    event: string;
                    simple?: undefined;
                };
                actions: {
                    name: string;
                    type: string;
                    property: {
                        label: string;
                        value: string;
                        type: string;
                    };
                    state: boolean;
                }[];
            })[];
            type: string;
            input: boolean;
            widget?: undefined;
            data?: undefined;
            values?: undefined;
            format?: undefined;
            enableMinDateInput?: undefined;
            datePicker?: undefined;
            enableMaxDateInput?: undefined;
            timePicker?: undefined;
        })[];
    }[];
}
export default _default;
