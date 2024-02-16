import { Lesson, User } from "../../intefaces";

export function addLesson (lesson: Lesson, student: User) {

}

/**
 * const handleAddLesson = async (data, setLessons, setLectures) => {
    let { cpf, startAt, endAt, value } = data;

    startAt = new Date(startAt).toISOString();
    endAt = new Date(endAt).toISOString();
    value = parseFloat(value);

    const payed = false;
    const presence = false;

    try {
        let lesson = null;
        lesson = await sendEvent("create-lesson", { startAt, endAt, value }) ;
        if (lesson) {
            let id = lesson.id;
            try {
                await sendEvent("create-lecture", { user_cpf: cpf, lesson_id: id, payed, presence });
                toast.success("Aula criada");
                fetchData(null, null, setLessons, setLectures);
            } catch (error) {
                toast.error("Algo deu errado");
            }
        } 
    } catch (error) {
        toast.error("Algo deu errado");
    }
}

const handleEditLecture = async (data, setLessons, setLectures) => {
    let { newLesson, newLecture } = data;

    newLesson.startAt = new Date(newLesson.startAt).toISOString();
    newLesson.endAt = new Date(newLesson.endAt).toISOString();

    try {
        await sendEvent("update-lesson", newLesson.id, newLesson);
        try {
            await sendEvent("update-lecture", newLecture.id, newLecture);
            toast.success("Dados alterados");
            fetchData(null, null, setLessons, setLectures);
        } catch (error) {
            toast.error("Algo deu errado");
        }
    } catch (error) {
        toast.error("Algo deu errado");
    }
}
 */