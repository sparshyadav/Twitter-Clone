import express from "express";
const userRoutes = require("./routes/user");
const tweetRoutes = require("./routes/tweet");
const loginRoutes = require("./routes/login");
const PORT = 4455;
const app = express();

app.set("view engine", "hbs");
app.use(express.json());

app.get("/", (req, res) => {
    res.render("home");
})

app.use("/user", userRoutes);
app.use("/tweet", tweetRoutes);
app.use("/login", loginRoutes);

app.listen(PORT, () => {
    console.log(`https://localhost:${PORT}`);
})

//HW - Complete code of all the routes
//HW Authenticate using JWT and protect all routes