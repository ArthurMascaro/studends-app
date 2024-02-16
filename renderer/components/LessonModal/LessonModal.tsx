import { useForm } from "react-hook-form";
import Modal from "../Modal";
import { Lesson } from "../../intefaces";
import Field from "../Field";
import { useRef, useState } from "react";
import { useStudentsStore } from "../../store";
import SearchStudent from "../SearchStudent";

export default function LessonModal ({ isOpen, closeModal, onSave }) {

    const [user, setUser] = useState(null);

    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<Lesson>();

    const onSubmit = (data) => {
        onSave({...data, cpf: user.cpf });
        handleClose();
    }

    console.log(user)

    const handleClose = () => {
        setUser(null)
        reset()
        closeModal();
    }

    return (
        <div>
            <Modal isOpen={isOpen} closeModal={handleClose} title="Nova aula">
                <div>
                    <form className="overflow-auto h-96 p-4" onSubmit={handleSubmit(onSubmit)}>
                        <SearchStudent setStudent={setUser} select={null}/>
                        <div className="w-full p-2">
                            <h3 className="font-bold text-lg">Aluno(a): {user?.name}</h3>
                        </div>
                        <Field name="startAt" control={control} rules={{ required: true }} error={ errors.startAt } label="Início da aula" type="datetime-local"/>
                        <Field name="endAt" control={control} rules={{ required: true }} error={ errors.endAt } label="Fim da aula" type="datetime-local"/>
                        <Field name="value" control={control} rules={{ required: true }} error={ errors.value } label="Valor da aula" type="number" step={5}/>
                        <div className="flex w-full p-2 justify-end">
                            <button className="flex font-bold text-lg text-white px-8 py-2 rounded-md bg-darkBlue" type="submit">{ isSubmitting ? "Enviando" : "Salvar" }</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}