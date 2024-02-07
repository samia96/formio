export default class Unique extends Rule {
    defaultMessage: string;
    check(value: any): true | Promise<any>;
}
import Rule from './Rule';
