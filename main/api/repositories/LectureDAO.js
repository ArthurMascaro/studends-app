"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class LectureDAO {
    prisma;
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async create(event, data) {
        try {
            const result = await this.prisma.lecture.create({ data });
            return event.reply("create-lecture-success", result);
        }
        catch (error) {
            return event.reply("create-lecture-error", error.message);
        }
    }
    async findById(event, id) {
        try {
            const result = await this.prisma.lecture.findUnique({
                where: { id },
            });
            return event.reply("find-lecture-by-id-success", result);
        }
        catch (error) {
            return event.reply("find-lecture-by-id-error", error.message);
        }
    }
    async findAll(event) {
        try {
            const result = await this.prisma.lecture.findMany();
            return event.reply("find-all-lectures-success", result);
        }
        catch (error) {
            return event.reply("find-all-lectures-error", error.message);
        }
    }
    async update(event, id, newData) {
        try {
            const result = await this.prisma.lecture.update({
                where: { id },
                data: newData,
            });
            return event.reply("update-lecture-success", result);
        }
        catch (error) {
            return event.reply("update-lecture-error", error.message);
        }
    }
    async delete(event, id) {
        try {
            const result = await this.prisma.lecture.delete({
                where: { id },
            });
            return event.reply("delete-lecture-success", result);
        }
        catch (error) {
            return event.reply("delete-lecture-error", error.message);
        }
    }
    async findLecturesByWeek(event) {
        try {
            const currentDate = new Date();
            const startDate = new Date(currentDate);
            startDate.setDate(startDate.getDate() - startDate.getDay());
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + 6);
            const lecturesByDay = {};
            for (let i = 0; i < 7; i++) {
                const currentDate = new Date(startDate);
                currentDate.setDate(currentDate.getDate() + i);
                const lectures = await this.prisma.lecture.findMany({
                    where: {
                        lesson: {
                            startAt: {
                                gte: new Date(currentDate.setHours(0, 0, 0, 0)),
                                lte: new Date(currentDate.setHours(23, 59, 59, 999)),
                            },
                        },
                    },
                    include: {
                        user: true,
                        lesson: true,
                    },
                });
                lecturesByDay[currentDate.toISOString().split("T")[0]] = lectures;
            }
            console.log(lecturesByDay);
            return event.reply("find-lectures-by-week-success", lecturesByDay);
        }
        catch (error) {
            return event.reply("find-lectures-by-week-error", error.message);
        }
    }
    async findAllLecturesSortedByDate(event, skip, take) {
        try {
            const lectures = await this.prisma.lecture.findMany({
                orderBy: {
                    created_at: "desc",
                },
                skip,
                take,
            });
            return event.reply("find-all-lectures-sorted-by-date-success", lectures);
        }
        catch (error) {
            return event.reply("find-all-lectures-sorted-by-date-error", error.message);
        }
    }
    async findAllLecturesByStudentCPF(event, user_cpf, skip, take) {
        try {
            const lectures = await this.prisma.lecture.findMany({
                where: {
                    user_cpf,
                },
                orderBy: {
                    lesson: {
                        created_at: "desc",
                    },
                },
                skip,
                take,
            });
            return event.reply("find-all-lectures-by-student-cpf-success", lectures);
        }
        catch (error) {
            return event.reply("find-all-lectures-by-student-cpf-error", error.message);
        }
    }
    async findAllLecturesByMonth(event, month, year) {
        try {
            const lectures = await this.prisma.lecture.findMany({
                where: {
                    lesson: {
                        startAt: {
                            gte: new Date(year, month - 1, 1),
                            lt: new Date(year, month, 1),
                        },
                    },
                },
                include: {
                    user: true,
                    lesson: true,
                },
            });
            return event.reply("find-lectures-by-month-success", lectures);
        }
        catch (error) {
            return event.reply("find-lectures-by-month-error", error.message);
        }
    }
    async findAllLecturesByStudentAndMonth(event, user_cpf, month, year) {
        try {
            const lectures = await this.prisma.lecture.findMany({
                where: {
                    user_cpf,
                    lesson: {
                        startAt: {
                            gte: new Date(year, month - 1, 1),
                            lt: new Date(year, month, 1),
                        },
                    },
                },
                include: { lesson: true },
            });
            return event.reply("find-all-lectures-by-student-and-month-success", lectures);
        }
        catch (error) {
            return event.reply("find-all-lectures-by-student-and-month-error", error.message);
        }
    }
    async getTotalProfitByMonth(event, month, year) {
        try {
            const profitByMonth = await this.prisma.$queryRaw `
            SELECT 
                SUM(ls.value) AS total_profit
            FROM
                lectures l
                JOIN lessons ls ON l.lesson_id = ls.id
            WHERE
                l.payed = true
                AND EXTRACT(MONTH FROM ls.start_at) = ${month}
                AND EXTRACT(YEAR FROM ls.start_at) = ${year};
        `;
            return event.reply("get-total-profit-by-month-success", profitByMonth[0].total_profit);
        }
        catch (error) {
            return event.reply("get-total-profit-by-month-error", error.message);
        }
    }
}
exports.default = LectureDAO;
