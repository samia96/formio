export default class IsEqualTo extends ConditionOperator {
    execute({ value, comparedValue, instance, conditionComponentPath }: {
        value: any;
        comparedValue: any;
        instance: any;
        conditionComponentPath: any;
    }): any;
}
import ConditionOperator from './ConditionOperator';
