import express from "express";
const router = express.Router();
const { createTweet } = require("../controllers/Tweet");
import { verifyToken } from "../utils/auth";
import { getAllTweets } from "../controllers/Tweet";


router.post("/create", verifyToken, createTweet);
router.get("/get/:id", getAllTweets);

module.exports = router;