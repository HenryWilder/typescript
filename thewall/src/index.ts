// Importing basic libraries
import path from "path";
import fs from "fs";

// Classes
class IVec3 {
    // Properties
    x: number;
    y: number;
    z: number;
    
    // Getters
    public get data() : Array<number> {
        return [this.x, this.y, this.z];
    }

    // Setters
    public set data(v : Array<number>) {
        this.x = v[0];
        this.y = v[1];
        this.z = v[2];
    }
    
    // Constructors
    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // Methods
    toString = () => `(${this.x}, ${this.y}, ${this.z})`;

    // Math operations
    add = (x: number, y: number, z: number) => new IVec3(this.x + x, this.y + y, this.z + z);
    sub = (x: number, y: number, z: number) => new IVec3(this.x - x, this.y - y, this.z - z);
    mul = (x: number, y: number, z: number) => new IVec3(this.x * x, this.y * y, this.z * z);
    div = (x: number, y: number, z: number) => new IVec3(this.x / x, this.y / y, this.z / z);

    // Vector operations
    addV = (vec: IVec3) => this.add(vec.x, vec.y, vec.z);
    subV = (vec: IVec3) => this.sub(vec.x, vec.y, vec.z);
    mulV = (vec: IVec3) => this.mul(vec.x, vec.y, vec.z);
    divV = (vec: IVec3) => this.div(vec.x, vec.y, vec.z);

    // Scalar operations
    addS = (scale: number) => this.add(scale, scale, scale);
    subS = (scale: number) => this.sub(scale, scale, scale);
    mulS = (scale: number) => this.mul(scale, scale, scale);
    divS = (scale: number) => this.div(scale, scale, scale);
}

// Interfaces
interface IBody {
    radius: number;
    startPos: IVec3;
}

// Loading objects from files
const bodiesFilePath: string = path.resolve("./src/config/bodies.json");
const bodies: Array<IBody> = JSON.parse(fs.readFileSync(bodiesFilePath,"utf8"));

// Functions
const bodyRadius = (bodyIndex: number) => {
    return bodies[bodyIndex].radius;
}
const bodyPosition = (bodyIndex: number) => {
    return bodies[bodyIndex].startPos;
}

// Writing to console
// Strings with inline evaluation
console.log(`Radius: ${bodyRadius(0)}, Position: ${bodyPosition(0).add(0,1,0)}`);
