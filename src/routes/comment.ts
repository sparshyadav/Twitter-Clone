import express from "express";
import { verifyToken } from "../utils/auth";
import { addComment } from "../controllers/Comment";
const router = express.Router();

router.post("/add/:id", verifyToken, addComment);

module.exports = router;