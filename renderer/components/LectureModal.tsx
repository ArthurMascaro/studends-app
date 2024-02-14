import { useEffect, useState } from "react"
import Modal from "./Modal";
import { EditLecture } from "../intefaces";
import { useForm } from "react-hook-form";
import { useLessonsStore, useStudentsStore } from "../store";
import SearchStudent from "./SearchStudent";
import Field from "./Field";
import DateService from "../../utils/DateService";
import Checkbox from "./Checkbox";

export default function LectureModal ({ isOpen, closeModal, onSave, data }) {

    const { student, lesson, lecture } = data;
    const values = { startAt: DateService.toInputDatetime(lesson.startAt), endAt: DateService.toInputDatetime(lesson.endAt), value: lesson.value, payed: lecture.payed, presence: lecture.presence}

    const [user, setUser] = useState(student);

    const { control, setValue, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<EditLecture>({ defaultValues: values });

    useEffect(() => {
        if (values) {
            Object.entries(values).forEach(([key, value]) => {
                setValue(key as  keyof EditLecture, value);
            })
        }
    }, [values, setValue])

    const handleClose = () => {
        reset();
        closeModal();
    }

    const onSubmit = (data) => {
        let { startAt, endAt, value, presence, payed } = data;

        const newStudent = user;
        const newLesson = { startAt, endAt, value, id: lesson.id };
        const newLecture = { presence, payed, user_cpf: newStudent.cpf, lesson_id: newLesson.id, id: lecture.id };

        const payload = { newStudent, newLesson, newLecture };

        onSave(payload);
        handleClose();
    }

    return (
        <div>
            <Modal isOpen={isOpen} closeModal={closeModal} title="Editar aula">
                <div>
                    <form className="overflow-auto h-96 p-4" onSubmit={handleSubmit(onSubmit)}>
                        <SearchStudent setStudent={setUser} select={{student: user}}/>
                        <div className="w-full p-2">
                            <h3 className="font-bold text-lg">Aluno(a): {user?.name}</h3>
                        </div>
                        <Field name="startAt" control={control} rules={{ required: true }} error={ errors.startAt } label="Início da aula" type="datetime-local"/>
                        <Field name="endAt" control={control} rules={{ required: true }} error={ errors.endAt } label="Fim da aula" type="datetime-local"/>
                        <Field name="value" control={control} rules={{ required: true }} error={ errors.value } label="Valor da aula" type="number" step={5}/>
                        <Checkbox name="payed" control={control} error={ errors.payed } label="Aula paga?" checked={values.payed}/>
                        <Checkbox name="presence" control={control} error={ errors.presence } label="Aluno presente?" checked={values.presence}/>
                        <div className="flex w-full p-2 justify-end">
                            <button className="flex font-bold text-lg text-white px-8 py-2 rounded-md bg-darkBlue" type="submit">{ isSubmitting ? "Enviando" : "Salvar" }</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}