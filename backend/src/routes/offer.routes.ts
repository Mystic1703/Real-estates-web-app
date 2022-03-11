import express from "express";
import { OfferController } from "../controllers/offer.controller";

const offerRouter = express.Router();

offerRouter.route("/createOffer").post(
    (req, res) => new OfferController().createOffer(req, res)
);
offerRouter.route("/getAllOffersFromEstate").post(
    (req, res) => new OfferController().getAllOffersFromEstate(req, res)
);
offerRouter.route("/getAllNotAcceptedOffersFromEstate").post(
    (req, res) => new OfferController().getAllNotAcceptedOffersFromEstate(req, res)
);
offerRouter.route("/declineOffer").post(
    (req, res) => new OfferController().declineOffer(req, res)
);
offerRouter.route("/acceptOffer").post(
    (req, res) => new OfferController().acceptOffer(req, res)
);
offerRouter.route("/deleteOtherOffers").post(
    (req, res) => new OfferController().deleteOtherOffers(req, res)
);
offerRouter.route("/checkIfUserReserved").post(
    (req, res) => new OfferController().checkIfUserReserved(req, res)
);
offerRouter.route("/getActiveOfferFromUser").post(
    (req, res) => new OfferController().getActiveOfferFromUser(req, res)
);
offerRouter.route("/deleteMultipleOffers").post(
    (req, res) => new OfferController().deleteMultipleOffers(req, res)
);
offerRouter.route("/getAllNotApprovedOffers").get(
    (req, res) => new OfferController().getAllNotApprovedOffers(req, res)
);
offerRouter.route("/approveOffer").post(
    (req, res) => new OfferController().approveOffer(req, res)
);
offerRouter.route("/checkIfOfferActive").post(
    (req, res) => new OfferController().checkIfOfferActive(req, res)
);
offerRouter.route("/getApprovedOffers").get(
    (req, res) => new OfferController().getApprovedOffers(req, res)
);
offerRouter.route("/discardOffer").post(
    (req, res) => new OfferController().discardOffer(req, res)
);
export default offerRouter;