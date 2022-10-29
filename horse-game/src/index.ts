import { sleep } from "./util/sleep";

(async () => {
    console.clear();
    console.log("Hello");
    await sleep(1000);
    console.clear();
    console.log("EEEEE");
})();
