// Importing basic libraries
import path from "path";
import fs from "fs";

// Classes
class Vec3 {
    // Properties
    public x: number;
    public y: number;
    public z: number;
    
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
    public constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    // Methods
    public toString = () => `(${this.x}, ${this.y}, ${this.z})`;

    // Math operations
    public add = (x: number, y: number, z: number) => new Vec3(this.x + x, this.y + y, this.z + z);
    public sub = (x: number, y: number, z: number) => new Vec3(this.x - x, this.y - y, this.z - z);
    public mul = (x: number, y: number, z: number) => new Vec3(this.x * x, this.y * y, this.z * z);
    public div = (x: number, y: number, z: number) => new Vec3(this.x / x, this.y / y, this.z / z);

    // Vector operations
    public addV = (vec: Vec3) => this.add(vec.x, vec.y, vec.z);
    public subV = (vec: Vec3) => this.sub(vec.x, vec.y, vec.z);
    public mulV = (vec: Vec3) => this.mul(vec.x, vec.y, vec.z);
    public divV = (vec: Vec3) => this.div(vec.x, vec.y, vec.z);

    // Scalar operations
    public addS = (scale: number) => this.add(scale, scale, scale);
    public subS = (scale: number) => this.sub(scale, scale, scale);
    public mulS = (scale: number) => this.mul(scale, scale, scale);
    public divS = (scale: number) => this.div(scale, scale, scale);
}

// Interfaces
interface IBody {
    radius: number;
    startPos: Vec3;
}

// Loading objects from files
const bodiesFilePath: string = path.resolve("./src/config/bodies.json");
const bodies: IBody[] = JSON.parse(fs.readFileSync(bodiesFilePath,"utf8"));

// Functions
const bodyRadius = (bodyIndex: number) => {
    return bodies[bodyIndex].radius;
}
const bodyPosition = (bodyIndex: number) => {
    return bodies[bodyIndex].startPos;
}

// Writing to console
// Strings with inline evaluation
try {
    console.log(`Radius: ${bodyRadius(0)}, Position: ${bodyPosition(0).add(0,0,0).toString()}`);
}
catch (error) {
    console.error(error);
}

// Arrays
const keyList: string[] = [
    'a',
    'b',
    'z',
    'd',
    'k',
    'n',
];

// Enums
enum StateEnum {
    inactive,
    hibernating,
    active,
}
const valueList: StateEnum[] = [
    StateEnum.inactive,
    StateEnum.inactive,
    StateEnum.active,
    StateEnum.hibernating,
    StateEnum.active,
    StateEnum.active,
];

// (I know I could be using a map instead of a pair of arrays, I just wanna show that it can also work without one)

const keyLookupListString: string = "a,b,k,@hibernating,n";
const initialValue = Array(Object.values(StateEnum).length >> 1).fill(0);
const stateAggregates: number[] = keyLookupListString.split(',').reduce((accumulation: number[], key: string) => {
    // Exception handling
    try {
        if (key.length == 0)
            throw new Error("Key has no length");

        let state: StateEnum;

        // Enum reference
        if (key.startsWith('@')) {
            const stateName: string = key.substring(1);

            if (!Object.values(StateEnum).includes(stateName))
                throw new Error(`State ${stateName} is not a valid state enum.`);

            state = StateEnum[stateName as keyof typeof StateEnum];
        }

        // Lookup key
        else {
            const keyIndex = keyList.indexOf(key);

            if (keyIndex === -1)
                throw new Error(`"${key}" is not a valid key.`);

            state = valueList[keyIndex];
        }

        accumulation[state]++;
    }
    catch (error) {
        console.warn(error);
    }
    finally {
        return accumulation;
    }
}, initialValue);

console.log("Status aggregates:");
stateAggregates.forEach((value, index) => console.log(`${value} ${StateEnum[index]}`));
