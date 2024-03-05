"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateuser = exports.findbyusername = exports.findbyId = exports.getUser = exports.addUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Creating New User
function createUser(firstname, lastname, email, password, bio) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield prisma.user.create({
            data: {
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                bio: bio
            }
        });
        console.log(user);
    });
}
function addUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const { firstname, lastname, email, password, bio } = req.body;
        try {
            createUser(firstname, lastname, email, password, bio);
            return res.status(200).send("successful");
        }
        catch (err) {
            console.error(err);
            console.log(err);
            return res.status(503).send("error");
        }
    });
}
exports.addUser = addUser;
// Fetching All Users
function readUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield prisma.user.findMany();
        console.log(users);
        return users;
    });
}
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield readUser();
        return res.status(200).json(users);
    }
    catch (err) {
        console.error(err);
        console.log(err);
        return res.send("Error in Fetching Data");
    }
});
exports.getUser = getUser;
// Show User via ID
const findbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        console.log(id);
        const user = yield prisma.user.findUnique({
            where: {
                id: Number(id)
            },
        });
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
});
exports.findbyId = findbyId;
// Show User by Username
const findbyusername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const name = req.params.id;
        const user = yield prisma.user.findMany({
            where: {
                firstname: name
            },
        });
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
});
exports.findbyusername = findbyusername;
// Updating User Information
const updateuser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        // Finding The User
        const user = yield prisma.user.findUnique({
            where: {
                id: Number(id)
            },
        });
        const { firstname, lastname, email, password } = req.body;
        // Creating new Object of Updated Data
        const updatedData = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password
        };
        // Updating User
        const updateUser = yield prisma.user.update({
            where: {
                id: Number(id)
            },
            data: updatedData
        });
        return res.send(updateUser);
    }
    catch (err) {
        console.log(err);
        console.error(err);
        return res.send("Error in Updating Data");
    }
});
exports.updateuser = updateuser;
// Deleting User
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const deleteUser = yield prisma.user.delete({
        where: {
            id: Number(id)
        },
    });
    return res.send(deleteUser);
});
exports.deleteUser = deleteUser;
module.exports = { addUser, getUser: exports.getUser, findbyId: exports.findbyId, findbyusername: exports.findbyusername, updateuser: exports.updateuser, deleteUser: exports.deleteUser };
