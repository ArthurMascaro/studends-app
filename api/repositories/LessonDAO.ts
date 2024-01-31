import { PrismaClient } from "@prisma/client";
import { ICreateLesson, ILesson } from "../domain/interfaces";

class LessonDAO{

    prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async create(event: any, data: ICreateLesson) {
        try {
            // Verifica se já existe alguma aula no mesmo período
            const existingLesson = await this.prisma.lesson.findFirst({
                where: {
                    OR: [
                        {
                            AND: [
                                { startAt: { lte: data.endAt } },
                                { endAt: { gte: data.startAt } }
                            ]
                        },
                        {
                            AND: [
                                { startAt: { gte: data.startAt } },
                                { startAt: { lte: data.endAt } }
                            ]
                        },
                        {
                            AND: [
                                { endAt: { gte: data.startAt } },
                                { endAt: { lte: data.endAt } }
                            ]
                        }
                    ]
                }
            });

            if (existingLesson) {
                throw new Error("Já existe uma aula neste período.");
            }

            const result = await this.prisma.lesson.create({ data });
            event.reply("create-lesson-success", result);
        } catch (error: any) {
            event.reply("create-lesson-error", error.message);
        }
    }

    async findById(event: any, id: string){
        try{
            const result: ILesson | null = await this.prisma.lesson.findUnique({ 
                where: { id } 
            });
            event.reply("find-lesson-by-id-success", result);
        }catch(error: any){
            event.reply("find-lesson-by-id-error", error.message);
        }
    }

    async findAll(event: any){
        try{
            const result: ILesson[] = await this.prisma.lesson.findMany();
            event.reply("find-all-lessons-success", result);
        }catch(error: any){
            event.reply("find-all-lessons-error", error.message);
        }
    }

    async update(event: any, id: string, newData: object | any){
        try{
            const result: ILesson = await this.prisma.lesson.update({
                where: { id },
                data: newData
            });
            event.reply("update-lesson-success", result);
        }catch(error: any){
            event.reply("update-lesson-error", error.message);
        }
    }

    async delete(event: any, id: string){
        try{
            const result: ILesson = await this.prisma.lesson.delete({
                where: { id }
            });
            event.reply("delete-lesson-success", result);
        }catch(error: any){
            event.reply("delete-lesson-error", error.message);
        }
    }
}

export default LessonDAO;