import { IHorse } from "./IHorse";

/** Number of columns */
export const raceLength: number = 100;
const sideLineTop = `╔══╤${'═'.repeat(raceLength)}╗`;
const sideLineMid = `╟──┼${'─'.repeat(raceLength - 4)} ▞▞ ╢`;
const raceTrack   = `║▸ │${' '.repeat(raceLength - 4)} ▞▞ ║`;
const sideLineBot = `╚══╧${'═'.repeat(raceLength)}╝`;
/** Draws each horse on the command line */
export const drawRace = (horses: IHorse[], horsePositions: number[]) => {
    console.log(sideLineTop);
    horsePositions.forEach((horsePos, i) => {
        if (i != 0)
            console.log(sideLineMid);
        let row = raceTrack;
        row = [row.slice(0, horsePos + 1) + horses[i].symbol + row.slice(horsePos + 2)].join('');
        console.log(row);
    });
    console.log(sideLineBot);
};
