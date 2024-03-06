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
exports.getAllTweets = exports.createTweet = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// import verifyToken from "../utils/auth";
// Creating a New Tweet
const createTweet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const id = req.user.id;
        const tweet = yield prisma.tweet.create({
            data: {
                title: title,
                content: content,
                userid: id
            },
        });
        yield prisma.user.update({
            where: { id: id },
            data: {
                tweets: { connect: { id: tweet.id } },
            },
        });
        console.log("Tweet Created");
        return res.send(tweet);
    }
    catch (err) {
        console.log("An Error Occurred While Creating a New Tweet");
        console.log(err);
        return res.send("An Error Occurred");
    }
});
exports.createTweet = createTweet;
const getAllTweets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = yield prisma.user.findUnique({
        where: {
            id: Number(id)
        },
        include: {
            tweets: true
        },
    });
    if (!user) {
        res.send("User Not Found");
    }
    let allTweets = user === null || user === void 0 ? void 0 : user.tweets;
    return res.send(allTweets);
});
exports.getAllTweets = getAllTweets;
module.exports = { createTweet: exports.createTweet, getAllTweets: exports.getAllTweets };
