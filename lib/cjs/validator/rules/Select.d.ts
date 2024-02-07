export default class Select extends Rule {
    defaultMessage: string;
    check(value: any, data: any, row: any, async: any): true | Promise<any>;
}
import Rule from './Rule';
