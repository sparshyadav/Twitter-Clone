"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const User_1 = require("../controllers/User");
const auth_1 = require("../utils/auth");
router.post("/adduser", User_1.addUser);
router.get("/getuser", User_1.getUser);
router.get("/finduserbyid/:id", User_1.findbyId);
router.get("/finduserbyname/:id", User_1.findbyusername);
router.put("/updateuser/:id", auth_1.verifyToken, User_1.updateuser);
router.delete("/deleteuser/:id", auth_1.verifyToken, User_1.deleteUser);
module.exports = router;
