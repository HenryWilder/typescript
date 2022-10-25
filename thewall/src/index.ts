import path from "path";
import fs from "fs";

interface IVec3 {
    x: number;
    y: number;
    z: number;
}
interface IBody {
    radius: number;
    startPos: IVec3;
}

const bodiesFilePath: string = path.resolve("./src/config/bodies.json");
const bodies: Array<IBody> = JSON.parse(fs.readFileSync(bodiesFilePath,"utf8"));

console.log(bodies[0].radius);
