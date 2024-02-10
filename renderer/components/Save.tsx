import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { Lesson } from "../intefaces";
import Field from "./Field";
import { useRef, useState } from "react";
import { useStudentsStore } from "../store";

const SearchUser = ({ setUser }) => {
    const students = useStudentsStore((state: any) => state.students);
    const [filteredStudents, setFilteredStudents] = useState([]);

    const nameRef = useRef()

    const [selected, setSelected] = useState(null);

    const handleChangeName = (event) => {
        let name = event.target.value;

        if (name.trim().length === 0) {
            setFilteredStudents([]);
        } else {    
            const filtered = students.filter((data) => data.student.name.toLowerCase().includes(name.toLowerCase()));
            setFilteredStudents(filtered);
        }
    }

    const handleSelect = (data) => {
        if (data.student.cpf === selected?.student.cpf) {
            setSelected(null)
            setUser(null)
        } else {
            setSelected(data)
            setUser(data.student)
        }
        nameRef.current.value = "";
        setFilteredStudents([])
    }

    return (
        <div className="p-2 w-full">
            <h3 className="font-bold text-lg">Buscar aluno</h3>
            <input ref={nameRef} type="search" className="w-full p-2 font-bold border-2 border-darkBlue rounded-md" onChange={handleChangeName} placeholder="Nome do aluno..."/>
            <div className={`${filteredStudents.length !== 0 ? "h-40" : "h-10"} overflow-y-auto p-3`}>
                {
                    nameRef.current?.value === "" ?
                        <></>
                    :
                        filteredStudents.length === 0 ?
                            <h3>Nenhum aluno encontrado</h3>
                        :
                            <div itemType="square">
                                {
                                    filteredStudents.map((data, index) => {
                                        return (
                                            <div key={index} className={`p-1 ${data.student.cpf === selected?.student.cpf ? "bg-emerald-400" : ""}`} onClick={() => handleSelect(data)}>
                                                <p className="font-bold">{data.student.name}</p>    
                                            </div>
                                        )
                                    })
                                }
                            </div>
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
        if (user) {
            console.log(newLesson, user.cpf);
            window.main.send("create-lesson", newLesson);

            window.main.receive("create-lesson-success", event => {
                console.log(event)
                console.log("edwfwqfwq")
                window.main.stop("create-lesson-success")
            })

            window.main.receive("create-lesson-error", event => {
                console.log(event)
                console.log("error")
                window.main.stop("create-lesson-error")
            })
        }
    }

    const handleClose = () => {
        setUser(null)
        reset()
        closeModal();
    }

    return (
        <div>
            <Modal isOpen={isOpen} closeModal={handleClose} title={lesson ? "Dados da aula" : "Nova aula"}>
                <div>
                    <form className="overflow-auto h-96 p-4" onSubmit={handleSubmit(onSubmit)}>
                        <SearchUser setUser={setUser}/>
                        <div className="w-full p-2">
                            <h3 className="font-bold text-lg">Aluno(a): <span className="text-primaryBlue underline">{user?.name}</span></h3>
                        </div>
                        <Field name="startAt" control={control} rules={{ required: true }} error={ errors.startAt } label="Início da aula" type="datetime-local"/>
                        <Field name="endAt" control={control} rules={{ required: true }} error={ errors.endAt } label="Fim da aula" type="datetime-local"/>
                        <Field name="value" control={control} rules={{ required: true }} error={ errors.value } label="Valor da aula" type="number" step={5}/>
                        <div className="flex w-full p-2 justify-end">
                            <button className="flex font-bold text-lg text-white px-8 py-2 rounded-md bg-darkBlue" type="submit">{ isSubmitting ? "Enviando" :  lesson ? "Alterar": "Salvar" }</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}