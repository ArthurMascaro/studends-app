import { Module } from "module";

export interface ICreateStudent {
    cpf: string;
    name: string;
    motherName: string;
    bornDate: Date;
    grade: string;
    observation?: string;
    owing?: number;
}

export interface IStudent {
    cpf: string;
    name: string;
    motherName: string;
    bornDate: Date;
    grade: string;
    observation: string | null;
    owing: number | null;
    created_at: Date;
    updated_at: Date;
}

export interface ICreatePhone{
    id: string
    user_cpf: string
    number: string
}

export interface IPhone {
    id: string;
    number: string;
    user_cpf: string;
    created_at: Date;
    updated_at: Date;
}

export interface ILesson {
    id: string;
    date: Date;
    startAt: Date;
    endAt: Date;
    value: number;
}

export interface ILecture {
    id: string;
    student: IStudent;
    lesson: ILesson;
    payed: boolean;
    presence: boolean;
}

export interface IDay {
    name: string;
    date: Date;
    lessons: ILecture[];
}

export interface IWeek {
    start: Date;
    end: Date;
    totalLessons: number;
    days: IDay[];
}

