// Classes
export class Vec3 {
    // Properties
    public x: number;
    public y: number;
    public z: number;

    // Getters
    public get data(): Array<number> {
        return [this.x, this.y, this.z];
    }

    // Setters
    public set data(v: Array<number>) {
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
