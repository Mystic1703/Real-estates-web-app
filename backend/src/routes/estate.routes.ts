import express from "express";
import { EstateController } from "../controllers/estate.controller";


const estateRouter = express.Router();
estateRouter.route("/getAllNotPromotedEstates").get(
    (req, res) => new EstateController().getAllNotPromotedEstates(req, res)
);
estateRouter.route("/getFilteredEstates").post(
    (req, res) => new EstateController().getFilteredEstates(req, res)
);
estateRouter.route("/getAllPromotedEstates").get(
    (req, res) => new EstateController().getAllPromotedEstates(req, res)
);
estateRouter.route("/findEstate").post(
    (req, res) => new EstateController().findEstate(req, res)
);
estateRouter.route("/addNewEstate").post(
    (req, res) => new EstateController().addNewEstate(req, res)
);
estateRouter.route("/uploadPicture").post(
    (req, res) => new EstateController().uploadPicture(req, res)
);
estateRouter.route("/getAllNotApprovedEstates").get(
    (req, res) => new EstateController().getAllNotApprovedEstates(req, res)
);
estateRouter.route("/approveEstate").post(
    (req, res) => new EstateController().approveEstate(req, res)
);
estateRouter.route("/getAllEstatesFromUser").post(
    (req, res) => new EstateController().getAllEstatesFromUser(req, res)
);
estateRouter.route("/updateEstate").post(
    (req, res) => new EstateController().updateEstate(req, res)
);
estateRouter.route("/updatePictureNumber").post(
    (req, res) => new EstateController().updatePictureNumber(req, res)
);
estateRouter.route("/getAllApprovedEstates").get(
    (req, res) => new EstateController().getAllApprovedEstates(req, res)
);
estateRouter.route("/updatePromotion").post(
    (req, res) => new EstateController().updatePromotion(req, res)
);
estateRouter.route("/getAllRentedEstates").get(
    (req, res) => new EstateController().getAllRentedEstates(req, res)
);
estateRouter.route("/getAllSellingEstates").get(
    (req, res) => new EstateController().getAllSellingEstates(req, res)
);
estateRouter.route("/setSold").post(
    (req, res) => new EstateController().setSold(req, res)
);
estateRouter.route("/getAllEstates").get(
    (req, res) => new EstateController().getAllEstates(req, res)
);
estateRouter.route("/deleteEstate").post(
    (req, res) => new EstateController().deleteEstate(req, res)
);
export default estateRouter;