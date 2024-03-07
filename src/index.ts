import express from "express";
const userRoutes = require("./routes/user");
const tweetRoutes = require("./routes/tweet");
const loginRoutes = require("./routes/login");
const likeRouter = require("./routes/like");
const commentRouter=require("./routes/comment");
const retweetRouter=require("./routes/retweet");

const PORT = 4455;
const app = express();

// app.set("view engine", "hbs");

app.use(express.json());

app.get("/", (req, res) => {
    res.render("home");
})

app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);
app.use("/login", loginRoutes);
app.use("/likes", likeRouter);
app.use("/comment", commentRouter);
app.use("/retweet", retweetRouter);

app.listen(PORT, () => {
    console.log(`https://localhost:${PORT}`);
})
