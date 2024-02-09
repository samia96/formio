declare namespace _default {
    const type: string;
    const components: ({
        label: string;
        conditionalAddButton: string;
        tableView: boolean;
        templates: {
            header: string;
            row: string;
        };
        addAnother: string;
        saveRow: string;
        inlineEdit: boolean;
        customDefaultValue: string;
        validate: {
            minLength: number;
        };
        rowDrafts: boolean;
        key: string;
        type: string;
        input: boolean;
        components: ({
            label: string;
            columns: ({
                components: {
                    label: string;
                    widget: string;
                    tableView: boolean;
                    dataSrc: string;
                    data: {
                        custom: string;
                    };
                    template: string;
                    validate: {
                        required: boolean;
                    };
                    key: string;
                    type: string;
                    input: boolean;
                    hideOnChildrenHidden: boolean;
                }[];
                width: number;
                offset: number;
                push: number;
                pull: number;
                size: string;
                currentWidth: number;
            } | {
                components: {
                    label: string;
                    widget: string;
                    tableView: boolean;
                    dataSrc: string;
                    data: {
                        custom: string;
                    };
                    template: string;
                    validate: {
                        required: boolean;
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
                    hideOnChildrenHidden: boolean;
                }[];
                width: number;
                offset: number;
                push: number;
                pull: number;
                size: string;
                currentWidth: number;
            })[];
            key: string;
            type: string;
            tableView: boolean;
            input: boolean;
            hideOnChildrenHidden: boolean;
        } | {
            label: string;
            columns: ({
                components: {
                    label: string;
                    widget: string;
                    tableView: boolean;
                    data: {
                        values: {
                            label: string;
                            value: string;
                        }[];
                    };
                    refreshOn: string;
                    validate: {
                        required: boolean;
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
                    hideOnChildrenHidden: boolean;
                }[];
                width: number;
                offset: number;
                push: number;
                pull: number;
                size: string;
                currentWidth: number;
            } | {
                components: {
                    label: string;
                    mask: boolean;
                    spellcheck: boolean;
                    tableView: boolean;
                    currency: string;
                    inputFormat: string;
                    validate: {
                        required: boolean;
                    };
                    key: string;
                    type: string;
                    input: boolean;
                    delimiter: boolean;
                    hideOnChildrenHidden: boolean;
                }[];
                width: number;
                offset: number;
                push: number;
                pull: number;
                size: string;
                currentWidth: number;
            })[];
            key: string;
            type: string;
            input: boolean;
            tableView: boolean;
            hideOnChildrenHidden: boolean;
        })[];
        disableOnInvalid?: undefined;
    } | {
        type: string;
        label: string;
        key: string;
        disableOnInvalid: boolean;
        input: boolean;
        tableView: boolean;
        conditionalAddButton?: undefined;
        templates?: undefined;
        addAnother?: undefined;
        saveRow?: undefined;
        inlineEdit?: undefined;
        customDefaultValue?: undefined;
        validate?: undefined;
        rowDrafts?: undefined;
        components?: undefined;
    })[];
    const display: string;
}
export default _default;
