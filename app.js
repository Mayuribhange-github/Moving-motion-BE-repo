import express from "express";
import mongoose from 'mongoose';
import bodyParser from "body-parser";
import userRouter from './routes/user.route.js'
import bookingRouter from './routes/bookings.route.js'
import driverRouter from './routes/driver.route.js'
import cors from "cors";
import fs from "fs";
import path from 'path';
import morgan from 'morgan';
const app = express();
import dotenv from 'dotenv'
dotenv.config();
const originalSend = app.response.send

app.response.send = function sendOverWrite(body) {
    originalSend.call(this, body)
    this.__custombody__ = body
}
app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.static('images'));
const PORT = 4000;
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/moving-motion-mjr-project', err => {
    if (err)
        console.log(err);
    else {
        let api = {};
        app.use((req, res, next) => {
            console.log(api)
            console.log(req.path)
            api[req.path] = (api[req.path] ? api[req.path] : 0) + 1;
            next();
        })
        morgan.token('apicount', (req, res) => {
            console.log(req.originalUrl)
            return JSON.stringify(api[req.originalUrl])
        }

        )
        morgan.token('res-body', (req, res) =>

            JSON.stringify(res.__custombody__),
        )
        morgan.token('req-body', (req, res) =>

            JSON.stringify(req.body),
        )
        var accessLogStream = fs.createWriteStream(path.join(process.cwd(), "access.log"), {
            flags: "a"
        });
        // app.use(morgan("combined", { stream: accessLogStream }));
        app.use(morgan(':date[web] :method :url api-count :apicount request-body= :req-body :status :response-time ms - :res[content-length]- response-body = :res-body -:req[content-length]', {
            stream: accessLogStream,
            // skip: function (req, res) { return res.statusCode >= 400 }
        }));
        app.use(cors());
        console.log("mongo-db connected");
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use("/user", userRouter);
        app.use("/driver", driverRouter);
        app.use("/booking", bookingRouter);

        // morgan.token('res-body', (_req, res) =>
        //     JSON.stringify(res.__custombody__),
        // )

        // setup the logger 
        app.listen(PORT, () => {
            console.log(`Server started at port ${PORT} http://localhost:${PORT}/`);
        })
    }
});