import express from "express";
const router = express.Router();
import { addUser, findbyusername, findbyId, getUser, updateuser, deleteUser } from "../controllers/User";
import { verifyToken } from "../utils/auth";

router.post("/adduser", addUser);
router.get("/getuser", getUser);
router.get("/finduserbyid/:id", findbyId);
router.get("/finduserbyname/:id", findbyusername);
router.put("/updateuser/:id", verifyToken, updateuser);
router.delete("/deleteuser/:id", verifyToken, deleteUser);


module.exports = router;