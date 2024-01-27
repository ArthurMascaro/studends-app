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
    startAt: Date;
    endAt: Date;
    value: number;
}

interface ILecture {
    id: string;
    student: IStudent;
    lesson: ILesson;
    payed: boolean;
    presence: boolean;
}

interface IDay {
    name: string;
    date: Date;
    lessons: ILecture[];
}

interface IWeek {
    start: Date;
    end: Date;
    totalLessons: number;
    days: IDay[];
}

