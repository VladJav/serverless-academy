import express from 'express';
import fs from "fs";
import readline from "readline";

const app = express();
const port = 8000;
const countryRanges = [];

app.get('/', (req, res) => {
    const ip = req.headers['cf-connecting-ip'] || req.headers['x-real-ip'] || req.headers['x-forwarded-for'];
    const ipInNumber = ip.split('.').reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0;

    for(let [range1, range2, , country] of countryRanges){

        if(Number(range1.replaceAll("\"", "")) < ipInNumber && Number(range2.replaceAll("\"", "")) > ipInNumber){
            res.json({
                ip,
                country
            });
            break;
        }
    }
});

const start = () => {
    const rl = readline.createInterface({
        input: fs.createReadStream('../IP2LOCATION-LITE-DB1.CSV'),
        crlfDelay: Infinity
    });
    rl.on('line', (line) => {
        const arr = line.split(',');
        countryRanges.push(arr);
    });
    app.listen(port, ()=>{
        console.log(`Server is listening on port ${port}`);
    });
};
start();