import { Plus } from "lucide-react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CreateUserFormData, GradeTypeEnum, GradeYearEnum } from "../intefaces";
import { useState } from "react";

const Field = ({ name, label, register, rules, error, ...args }) => {
    return (
        <div className="flex flex-col px-5 my-3">
            <label className="text-darkBlue font-bold text-lg mx-5">{label}</label>
            <input {...args} className="mx-6 p-2 border-2 border-darkBlue rounded-md bg-slate-200" {...register(name, rules)}/>
            {error && <p className="text-primaryBlue font-bold px-7">Preencha este campo</p>}
        </div>
    )
}

const StudentCard = () => {
    
}

const StudentModal = () => {

    const [open, setOpen] = useState(false);

    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<CreateUserFormData>();

    const onSubmit = (data: CreateUserFormData) => {
        const { name, motherName, phone1, phone2, bornDate, gradeYear, gradeType, cpf, observation } = data;

        const formattedBornDate = new Date(bornDate).toISOString();

        const payload = {
            name,
            motherName: motherName,
            bornDate: formattedBornDate,
            grade: `${GradeYearEnum[gradeYear]} Ano ${GradeTypeEnum[gradeType]}`,
            cpf,
            observation
        }    
        window.main.send("create-user", payload);

        window.main.receive("create-user-success", (event) => {
            console.log(event);
            console.log("ssjnscwcecevev")
            toast.success("Aluno cadastrado")
        });
        
        window.main.receive("create-user-error", (event) => {
            toast.error("Algo deu errado. Verifique os dados");
        });

        window.main.stop("create-user-success");
        window.main.stop("create-user-error");
    }
   
    let years = [];
    for (let i = 1; i < 10; i++) {
        years.push({ value: `y${i}`, text: `${i}°` });
    }

    const handleCloseModal = () => {
        reset();
        setOpen(false);
    }

    return (
        <div>
            <Modal title="Cadastrar aluno" isOpen={open} closeModal={handleCloseModal}>
                <div className="flex justify-center items-center w-full my-2 h-4/5" style={{userSelect: "none"}}>
                    <form className="overflow-auto h-96" onSubmit={handleSubmit(onSubmit)}>
                        <Field name="name" register={register} rules={{required: true}} label="Nome" error={errors.name}/>
                        <Field name="motherName" register={register} rules={{required: true}} label="Nome da mãe" error={errors.motherName}/>
                        <div className="flex flex-col px-5 my-3">
                            <label className="text-darkBlue font-bold text-lg mx-5">Telefone(s)</label>
                            <div className="flex w-full ">
                                <input placeholder="(00)0000-0000" className="mx-6 w-full p-2 border-2 border-darkBlue rounded-md bg-slate-200" type="tel" {...register("phone1", { required: true, pattern: /^\([1-9]{2}\)\d{4,5}-\d{4}$/ })}/>
                                <input placeholder="(00)0000-0000" className="mx-6 w-full p-2 border-2 border-darkBlue rounded-md bg-slate-200" type="tel" {...register("phone2", { required: false, pattern: /^\([1-9]{2}\)\d{4,5}-\d{4}$/ })}/>
                            </div>
                            {errors.phone1 && <p className="text-primaryBlue font-bold px-7">Preencha este campo</p>}
                        </div>
                        <Field name="bornDate" register={register} rules={{required: true}} label="Data de nascimento" error={errors.bornDate} type="date"/>
                        <div className="flex flex-col px-5 my-3">
                            <label className="text-darkBlue font-bold text-lg mx-5">Série</label>
                            <div className="flex items-center w-fit mx-6 border-2 border-darkBlue rounded-md">
                                <select className="p-2 font-bold text-darkBlue bg-slate-200 rounded-md" {...register("gradeYear", { required: true })}>
                                    {
                                        years.map((year) => {
                                            return (
                                                <option className="font-bold text-darkBlue" key={year.value} value={year.value}>{year.text}</option>
                                            )
                                        })
                                    }
                                </select>
                                <p className="mx-3 font-bold text-darkBlue">Ano do</p>
                                <select className="p-2 font-bold text-darkBlue bg-slate-200 rounded-md" {...register("gradeType", { required: true })}>
                                    <option className="font-bold text-darkBlue" value="EF">E.F.</option>
                                    <option className="font-bold text-darkBlue" value="EM">E.M.</option>
                                </select>
                            </div>
                        </div>
                        <Field name="cpf" label="CPF" register={register} rules={{required: true, pattern: /^\d{3}\.\d{3}\.\d{3}\-\d{2}/}} error={errors.cpf} placeholder="XXX.XXX.XXX-XX" />
                        <div className="flex flex-col px-5 my-3">
                            <label className="text-darkBlue font-bold text-lg mx-5">Observações</label>
                            <textarea className="mx-6 p-2 border-2 border-darkBlue rounded-md bg-slate-200" {...register("observation", { required: false })} rows={4}></textarea>
                        </div>
                        <div className="flex justify-end px-4 my-5">
                            <button className="mx-10 bg-primaryBlue px-8 py-2 rounded-md text-white font-bold text-lg" type="submit">{isSubmitting ? "Salvando..." : "Salvar"}</button>
                        </div>
                    </form>
                </div>
            </Modal>
            <div onClick={() => setOpen(!open)}>
                <div className="p-2 w-full bg-lightRed rounded-md shadow-sm shadow-slate-700">
                    <Plus color="white" size={36}/>
                </div>
            </div>
        </div>
    )
}

export default StudentModal;