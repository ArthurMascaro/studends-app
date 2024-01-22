interface IStudent {
    cpf: string;
    name: string;
    motherName: string;
    phones: string[];
    bornDate: Date;
    grade: string;
    observation?: string;
    owing?: number;
}

interface ILesson {
    id: string;
    date: Date;
    startTime: Date;
    endTime: Date;
    value: number;
}

interface ILessonStudent {
    id: string;
    student: IStudent;
    lesson: ILesson;
    payed: boolean;
    presente: boolean;
}

interface IDay {
    name: string;
    date: Date;
    lessons: ILessonStudent[];
}

interface IWeek {
    start: Date;
    end: Date;
    totalLessons: number;
    days: IDay[];
}

