import {getCurrentRate} from "../api/getCurrentRate.js";

export const eurMessageHandler = async (bot, chatId, cache) => {
    const {
        privatCashCourse: [privatEURCashCourse],
        privatCashlessCourse: [privatEURCashlessCourse],
        monoCourse: { eur }
    } = await getCurrentRate(cache);

    const { sale: saleEURCash, buy: buyEURCash} = privatEURCashCourse;
    const { sale: saleEURCashless, buy: buyEURCashless} = privatEURCashlessCourse;

    await bot.sendMessage(chatId, `В MonoBank євро можна купити за ${eur.rateBuy}, продати ${eur.rateSell}`);
    await bot.sendMessage(chatId, `У відділені ПриватБанку євро можна купити за ${buyEURCash}, продати ${saleEURCash}`);
    await bot.sendMessage(chatId, `У Приват24 євро можна купити за ${buyEURCashless}, продати ${saleEURCashless}`);
};