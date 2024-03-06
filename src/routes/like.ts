import express from "express";
import { addLikes } from "../controllers/Like";
import { verifyToken } from "../utils/auth";
const router = express.Router();

router.post("/add/:id", verifyToken, addLikes);

module.exports = router;