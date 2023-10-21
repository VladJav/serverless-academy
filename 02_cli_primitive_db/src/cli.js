import inquirer from 'inquirer';
import fs from 'node:fs/promises';
import * as path from "path";
import {questions} from "./questions.js";

export async function cli() {
    while(true) {
        const {
            username,
            gender,
            age,
            isSearchMode,
        } = await inquirer.prompt(questions);

        // add new user
        if(username && gender && !isNaN(age)){
            const user = {
                username,
                gender,
                age
            };
            await fs.appendFile(path.join(process.cwd(), '/db.txt'), JSON.stringify(user)+'\n');
            continue;
        }

        // search user
        if(isSearchMode){
            const dataByLines = (await fs.readFile(path.join(process.cwd(), '/db.txt'), {encoding: 'utf8'})).split('\n');
            dataByLines.pop();

            const users = dataByLines.map(line => JSON.parse(line));
            console.log(users);

            const { searchQuery } = await inquirer.prompt([{
                type: 'input',
                name: 'searchQuery',
                message: `Enter the user's name you wanna find in DB: `,
            }]);

            const foundUsers = users.filter(e=> e.username.toLowerCase() === searchQuery.toLowerCase());

            if(!foundUsers){
                console.log(`User with name: ${searchQuery} was not found`);
            }
            else{
                console.log(`Users with name: ${searchQuery} were found:`);
                console.log(foundUsers);
            }

            return;
        }
        // if search mode is false
        return;
    }
}