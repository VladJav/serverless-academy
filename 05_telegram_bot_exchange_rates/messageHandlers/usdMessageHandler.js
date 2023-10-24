import {getCurrentRate} from "../api/getCurrentRate.js";

export const usdMessageHandler = async (bot, chatId, cache) => {
    const {
        privatCashCourse: [, privatUSDCashCourse],
        privatCashlessCourse: [, privatUSDCashlessCourse],
        monoCourse: { usd }
    } = await getCurrentRate(cache);

    const { sale: saleUSDCash, buy: buyUSDCash} = privatUSDCashCourse;
    const { sale: saleUSDCashless, buy: buyUSDCashless} = privatUSDCashlessCourse;

    await bot.sendMessage(chatId, `В MonoBank долар можна купити за ${usd.rateBuy}, продати ${usd.rateSell}`);
    await bot.sendMessage(chatId, `У відділені ПриватБанку долар можна купити за ${buyUSDCash}, продати ${saleUSDCash}`);
    await bot.sendMessage(chatId, `У Приват24 долар можна купити за ${buyUSDCashless}, продати ${saleUSDCashless}`);

};