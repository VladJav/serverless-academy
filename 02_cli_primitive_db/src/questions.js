export const questions = [
    {
        name: 'username',
        message: `Enter the user's name. To cancel press ENTER: `
    },
    {
        type: 'list',
        name: 'gender',
        message: 'Are u gay?',
        choices: ['Male', 'Female'],
        loop: true,
        when(answers) {

            return answers.username;
        }
    },
    {
        name: 'age',
        message: 'Enter age: ',
        type: 'input',
        validate: (answer) => {
            if (isNaN(answer)) {
                return "Please enter a number";
            }
            return true;
        },
        when(answers) {
            return answers.username;
        }
    },
    {
        type: 'confirm',
        name: 'isSearchMode',
        message: 'Would you like to search for a user?',
        when(answers) {
            return !answers.username;
        }
    }
];