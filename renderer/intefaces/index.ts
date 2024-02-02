export enum GradeYearEnum {
    y1 = "1°",
    y2 = "2°",
    y3 = "3°",
    y4 = "4°",
    y5 = "5°",
    y6 = "6°",
    y7 = "7°",
    y8 = "8°",
    y9 = "9°"
}

export enum GradeTypeEnum {
    EM = "E.M.",
    EF = "E.F."
}

export interface CreateUserFormData {
    name: string,
    motherName: string,
    phone1: string,
    phone2: string | any,
    bornDate: string,
    gradeYear: GradeYearEnum,
    gradeType: GradeTypeEnum,
    cpf: string,
    observation: string
}
export interface UpdateUserFormData {
    id: string,
    name: string,
    motherName: string,
    phone1: string,
    phone2: string | any,
    bornDate: string,
    gradeYear: GradeYearEnum,
    gradeType: GradeTypeEnum,
    cpf: string,
    observation: string
}