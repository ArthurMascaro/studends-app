import { PrismaClient } from "@prisma/client";
import {
  ICreatePhone,
  ICreateStudent,
  IPhone,
  IStudent,
  ILecture,
  IStudentWithPhonesAndDebt
} from "../domain/interfaces";

class UserDAO {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(event: any, data: ICreateStudent) {
    console.log("avsvasvzvxz");
    try {
      const result = await this.prisma.user.create({ data });
      return event.reply("create-user-success", result);
    } catch (error: any) {
      return event.reply("create-user-error", error.message);
    }
  }

  async findById(event: any, cpf: string) {
    try {
      const result: IStudent | null = await this.prisma.user.findUnique({
        where: { cpf },
      });
      return event.reply("find-user-by-id-success", result);
    } catch (error: any) {
      return event.reply("find-user-by-id-error", error.message);
    }
  }

  async findAll(event: any) {
    try {
      const result: IStudent[] = await this.prisma.user.findMany();
      return event.reply("find-all-users-success", result);
    } catch (error: any) {
      return event.reply("find-all-users-error", error.message);
    }
  }

  async update(event: any, cpf: string, newData: object | any) {
    try {
      console.log(newData)
      const result: IStudent = await this.prisma.user.update({
        where: { cpf },
        data: newData,
      });
      return event.reply("update-user-success", result);
    } catch (error: any) {
      return event.reply("update-user-error", error.message);
    }
  }

  async delete(event: any, cpf: string) {
    try {
      const result: IStudent = await this.prisma.user.delete({
        where: { cpf },
      });
      return event.reply("delete-user-success", result);
    } catch (error: any) {
      return event.reply("delete-user-error", error.message);
    }
  }

  async createPhone(event: any, data: ICreatePhone) {
    try {
      const result: IPhone = await this.prisma.phone.create({ data });
      return event.reply("create-phone-success", result);
    } catch (error: any) {
      return event.reply("create-phone-error", error.message);
    }
  }

  async createManyPhones(event: any, phoneDataList: ICreatePhone[]) {
    try {
        const createdPhones: IPhone[] = [];
        for (const phoneData of phoneDataList) {
            const createdPhone: IPhone = await this.prisma.phone.create({
                data: phoneData,
            });
            createdPhones.push(createdPhone);
        }
        return event.reply("create-many-phones-success", createdPhones);
    } catch (error: any) {
        return event.reply("create-many-phones-error", error.message);
    }
  }

  async findAllPhonesByUserCpf(event: any, user_cpf: string) {
    try {
      const result: IPhone[] = await this.prisma.phone.findMany({
        where: { user_cpf },
      });
      return event.reply("find-all-phones-success", result);
    } catch (error: any) {
      return event.reply("find-all-phones-error", error.message);
    }
  }

  async deletePhone(event: any, id: string) {
    try {
      const result: IPhone = await this.prisma.phone.delete({
        where: { id },
      });
      return event.reply("delete-phone-success", result);
    } catch (error: any) {
      return event.reply("delete-phone-error", error.message);
    }
  }

  async updatePhone(event: any, id: string, newData: object) {
    try {
      const result: IPhone = await this.prisma.phone.update({
        where: { id },
        data: newData,
      });
      return event.reply("update-phone-success", result);
    } catch (error: any) {
      return event.reply("update-phone-error", error.message);
    }
  }

  async updateManyPhones(event: any, phoneDataList: IPhone[]) {
    try {
        const updatedPhones: IPhone[] = [];
        for (const phoneData of phoneDataList) {
            const updatedPhone: IPhone = await this.prisma.phone.update({
                where: { id: phoneData.id },
                data: phoneData,
            });
            updatedPhones.push(updatedPhone);
        }
        return event.reply("update-many-phones-success", updatedPhones);
    } catch (error: any) {
        return event.reply("update-many-phones-error", error.message);
    }
  }

  async findUserByName(event: any, name: string) {
    try {
      const result: IStudent[] = await this.prisma.user.findMany({
        where: { name },
      });
      return event.reply("find-users-by-name-success", result);
    } catch (error: any) {
      return event.reply("find-users-by-name-error", error.message);
    }
  }

  async findByBornDate(event: any, bornDate: Date) {
    try {
      const result: IStudent[] = await this.prisma.user.findMany({
        where: { bornDate },
      });
      return event.reply("find-users-by-bornDate-success", result);
    } catch (error: any) {
      return event.reply("find-users-by-bornDate-error", error.message);
    }
  }

  async findUserByMotherName(event: any, motherName: string) {
    try {
      const result: IStudent[] = await this.prisma.user.findMany({
        where: { motherName },
      });
      return event.reply("find-users-by-motherName-success", result);
    } catch (error: any) {
      return event.reply("find-users-by-motherName-error", error.message);
    }
  }

  async findUserByPhone(event: any, phone: string) {
    try {
      const result: IStudent[] = await this.prisma.user.findMany({
        where: {
          phones: {
            some: {
              number: phone,
            },
          },
        },
      });
      return event.reply("find-users-by-phone-success", result);
    } catch (error: any) {
      return event.reply("find-users-by-phone-error", error.message);
    }
  }

  async findStudentsInDebt(event: any) {
    try {
      const result: ILecture[] = await this.prisma.lecture.findMany({
        where: {
          payed: false,
          presence: true,
        },
      });
      // Extrair CPFs dos alunos em dívida
      const cpfList = result.map((lecture) => lecture.user_cpf);
      // Encontrar alunos correspondentes
      const students: IStudent[] = await this.prisma.user.findMany({
        where: {
          cpf: {
            in: cpfList,
          },
        },
      });
      return event.reply("find-students-in-debt-success", students);
    } catch (error: any) {
      return event.reply("find-students-in-debt-error", error.message);
    }
  }

