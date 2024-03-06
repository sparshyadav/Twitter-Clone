import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { creatJwtToken } from '../utils/auth';

export const verifyLogin = async (req: any, res: any) => {
    const { email, password } = req.body;
    let user = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (!user) {
        return res.send("No User Found");
    }

    if (user.password !== password) {
        return res.send("Password Did not Match");
    }

    let token = creatJwtToken(user);
    res.cookie("token", token);
    res.send(`Login Successfull  Token: ${token}`);
}

module.exports = verifyLogin;