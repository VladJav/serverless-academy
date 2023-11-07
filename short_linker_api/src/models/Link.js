import {model, Schema} from "mongoose";

const linkSchema = new Schema({
    shortLinkPath: {
        type: String,
        required: true
    },
    fullLink: {
        type: String,
        required: true
    }
});

export default model('Link', linkSchema);