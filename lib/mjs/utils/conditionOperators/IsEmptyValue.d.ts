export default class IsEmptyValue extends ConditionOperator {
    execute({ value, instance, conditionComponentPath }: {
        value: any;
        instance: any;
        conditionComponentPath: any;
    }): any;
    getResult(options: any): any;
}
import ConditionOperator from './ConditionOperator';
