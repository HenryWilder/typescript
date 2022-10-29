import { randomInt } from "crypto";
import { sleep } from "./util/sleep";

interface IHorse {
    name: string;
    symbol: string;
}

/** Moves each horse to their new position */
const updateHorsePositions = (horsePositions: number[]) => {
    return horsePositions.map((position) => position + randomInt(1,3));
}

/** Number of columns */
const raceLength: number = 100;
const sideLineTop = `╔══╤${'═'.repeat(raceLength-1)}╗`;
const sideLineMid = `╟──┼${'─'.repeat(raceLength-5)} ▞▞ ╢`;
const raceTrack   = `║▸ │${' '.repeat(raceLength-5)} ▞▞ ║`;
const sideLineBot = `╚══╧${'═'.repeat(raceLength-1)}╝`;

/** Draws each horse on the command line */
const logHorsePositions = (horses: IHorse[], horsePositions: number[]) => {
    console.log(sideLineTop); 
    horsePositions.forEach((horsePos, i) => {
        if (i != 0)
            console.log(sideLineMid);
        let row = raceTrack;
        row = [row.slice(0,horsePos+1) + horses[i].symbol + row.slice(horsePos+2)].join('');
        console.log(row);
    });
    console.log(sideLineBot);
}

(async () => {
    /** Position of each horse */
    let horses: IHorse[] = [
        { name:'Star', symbol:'★' },
        { name:'Virus', symbol:'❉' },
        { name:'Diamond', symbol:'✧' },
        { name:'Snowflake', symbol:'❅' }
    ];
    let horsePositions: number[] = Array(horses.length).fill(0);

    while (horsePositions.every((horsePos) => horsePos < raceLength)) {
        console.clear();
        logHorsePositions(horses, horsePositions);
        await sleep(50);
        horsePositions = updateHorsePositions(horsePositions);
    }
    console.log(horses[horsePositions.findIndex((pos) => pos >= raceLength)].name + " Wins!");
})();
