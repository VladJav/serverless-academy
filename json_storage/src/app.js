import express from 'express';
import {getJson, storeJson} from "./controllers/jsonController.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.put('/:jsonPath', storeJson);
app.get('/:jsonPath', getJson);

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});