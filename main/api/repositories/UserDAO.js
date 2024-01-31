"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class UserDAO {
    prisma;
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async create(event, data) {
        console.log("avsvasvzvxz");
        try {
            const result = await this.prisma.user.create({ data });
            console.log("alo");
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
    async findUserByName(event, name) {
        try {
            const result = await this.prisma.user.findMany({
                where: { name },
            });
            event.reply("find-users-by-name-success", result);
        }
        catch (error) {
            event.reply("find-users-by-name-error", error.message);
        }
    }
    async findByBornDate(event, bornDate) {
        try {
            const result = await this.prisma.user.findMany({
                where: { bornDate },
            });
            event.reply("find-users-by-bornDate-success", result);
        }
        catch (error) {
            event.reply("find-users-by-bornDate-error", error.message);
        }
    }
    async findUserByMotherName(event, motherName) {
        try {
            const result = await this.prisma.user.findMany({
                where: { motherName },
            });
            event.reply("find-users-by-motherName-success", result);
        }
        catch (error) {
            event.reply("find-users-by-motherName-error", error.message);
        }
    }
    async findUserByPhone(event, phone) {
        try {
            const result = await this.prisma.user.findMany({
                where: {
                    phones: {
                        some: {
                            number: phone,
                        },
                    },
                },
            });
            event.reply("find-users-by-phone-success", result);
        }
        catch (error) {
            event.reply("find-users-by-phone-error", error.message);
        }
    }
    async findStudentsInDebt(event) {
        try {
            const result = await this.prisma.lecture.findMany({
                where: {
                    payed: false,
                    presence: true,
                },
            });
            // Extrair CPFs dos alunos em dívida
            const cpfList = result.map((lecture) => lecture.user_cpf);
            // Encontrar alunos correspondentes
            const students = await this.prisma.user.findMany({
                where: {
                    cpf: {
                        in: cpfList,
                    },
                },
            });
            event.reply("find-students-in-debt-success", students);
        }
        catch (error) {
            event.reply("find-students-in-debt-error", error.message);
        }
    }
    async findByGrade(event, grade) {
        try {
            const result = await this.prisma.user.findMany({
                where: { grade },
            });
            event.reply("find-users-by-grade-success", result);
        }
        catch (error) {
            event.reply("find-users-by-grade-error", error.message);
        }
    }
    async findDebtAmountByUser(event, user_cpf) {
        try {
            const unpaidLectures = await this.prisma.lecture.findMany({
                where: {
                    user_cpf,
                    payed: false,
                },
            });
            let totalDebtAmount = 0;
            for (const lecture of unpaidLectures) {
                const lesson = await this.prisma.lesson.findUnique({
                    where: {
                        id: lecture.lesson_id,
                    },
                });
                if (lesson) {
                    totalDebtAmount += lesson.value;
                }
            }
            event.reply("find-debt-amount-by-user-success", totalDebtAmount);
        }
        catch (error) {
            event.reply("find-debt-amount-by-user-error", error.message);
        }
    }
    async findAllUserByLectureId(event, lectureId) {
        try {
            const user = await this.prisma.user.findMany({
                where: {
                    lectures: {
                        some: {
                            id: lectureId
                        }
                    }
                }
            });
            event.reply("find-user-by-lecture-id-success", user);
        }
        catch (error) {
            event.reply("find-user-by-lecture-id-error", error.message);
        }
    }
}
exports.default = UserDAO;
