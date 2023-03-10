#! /usr/bin/env node
console.clear();
import chalkAnimation from "chalk-animation";
//------------------------------------------------------------------------------
//FUNCTIONS HERE
//------------------------------------------------------------------------------
const stopTime = () => {
    return new Promise((res) => {
        setTimeout(res, 3500);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.neon("Welcome To ATM Banking!\n\nCoded By Hosein Sirat Mohammad\n");
    await stopTime();
    rainbowTitle.stop();
}
//------------------------------------------------------------------------------
//MAIN
//------------------------------------------------------------------------------
await welcome();
