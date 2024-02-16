import { useForm } from "react-hook-form";
import { Modal } from "../Modal";
import { Lesson } from "../../intefaces";
import Field from "../Field";
import { useState } from "react";
import StudentSearch from "../StudentSearch/StudentSearch";


export default function LessonModal ({ isOpen, setOpen }) {
    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Lesson>();

    const [studentsData, setStudenstData] = useState(null);
    const [selectedStudentData, setSelectedStudentData] = useState(null)

    async function onSubmit (data: Lesson) {
        console.log(data);
    }

    return (
        <Modal.Root isOpen={isOpen}>
            <Modal.Header title="Adicionar aulas" handleClose={() => setOpen(false)}/>
            <Modal.Content>
                <div>
                    <StudentSearch setSearchResults={setStudenstData} selector={false}/>
                    <div>
                        
                    </div>
                </div>
                <form className="overflow-auto h-96 p-4" onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full p-2">
                        <h3 className="font-bold text-lg">Aluno(a): {selectedStudentData?.student.name}</h3>
                    </div>
                    <Field name="startAt" control={control} rules={{ required: true }} error={ errors.startAt } label="Início da aula" type="datetime-local"/>
                    <Field name="endAt" control={control} rules={{ required: true }} error={ errors.endAt } label="Fim da aula" type="datetime-local"/>
                    <Field name="value" control={control} rules={{ required: true }} error={ errors.value } label="Valor da aula" type="number" step={5}/>
                    <div className="flex w-full p-2 justify-end">
                        <button className="flex font-bold text-lg text-white px-8 py-2 rounded-md bg-darkBlue" type="submit">{ isSubmitting ? "Enviando" : "Salvar" }</button>
                    </div>
                </form>
            </Modal.Content>
        </Modal.Root>
    )
}