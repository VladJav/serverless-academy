import {NotFoundError} from "../errors/index.js";

export const notFoundMiddleware = (req, res, next) => {
    next(new NotFoundError('Route does not exists'));
}