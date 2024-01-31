"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class UserDAO {
    prisma;
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async create(event, data) {
        try {
            const result = await this.prisma.user.create({ data });
            return event.reply("create-user-success", result);
        }
        catch (error) {
            console.log(error);
            return event.reply("create-user-error", error.message);
        }
    }
    async findById(event, cpf) {
        try {
            const result = await this.prisma.user.findUnique({
                where: { cpf },
            });
            event.reply("find-user-by-id-success", result);
        }
        catch (error) {
            event.reply("find-user-by-id-error", error.message);
        }
    }
    async findAll(event) {
        try {
            const result = await this.prisma.user.findMany();
            event.reply("find-all-users-success", result);
        }
        catch (error) {
            event.reply("find-all-users-error", error.message);
        }
    }
    async update(event, cpf, newData) {
        try {
            const result = await this.prisma.user.update({
                where: { cpf },
                data: newData,
            });
            event.reply("update-user-success", result);
        }
        catch (error) {
            event.reply("update-user-error", error.message);
        }
    }
    async delete(event, cpf) {
        try {
            const result = await this.prisma.user.delete({
                where: { cpf },
            });
            event.reply("delete-user-success", result);
        }
        catch (error) {
            event.reply("delete-user-error", error.message);
        }
    }
    async createPhone(event, data) {
        try {
            const result = await this.prisma.phone.create({ data });
            event.reply("create-phone-success", result);
        }
        catch (error) {
            event.reply("create-phone-error", error.message);
        }
    }
    async findAllPhonesByUserCpf(event, user_cpf) {
        try {
            const result = await this.prisma.phone.findMany({
                where: { user_cpf }
            });
            event.reply("find-all-phones-success", result);
        }
        catch (error) {
            event.reply("find-all-phones-error", error.message);
        }
    }
    async deletePhone(event, id) {
        try {
            const result = await this.prisma.phone.delete({
                where: { id },
            });
            event.reply("delete-phone-success", result);
        }
        catch (error) {
            event.reply("delete-phone-error", error.message);
        }
    }
    async updatePhone(event, id, newData) {
        try {
            const result = await this.prisma.phone.update({
                where: { id },
                data: newData,
            });
            event.reply("update-phone-success", result);
        }
        catch (error) {
            event.reply("update-phone-error", error.message);
        }
    }
}
exports.default = UserDAO;
