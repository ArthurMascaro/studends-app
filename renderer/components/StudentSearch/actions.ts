import { sendEvent } from "../../../utils/api"

export async function searchStudents (type: string, searchParam: string) {
    try {
        const data: any = await sendEvent(`find-users-${type}`, searchParam);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
        return[];
    }
}

export const searchOptions = [
    { value: "by-name", label: "por nome" },
    { value: "by-mother-name", label: "por nome da mãe"},
]
