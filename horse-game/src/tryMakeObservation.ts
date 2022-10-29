import { IHorse } from "./IHorse";

interface IRank {
    value: number;
    index: number;
}
interface IRankState {
    first:  IRank;
    second: IRank;
    last:   IRank;
}

let commentary = ["And the race has started!"];

/** A history of the race's statistics */
let stateLog: Array<number[]> = [];

/** A history of the race's statistics */
let rankLog: IRankState[] = [];

/** Tries to make observations about the current state of the race */
export const tryMakeObservation = (horses: IHorse[], horsePositions: number[]) => {
    stateLog.push(horsePositions);
    let newInformation: boolean = false;
    let latestComment: string = "";

    const lastRank = rankLog.at(-1);
    const currentRank = rank(horsePositions);
    rankLog.push(currentRank);

    if (!!lastRank) {
        const newFirstPlace:  boolean = currentRank.first.index  != lastRank.first.index;
        const newSecondPlace: boolean = currentRank.second.index != lastRank.second.index;
        const newLastPlace:   boolean = currentRank.last.index   != lastRank.last.index;
        newInformation = newFirstPlace || newSecondPlace || newLastPlace;
        if (newInformation) {
            let firstPlacer:  string;
            let secondPlacer: string;
            let lastPlacer:   string;
            try {
                firstPlacer  = horses[currentRank.first.index ].name;
                secondPlacer = horses[currentRank.second.index].name;
                lastPlacer   = horses[currentRank.last.index  ].name;
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
    console.log(commentary.at(-1));
    //commentary.forEach((comment) => console.log(comment));
    //console.log(commentary.join(' '));
};

const rank = (activeState: number[]) => {
    const initialRanking: IRankState = {
        first: { value: -Infinity, index: -1 },
        second: { value: 0, index: 0 },
        last: { value: Infinity, index: -1 }
    };
    const rankState: IRankState = activeState.reduce((running, position, horseIndex) => {
        if (position > running.first.value) {
            running.second = running.first;
            running.first.value = position;
            running.first.index = horseIndex;
        }
        if (position < running.last.value) {
            running.last.value = position;
            running.last.index = horseIndex;
        }
        return running;
    }, initialRanking);
    return rankState;
}
