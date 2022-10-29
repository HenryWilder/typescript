// Importing basic libraries
import { StateEnum } from "./util/StateEnum";
import { logBodyData } from "./util/logBodyData";
import { logStateAggregates } from "./util/aggregateStates";

(async () => {
    try {
        try {
            logBodyData(0);
        } catch (error) {
            console.error(error);
        }

        try {
            // Arrays
            const keyList: string[] = [
                'a',
                'b',
                'z',
                'd',
                'k',
                'n',
            ];

            const valueList: StateEnum[] = [
                StateEnum.inactive,
                StateEnum.inactive,
                StateEnum.active,
                StateEnum.hibernating,
                StateEnum.active,
                StateEnum.active,
            ];

            console.log("Status aggregates:");
            logStateAggregates(keyList, valueList, "a,b,k,@hibernating,n");
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
})();
