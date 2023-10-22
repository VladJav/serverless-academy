import TelegramBot from 'node-telegram-bot-api';
import {startHandler} from "./botHandlers/startHandler.js";
import {messageHandler} from "./botHandlers/messageHandler.js";

const token = process.env.BOT_TOKEN;


const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, (message) => startHandler(message, bot));

bot.on('message', (message) => messageHandler(message, bot));