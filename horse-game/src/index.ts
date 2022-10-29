const sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

(async () => {
    console.log("\x1b[uHello");
    await sleep(1000);
    console.clear();
    console.log("\x1b[uEEEEE");
})();
