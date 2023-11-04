import {CustomAPIError} from "./CustomAPIError.js";

export class ConflictError extends CustomAPIError{
    constructor(msg) {
        super(msg, 409);
    }
}