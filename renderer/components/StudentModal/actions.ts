import { Phone, User } from "../../intefaces";

interface AddStudentProps {
    student: User
    phones: string[]
}

export const grades = [{ value: "E.F.", text: "E.F." }, { value: "E.M.", text: "E.M." }];

export const years = Array.from({ length: 10 }, (_, i) => ({ value: `${i}°`, text: `${i}°` }));

function joinGrades (year: string, type: string) {
    return `${year} Ano ${type}`;
}

function splitGrades (grade: string) {
    const [gradeYear, gradeType] = grade.split(" Ano ");

    return { gradeType, gradeYear };
}

export function splitPhones (phones: Phone[]) {
    let result = ["", ""];

    for (let i =0; i < 2; i++) {
        if (phones[i] && phones[i].number) {
            result[i] = phones[i].number;
        }
    }

    return result;
}

function createStudentPayload (student: User) {
    let { name, motherName, bornDate, cpf, observation, gradeYear, gradeType } = student;

    const birthday = new Date(bornDate).toISOString();

    const grade = joinGrades(gradeYear, gradeType);

    return { name, motherName, bornDate: birthday, cpf, grade, observation};
}

async function addPhones (phones: Phone[]) {
    try {
        return true;
    } catch {
        return false;
    }
}

export async function addStudent (student: User) {
    const studentPayload = createStudentPayload(student);

    const phones = [student.phone1, student.phone2];
    const phonesPayload = [];
    
    phones.forEach(phone => {
        if (phone.trim().length !== 0) {
            phonesPayload.push({ number: phone, user_cpf: student.cpf });
        }
    })

    try {
        return true;
    } catch {
        return false;
    }
}