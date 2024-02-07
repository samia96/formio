export default class CalendarWidget extends InputWidget {
    static get defaultSettings(): {
        type: string;
        altInput: boolean;
        allowInput: boolean;
        clickOpens: boolean;
        enableDate: boolean;
        enableTime: boolean;
        mode: string;
        noCalendar: boolean;
        format: string;
        dateFormat: string;
        useLocaleSettings: boolean;
        language: string;
        hourIncrement: number;
        minuteIncrement: number;
        time_24hr: boolean;
        saveAs: string;
        displayInTimezone: string;
        timezone: string;
        disable: never[];
        minDate: string;
        maxDate: string;
    };
    zoneLoading: boolean;
    timezonesUrl: string;
    /**
     * Load the timezones.
     *
     * @return {boolean} TRUE if the zones are loading, FALSE otherwise.
     */
    loadZones(): boolean;
    attach(input: any): Promise<any>;
    defaultFormat: {
        date: string;
        time: string;
    } | undefined;
    closedOn: number | undefined;
    valueFormat: any;
    valueMomentFormat: string | undefined;
    get disableWeekends(): (date: any) => boolean;
    get disableWeekdays(): (date: any) => boolean;
    get disableFunction(): (date: any) => any;
    get timezone(): any;
    get defaultSettings(): {
        type: string;
        altInput: boolean;
        allowInput: boolean;
        clickOpens: boolean;
        enableDate: boolean;
        enableTime: boolean;
        mode: string;
        noCalendar: boolean;
        format: string;
        dateFormat: string;
        useLocaleSettings: boolean;
        language: string;
        hourIncrement: number;
        minuteIncrement: number;
        time_24hr: boolean;
        saveAs: string;
        displayInTimezone: string;
        timezone: string;
        disable: never[];
        minDate: string;
        maxDate: string;
    };
    addSuffix(suffix: any): any;
    get disabledDates(): any;
    get localeFormat(): string;
    get dateTimeFormat(): string;
    get dateFormat(): any;
    /**
     * Return the date value.
     *
     * @param date
     * @param format
     * @return {string}
     */
    getDateValue(date: any, format: any, useTimezone: any): string;
    isValueISO8601(value: any): any;
    /**
     * Set the selected date value.
     *
     * @param value
     */
    setValue(value: any): void;
    getValueAsString(value: any, format: any): string;
    setErrorClasses(hasErrors: any): void;
    isCalendarElement(element: any): any;
    initFlatpickr(Flatpickr: any): void;
    calendar: any;
    initShortcutButtonsPlugin(ShortcutButtonsPlugin: any): void;
    get componentValue(): any;
    getFlatpickrFormatDate(Flatpickr: any): (date: any, format: any) => any;
}
import InputWidget from './InputWidget';
