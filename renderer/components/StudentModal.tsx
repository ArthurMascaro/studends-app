import { useState } from "react";
import Modal from "./Modal";
import { useForm, Controller } from "react-hook-form";
import { User } from "../intefaces";
import { userValidator } from "../../utils/validation"
import DateService from "../../utils/DateService";
import Field from "./Field";
import Select from "./Select";
import TextArea from "./TextArea";

export default function StudentModal ({ isOpen, closeModal, data }) {

    let years = [];
    for (let i = 1; i < 10; i++) {
        years.push({ value: `${i}°`, text: `${i}°` });
    }

    const grades = [
        { value: "E.F.", text: "E.F." },
        { value: "E.M.", text: "E.M." }
    ]

    let defaultValues = {};

    if (data) {
        const { student, phones, debtAmount } = data;
        let { name, motherName, bornDate, observation, cpf, grade } = data.student;

        let [gradeYear, gradeType] = grade.split(" Ano ");
        bornDate = DateService.toInputDate(bornDate);

        let newPhones = ["", ""];
        if (phones.length === 2) {
            newPhones = phones;
        } else if (phones.length === 1) {
            newPhones[0] = data.phones[0];
        }
        
        defaultValues = { name, motherName, bornDate, cpf, observation, gradeYear, gradeType, phone1: newPhones[0] , phone2: newPhones[1] }
    }


    const { control, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<User>({ defaultValues })

    const onSubmit = (newStudent) => {

        let { name, motherName, cpf, bornDate, gradeYear, gradeType, phone1, phone2, observation } = newStudent;

        bornDate = new Date(bornDate).toISOString();

        const grade = `${gradeYear} Ano ${gradeType}`;

        const studentPayload = { name, motherName, cpf, bornDate, grade, observation };

        let phonesPayload = [{ user_cpf: cpf, phone: phone1 }];
        if (phone2.length !== 0) {
            phonesPayload.push({ user_cpf: cpf, phone: phone2 })
        }
        
        if (data) {
            
        } else {
            
        }
        
    }

    const handleClose = () => {
        reset();
        closeModal()
    }

    return (
        <div>
            <Modal isOpen={isOpen} closeModal={handleClose} title={data?.student ? "Dados do aluno" : "Cadastrar aluno"}>
                <div>
                    <form className="overflow-auto h-96 p-4" onSubmit={handleSubmit(onSubmit)}>
                        <Field name="name" control={control} rules={{ required: true }} label="Nome" error={ errors.name }/>
                        <Field name="motherName" control={control} rules={{ required: true }} label="Nome da mãe" error={ errors.motherName }/>
                        <div className="flex gap-4">
                            <Field name="phone1" control={control} rules={{ required: true, pattern: /^\([1-9]{2}\)\d{4,5}-\d{4}$/ }} label="Telefone" error={ errors.phone1 } type="tel" placeholder="(00)0000-0000"/>
                            <Field name="phone2" control={control} rules={{ required: false, pattern: /^\([1-9]{2}\)\d{4,5}-\d{4}$/ }} label="Telefone" error={ errors.phone2 } type="tel" placeholder="(00)0000-0000"/>
                        </div>
                        <Field name="bornDate" control={control} rules={{ required: true }} label="Data de nascimento" error={ errors.bornDate } type="date"/>
                        <Field name="cpf" control={control} rules={{ required: true, pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}/ }} label="CPF" error={ errors.cpf } placeholder="XXX.XXX.XXX-XX" readOnly={data?.student ? true : false}/>
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
                            <button type="submit">{ isSubmitting ? "Enviando" :  data?.student ? "Alterar": "Salvar" }</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}