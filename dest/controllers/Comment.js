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
exports.addComment = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userid = req.user.id;
        const body = req.body;
        const comment = yield prisma.comment.create({
            data: body
        });
        const updateTweet = yield prisma.tweet.update({
            where: {
                id: Number(id)
            },
            data: {
                Comment: { connect: { id: comment.id } },
            },
        });
        console.log("Comment Added");
        return res.send(updateTweet);
    }
    catch (err) {
        console.log("An Error Occurred While Adding Comment");
        console.error(err);
        return res.send("An Error Occurred");
    }
});
exports.addComment = addComment;
module.exports = exports.addComment;
