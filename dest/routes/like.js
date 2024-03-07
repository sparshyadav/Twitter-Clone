"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Like_1 = require("../controllers/Like");
const auth_1 = require("../utils/auth");
const router = express_1.default.Router();
router.post("/add/:id", auth_1.verifyToken, Like_1.addLikes);
module.exports = router;
