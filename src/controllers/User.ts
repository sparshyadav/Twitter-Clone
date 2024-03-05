import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Creating New User
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

export async function addUser(req: any, res: any) {
    console.log(req.body);
    const { firstname, lastname, email, password, bio } = req.body;

    try {
        createUser(firstname, lastname, email, password, bio);
        return res.status(200).send("successful");
    }
    catch (err) {
        console.error(err);
        console.log(err);
        return res.status(503).send("error")
    }
}


// Fetching All Users
async function readUser() {
    const users = await prisma.user.findMany();
    console.log(users);
    return users;
}

export const getUser = async (req: any, res: any) => {
    try {
        const users = await readUser();
        return res.status(200).json(users);
    }
    catch (err) {
        console.error(err);
        console.log(err);
        return res.send("Error in Fetching Data");
    }

}


// Show User via ID
export const findbyId = async (req: any, res: any) => {
    try {
        const id = req.params.id;
        console.log(id);
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
        })

        if (!user) {
            res.send("User Does not Exist");
            return;
        }

        console.log("User Found");
        return res.send(user);
    }
    catch (err) {
        console.log(err);
        console.error(err);
        return res.send("Error in Fetching Data");
    }
}


// Show User by Username
export const findbyusername = async (req: any, res: any) => {
    try {
        const name = req.params.id;
        const user = await prisma.user.findMany({
            where: {
                firstname: name
            },
        })
        if (!user) {
            res.send("User Not Found");
            return;
        }
        console.log("User Found");
        return res.send(user);
    }
    catch (err) {
        console.log(err);
        console.error(err);
        return res.send("Error in Fetching Data");
    }
}


// Updating User Information
export const updateuser = async (req: any, res: any) => {
    try {
        const id = req.params.id;

        // Finding The User
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
        })

        const { firstname, lastname, email, password } = req.body;
        // Creating new Object of Updated Data
        const updatedData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        }

        // Updating User
        const updateUser = await prisma.user.update({
            where: {
                id: Number(id)
            },
            data: updatedData
        })

        return res.send(updateUser);
    }
    catch (err) {
        console.log(err);
        console.error(err);
        return res.send("Error in Updating Data");
    }
}

// Deleting User
export const deleteUser = async (req: any, res: any) => {
    const id = req.params.id;
    const deleteUser = await prisma.user.delete({
        where: {
            id: Number(id)
        },
    })

    return res.send(deleteUser);
}

module.exports = { addUser, getUser, findbyId, findbyusername, updateuser, deleteUser };
