export const logThinglyPotatoness = (allTheThings: string[]) => {
    let thinglyPotatoness = allTheThings.map(isItAPotato);
    allTheThings.forEach((thing, index) =>
        console.log(`"${thing}" ${thinglyPotatoness[index] ? "is" : "is not"} a potato`));
};

const isItAPotato = (thing: string) => thing == "potato";
