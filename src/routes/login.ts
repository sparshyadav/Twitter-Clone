import express from "express";
const router = express.Router();
const verifyLogin = require("../controllers/Login");

router.post("/", verifyLogin);

module.exports = router;