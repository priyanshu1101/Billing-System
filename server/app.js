import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dataRoutes from "./route/dataRoutes.js";
import cors from "cors";
const app = express();
const PORT = 5000;
const CONNECTION_URL = "mongodb+srv://priyanshu1101:priyanshu1101@cluster0.bhvsw.mongodb.net/Billing_System";

app.use(bodyParser.json({limit: "30mb" , extended : true}));
app.use(bodyParser.urlencoded({limit: "30mb" , extended : true}));
app.use(cors());
app.use('/', dataRoutes);


mongoose.connect(CONNECTION_URL)
    .then(() =>
        app.listen(PORT, () => {
            console.log("Listening to the PORT " + PORT);
        }))
    .catch((err) => { console.log(err); })
