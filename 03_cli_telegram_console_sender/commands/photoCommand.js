import {getChatId} from '../utils/getChatId.js';
import * as fs from 'fs';

export const photoCommand = async (path, bot) => {
    const chatId = await getChatId(bot);

    try{
        const stream = fs.createReadStream(path);
        await bot.sendPhoto(chatId, stream);
    }
    catch (e){
        console.log(e.message);
    }

};