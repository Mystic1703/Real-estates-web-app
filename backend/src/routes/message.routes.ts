import express from "express";
import { MessageController } from "../controllers/message.controller";

const messageRouter = express.Router();
messageRouter.route("/addNewMessage").post(
    (req, res) => new MessageController().addNewMessage(req, res)
);
messageRouter.route("/getConversationTitles").post(
    (req, res) => new MessageController().getConversationTitles(req, res)
);
messageRouter.route("/getAllConversations").post(
    (req, res) => new MessageController().getAllConversations(req, res)
);
messageRouter.route("/getAllMessages").post(
    (req, res) => new MessageController().getAllMessages(req, res)
);
messageRouter.route("/updateMessages").post(
    (req, res) => new MessageController().updateMessages(req, res)
)
export default messageRouter;