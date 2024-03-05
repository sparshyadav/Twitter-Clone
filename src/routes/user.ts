// const express=require("express");
import express from "express";
const router = express.Router();
import { addUser, findbyusername, findbyId, getUser, updateuser, deleteUser } from "../controllers/User";

router.post("/adduser", addUser);
router.get("/getuser", getUser);
router.get("/finduserbyid/:id", findbyId);
router.get("/finduserbyname/:id", findbyusername);
router.put("/updateuser/:id", updateuser);
router.delete("/deleteuser/:id", deleteUser);


module.exports = router;