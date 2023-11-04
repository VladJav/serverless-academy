import express from 'express';
import {connectDB} from "./db/connect.js";
import {authRouter} from "./routes/authRoutes.js";
import {notFoundMiddleware} from "./middleware/not-found.js";
import {errorHandlerMiddleware} from "./middleware/error-handler.js";
import {userRouter} from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use('/auth', authRouter);
app.use('', userRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}

start()
