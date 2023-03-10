#! /usr/bin/env node

console.clear();

import { match } from "assert";
import chalkAnimation from "chalk-animation";
import { stat } from "fs";
import inquirer from "inquirer";
import Choice from "inquirer/lib/objects/choice.js";
import chalk from "chalk";

//------------------------------------------------------------------------------
//FUNCTIONS HERE
//------------------------------------------------------------------------------

const stopTime = ()=>{
    return new Promise((res:any)=>{
        setTimeout(res,3500);
    })
}


async function welcome() {
    let rainbowTitle = chalkAnimation.rainbow("Welcome To ATM Banking!\n\nCoded By Hosein Sirat Mohammad\n");
    await stopTime();
    rainbowTitle.stop();
}


//------------------------------------------------------------------------------
//MAIN
//------------------------------------------------------------------------------

await welcome();

console.log('hello');