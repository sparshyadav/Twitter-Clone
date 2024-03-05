"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes = require("./routes/user");
const PORT = 4455;
const app = (0, express_1.default)();
app.set("view engine", "hbs");
app.get("/", (req, res) => {
    res.render("home");
});
app.use("/user", userRoutes);
app.listen(PORT, () => {
    console.log(`https://localhost:${PORT}`);
});
//HW - Complete code of all the routes
//HW Authenticate using JWT and protect all routes