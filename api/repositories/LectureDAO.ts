import { PrismaClient } from "@prisma/client";
import { ICreateLecture, ILecture } from "../domain/interfaces";

class LectureDAO{

    prisma: PrismaClient;

    constructor(){
        this.prisma = new PrismaClient();
    }

    async create(event: any, data: ICreateLecture){
        try{
            const result = await this.prisma.lecture.create({ data });
            event.reply("create-lecture-success", result);
        }catch(error: any){
            event.reply("create-lecture-error", error.message);
        }
    }

    async findById(event: any, id: string){
        try{
            const result: ILecture | null = await this.prisma.lecture.findUnique({ 
                where: { id } 
            });
            event.reply("find-lecture-by-id-success", result);
        }catch(error: any){
            event.reply("find-lecture-by-id-error", error.message);
        }
    }

    async findAll(event: any){
        try{
            const result: ILecture[] = await this.prisma.lecture.findMany();
            event.reply("find-all-lectures-success", result);
        }catch(error: any){
            event.reply("find-all-lectures-error", error.message);
        }
    }

    async update(event: any, id: string, newData: object | any){
        try{
            const result: ILecture = await this.prisma.lecture.update({
                where: { id },
                data: newData
            });
            event.reply("update-lecture-success", result);
        }catch(error: any){
            event.reply("update-lecture-error", error.message);
        }
    }

    async delete(event: any, id: string){
        try{
            const result: ILecture = await this.prisma.lecture.delete({
                where: { id }
            });
            event.reply("delete-lecture-success", result);
        }catch(error: any){
            event.reply("delete-lecture-error", error.message);
        }
    }

}

export default LectureDAO;