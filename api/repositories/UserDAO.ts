import { PrismaClient } from "@prisma/client";
import { ICreatePhone, ICreateStudent, IPhone, IStudent } from "../domain/interfaces";

class DAO {

    prisma: PrismaClient;

    constructor() {
      this.prisma = new PrismaClient();
    }
  
    async create(event, data: ICreateStudent) {
      try {
        const result = await this.prisma.user.create({ data });
        event.reply("create-success", result);
      } catch (error) {
        event.reply("create-error", error.message);
      }
    }
  
    async findById(event, cpf) {
      try {
        const result: IStudent | null = await this.prisma.user.findUnique({
          where: { cpf },
        });
        event.reply("find-by-id-success", result);
      } catch (error) {
        event.reply("find-by-id-error", error.message);
      }
    }
  
    async findAll(event) {
      try {
        const result: IStudent[] = await this.prisma.user.findMany();
        event.reply("find-all-success", result);
      } catch (error) {
        event.reply("find-all-error", error.message);
      }
    }
  
    async update(event, cpf, newData) {
      try {
        const result: IStudent = await this.prisma.user.update({
          where: { cpf },
          data: newData,
        });
        event.reply("update-success", result);
      } catch (error) {
        event.reply("update-error", error.message);
      }
    }
  
    async delete(event, cpf) {
      try {
        const result: IStudent = await this.prisma.user.delete({
          where: { cpf },
        });
        event.reply("delete-success", result);
      } catch (error) {
        event.reply("delete-error", error.message);
      }
    }

    async createPhone(event, data: ICreatePhone){
        try {
            const result: IPhone = await this.prisma.phone.create({ data });
            event.reply("create-success", result);
          } catch (error) {
            event.reply("create-error", error.message);
          }
    }

    async findAllPhonesByUserCpf(event, user_cpf){
        try {
            const result: IPhone[] = await this.prisma.phone.findMany({
                where: {user_cpf}
            });
            event.reply("find-all-success", result);
          } catch (error) {
            event.reply("find-all-error", error.message);
          }
    }

    async deletePhone(event, id){
        try {
            const result: IPhone = await this.prisma.phone.delete({
              where: { id },
            });
            event.reply("delete-success", result);
          } catch (error) {
            event.reply("delete-error", error.message);
          }
    }

    async updatePhone(event, id, newData) {
        try {
          const result: IPhone = await this.prisma.phone.update({
            where: { id },
            data: newData,
          });
          event.reply("update-success", result);
        } catch (error) {
          event.reply("update-error", error.message);
        }
      }
  }

  

  
  
  module.exports = DAO;
