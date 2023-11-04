import {CustomAPIError} from "./CustomAPIError.js";

export class NotFoundError extends CustomAPIError {
    constructor(msg) {
        super(msg, 404);
    }

}