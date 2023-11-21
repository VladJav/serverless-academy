

export const notFoundMiddleware = (req, res, next) => {
    const error = new Error('Route does not exists');
    error.statusCode = 404;
    next(error);
};