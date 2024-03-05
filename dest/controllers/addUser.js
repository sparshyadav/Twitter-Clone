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
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function createUser(firstname, lastname, email, password, bio) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                bio: bio
            }
        });
        console.log(user);
    });
}
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const { firstname, lastname, email, password, bio } = req.body;
        try {
            createUser(firstname, lastname, email, password, bio);
            return res.status(200).send("successful");
        }
        catch (err) {
            console.error(err);
            console.log(err);
            return res.status(503).send("error");
        }
    });
}
exports.default = addUser;
