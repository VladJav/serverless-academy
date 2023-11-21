import axios from "axios";
import {searchIsDone} from "./utils/searchIsDone.js";

const jsonSorting = async (endpoints) => {
    let trueValues = 0;
    let falseValues = 0;

    for(let endpoint of endpoints){
        try {
            const { data } = await axios.get(endpoint);
            const [isDone] = searchIsDone(data);

            if(isDone) trueValues++;
            else falseValues++;

            console.log(`[Success] ${endpoint}: isDone - ${isDone}`);
        }
        catch (e) {
            let error = null;
            for(let i = 0; i < 2; i++){
                try {
                    const { data } = await axios.get(endpoint);
                    const [isDone] = searchIsDone(data);

                    if(isDone) trueValues++;
                    else falseValues++;

                    console.log(`[Success] ${endpoint}: isDone - ${isDone}`);
                    break;
                }
                catch (e) {
                    error = e;
                }
            }
            if(error) console.log(`[FAIL] ${endpoint}: The endpoint is unavailable`);
        }
    }

    console.log(`Fount True values: ${trueValues}`);
    console.log(`Fount False values: ${falseValues}`);

}


// Here are my example endpoints
const endpoint = ['http://localhost:8000/json-1', 'http://localhost:8000/json-2'];
jsonSorting(endpoint);
