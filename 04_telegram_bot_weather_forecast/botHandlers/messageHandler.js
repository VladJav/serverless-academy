import axios from "axios";

const openWeatherApiKey = process.env.OPEN_WEATHER;
export const messageHandler = async (message, bot) => {
    const chatId = message.chat.id;
    const { text } = message;

    switch (text){
        case 'Forecast in Ternopil':
            await bot.sendMessage(chatId, 'Choose interval', {
                reply_markup: {
                    keyboard: [['At intervals of 3 hours', 'At intervals of 6 hours']],
                    resize_keyboard: true
                }
            });
            break;
        case 'At intervals of 3 hours':
            const { data: { list } } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${openWeatherApiKey}&lat=49.5557716&lang=ua&lon=25.591886&cnt=6&units=metric`);

            for(let i = 0; i < list.length; i++){
                const element = list[i];
                const weather = element.weather.map(e=>e.description).join(', ');
                const date = new Date(element.dt_txt);
                await bot.sendMessage(chatId, `Температура повітря в Тернополі о ${date.getHours()}:00, ${date.getDate()}/${date.getMonth()} числа сягає ${element.main.temp} градусів. На вулиці ${weather}.`);
            }
            break;
        case 'At intervals of 6 hours':
            const { data: { list: weatherList } } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=${openWeatherApiKey}&lat=49.5557716&lon=25.591886&cnt=6&units=metric&lang=ua`);
            for(let i = 0; i < weatherList.length-1; i+=2){
                const element = weatherList[i];
                const weather = element.weather.map(e=>e.description).join(', ');
                const date = new Date(element.dt_txt);
                await bot.sendMessage(chatId, `Температура повітря в Тернополі о ${date.getHours()}:00, ${date.getDate()}/${date.getMonth()} числа сягає ${element.main.temp} градусів. На вулиці ${weather}.`);
            }
            break;
    }
};