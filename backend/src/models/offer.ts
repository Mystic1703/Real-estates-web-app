import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Offer = new Schema(
    {
        id: {
            type: Number
        },
        estate: {
            type: String
        },
        bidder: {
            type: String
        },
        approved: {
            type: Boolean
        },
        active: {
            type: Boolean
        },
        price: {
            type: Number
        },
        renting: {
            type: Boolean
        },
        from: {
            type: String
        },
        to: {
            type: String
        }
    }
);

export default mongoose.model("Offer", Offer, "offers");