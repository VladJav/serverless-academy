import axios from "axios";
import {searchIsDone} from "./utils/searchIsDone.js";

const jsonSorting = async (endpoints) => {
    for(let endpoint of endpoints){
        try {
            const { data } = await axios.get(endpoint);
            const [isDone] = searchIsDone(data);
            console.log(`[Success] ${endpoint}: isDone - ${isDone}`);
        }
        catch (e) {
            let error = null;
            for(let i = 0; i < 2; i++){
                try {
                    const { data } = await axios.get(endpoint);
                    const [isDone] = searchIsDone(data);
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
}


// Here is my example endpoints
const endpoint = ['http://localhost:8000/json-1', 'http://localhost:8000/json-2'];
jsonSorting(endpoint);
