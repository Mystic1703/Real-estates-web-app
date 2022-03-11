import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Estate = new Schema(
    {
        description: {
            type: String
        },
        city: {
            type: String
        },
        region: {
            type: String
        },
        address: {
            type: String
        },
        type: {
            type: String
        },
        floor: {
            type: Number
        },
        maxFloor: {
            type: Number
        },
        size: {
            type: Number
        },
        rooms: {
            type: String
        },
        fitted: {
            type: Boolean
        },
        rented: {
            type: Boolean
        },
        price: {
            type: Number
        },
        owner: {
            type: String
        },
        pictures: {
            type: Number
        },
        promoted: {
            type: Boolean
        },
        sold: {
            type: Boolean
        },
        approved: {
            type: Boolean
        }
    }
);

export default mongoose.model("Estate", Estate, "estates");