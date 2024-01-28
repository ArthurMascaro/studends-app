import { PrismaClient } from "@prisma/client";
import { ICreatePhone, ICreateStudent, IPhone, IStudent } from "../domain/interfaces";

class UserDAO {

    prisma: PrismaClient;

    constructor() {
      this.prisma = new PrismaClient();
    }
  
    async create(event: any, data: ICreateStudent) {
      try {
        const result = await this.prisma.user.create({ data });
        event.reply("create-user-success", result);
      } catch (error: any) {
        event.reply("create-user-error", error.message);
      }
    }
  
    async findById(event: any, cpf: string) {
      try {
        const result: IStudent | null = await this.prisma.user.findUnique({
          where: { cpf },
        });
        event.reply("find-user-by-id-success", result);
      } catch (error: any) {
        event.reply("find-user-by-id-error", error.message);
      }
    }
  
    async findAll(event: any) {
      try {
        const result: IStudent[] = await this.prisma.user.findMany();
        event.reply("find-all-users-success", result);
      } catch (error: any) {
        event.reply("find-all-users-error", error.message);
      }
    }
  
    async update(event: any, cpf: string, newData: object | any) {
      try {
        const result: IStudent = await this.prisma.user.update({
          where: { cpf },
          data: newData,
        });
        event.reply("update-user-success", result);
      } catch (error: any) {
        event.reply("update-user-error", error.message);
      }
    }
  
    async delete(event: any, cpf: string) {
      try {
        const result: IStudent = await this.prisma.user.delete({
          where: { cpf },
        });
        event.reply("delete-user-success", result);
      } catch (error: any) {
        event.reply("delete-user-error", error.message);
      }
    }

    async createPhone(event: any, data: ICreatePhone){
        try {
            const result: IPhone = await this.prisma.phone.create({ data });
            event.reply("create-phone-success", result);
          } catch (error: any) {
            event.reply("create-phone-error", error.message);
          }
    }

    async findAllPhonesByUserCpf(event: any, user_cpf: string){
        try {
            const result: IPhone[] = await this.prisma.phone.findMany({
                where: {user_cpf}
            });
            event.reply("find-all-phones-success", result);
          } catch (error: any) {
            event.reply("find-all-phones-error", error.message);
          }
    }

    async deletePhone(event: any, id: string){
        try {
            const result: IPhone = await this.prisma.phone.delete({
              where: { id },
            });
            event.reply("delete-phone-success", result);
          } catch (error: any) {
            event.reply("delete-phone-error", error.message);
          }
    }

    async updatePhone(event: any, id: string, newData: object) {
        try {
          const result: IPhone = await this.prisma.phone.update({
            where: { id },
            data: newData,
          });
          event.reply("update-phone-success", result);
        } catch (error: any) {
          event.reply("update-phone-error", error.message);
        }
    }
}

export default UserDAO;
