import express from "express";
import Estate from "../models/estate";
import fs from "fs";
import formidable from "formidable";
import assetsPath from "../server";
export class EstateController {

    getAllNotPromotedEstates = (req: express.Request, res: express.Response) => {
        Estate.find({ "promoted": false }, (err, estates) => {
            if (err) console.log(err);
            else res.json(estates);
        })
    }

    getAllEstates = (req: express.Request, res: express.Response) => {
        Estate.find({}, (err, estates) => {
            if (err) console.log(err);
            else res.json(estates);
        });
    }

    getAllPromotedEstates = (req: express.Request, res: express.Response) => {
        Estate.find({ "promoted": true }, (err, estates) => {
            if (err) console.log(err);
            else res.json(estates);
        })
    }

    getFilteredEstates = (req: express.Request, res: express.Response) => {
        let lowerPrice: number;
        let upperPrice: number;
        if (req.body.lowerPrice) {
            lowerPrice = parseInt(req.body.lowerPrice);
        } else {
            lowerPrice = 0;
        }
        if (req.body.upperPrice) {
            upperPrice = parseInt(req.body.upperPrice);
        } else {
            upperPrice = Number.MAX_SAFE_INTEGER;
        }
        let city: string;
        if (req.body.city) {
            city = req.body.city;
        } else {
            city = "";
        }
        Estate.find({
            $and: [{ "price": { $gt: lowerPrice } }, { "price": { $lt: upperPrice } },
            { "city": { $regex: city, $options: "$i" } }, { "promoted": false, "approved": true }]
        }, (err, estates) => {
            if (err) console.log(err);
            else res.json(estates);
        })
    }

    findEstate = (req: express.Request, res: express.Response) => {
        let description = req.body.description;
        Estate.findOne({ "description": description }, (err, estate) => {
            if (err) console.log(err);
            else res.json(estate);
        })
    }

    addNewEstate = (req: express.Request, res: express.Response) => {
        let estate = new Estate(req.body);
        estate.save();
        res.json({ "message": "ok" });
    }

    uploadPicture = (req: express.Request, res: express.Response) => {
        const form = formidable({ multiples: true });
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
                return;
            }
            let length = parseInt(fields.length);
            let startIndex = parseInt(fields.startIndex);
            for (let i = 0; i < length; i++) {
                let oldPath = files["estatePicture" + (startIndex + i + 1)].path;
                let newPath = assetsPath + "/estate/" + fields.estate + "_" + (startIndex + i + 1) + ".png";
                fs.rename(oldPath, newPath, (err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });
            }
            res.json({ fields, files });
        })
    }

    getAllNotApprovedEstates = (req: express.Request, res: express.Response) => {
        Estate.find({ "approved": false }, (err, estates) => {
            if (err) console.log(err);
            else res.json(estates);
        })
    }

    approveEstate = (req: express.Request, res: express.Response) => {
        let address = req.body.address;
        let description = req.body.description;

        Estate.collection.updateOne({ "address": address, "description": description }, { $set: { "approved": true } });
        res.json({ "message": "ok" });
    }


    getAllEstatesFromUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        Estate.find({ "owner": username }, (err, estates) => {
            if (err) console.log(err);
            else res.json(estates);
        })
    }

    updateEstate = (req: express.Request, res: express.Response) => {
        let estate = req.body.estateData;
        let estateData = {
            description: estate.description,
            owner: estate.owner,
            size: estate.size,
            floor: estate.floor,
            maxFloor: estate.maxFloor,
            fitted: estate.fitted,
            rented: estate.rented,
            pictures: estate.pictures,
            rooms: estate.rooms,
            type: estate.type,
            price: estate.price,
            city: estate.city,
            address: estate.address,
            region: estate.region,
            approved: estate.approved,
            promoted: estate.promoted
        };

        Estate.collection.replaceOne({ "address": estate.address, "owner": estate.owner }, estateData);
        //Message.collection.updateMany({ "address": estate.address }, { "title": estate.decription });
        res.json(estate);
    }

    updatePictureNumber = (req: express.Request, res: express.Response) => {
        let pictures = req.body.pictures;
        let address = req.body.address;
        let owner = req.body.owner;
        Estate.collection.updateOne({ "address": address, "owner": owner }, { $set: { "pictures": pictures } });
        res.json({ "message": "ok" });
    }

    getAllApprovedEstates = (req: express.Request, res: express.Response) => {
        Estate.find({ "approved": true }, (err, estates) => {
            if (err) console.log(err);
            else res.json(estates);
        })
    }

    updatePromotion = (req: express.Request, res: express.Response) => {
        let owner = req.body.owner;
        let address = req.body.address;
        let promotion = req.body.promote;

        Estate.collection.updateOne({ "address": address, "owner": owner }, { $set: { "promoted": promotion } });
        res.json({ "message": "ok" });
    }

    getAllRentedEstates = (req: express.Request, res: express.Response) => {
        Estate.find({ "rented": true, "approved": true }, (err, estates) => {
            if (err) console.log(err);
            else res.json(estates);
        })
    }

    getAllSellingEstates = (req: express.Request, res: express.Response) => {
        Estate.find({ "rented": false, "approved": true }, (err, estates) => {
            if (err) console.log(err);
            else res.json(estates);
        })
    }

    setSold = (req: express.Request, res: express.Response) => {
        let address = req.body.address;
        Estate.collection.updateOne({ "address": address }, { $set: { "sold": true } });
        res.json({ "message": "ok" });
    }

    deleteEstate = (req: express.Request, res: express.Response) => {
        let address = req.body.address;
        Estate.collection.deleteOne({ "address": address });
        res.json({ "message": "ok" });
    }

}