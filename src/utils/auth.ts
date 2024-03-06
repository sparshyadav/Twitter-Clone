import jwt from "jsonwebtoken";
import Express, { Request, Response, NextFunction } from "express";
const secretKey = "spy";

export const creatJwtToken = (user: {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    password: string
}) => {
    return jwt.sign(user, secretKey, { expiresIn: "24h" });
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = String(req.headers.cookie?.split("=")[1]);
    let decode = jwt.verify(token, secretKey);

    if (decode) {
        req.user = decode;
        return next();
    }

    res.send("Token Invalid");
}

module.exports = { creatJwtToken, verifyToken };