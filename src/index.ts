import express from "express";
const userRoutes = require("./routes/user");
const PORT = 4455;
const app = express();

app.set("view engine", "hbs");

app.get("/", (req, res) => {
    res.render("home");
})

app.use("/user", userRoutes);

app.listen(PORT, () => {
    console.log(`https://localhost:${PORT}`);
})

//HW - Complete code of all the routes
//HW Authenticate using JWT and protect all routes