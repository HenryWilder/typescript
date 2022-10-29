import { bodyRadius, bodyPosition } from "./bodies";

// Writing to console
// Strings with inline evaluation
export const logBodyData = (bodyIndex: number) => {
    console.log(`Radius: ${bodyRadius(bodyIndex)}, Position: ${bodyPosition(bodyIndex).add(0, 0, 0).toString()}`);
}
