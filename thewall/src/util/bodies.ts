import path from "path";
import fs from "fs";
import { IBody } from "./IBody";

// Loading objects from files
const bodiesFilePath: string = path.resolve("./src/config/bodies.json");
const bodies: IBody[] = JSON.parse(fs.readFileSync(bodiesFilePath, "utf8"));
// Functions
export const bodyRadius = (bodyIndex: number) => {
    return bodies[bodyIndex].radius;
};
export const bodyPosition = (bodyIndex: number) => {
    return bodies[bodyIndex].startPos;
};
