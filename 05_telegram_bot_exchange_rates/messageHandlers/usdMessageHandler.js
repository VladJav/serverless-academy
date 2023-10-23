import axios from "axios";

export const usdMessageHandler = async (bot, chatId, cache) => {
    const { data: [, privatUSDCashCourse] } = await axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5');
    const { data: [, privatUSDCashlessCourse]} = await axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11');

    if(cache.get('monoRate')){
        const [ usdMono ] = cache.get('monoRate');
        await bot.sendMessage(chatId, `В MonoBank долар можна купити за ${usdMono.rateBuy}, продати ${usdMono.rateSell}`)
    }
    else{
        try {
            const { data: [usdMono, eurMono] } = await axios.get('https://api.monobank.ua/bank/currency');
            await bot.sendMessage(chatId, `В MonoBank долар можна купити за ${usdMono.rateBuy}, продати ${usdMono.rateSell}`);
            cache.set('monoRate', [usdMono, eurMono]);
        }
        catch (e){
            console.log(e.data);
        }
    }

    const { sale: saleUSDCash, buy: buyUSDCash} = privatUSDCashCourse;
    const { sale: saleUSDCashless, buy: buyUSDCashless} = privatUSDCashlessCourse;

    await bot.sendMessage(chatId, `У відділені ПриватБанку долар можна купити за ${buyUSDCash}, продати ${saleUSDCash}`);
    await bot.sendMessage(chatId, `У Приват24 долар можна купити за ${buyUSDCashless}, продати ${saleUSDCashless}`);

};