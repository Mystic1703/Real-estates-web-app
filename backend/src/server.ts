import express from 'express';
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRouter from './routes/user.routes';
import path from "path";
import estateRouter from './routes/estate.routes';
import messageRouter from './routes/message.routes';
import offerRouter from './routes/offer.routes';
const app = express();
app.use(cors());
app.use(bodyParser.json());
const assetsPath = path.dirname(require.main.filename) + '/assets';
mongoose.connect("mongodb://localhost:27017/booking");
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("Connection successful!")
});

const router = express.Router();
router.use("/user", userRouter);
router.use("/estate", estateRouter);
router.use("/message", messageRouter);
router.use("/offer", offerRouter);
app.use("/static", express.static(path.join(__dirname, 'assets')));
app.use("/", router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
export default assetsPath;