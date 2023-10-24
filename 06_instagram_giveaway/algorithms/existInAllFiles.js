import fsp from "node:fs/promises";

export const existInAllFiles = async () => {
    const existsTimes = new Map();
    let count = 0;
    for(let i = 0; i < 20; i++) {
        const dataFromFile = await fsp.readFile(`${process.env.DATA_PATH}/out${i}.txt`, {encoding: 'utf8'});
        const strInFile = dataFromFile.split('\n');
        const uniqueNamesInFile = new Set();
        for (const str of strInFile) {
            if(!uniqueNamesInFile.has(str)){
                if (existsTimes.has(str)) {
                    existsTimes.set(str, existsTimes.get(str) + 1);
                } else {
                    existsTimes.set(str, 1);
                }
            }
            uniqueNamesInFile.add(str);
        }
    }

    for(const name of existsTimes.keys()){
        if(existsTimes.get(name) === 20){
            count++;
        }
    }
    console.log(count);
};