import TelegramBot from 'node-telegram-bot-api';
import { program } from 'commander';
import {messageCommand} from "./commands/messageCommand.js";
import {photoCommand} from './commands/photoCommand.js';

// To fix deprecation warning
process.env["NTBA_FIX_350"] = 1;

const token = 'YOUR BOT TOKEN';
const bot = new TelegramBot(token);

program
    .command('message <message>')
    .alias('m')
    .description('Send message to Telegram bot')
    .action((message)=> messageCommand(message, bot));
program
    .command('send-photo <path>')
    .alias('p')
    .description('Send photo to Telegram bot. Just drag and drop it console after p-flag')
    .action((path)=> photoCommand(path, bot));

program.parse();

