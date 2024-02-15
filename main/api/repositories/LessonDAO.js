"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
class LessonDAO {
    prisma;
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async create(event, data) {
        try {
            const result = await this.prisma.lesson.create({ data });
            event.reply("create-lesson-success", result);
        }
        catch (error) {
            event.reply("create-lesson-error", error.message);
        }
    }
    async findById(event, id) {
        try {
            const result = await this.prisma.lesson.findUnique({
                where: { id }
            });
            event.reply("find-lesson-by-id-success", result);
        }
        catch (error) {
            event.reply("find-lesson-by-id-error", error.message);
        }
    }
    async findAll(event) {
        try {
            const result = await this.prisma.lesson.findMany();
            event.reply("find-all-lessons-success", result);
        }
        catch (error) {
            event.reply("find-all-lessons-error", error.message);
        }
    }
    async update(event, id, newData) {
        try {
            const result = await this.prisma.lesson.update({
                where: { id },
                data: newData
            });
            event.reply("update-lesson-success", result);
        }
        catch (error) {
            event.reply("update-lesson-error", error.message);
        }
    }
    async delete(event, id) {
        try {
            const result = await this.prisma.lesson.delete({
                where: { id }
            });
            event.reply("delete-lesson-success", result);
        }
        catch (error) {
            event.reply("delete-lesson-error", error.message);
        }
    }
    async findByLectureId(event, lectureId) {
        try {
            const lesson = await this.prisma.lesson.findFirst({
                where: {
                    lectures: {
                        some: {
                            id: lectureId
                        }
                    }
                }
            });
            event.reply("find-lesson-by-lecture-id-success", lesson);
        }
        catch (error) {
            event.reply("find-lesson-by-lecture-id-error", error.message);
        }
    }
    async isLessonAlreadyScheduled(event, startAt, endAt) {
        try {
            const existingLesson = await this.prisma.lesson.findFirst({
                where: {
                    OR: [
                        {
                            AND: [
                                { startAt: { lte: startAt } },
                                { endAt: { gte: startAt } },
                            ],
                        },
                        {
                            AND: [
                                { startAt: { lte: endAt } },
                                { endAt: { gte: endAt } },
                            ],
                        },
                        {
                            AND: [
                                { startAt: { gte: startAt } },
                                { endAt: { lte: endAt } },
                            ],
                        },
                    ],
                },
            });
            if (existingLesson) {
                return event.reply("lesson-already-scheduled", "A lesson is already scheduled during this time.");
            }
            else {
                return event.reply("lesson-not-scheduled", "No lesson is scheduled during this time.");
            }
        }
        catch (error) {
            return event.reply("lesson-scheduling-error", error.message);
        }
    }
}
exports.default = LessonDAO;
