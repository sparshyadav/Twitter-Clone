"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyLogin = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// const {createJwtToken}=require("../utils/auth");
const auth_1 = require("../utils/auth");
const verifyLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    let user = yield prisma.user.findUnique({
        where: {
            email: email
        }
    });
    if (!user) {
        return res.send("No User Found");
    }
    if (user.password !== password) {
        return res.send("Password Did not Match");
    }
    let token = (0, auth_1.creatJwtToken)(user);
    res.cookie("token", token);
    res.send(`Login Successfull  Token: ${token}`);
});
exports.verifyLogin = verifyLogin;
module.exports = exports.verifyLogin;
