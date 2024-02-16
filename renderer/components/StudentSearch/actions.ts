import { sendEvent } from "../../../utils/api"

export async function searchStudents (type: string, searchParam: string) {
    try {
        const data: any = await sendEvent(`find-users-${type}`, searchParam);
        return data;
    } catch (error) {
        throw new Error(error);
    }
}

export const searchOptions = {
    "by-name": "nome" ,
    "by-mother-name": "nome da mãe",
}
