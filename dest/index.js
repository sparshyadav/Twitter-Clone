"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes = require("./routes/user");
const tweetRoutes = require("./routes/tweet");
const loginRoutes = require("./routes/login");
const likeRouter = require("./routes/like");
const commentRouter = require("./routes/comment");
const retweetRouter = require("./routes/retweet");
const PORT = 4455;
const app = (0, express_1.default)();
// app.set("view engine", "hbs");
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.render("home");
});
app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);
app.use("/login", loginRoutes);
app.use("/likes", likeRouter);
app.use("/comment", commentRouter);
app.use("/retweet", retweetRouter);
app.listen(PORT, () => {
    console.log(`https://localhost:${PORT}`);
});
