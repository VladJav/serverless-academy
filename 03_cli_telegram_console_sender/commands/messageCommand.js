import {getChatId} from '../utils/getChatId.js';

export const messageCommand = async (message, bot) => {
    const chatId = await getChatId(bot);

    await bot.sendMessage(chatId, message);
};