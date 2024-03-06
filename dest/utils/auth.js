"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.creatJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secretKey = "spy";
const creatJwtToken = (user) => {
    return jsonwebtoken_1.default.sign(user, secretKey, { expiresIn: "24h" });
};
exports.creatJwtToken = creatJwtToken;
const verifyToken = (req, res, next) => {
    var _a, _b;
    console.log((_a = req.headers.cookie) === null || _a === void 0 ? void 0 : _a.split("=")[1]);
    let token = String((_b = req.headers.cookie) === null || _b === void 0 ? void 0 : _b.split("=")[1]);
    let decode = jsonwebtoken_1.default.verify(token, secretKey);
    if (decode) {
        req.user = decode;
        return next();
    }
    res.send("Token Invalid");
};
exports.verifyToken = verifyToken;
module.exports = { creatJwtToken: exports.creatJwtToken, verifyToken: exports.verifyToken };
