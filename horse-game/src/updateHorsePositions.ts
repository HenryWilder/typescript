import { randomInt } from "crypto";

/** Moves each horse to their new position */
export const updateHorsePositions = (horsePositions: number[]) => {
    return horsePositions.map((position) => position + randomInt(1, 3));
};
