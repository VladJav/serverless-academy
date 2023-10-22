export const getChatId = async (bot) => {
    const [ update ] = await bot.getUpdates();

    if(!update){
        console.log(`Write /start`);
        process.exit();
    }

    return update.message.chat.id;
};