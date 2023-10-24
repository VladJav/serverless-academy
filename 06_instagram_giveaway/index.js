import {
    existInAllFiles,
    existInAtleastTen,
    uniqueValue
} from "./algorithms/index.js";

const start = async () => {
    console.time('Unique users');
    await uniqueValue();
    console.timeEnd('Unique users');
    console.time('Exists in All Files');
    await existInAllFiles();
    console.timeEnd('Exists in All Files');
    console.time('Exists in Atleast Ten');
    await existInAtleastTen();
    console.timeEnd('Exists in Atleast Ten');
};

start();