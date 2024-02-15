import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "../Modal";
import { Phone, User } from "../../intefaces";
import { useForm } from "react-hook-form";
import Field from "../Field";
import Select from "../Select";
import TextArea from "../TextArea";
import { addStudent, grades, splitPhones, updateStudent, years } from "./actions";
import { toast } from "react-hot-toast";

interface StudentModalProps {
    isOpen: boolean,
    setOpen: Dispatch<SetStateAction<Boolean>>,
    student: User | null
    phones: Phone[] | null
}

export default function StudentModal ({ isOpen, setOpen, student, phones }: StudentModalProps) {

    const [action, setAction] = useState("create");

    const { control, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm<User>();

    async function onSubmit (data: User) {
        if (action === "create") {
            let result = await addStudent(data);
            if (result) {
                toast.success("Aluno cadastrado");
                handleClose();
            } else {
                toast.error("Algo deu errado");
            }
        } else if (action === "update") {
            let result = await updateStudent(data, phones);
            if (result) {
                toast.success("Dados atualizados");
                handleClose();
            } else {
                toast.error("Algo deu errado");
            }
        }
    }

    function handleClose () {
        reset();
        setOpen(false);
    }

    useEffect(() => {
        if (student) {
            let values = {...student};

            let [phone1, phone2] = splitPhones(phones);

            values["phone1"] = phone1;
            values["phone2"] = phone2;

            Object.entries(values).forEach(([key, value]) => {
                setValue(key as  keyof User, value);
            })

            setAction("update");
        }
    }, [student, setValue])

    return (
        <div>
            <Modal.Root isOpen={isOpen}>
                <Modal.Header title="Alunos" handleClose={handleClose}/>
                <Modal.Content>
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
                </Modal.Content>
            </Modal.Root>
        </div>
    )
}