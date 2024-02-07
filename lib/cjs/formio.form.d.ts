/**
 * Register a module
 * @param {*} plugin
 * @returns
 */
export function registerModule(mod: any, defaultFn?: null, options?: {}): void;
export function useModule(defaultFn?: null): (plugins: any, options?: {}) => void;
import Components from './components/Components';
import Displays from './displays/Displays';
import Providers from './providers';
import Rules from './validator/Rules';
import Widgets from './widgets';
import Templates from './templates/Templates';
import Conjunctions from './validator/conjunctions';
import Operators from './validator/operators';
import QuickRules from './validator/quickRules';
import Transformers from './validator/transformers';
import ValueSources from './validator/valueSources';
import Utils from './utils';
import Form from './Form';
import { Formio } from './Formio';
import Licenses from './licenses';
export { Components, Displays, Providers, Rules, Widgets, Templates, Conjunctions, Operators, QuickRules, Transformers, ValueSources, Utils, Form, Formio, Licenses };
