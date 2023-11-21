import axios from "axios";

export const getCurrentRate = async (cache) => {
    const { data: privatCashCourse } = await axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5');
    const { data: privatCashlessCourse} = await axios.get('https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=11');
    if(cache.get('monoRate')){
        const [ usdMono, eurMono ] = cache.get('monoRate');
        return {
            privatCashCourse,
            privatCashlessCourse,
            monoCourse: {
                usd: usdMono,
                eur: eurMono
            }
        };
    }
    else{
        try {
            const { data: [usdMono, eurMono] } = await axios.get('https://api.monobank.ua/bank/currency');
            cache.set('monoRate', [usdMono, eurMono]);
            return {
                privatCashCourse,
                privatCashlessCourse,
                monoCourse: {
                    usd: usdMono,
                    eur: eurMono
                }
            };
        }
        catch (e){
            console.log(e.data);
        }
    }
};