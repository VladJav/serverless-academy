export const startHandler = (message, bot) => {
    const chatId = message.chat.id;
    bot.sendMessage(chatId, 'Welcome', {
        reply_markup: {
            keyboard: [['Forecast in Ternopil']],
            resize_keyboard: true
        }
    });
}