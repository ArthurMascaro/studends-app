import { Phone, User } from "../../intefaces";

interface AddStudentProps {
    student: User
    phones: string[]
}

function joinGrades (year: string, type: string) {
    return `${year} Ano ${type}`;
}

function splitGrades (grade: string) {
    const [gradeYear, gradeType] = grade.split(" Ano ");

    return { gradeType, gradeYear };
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

export async function addStudent ({ student, phones }: AddStudentProps) {
    const studentPayload = createStudentPayload(student);

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