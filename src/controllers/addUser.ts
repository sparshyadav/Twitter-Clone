import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createUser(firstname: string, lastname: string, email: string, password: string, bio: string) {
    const user = await prisma.user.create({
        data: {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            bio: bio
        }
    })

    console.log(user);
}

exports.addUser = async (req: any, res: any) => {
    const { firstname, lastname, email, password, bio } = req.body;
    try {
        createUser(firstname, lastname, email, password, bio);
    }
    catch (err) {
        console.error(err);
        console.log(err);
    }
}