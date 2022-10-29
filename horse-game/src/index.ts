const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

(async () => {
    console.clear();
    console.log("Hello");
    await sleep(1000);
    console.clear();
    console.log("EEEEE");
})();
