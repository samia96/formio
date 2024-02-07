declare namespace _default {
    /**
     * Appends a number to a component.key to keep it unique
     *
     * @param {Object} form
     *   The components parent form.
     * @param {Object} component
     *   The component to uniquify
     */
    function uniquify(container: any, component: Object): boolean;
    namespace additionalShortcuts {
        const button: string[];
    }
    function getAlphaShortcuts(): any;
    function getAdditionalShortcuts(type: any): any;
    function getBindedShortcuts(components: any, input: any): any[];
    function getAvailableShortcuts(form: any, component: any): {
        label: string;
        value: string;
    }[];
}
export default _default;
