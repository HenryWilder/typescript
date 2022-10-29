import { IHorse } from "./IHorse";
import { raceLength, drawRace } from "./draw";
import { updateHorsePositions } from "./updateHorsePositions";
import { sleep } from "./util/sleep";
import { tryMakeObservation } from "./tryMakeObservation";

(async () => {
    try {
        /** Position of each horse */
        const horses: IHorse[] = [
            { name:'Star', symbol:'★' },
            { name:'Virus', symbol:'❉' },
            { name:'Diamond', symbol:'✧' },
            { name:'Snowflake', symbol:'❅' }
        ];
        let horsePositions: number[] = Array(horses.length).fill(0);

        while (horsePositions.every((horsePos) => horsePos < raceLength)) {
            console.clear();
            
            drawRace(horses, horsePositions);

            tryMakeObservation(horses, horsePositions);

            horsePositions = updateHorsePositions(horsePositions);

            await sleep(100);
        }
        console.log(horses[horsePositions.findIndex((pos) => pos >= raceLength)].name + " Wins!!");
    }
    catch (error) {
        console.error(error);
    }
})();
