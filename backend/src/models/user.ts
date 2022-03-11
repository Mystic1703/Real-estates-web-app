import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema(
    {
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        username: {
            type: String
        },
        password: {
            type: String
        },
        mail: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
        },
        type: {
            type: String
        },
        approved: {
            type: Boolean
        },
        avatar: {
            type: Boolean
        }
    }
);


export default mongoose.model("User", User, "users");