import express from "express";
import { fetchData, postData } from "../controller/data.js";
const router = express.Router();

router.route('/')
.get(fetchData)
.post(postData)

export default router;
