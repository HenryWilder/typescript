import { StateEnum } from "./StateEnum";

export const mapify = (keyList: string[], valueList: StateEnum[]) => new Map(keyList.map((key, index) => [key, valueList[index]]));
