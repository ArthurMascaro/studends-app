import { useState } from "react";
import Modal from "./Modal";
import { useForm, Controller } from "react-hook-form";
import { User } from "../intefaces";
import { userValidator } from "../../utils/validation"

const Field = ({ name, control, label, error, ...args }) => {
    return (
        <Controller
            rules={userValidator[name] ? userValidator[name] : {}}
            name={name}
            control={control}
            render={({ field }) => {
                return (
                    <div className="w-full p-2">
                        <h3>{label}</h3>
                        <input {...args} {...field} className="w-full"/>
                        <div>
                            {error && <span>{error.message}</span>}
                        </div>
                    </div>
                )
            }}
        />
    )
}

export default function StudentModal ({ isOpen, closeModal, student }) {

    let defaultValues = {};

    if (student) {
        const { name, motherName, bornDate, observation, cpf, gradeYear, gradeType } = student;

        defaultValues = { name, motherName, bornDate, cpf, observation, gradeYear, gradeType, phone1: "", phone2: "" }
    }


    const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<User>({ defaultValues })

    const onSubmit = (newStudent) => {
        console.log(newStudent);
    }

    return (
        <div>
            <Modal isOpen={isOpen} closeModal={closeModal} title={student ? "Dados do aluno" : "Cadastrar aluno"}>
                <div>
                    <form className="overflow-auto h-96 p-4">
                        <Field name="name" control={control} label="Nome" error={ errors.name }/>
                        <Field name="motherName" control={control} label="Nome da mãe" error={ errors.motherName }/>
                        <div className="flex gap-4">
                            <Field name="phone1" control={control} label="Telefone" error={ errors.phone1 } type="tel" placeholder="(00)0000-0000"/>
                            <Field name="phone2" control={control} label="Telefone" error={ errors.phone2 } type="tel" placeholder="(00)0000-0000"/>
                        </div>
                        
                    </form>
                </div>
            </Modal>
        </div>
    )
}