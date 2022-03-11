import express from "express";
import User from "../models/user";
import path from "path";
import fs from "fs";
import formidable from "formidable";
import assetsPath from "../server";
export class UserController {
    login = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.findOne({ "username": username, "password": password },
            (err, user) => {
                if (err) console.log(err);
                else res.json(user);
            })
    }


    findUserByUsername = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        User.findOne({ "username": username }, (errUsername, userUsername) => {
            if (errUsername) console.log(errUsername);
            else res.json(userUsername);
        });
    }

    findUserByMail = (req: express.Request, res: express.Response) => {
        let mail = req.body.mail;
        User.findOne({ "mail": mail }, (errMail, userMail) => {
            if (errMail) console.log(errMail);
            else res.json(userMail);
        });
    }

    addUser = (req: express.Request, res: express.Response) => {
        let user = new User(req.body);
        user.save().then((user) => {
            res.status(200).json({ "message": "user added" });
        }).catch((err) => {
            res.status(400).json({ "message": err });
        });
    }

    changePassword = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let password = req.body.password;

        User.collection.updateOne({ "username": username }, { $set: { "password": password } });
        res.json({ message: "ok" });
    }

    approveRegistration = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.collection.updateOne({ "username": username }, { $set: { "approved": true } });
        res.json({ message: "user registered" });
    }

    discardRegistration = (req: express.Request, res: express.Response) => {
        let username = req.body.username;

        User.collection.deleteOne({ "username": username });
        res.json({ message: "user deleted" });
    }

    getAllNotApprovedUsers = (req: express.Request, res: express.Response) => {
        User.find({ "approved": false },
            (err, users) => {
                if (err) console.log(err);
                else res.json(users);
            })
    }

    getAllUsers = (req: express.Request, res: express.Response) => {
        User.find({ "type": { "$in": ["regular", "agent"] } },
            (err, users) => {
                if (err) console.log(err);
                else res.json(users);
            })
    }

    updateUser = (req: express.Request, res: express.Response) => {
        let user = req.body.user;

        let userData = {
            username: user.username,
            firstname: user.firstname,
            lastname: user.lastname,
            password: user.password,
            city: user.city,
            country: user.country,
            type: user.type,
            approved: user.approved,
            mail: user.mail,
            avatar: user.avatar
        };

        User.collection.replaceOne({ "username": user.username }, userData);
        res.json(user);
    }

    uploadPicture = (req: express.Request, res: express.Response) => {
        const form = formidable({ multiples: true });
        console.log(req.body);
        form.parse(req, (err, fields, files) => {
            if (err) {
                console.log(err);
                return;
            }

            let oldPath = files.profilePicture.path;
            let newPath = assetsPath + "/userImages/" + fields.username + ".png";

            fs.rename(oldPath, newPath, (err) => {
                if (err) {
                    console.log(err);
                    return;
                }
            });

            res.json({ fields, files });
        })
    }

    blockUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let blockedUsername = req.body.blockedUsername;
        User.collection.updateOne({ "username": username }, { $push: { "blocked": blockedUsername } });
    }

    unblockUser = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        let blockedUsername = req.body.blockedUsername;
        User.collection.updateOne({ "username": username }, { $pull: { "blocked": blockedUsername } });
    }

    checkUsersBlockList = (req: express.Request, res: express.Response) => { //?
        let username1 = req.body.username1;
        let username2 = req.body.username2;
        let blockedUsers: string[];

        User.findOne({ "username": username1 }, (err, user1) => {
            if (err) console.log(err);
            else {
                blockedUsers = user1.blocked;
                if (blockedUsers.includes(username2, 0)) {
                    res.json({ "message": "blocked" });
                } else {
                    User.findOne({ "username": username2 }, (err2, user2) => {
                        if (err2) console.log(err2);
                        else {
                            blockedUsers = user2.blocked;
                            if (blockedUsers.includes(username1, 0)) {
                                res.json({ "message": "blocked" });
                            } else {
                                res.json({ "message": "unblocked" });
                            }
                        }
                    })
                }
            }
        })
    }

    getAllApprovedUsers = (req: express.Request, res: express.Response) => {
        User.find({ "approved": true, "type": { $in: ["regular", "agent"] } }, (err, users) => {
            if (err) console.log(err);
            else res.json(users);
        })
    }

    setAvatar = (req: express.Request, res: express.Response) => {
        let username = req.body.username;
        User.collection.updateOne({ "username": username }, { $set: { "avatar": true } });
        res.json({ "message": "ok" });
    }
}