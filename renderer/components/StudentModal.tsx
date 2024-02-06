import { useState } from "react";
import Modal from "./Modal";
import { useForm, Controller } from "react-hook-form";
import { User } from "../intefaces";
import { userValidator } from "../../utils/validation"
import DateService from "../../utils/DateService";
import Field from "./Field";
import Select from "./Select";
import TextArea from "./TextArea";

export default function StudentModal ({ isOpen, closeModal, student }) {

    let years = [];
    for (let i = 1; i < 10; i++) {
        years.push({ value: `${i}°`, text: `${i}°` });
    }

    const grades = [
        { value: "E.F.", text: "E.F." },
        { value: "E.M.", text: "E.M." }
    ]

    let defaultValues = {};

    if (student) {
        let { name, motherName, bornDate, observation, cpf, grade } = student;

        let [gradeYear, gradeType] = grade.split(" Ano ");
        bornDate = DateService.toInputDate(bornDate);
        
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
                        <Field name="name" control={control} rules={null} label="Nome" error={ errors.name }/>
                        <Field name="motherName" control={control} rules={null} label="Nome da mãe" error={ errors.motherName }/>
                        <div className="flex gap-4">
                            <Field name="phone1" control={control} rules={null} label="Telefone" error={ errors.phone1 } type="tel" placeholder="(00)0000-0000"/>
                            <Field name="phone2" control={control} rules={null} label="Telefone" error={ errors.phone2 } type="tel" placeholder="(00)0000-0000"/>
                        </div>
                        <Field name="bornDate" control={control} rules={null} label="Data de nascimento" error={ errors.bornDate } type="date"/>
                        <Field name="cpf" control={control} rules={null} label="CPF" error={ errors.cpf } placeholder="XXX.XXX.XXX-XX" readOnly={student ? true : false}/>
                        <div className="w-full p-2">
                            <h3>Série</h3>
                            <div className="flex">
                                <Select name="gradeYear" control={control} options={years}/>
                                <h2>ano do</h2>
                                <Select name="gradeType" control={control} options={grades}/>
                            </div>
                        </div>
                        <TextArea name="observation" control={control} label="Observações" rows={4}/>
                        <div className="w-full p-2">
                            <button type="submit">{ isSubmitting ? "Enviando" :  student ? "Alterar": "Salvar" }</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}