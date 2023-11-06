import fs from 'node:fs/promises';

export const storeJson = async (req, res) => {
    const { jsonPath } = req.params;
    const data = req.body;

    try {
        await fs.writeFile(new URL(`../data/${jsonPath}.txt`, import.meta.url), JSON.stringify(data), { flag: 'w'});
        res.json(data);
    }
    catch (e) {
        res.status(400).json({
            success: false,
            message: e.message
        });
    }
};

export const getJson = async (req, res) => {
    const { jsonPath } = req.params;

    try{
        const data = await fs.readFile(new URL(`../data/${jsonPath}.txt`, import.meta.url), 'utf8');
        res.json(JSON.parse(data));
    }
    catch (e){
        res.status(400).json({
            success: false,
            message: e.message
        });
    }
};