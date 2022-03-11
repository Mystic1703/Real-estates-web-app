import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route("/login").post(
    (req, res) => new UserController().login(req, res)
);
userRouter.route("/findUserByUsername").post(
    (req, res) => new UserController().findUserByUsername(req, res)
);
userRouter.route("/findUserByMail").post(
    (req, res) => new UserController().findUserByMail(req, res)
);
userRouter.route("/addUser").post(
    (req, res) => new UserController().addUser(req, res)
);
userRouter.route("/changePassword").post(
    (req, res) => new UserController().changePassword(req, res)
);
userRouter.route("/approveRegistration").post(
    (req, res) => new UserController().approveRegistration(req, res)
);
userRouter.route("/discardRegistration").post(
    (req, res) => new UserController().discardRegistration(req, res)
);
userRouter.route("/getAllNotApprovedUsers").get(
    (req, res) => new UserController().getAllNotApprovedUsers(req, res)
);
userRouter.route("/getAllUsers").get(
    (req, res) => new UserController().getAllUsers(req, res)
);
userRouter.route("/updateUser").post(
    (req, res) => new UserController().updateUser(req, res)
);
userRouter.route("/uploadPicture").post(
    (req, res) => new UserController().uploadPicture(req, res)
);
userRouter.route("/blockUser").post(
    (req, res) => new UserController().blockUser(req, res)
);
userRouter.route("/unblockUser").post(
    (req, res) => new UserController().unblockUser(req, res)
);
userRouter.route("/checkUsersBlockList").post(
    (req, res) => new UserController().checkUsersBlockList(req, res)
);
userRouter.route("/getAllApprovedUsers").get(
    (req, res) => new UserController().getAllApprovedUsers(req, res)
);
userRouter.route("/setAvatar").post(
    (req, res) => new UserController().setAvatar(req, res)
);
export default userRouter;