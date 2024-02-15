import { PrismaClient } from "@prisma/client";
import { ICreateLecture, ILecture, ILesson, IStudent, ILectureWithStudentsAndValue } from "../domain/interfaces";

class LectureDAO {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(event: any, data: ICreateLecture) {
    try {
      const result = await this.prisma.lecture.create({ data });
      return event.reply("create-lecture-success", result);
    } catch (error: any) {
      return event.reply("create-lecture-error", error.message);
    }
  }

  async findById(event: any, id: string) {
    try {
      const result: ILecture | null = await this.prisma.lecture.findUnique({
        where: { id },
      });
      return event.reply("find-lecture-by-id-success", result);
    } catch (error: any) {
      return event.reply("find-lecture-by-id-error", error.message);
    }
  }

  async findAll(event: any) {
    try {
      const result: ILecture[] = await this.prisma.lecture.findMany();
      return event.reply("find-all-lectures-success", result);
    } catch (error: any) {
      return event.reply("find-all-lectures-error", error.message);
    }
  }

  async update(event: any, id: string, newData: object | any) {
    try {
      const result: ILecture = await this.prisma.lecture.update({
        where: { id },
        data: newData,
      });
      return event.reply("update-lecture-success", result);
    } catch (error: any) {
      return event.reply("update-lecture-error", error.message);
    }
  }

  async delete(event: any, id: string) {
    try {
      const result: ILecture = await this.prisma.lecture.delete({
        where: { id },
      });
      return event.reply("delete-lecture-success", result);
    } catch (error: any) {
      return event.reply("delete-lecture-error", error.message);
    }
  }

  async findLecturesByWeek(event: any) {
    try {
      const currentDate = new Date();
      const startDate = new Date(currentDate);
      startDate.setDate(startDate.getDate() - (startDate.getDay() + 6) % 7); // Domingo
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6); // Sábado
  
      const lecturesByDay: Record<string, ILecture[]> = {};
  
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + i);
        const lectures: ILecture[] = await this.prisma.lecture.findMany({
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
  
      return event.reply("find-lectures-by-week-success", lecturesByDay);
    } catch (error: any) {
      return event.reply("find-lectures-by-week-error", error.message);
    }
  }

  async findAllLecturesSortedByDate(event: any, skip: number, take: number) {
    try {
      const lectures: ILecture[] = await this.prisma.lecture.findMany({
        orderBy: {
          created_at: "desc",
        },
        skip,
        take,
      });

      return event.reply("find-all-lectures-sorted-by-date-success", lectures);
    } catch (error: any) {
      return event.reply("find-all-lectures-sorted-by-date-error", error.message);
    }
  }

  async findAllLecturesByStudentCPF(
    event: any,
    user_cpf: string,
    skip: number,
    take: number
  ) {
    try {
      const lectures: ILecture[] = await this.prisma.lecture.findMany({
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
    } catch (error: any) {
      return event.reply("find-all-lectures-by-student-cpf-error", error.message);
    }
  }

  async findAllLecturesByMonth(event: any, month: number, year: number) {
    try {
      const lectures: ILecture[] = await this.prisma.lecture.findMany({
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
    } catch (error: any) {
      return event.reply("find-lectures-by-month-error", error.message);
    }
  }

  async findAllLecturesByStudentAndMonth(
    event: any,
    user_cpf: string,
    month: number,
    year: number
  ) {
    try {
      const lectures: ILecture[] = await this.prisma.lecture.findMany({
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
    } catch (error: any) {
      return event.reply(
        "find-all-lectures-by-student-and-month-error",
        error.message
      );
    }
  }

  async getTotalProfitByMonth(event: any, month: number, year: number) {
    try {
        const profitByMonth: any[] = await this.prisma.$queryRaw`
            SELECT 
                SUM(ls.value) AS total_profit
            FROM
                lectures l
                JOIN lessons ls ON l.lesson_id = ls.id
            WHERE
                l.payed = true
                AND EXTRACT(MONTH FROM ls.start_at) = ${month};
                AND EXTRACT(YEAR FROM ls.start_at) = ${year};
        `;

        return event.reply("get-total-profit-by-month-success", profitByMonth[0].total_profit);
    } catch (error: any) {
        return event.reply("get-total-profit-by-month-error", error.message);
    }
}

async findLecturesLastTenMonths(event: any): Promise<void> {
  try {
    const currentDate = new Date();
    const tenMonthsAgo = new Date(currentDate);
    tenMonthsAgo.setMonth(tenMonthsAgo.getMonth() - 10);

    const lectures: ILecture[] = await this.prisma.lecture.findMany({
      where: {
        lesson: {
          startAt: {
            gte: tenMonthsAgo,
            lte: currentDate,
          },
        },
      },
    });

    const lecturesWithStudentsAndValue: ILectureWithStudentsAndValue[] = [];

    for (const lecture of lectures) {
      const lesson: ILesson | null = await this.prisma.lesson.findUnique({
        where: {
          id: lecture.lesson_id,
        },
      });

      if (lesson) {
        const students: IStudent[] = await this.prisma.user.findMany({
          where: {
            lectures: {
              some: {
                id: lecture.id,
              },
            },
          },
        });

        lecturesWithStudentsAndValue.push({
          lecture,
          students,
          value: lesson.value,
        });
      }
    }

    return event.reply(
      "find-lectures-last-ten-months-success",
      lecturesWithStudentsAndValue
    );
  } catch (error: any) {
    return event.reply(
      "find-lectures-last-ten-months-error",
      error.message
    );
  }
}
}

export default LectureDAO;
