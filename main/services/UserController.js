"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.findAllUsers = void 0;
const client_1 = require("@prisma/client");
const findAllUsers = async (event) => {
    const prisma = new client_1.PrismaClient();
    const users = await prisma.users.findMany();
    console.log(users);
    event.reply("get-users", users);
};
exports.findAllUsers = findAllUsers;
const createUser = async (event, data) => {
    const prisma = new client_1.PrismaClient();
    const user = await prisma.users.create({ data });
    return event.reply("create-user", user);
};
exports.createUser = createUser;
