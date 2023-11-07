import express from 'express';
import { linkerRouter } from "./routes/linkerRoutes.js";
import {connectDb} from "./db/connect.js";
import {notFoundMiddleware} from "./middleware/not-found.js";
import {errorHandlerMiddleware} from "./middleware/error-handler.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/', linkerRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
const start = async () => {
    await connectDb(process.env.MONGO_URI);
    app.listen(port, ()=>{
        console.log(`Server is listening on port ${port}`);
    });
};

start();
