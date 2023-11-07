import {connect} from "mongoose";

export const connectDb = (uri) => {
    return connect(uri);
};