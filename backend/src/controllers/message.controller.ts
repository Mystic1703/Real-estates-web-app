import express from "express";
import Message from "../models/message";

export class MessageController {
    addNewMessage = (req: express.Request, res: express.Response) => {
        let message = new Message(req.body);

        message.save();
        res.json({ "message": "message sent" });
    }

    getConversationTitles = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        Message.collection.distinct("title", {
            $or: [{ "sender": username }, {
                "reciever": username
            }]
        }, (err, messages) => {
            if (err) console.log(err);
            else res.json(messages);
        })

    }

    getAllConversations = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let title = req.body.title;

        Message.collection.distinct("reciever", { "title": title, "sender": username }, (err, allRecievers) => {
            if (err) console.log(err);
            else {
                Message.collection.distinct("sender", { "title": title, "reciever": username }, (err2, allSenders) => {
                    if (err2) console.log(err2);
                    else {
                        let n = allSenders.length;
                        for (let i = 0; i < n; i++) {
                            if (!allRecievers.includes(allSenders[i], 0)) {
                                allRecievers.push(allSenders[i]);
                            }
                        }
                        res.json(allRecievers);
                    }
                })
            }
        })
    }

    getAllMessages = (req: express.Request, res: express.Response) => {
        let title = req.body.title;
        let username1 = req.body.username1;
        let username2 = req.body.username2;
        Message.find({
            $or: [{ "title": title, "sender": username1, "reciever": username2 },
            { "title": title, "sender": username2, "reciever": username1 }]
        }, (err, messages) => {
            if (err) console.log(err);
            else res.json(messages);
        })
    }

    updateMessages = (req: express.Request, res: express.Response) => {
        let description = req.body.description;
        let address = req.body.address;

        Message.collection.updateMany({ "address": address }, { $set: { "title": description } });
        res.json({ "message": "ok" });
    }
}