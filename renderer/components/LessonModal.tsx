import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { Lesson } from "../intefaces";
import Field from "./Field";
import { useState } from "react";
import { useStudentsStore } from "../store";

const SearchUser = ({ setUser }) => {
    const students = useStudentsStore((state: any) => state.students);
    const [name, setName] = useState("");
    const [filteredStudents, setFilteredStudents] = useState([]);

    const [selected, setSelected] = useState(null);

    const handleChangeName = (event) => {
        setName(event.target.value);

        const filtered = students.filter((data) => data.student.name.toLowerCase().includes(name.toLowerCase()));
        setFilteredStudents(filtered);
    }

    return (
        <div>
            <input type="search" onChange={handleChangeName}/>
            <div className="h-40 overflow-y-auto">
                {
                    filteredStudents.map((data, index) => {
                        return (
                            <div onClick={() => setSelected(data)}>
                                <p>{data.student.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default function LessonModal ({ isOpen, closeModal, lesson }) {
    let defaultValues = {};

    const [user, setUser] = useState(null);

    if (lesson) {
        defaultValues = {};
    }

    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Lesson>({ defaultValues });

    const onSubmit = (newLesson) => {
        console.log(newLesson);
    }

    return (
        <div>
            <Modal isOpen={isOpen} closeModal={closeModal} title={lesson ? "Dados da aula" : "Nova aula"}>
                <div>
                    <form className="overflow-auto h-96 p-4" onSubmit={handleSubmit(onSubmit)}>
                        <SearchUser setUser={setUser}/>
                        <Field name="startAt" control={control} rules={{ required: true }} error={ errors.startAt } label="Início da aula" type="datetime-local"/>
                        <Field name="endAt" control={control} rules={{ required: true }} error={ errors.endAt } label="Fim da aula" type="datetime-local"/>
                        <Field name="value" control={control} rules={{ required: true }} error={ errors.value } label="Valor da aula" type="number" step={5}/>
                        <div className="w-full p-2">
                            <button type="submit">{ isSubmitting ? "Enviando" :  lesson ? "Alterar": "Salvar" }</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}