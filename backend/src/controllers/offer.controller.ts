import express from "express";
import Offer from "../models/offer";
import Estate from "../models/estate";
import { EstateController } from "./estate.controller";

export class OfferController {

    createOffer = (req: express.Request, res: express.Response) => {
        Offer.find({}, (err, offers) => {
            let offer = new Offer(req.body);
            let max = 0;
            for (let i = 0; i < offers.length; i++) {
                if (max < offers[i].id) max = offers[i].id;
            }
            offer.id = max + 1;
            offer.save();
            res.json({ "message": "ok" });
        })
    }

    getAllOffersFromEstate = (req: express.Request, res: express.Response) => {
        let estate = req.body.estate;

        Offer.find({ "estate": estate, "active": true }, (err, offers) => {
            if (err) console.log(err);
            else res.json(offers);
        })
    }

    getAllNotAcceptedOffersFromEstate = (req: express.Request, res: express.Response) => {
        let estate = req.body.estate;

        Offer.find({ "estate": estate, "active": false }, (err, offers) => {
            if (err) console.log(err);
            else {
                res.json(offers);
            }
        })
    }

    deleteOtherOffers = (req: express.Request, res: express.Response) => {
        let estate = req.body.estate;
        Offer.collection.deleteMany({ "estate": estate, "active": false }, (err) => {
            if (err) console.log(err);
            res.json({ "message": "ok" });
        });
    }

    declineOffer = (req: express.Request, res: express.Response) => {
        let bidder = req.body.bidder;
        let estate = req.body.estate;

        Offer.collection.deleteOne({ "estate": estate, "bidder": bidder, "active": false });
        res.json({ "message": "ok" });
    }

    acceptOffer = (req: express.Request, res: express.Response) => {
        let bidder = req.body.bidder;
        let estate = req.body.estate;

        Estate.findOne({ "address": estate }, (err, ret) => {
            if (err) console.log(err);
            else {
                let approved: boolean = (ret.owner == "agency");
                Offer.findOne({ "estate": estate, "bidder": bidder, "active": false }, (err, offer) => {
                    if (err) console.log(err);
                    else {
                        Offer.collection.updateOne({ "estate": estate, "bidder": bidder, "active": false }, { $set: { "active": true, "approved": approved } });
                        res.json(offer);
                    }
                })
            }
        })


    }

    checkIfUserReserved = (req: express.Request, res: express.Response) => {
        let user = req.body.user;
        let estate = req.body.estate;
        Offer.findOne({ "bidder": user, "estate": estate, "active": false }, (err, offer) => {
            if (err) console.log(err);
            else res.json(offer);
        })
    }

    getActiveOfferFromUser = (req: express.Request, res: express.Response) => {
        let bidder = req.body.bidder;
        let estate = req.body.estate;
        Offer.findOne({ "bidder": bidder, "estate": estate, "active": true }, (err, offer) => {
            if (err) console.log(err);
            else res.json(offer);
        })
    }

    deleteMultipleOffers = (req: express.Request, res: express.Response) => {
        let ids: number[] = req.body.ids;
        Offer.collection.deleteMany({ "id": { $in: ids } }).then(() => {
            res.json({ "message": "ok" });
        }).catch((err) => {
            console.log(err);
        });
    }

    getAllNotApprovedOffers = (req: express.Request, res: express.Response) => {
        Offer.find({ "active": true, "approved": false }, (err, offers) => {
            if (err) console.log(err);
            else res.json(offers);
        })
    }

    approveOffer = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        Offer.collection.updateOne({ "id": id }, { $set: { "approved": true } });
        res.json({ "message": "ok" });
    }

    checkIfOfferActive = (req: express.Request, res: express.Response) => {
        let address = req.body.address;

        Offer.find({ "estate": address, "active": true, "approved": false }, (err, offers) => {
            if (err) console.log(err);
            else res.json(offers);
        })
    }

    getApprovedOffers = (req: express.Request, res: express.Response) => {
        Offer.find({ "approved": true, "active": true }, (err, offers) => {
            if (err) console.log(err);
            else res.json(offers);
        })
    }

    discardOffer = (req: express.Request, res: express.Response) => {
        let id = req.body.id;

        Offer.collection.deleteOne({ "id": id });
        res.json({ "message": "ok" });
    }
}