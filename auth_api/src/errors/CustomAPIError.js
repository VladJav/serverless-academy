export class CustomAPIError extends Error {
    constructor(msg, statusCode) {
        super(msg);
        this.statusCode = statusCode;
    }

}