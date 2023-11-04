import {UnauthenticatedError} from "../errors/index.js";
import jwt from "jsonwebtoken";

export const authenticateUser = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (!bearerHeader) {
        throw new UnauthenticatedError('Please provide your access token');
    }

    const accessToken = bearerHeader.split(' ')[1];

    try{
        const { userId, email } = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        req.user = {
            userId,
            email
        };
        next();
    }
    catch (e) {
        next(e);
    }
};