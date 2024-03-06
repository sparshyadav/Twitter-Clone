"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { createTweet } = require("../controllers/Tweet");
const auth_1 = require("../utils/auth");
const Tweet_1 = require("../controllers/Tweet");
router.post("/create", auth_1.verifyToken, createTweet);
router.get("/get/:id", Tweet_1.getAllTweets);
module.exports = router;
