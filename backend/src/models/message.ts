import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Message = new Schema(
    {
        content: {
            type: String
        },
        sender: {
            type: String
        },
        reciever: {
            type: String
        },
        time: {
            type: String
        },
        address: {
            type: String
        },
        title: {
            type: String
        }
    }
);

export default mongoose.model("Message", Message, "messages");