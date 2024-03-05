import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function readUser() {
    const users = await prisma.user.findMany();
    console.log(users);
}

exports.getUser = async (req: any, res: any) => {
    try {
        readUser();
    }
    catch (err) {
        console.error(err);
        console.log(err);
    }

}
