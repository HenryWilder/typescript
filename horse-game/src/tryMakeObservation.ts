import { IHorse } from "./IHorse";

interface IRank {
    first: number;
    second: number;
    last: number;
}

let commentary = ["And the race has started!"];

/** A history of the race's statistics */
let stateLog: Array<number[]> = [];

/** A history of the race's statistics */
let rankLog: IRank[] = [];

/** Tries to make observations about the current state of the race */
export const tryMakeObservation = (horses: IHorse[], horsePositions: number[]) => {
    stateLog.push(horsePositions);
    let newInformation: boolean = false;
    let latestComment: string = "";

    const lastRank = rankLog.at(-1);
    const currentRank = rank(horsePositions);
    rankLog.push(currentRank);

    if (!!lastRank) {
        const newFirstPlace:  boolean = currentRank.first  != lastRank.first;
        const newSecondPlace: boolean = currentRank.second != lastRank.second;
        const newLastPlace:   boolean = currentRank.last   != lastRank.last;
        newInformation = newFirstPlace || newSecondPlace || newLastPlace;
        if (newInformation) {
            let firstPlacer:  string;
            let secondPlacer: string;
            let lastPlacer:   string;
            try {
                firstPlacer  = horses[currentRank.first ].name;
                secondPlacer = horses[currentRank.second].name;
                lastPlacer   = horses[currentRank.last  ].name;
            }
            catch (error) {
                console.log(currentRank);
                throw error;
            }

            let comment: string[] = [];

            // There will always be a new second place if someone comes in first,
            // as the previous first-placer becomes the new second placer
            if (newFirstPlace) {
                comment.push(`${firstPlacer} coming in the lead, with ${secondPlacer} falling behind!`);
            }
            // Sometimes the second and third place can trade without affecting the first place
            else if (newSecondPlace) {
                comment.push(`${secondPlacer} is pulling forward!`);
            }
            if (newLastPlace) {
                comment.push(`${lastPlacer} has fallen to the back!`);
            }
            latestComment = comment.join(' ');
        }
    }

    if (newInformation) commentary.push(latestComment);
    commentary.forEach((comment) => console.log(comment));
    //console.log(commentary.join(' '));
};

const rank = (activeState: number[]) => {
    const initialRanking = {
        firstPlace: { value: -Infinity, horseIndex: -1 },
        secondPlace: { value: 0, horseIndex: 0 },
        lastPlace: { value: Infinity, horseIndex: -1 }
    };
    const currentRanking = activeState.reduce((running, position, index) => {
        if (position > running.firstPlace.value) {
            running.secondPlace = running.firstPlace;
            running.firstPlace.value = position;
            running.firstPlace.horseIndex = index;
        }
        if (position < running.lastPlace.value) {
            running.lastPlace.value = position;
            running.lastPlace.horseIndex = index;
        }
        return running;
    }, initialRanking);
    return {
        first: currentRanking.firstPlace.horseIndex,
        second: currentRanking.secondPlace.horseIndex,
        last: currentRanking.lastPlace.horseIndex
    };
}
