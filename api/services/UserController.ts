import { PrismaClient } from "@prisma/client";
import { IpcMainEvent } from "electron/main";

export const findAllUsers = async (event: IpcMainEvent) => {
    const prisma = new PrismaClient();

    const users = await prisma.users.findMany();

    console.log(users)

    event.reply("get-users", users);
}

export const createUser = async (event: IpcMainEvent, data: { name: string }) => {
    const prisma = new PrismaClient();

    const user = await prisma.users.create({ data });

    return event.reply("create-user", user);
}