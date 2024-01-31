export interface ICreateStudent {
    cpf: string;
    name: string;
    motherName: string;
    bornDate: Date;
    grade: string;
    observation?: string;
}

export interface IStudent {
    cpf: string;
    name: string;
    motherName: string;
    bornDate: Date;
    grade: string;
    observation: string | null;
    created_at: Date;
    updated_at: Date;
}

export interface ICreatePhone{
    user_cpf: string
    number: string
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

export interface ICreateLesson {
    startAt: Date;
    endAt: Date;
    value: number;
}

export interface ILesson {
    id: string;
    startAt: Date;
    endAt: Date;
    value: number;
}

export interface ICreateLecture {
    user_cpf: string;
    lesson_id: string;
    payed: boolean;
    presence: boolean;
}

export interface ILecture {
    id: string;
    user_cpf: string;
    lesson_id: string;
    payed: boolean;
    presence: boolean;
}

