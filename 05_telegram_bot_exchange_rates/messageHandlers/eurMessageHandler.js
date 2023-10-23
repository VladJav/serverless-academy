import axios from "axios";

export const eurMessageHandler = async (bot, chatId, cache) => {
    const { data: [privatEURCashCourse] } = await axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5');
    const { data: [privatEURCashlessCourse]} = await axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11');

    if(cache.get('monoRate')){
        const [, eurMono ] = cache.get('monoRate');
        await bot.sendMessage(chatId, `В MonoBank долар можна купити за ${eurMono.rateBuy}, продати ${eurMono.rateSell}`)
    }
    else{
        try {
            const { data: [usdMono, eurMono] } = await axios.get('https://api.monobank.ua/bank/currency');
            await bot.sendMessage(chatId, `В MonoBank долар можна купити за ${eurMono.rateBuy}, продати ${eurMono.rateSell}`);
            cache.set('monoRate', [usdMono, eurMono]);
        }
        catch (e){
            console.log(e);
        }
    }

    const { sale: saleEURCash, buy: buyEURCash} = privatEURCashCourse;
    const { sale: saleEURCashless, buy: buyEURCashless} = privatEURCashlessCourse;

    await bot.sendMessage(chatId, `У відділені ПриватБанку долар можна купити за ${buyEURCash}, продати ${saleEURCash}`);
    await bot.sendMessage(chatId, `У Приват24 долар можна купити за ${buyEURCashless}, продати ${saleEURCashless}`);
};