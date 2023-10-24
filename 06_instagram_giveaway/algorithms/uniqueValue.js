import fsp from "node:fs/promises";

export const uniqueValue = async () => {
    const uniqueNamesInFile = new Set();
    for(let i = 0; i < 20; i++){
        const dataFromFile = await fsp.readFile(`${process.env.DATA_PATH}/out${i}.txt`, { encoding: 'utf8'});
        const strInFile = dataFromFile.split('\n');
        for(const str of strInFile){
            uniqueNamesInFile.add(str);
        }
    }
    console.log(uniqueNamesInFile.size);
};