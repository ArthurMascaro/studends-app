export interface User {
    name: string,
    motherName: string,
    phone1: string,
    phone2: string | any,
    bornDate: string,
    gradeYear: string,
    gradeType: string,
    cpf: string,
    observation: string
}

export interface Lesson {
    startAt: Date;
    endAt: Date;
    value: number;
}
