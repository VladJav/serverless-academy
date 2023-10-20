import * as readline from 'node:readline/promises';
import getOutputUserOptions from '../utils/getOutputUserOptions.js';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


export async function cli() {
    try{
        while (true){
            const userInput = (await rl.question('Hello. Enter 10 words or digits dividing them in spaces: ')).split(' ');

            const numbers = userInput.filter(item => !isNaN(item));
            const words = userInput.filter(item => isNaN(item));

            const line = await rl.question(getOutputUserOptions());
            if(line === 'exit'){
                console.log('See you later!');
                rl.close();
                break;
            }

            if(line < 1 || line > 6) {
                continue;
            }

            const option = Number(line);
            switch (option){
                case 1:
                    const sortedWords = words.sort();
                    console.log(sortedWords);
                    break;
                case 2:
                    const sortedNumbersFromLesser = numbers.sort((a,b) => Number(a)-Number(b));
                    console.log(sortedNumbersFromLesser);
                    break;
                case 3:
                    const sortedNumbersFromBigger = numbers.sort((a,b) => Number(b)-Number(a));
                    console.log(sortedNumbersFromBigger);
                    break;
                case 4:
                    const sortedWordsByLettersNumber = words.sort((a, b) => a.length - b.length);
                    console.log(sortedWordsByLettersNumber);
                    break;
                case 5:
                    const uniqueWords = new Set(words);
                    console.log([...uniqueWords]);
                    break;
                case 6:
                    const uniqueValues = new Set(userInput);
                    console.log([...uniqueValues]);
            }

        }
    }
    catch (e){
        console.log('Oops! Smth weng wrong...');
        rl.close();
    }
}