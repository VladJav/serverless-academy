import TelegramBot from 'node-telegram-bot-api';
import NodeCache from 'node-cache';
import {usdMessageHandler} from "./messageHandlers/usdMessageHandler.js";
import {eurMessageHandler} from "./messageHandlers/eurMessageHandler.js";

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, {polling: true});

// TTL for monocache will be 5 mins
const appCache = new NodeCache({ stdTTL: 5*60, checkperiod: 100});

bot.onText(/\/start/, (message)=>{
    const chatId = message.chat.id;
    bot.sendMessage(chatId, 'Для початку введіть /Курс валют', {
        reply_markup: {
            keyboard: [['/Курс валют']],
            resize_keyboard: true
        }
    });
});

bot.on('message', async (message)=>{
   const chatId = message.chat.id;
   const { text } = message;

   switch (text){
       case '/Курс валют':
           await bot.sendMessage(chatId, 'Оберіть курс', {
               reply_markup: {
                   keyboard: [['USD', 'EUR'], ['Попереднє меню']],
                   resize_keyboard: true
               }
           });
           break;
       case 'USD':
           await usdMessageHandler(bot, chatId, appCache);
           break;
       case 'EUR':
           await eurMessageHandler(bot, chatId, appCache);
           break;
       case 'Попереднє меню':
           await bot.sendMessage(chatId, 'Для початку введіть /Курс валют', {
               reply_markup: {
                   keyboard: [['/Курс валют']],
                   resize_keyboard: true
               }
           });
           break;
       default:
           await bot.sendMessage(chatId, 'Такої команди не існує');
   }
});