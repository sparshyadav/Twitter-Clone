import express from "express";
const router = express.Router();
const { createTweet } = require("../controllers/Tweet");
import { verifyToken } from "../utils/auth";


router.post("/create", verifyToken, createTweet);

module.exports = router;