// Importing basic libraries
import { StateEnum } from "./util/StateEnum";
import { logBodyData } from "./util/logBodyData";
import { logStateAggregates } from "./util/aggregateStates";

(async () => {
    try {
        console.log("Body data:");
        try {
            logBodyData(0);
        } catch (error) {
            console.error(error);
        }

        console.log("\nStatus aggregates:");
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

            logStateAggregates(keyList, valueList, "a,b,k,@hibernating,n");
        } catch (error) {
            console.error(error);
        }

        console.log("\nThingly potatoness:");
        try {
            const isItAPotato = (thing: string) => thing == "potato";

            let allTheThings = ["potato", "not a potato"];

            let thinglyPotatoness = allTheThings.map(isItAPotato);

            allTheThings.forEach((thing, index) => console.log(`"${thing}" ${thinglyPotatoness[index] ? "is" : "is not" } a potato`));
        } catch (error) {
            console.error(error);
        }
    } catch (error) {
        console.error(error);
    }
})();
