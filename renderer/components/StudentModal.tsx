import { useEffect } from "react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { User } from "../intefaces";
import DateService from "../../utils/DateService";
import Field from "./Field";
import Select from "./Select";
import TextArea from "./TextArea";

export default function StudentModal ({ isOpen, closeModal, onSave, student }) {
    const { control, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<User>();

    const handleClose = () => {
        reset();
        closeModal();
    }

    const onSubmit = (data) => {
        onSave(data);
        handleClose();
    }

    useEffect(() => {
        if (student) {
            let { name, motherName, bornDate, cpf, phone1, phone2, observation, grade } = student;

            let [gradeYear, gradeType] = grade.split(" Ano ")
            
            bornDate = DateService.toInputDate(bornDate);

            const defaultValues = { name, motherName, cpf, bornDate, phone1, phone2, gradeType, gradeYear, observation };

            Object.entries(defaultValues).forEach(([key, value]) => {
                setValue(key as  keyof User, value);
            })
        }
    }, [student, setValue])

    let years = [];
    for (let i = 1; i < 10; i++) {
        years.push({ value: `${i}°`, text: `${i}°` });
    }

    const grades = [
        { value: "E.F.", text: "E.F." },
        { value: "E.M.", text: "E.M." }
    ]
    
    return (
        <div>
            <Modal isOpen={isOpen} closeModal={handleClose} title={student ? "Dados do aluno" : "Cadastrar aluno"}>
                <div>
                    <form className="overflow-auto h-96 p-4" onSubmit={handleSubmit(onSubmit)}>
                        <Field name="name" control={control} rules={{ required: true }} label="Nome" error={ errors.name }/>
                        <Field name="motherName" control={control} rules={{ required: true }} label="Nome da mãe" error={ errors.motherName }/>
                        <div className="flex gap-4">
                            <Field name="phone1" control={control} rules={{ required: true, pattern: /^\([1-9]{2}\)\d{4,5}-\d{4}$/ }} label="Telefone" error={ errors.phone1 } type="tel" placeholder="(00)0000-0000"/>
                            <Field name="phone2" control={control} rules={{ required: false, pattern: /^\([1-9]{2}\)\d{4,5}-\d{4}$/ }} label="Telefone" error={ errors.phone2 } type="tel" placeholder="(00)0000-0000"/>
                        </div>
                        <Field name="bornDate" control={control} rules={{ required: true }} label="Data de nascimento" error={ errors.bornDate } type="date"/>
                        <Field name="cpf" control={control} rules={{ required: true, pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}/ }} label="CPF" error={ errors.cpf } placeholder="XXX.XXX.XXX-XX" readOnly={student ? true : false}/>
                        <div className="w-full p-2">
                            <h3 className="font-bold text-lg">Série</h3>
                            <div className="flex items-center">
                                <Select name="gradeYear" control={control} options={years} className="p-1 m-2 text-center font-bold"/>
                                <h2 className="font-bold">ano do</h2>
                                <Select name="gradeType" control={control} options={grades} className="p-1 m-2 text-center font-bold"/>
                            </div>
                        </div>
                        <TextArea name="observation" control={control} label="Observações" rows={4}/>
                        <div className="flex w-full p-2 justify-end">
                            <button type="submit" className="flex font-bold text-lg text-white px-8 py-2 rounded-md bg-darkBlue">{ isSubmitting ? "Enviando" :  student ? "Alterar": "Salvar" }</button>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}