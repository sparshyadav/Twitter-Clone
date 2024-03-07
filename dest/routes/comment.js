"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../utils/auth");
const Comment_1 = require("../controllers/Comment");
const router = express_1.default.Router();
router.post("/add/:id", auth_1.verifyToken, Comment_1.addComment);
module.exports = router;
