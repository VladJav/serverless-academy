import {CustomAPIError} from "./CustomAPIError.js";

export class UnauthenticatedError extends CustomAPIError {
    constructor(msg) {
        super(msg, 401);
    }

}