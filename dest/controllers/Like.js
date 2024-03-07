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
exports.addLikes = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userid = req.user.id;
        let like = yield prisma.like.findFirst({
            where: {
                tweetid: Number(id),
                userid: userid
            }
        });
        if (like != null) {
            yield prisma.like.delete({
                where: {
                    id: like.id
                }
            });
            yield prisma.tweet.update({
                where: {
                    id: Number(id),
                },
                data: {
                    likecount: { decrement: 1 }
                }
            });
            return res.send("Like Removed");
        }
        const newLike = yield prisma.like.create({
            data: {
                tweetid: Number(id),
                userid: userid
            },
        });
        yield prisma.tweet.update({
            where: {
                id: id
            },
            data: {
                likecount: {
                    increment: 1
                }
            }
        });
        console.log("Like Added");
        return res.send("Like Added");
    }
    catch (err) {
        console.log("An Error Occurred While Adding a Tweet");
        console.log(err);
        return res.send("An Error Occurred");
    }
});
exports.addLikes = addLikes;
// Make same as comment, and make another route that will give every person that has liked the given tweet
