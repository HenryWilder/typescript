import { mapify } from "./mapify";
import { StateEnum } from "./StateEnum";

export const aggregateStates = (keyList: string[], valueList: StateEnum[], keyLookupListString: string) => {
    const lookupTable: Map<string, StateEnum> = mapify(keyList, valueList);
    return keyLookupListString.split(',').reduce(lookupKeyOrState(lookupTable), Array(Object.values(StateEnum).length >> 1).fill(0));
}

export const logStateAggregates = (keyList: string[], valueList: StateEnum[], keyLookupListString: string) =>
    aggregateStates(keyList, valueList, keyLookupListString).forEach((value, index) => console.log(`${value} ${StateEnum[index]}`));

const enumReference = (stateName: string) => {
    if (!Object.values(StateEnum).includes(stateName))
        throw new Error(`State ${stateName} is not a valid state enum.`);

    return StateEnum[stateName as keyof typeof StateEnum];
}

const keyStateLookup = (keyList: Map<string, StateEnum>, key: string) => {
    const state: StateEnum | undefined = keyList.get(key);

    if (typeof state === typeof undefined)
        throw new Error(`"${key}" is not a valid key.`);

    return state as StateEnum;
}

const lookupKeyOrState = (lookupTable: Map<string, StateEnum>): (accumulation: number[], key: string) => number[] => {
    return (accumulation: number[], key: string) => {
        try {
            if (key.length == 0)
                throw new Error("Key has no length");

            const state: StateEnum = key.startsWith('@')
                ? enumReference(key.substring(1)) // Enum reference
                : keyStateLookup(lookupTable, key); // Lookup key

            accumulation[state]++;
        }
        catch (error) {
            console.warn(error);
        }
        finally {
            return accumulation;
        }
    };
}

const sentenceIsTrue = (sentenceIsFalse: boolean) => {
    if (sentenceIsFalse == true)
        return true; // The evaluation of the sentence is factual, therefore making it true.
    if (sentenceIsFalse == false)
        return true; // The sentence, "false", is false. `false == false` is true. 
}