  async findByGrade(event: any, grade: string) {
    try {
      const result: IStudent[] = await this.prisma.user.findMany({
        where: { grade },
      });
      return event.reply("find-users-by-grade-success", result);
    } catch (error: any) {
      return event.reply("find-users-by-grade-error", error.message);
    }
  }

  async findDebtAmountByUser(event: any, user_cpf: string) {
    try {
      const unpaidLectures: ILecture[] = await this.prisma.lecture.findMany({
        where: {
          user_cpf,
          payed: false,
        },
      });

      let totalDebtAmount: number = 0;

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

      return event.reply("find-debt-amount-by-user-success", totalDebtAmount);
    } catch (error: any) {
      return event.reply("find-debt-amount-by-user-error", error.message);
    }
  }

  async findAllUserByLectureId(event: any, lectureId: string) {
    try {
      const user: IStudent[] = await this.prisma.user.findMany({
        where: {
          lectures: {
            some: {
              id: lectureId,
            },
          },
        },
      });

      return event.reply("find-user-by-lecture-id-success", user);
    } catch (error: any) {
      return event.reply("find-user-by-lecture-id-error", error.message);
    }
  }

  async getTotalProfitByStudent(event: any, user_cpf: string) {
    try {
      const payedLectures: ILecture[] = await this.prisma.lecture.findMany({
        where: { user_cpf, payed: true },
        include: { lesson: true },
      });
      let totalProfit: number = 0;

      for (const lecture of payedLectures) {
        const lesson = await this.prisma.lesson.findUnique({
          where: {
            id: lecture.lesson_id,
          },
        });

        if (lesson) {
          totalProfit += lesson.value;
        }
      }

      return event.reply("get-total-profit-by-student-success", totalProfit);
    } catch (error: any) {
      return event.reply("get-total-profit-by-student-error", error.message);
    }
  }

  async getTotalProfitByStudentAndMonth(event: any, user_cpf: string, month: number, year: number) {
    try {
        const startOfMonth = new Date(year, month - 1, 1);
        const endOfMonth = new Date(year, month, 0);
        const payedLectures: ILecture[] = await this.prisma.lecture.findMany({
            where: {
                user_cpf,
                payed: true,
                lesson: {
                    startAt: {
                        gte: startOfMonth,
                        lt: endOfMonth
                    }
                }
            },
            include: {
                lesson: true
            },
        });

        let totalProfit: number = 0;

        for (const lecture of payedLectures) {
            const lesson = await this.prisma.lesson.findUnique({
                where: {
                    id: lecture.lesson_id,
                },
            });

            if (lesson) {
                totalProfit += lesson.value;
            }
        }

        return event.reply("get-total-profit-by-student-last-month-success", totalProfit);
    } catch (error: any) {
        return event.reply("get-total-profit-by-student-last-month-error", error.message);
    }
}

  async getTotalDebtByStudent(event: any, user_cpf: string) {
    try {
      const unpaidLectures: ILecture[] = await this.prisma.lecture.findMany({
        where: { user_cpf, payed: false },
        include: { lesson: true },
      });

      let totalDebtAmount: number = 0;

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

      return event.reply("get-total-debt-by-student-success", totalDebtAmount);
    } catch (error: any) {
      return event.reply("get-total-debt-by-student-error", error.message);
    }
  }

  async getDebtByStudentAndMonth(
    event: any,
    user_cpf: string,
    month: number,
    year: number
  ) {
    try {
      const unpaidLectures: ILecture[] = await this.prisma.lecture.findMany({
        where: {
          user_cpf,
          payed: false,
          lesson: {
            startAt: {
              gte: new Date(year, month - 1, 1),
              lt: new Date(year, month, 1),
            },
          },
        },
        include: { lesson: true },
      });

      let totalDebt: number = 0;

      for (const lecture of unpaidLectures) {
        const lesson = await this.prisma.lesson.findUnique({
          where: {
            id: lecture.lesson_id,
          },
        });

        if (lesson) {
          totalDebt += lesson.value;
        }
      }

      return event.reply("get-debt-by-student-and-month-success", totalDebt);
    } catch (error: any) {
      return event.reply("get-debt-by-student-and-month-error", error.message);
    }
  }

  async findAllStudentsWithPhonesAndDebt(event: any) {
    try {
        const students: IStudent[] = await this.prisma.user.findMany();
        const studentsWithPhonesAndDebt: IStudentWithPhonesAndDebt[] = [];

        for (const student of students) {
            const phones: IPhone[] = await this.prisma.phone.findMany({
                where: { user_cpf: student.cpf },
            });

            const unpaidLectures: ILecture[] = await this.prisma.lecture.findMany({
                where: { user_cpf: student.cpf, payed: false },
                include: { lesson: true },
            });

            let debtAmount: number = 0;

            for (const lecture of unpaidLectures) {
                const lesson = await this.prisma.lesson.findUnique({
                    where: { id: lecture.lesson_id },
                });

                if (lesson) {
                    debtAmount += lesson.value;
                }
            }

            studentsWithPhonesAndDebt.push({
                student,
                phones,
                debtAmount,
            });
        }

        return event.reply("find-all-students-with-phones-and-debt-success", studentsWithPhonesAndDebt);
    } catch (error: any) {
        return event.reply("find-all-students-with-phones-and-debt-error", error.message);
    }
}
}

export default UserDAO;
