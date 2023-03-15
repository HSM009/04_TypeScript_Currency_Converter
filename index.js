#! /usr/bin/env node
console.clear();
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import chalk from "chalk";
//------------------------------------------------------------------------------
//CONTRUCTORS/INTERFACES/CLASSES HERE
//-----------------------------------------------------------------------,,-------
let localVariable;
const currecnyValueToPkr = [
    { name: 'Pakistani_Rupee', value: '1', ISO: 'PKR' },
    { name: 'US_Dollar', value: '283.50', ISO: 'USD' },
    { name: 'UK_Pound', value: '336.6', ISO: 'GBP' },
    { name: 'UAE_Dirham', value: '77.00', ISO: 'AED' },
    { name: 'Saudi_Riyal', value: '75.00', ISO: 'SAR' },
    { name: 'Japenese_Yen', value: '2.06', ISO: 'JPY' },
    { name: 'Euro', value: '299.50', ISO: 'EUR' },
    { name: 'China_Yuan', value: '39.54', ISO: 'CNY' },
    { name: 'Canadian_Dollar', value: '202', ISO: 'CAD' },
    { name: 'Austrailian_Dollar', value: '184.5', ISO: 'AUD' }
];
// interface iCurrency {
//     name: string;
//     abbreviation: string;
//     valueToPKR: number
// };
//------------------------------------------------------------------------------
//FUNCTIONS HERE
//------------------------------------------------------------------------------
const stopTime = () => {
    return new Promise((res) => {
        setTimeout(res, 3500);
    });
};
async function welcome() {
    let rainbowTitle = chalkAnimation.neon(chalk.redBright("Welcome To ATM Banking!\n\nCoded By Hosein Sirat Mohammad\n"));
    await stopTime();
    rainbowTitle.stop();
}
async function localLocation() {
    var lLocation = await inquirer.prompt([
        {
            type: 'list',
            name: 'localSelected',
            message: 'Select your local area currency:',
            choices: currecnyValueToPkr.filter((filArr) => filArr.name = filArr.name.replace('_', ' ')).map((filArr) => filArr.name)
        }
    ]);
    localVariable = currecnyValueToPkr.find((val) => val.name == lLocation.localSelected);
}
;
async function mainMenu() {
    console.log(chalk.blue('Your local Area currency is ' + chalk.inverse(localVariable.name) + '.\n'));
    var seletedOption = await inquirer.prompt([
        {
            type: 'list',
            name: 'menuOption',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'Show all currencies and their currency conversion to ' + localVariable.name + ':',
                    value: 'showAllChoice'
                },
                {
                    name: 'Choose custom currency converter:',
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
        await showAll();
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
async function showAll() {
    //Convert to local here//
    //-------------------------------------
    console.log(chalk.bgBlue('\n\t\tSr-No') + ' >>>>>>>>> ' + (chalk.bgBlue('Currency ISO')) + ' = ' + (chalk.bgBlue('Value')));
    if (filerArrCurrency.length > 0 && localVariable.ISO == 'PKR') {
        let i = 1;
        filerArrCurrency.forEach((val) => {
            console.log(chalk.blue('\t\t    ' + i) + ' >>>>>>>>> ' + (chalk.blue('1 ' + val.ISO) + ' = ' + (chalk.blue(val.value + ' ' + localVariable.ISO))));
            i++;
        });
        console.log('\n');
    }
    else {
        let i = 1;
        filerArrCurrency.forEach((val) => {
            let fX = fExchangeRate(val.name);
            console.log(chalk.blue('\t\t    ' + i) + ' >>>>>>>>> ' + (chalk.blue('1 ' + val.ISO) + ' = ' + (chalk.blue(fX + ' ' + localVariable.ISO))));
            i++;
        });
        console.log('\n');
    }
}
;
async function customChoose() {
    var cChose = await inquirer.prompt([
        {
            type: 'list',
            name: 'select1',
            message: 'Select the currency to enter:',
            choices: filerArrCurrency.filter((filArr) => filArr.name != localVariable.name).map((filArr) => filArr.name)
        }
    ]);
    var msg = cChoseFunc(cChose.select1);
    var cVal = await inquirer.prompt([
        {
            type: "input",
            name: "num",
            message: msg,
            validate(value) {
                const pass = isNaN(value);
                if (pass) {
                    return chalk.bgRed("Please enter a valid number.");
                }
                else
                    return true;
            }
        }
    ]);
    let sISO = filerArrCurrency.filter((gISO) => gISO.name == cChose.select1).map((gISO) => gISO.ISO);
    let arrChose = fExchangeRate(cChose.select1);
    let total = (cVal.num * parseFloat(arrChose));
    console.log(chalk.green('\n\tTotal value after currency conversion from ' + chalk.italic.bold.blue(cVal.num + ' ' + sISO) + ' to ' + chalk.italic.bold.blue(localVariable.ISO) + ' is ' + chalk.italic.bold.yellow(total.toFixed(2)) + '.\n'));
}
;
function cChoseFunc(getCurrency) {
    return 'Enter the amount of ' + getCurrency + '/s:';
}
;
function fExchangeRate(cName) {
    let num1 = currecnyValueToPkr.find((val) => val.name == localVariable.name);
    let num2 = currecnyValueToPkr.find((val) => val.name == cName);
    return (num2.value / num1.value).toFixed(4).toString();
}
;
//------------------------------------------------------------------------------
//MAIN HERE
//------------------------------------------------------------------------------
await welcome();
await localLocation();
const filerArrCurrency = currecnyValueToPkr.filter((fil) => fil.name != localVariable.name);
await mainMenu();
