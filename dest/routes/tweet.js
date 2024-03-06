"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { createTweet } = require("../controllers/Tweet");
const auth_1 = require("../utils/auth");
router.post("/create", auth_1.verifyToken, createTweet);
module.exports = router;
