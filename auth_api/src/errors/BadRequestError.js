import {CustomAPIError} from "./CustomAPIError.js";

export class BadRequestError extends CustomAPIError {
    constructor(msg) {
        super(msg, 400);
    }

}