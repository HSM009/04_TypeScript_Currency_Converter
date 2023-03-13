#! /usr/bin/env node
console.clear();
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import chalk from "chalk";
//------------------------------------------------------------------------------
//CONTRUCTORS/INTERFACES/CLASSES HERE
//-----------------------------------------------------------------------,,-------
const currecnyValueToPkr = [
    { name: 'Pakistani_Rupees', value: '1' },
    { name: 'US_Dollar', value: '283.50' },
    { name: 'UK_Pound', value: '336.6' },
    { name: 'UAE_Dirham', value: '77.00' },
    { name: 'Saudi_Riyal', value: '75.00' },
    { name: 'Japenese_Yen', value: '2.06' },
    { name: 'Euro', value: '299.50' },
    { name: 'China_Yuan', value: '39.54' },
    { name: 'Canadian_Dollar', value: '202' },
    { name: 'Austrailian_Dollar', value: '184.5' }
];
;
//------------------------------------------------------------------------------
//FUNCTIONS HERE
//------------------------------------------------------------------------------
const stopTime = () => {
    return new Promise((res) => {
        setTimeout(res, 3500);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.neon(chalk.yellowBright("Welcome To ATM Banking!\n\nCoded By Hosein Sirat Mohammad\n"));
    await stopTime();
    rainbowTitle.stop();
}
async function mainMenu() {
    var seletedOption = await inquirer.prompt([
        {
            type: 'list',
            name: 'menuOption',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'Show all currencies and their value data to 1 PKR.',
                    value: 'showAllChoice'
                },
                {
                    name: 'Choose custom currenct converter.',
                    value: 'customConverterChoice'
                },
                {
                    name: 'Bye',
                    value: 'bye'
                }
            ]
        }
    ]);
    if (seletedOption.menuOption == 'showAllChoice') {
        await showAllToPkr();
        mainMenu();
    }
    else if (seletedOption.menuOption == 'customConverterChoice') {
        await customChoose();
        mainMenu();
    }
    else {
        console.log(seletedOption.menuOption);
    }
}
;
async function showAllToPkr() {
    console.log(chalk.bgBlue('\t\tSr-No') + ' >>>>>>>>> ' + (chalk.bgBlue('Currency Name')) + ' >>>>>>>>> ' + (chalk.bgBlue('Value')));
    const filerArrCurrency = currecnyValueToPkr.filter((fil) => fil.name != 'Pakistani_Rupees');
    if (filerArrCurrency.length > 0) {
        let i = 1;
        filerArrCurrency.forEach((value) => {
            console.log(chalk.blue('\t\t    ' + i) + ' >>>>>>>>> ' + (chalk.blue(value.name.replace('_', ' '))) + ' >>>>>>>>> ' + (chalk.blue(value.value)));
            i++;
        });
        console.log('\n');
    }
    else {
        console.log(chalk.bgYellowBright('No Currency added.\n'));
    }
}
;
async function customChoose() {
}
;
//------------------------------------------------------------------------------
//MAIN HERE
//------------------------------------------------------------------------------
// await welcome();
const arrCurrncy = [];
await mainMenu();
