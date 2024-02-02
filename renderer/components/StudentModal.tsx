import { Plus } from "lucide-react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CreateUserFormData, GradeTypeEnum, GradeYearEnum } from "../intefaces";

const ModalTriggerButton = () => {
    return (
        <div>
            <div className="p-2 w-full bg-lightRed rounded-md shadow-sm shadow-black">
                <Plus color="white" size={36}/>
            </div>
        </div>
    )
}


const StudentModal = () => {

    const handleSuccess = (event, data) => { 
        toast.success("Aluno cadastrado!");
        reset();
    };

    const handleError = (event, data) => toast.error("Aluno cadastrado!");

    const { register, handleSubmit, formState: { errors }, reset } = useForm<CreateUserFormData>();

    const onSubmit = (data: CreateUserFormData) => {
        const { student, mother, phone1, phone2, bornDate, gradeYear, gradeType, cpf, obs } = data;

        const formattedBornDate = new Date(bornDate).toISOString();

        const payload = {
            name: student,
            motherName: mother,
            bornDate: formattedBornDate,
            grade: `${GradeYearEnum[gradeYear]} Ano ${GradeTypeEnum[gradeType]}`,
            cpf,
            observation: obs
        }    
        window.main.send("create-user", payload);

        window.main.receive("create-user-success", handleSuccess);
        window.main.stop("create-user-success", handleSuccess);

        window.main.receive("create-user-error", handleError);
        window.main.stop("create-user-error", handleError);
    }
   
    let years = [];
    for (let i = 1; i < 10; i++) {
        years.push({ value: `y${i}`, text: `${i}°` });
    }

    return (
        <Modal trigger={<ModalTriggerButton/>} action={reset} title="Cadastrar aluno">
            <div className="flex justify-center items-center w-full my-2 h-4/5" style={{userSelect: "none"}}>
                <form className="overflow-auto h-96" onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col px-5 my-3">
                        <label className="text-darkBlue font-bold text-lg mx-5">Nome:</label>
                        <input className="mx-6 p-2 border-2 border-darkBlue rounded-md bg-slate-200" {...register("student", { required: true })}/>
                        {errors.student && <p className="text-primaryBlue font-bold px-7">Preencha este campo</p>}
                    </div>
                    <div className="flex flex-col px-5 my-3">
                        <label className="text-darkBlue font-bold text-lg mx-5">Nome da mãe:</label>
                        <input className="mx-6 p-2 border-2 border-darkBlue rounded-md bg-slate-200" {...register("mother", { required: true })}/>
                        {errors.mother && <p className="text-primaryBlue font-bold px-7">Preencha este campo</p>}
                    </div>
                    <div className="flex flex-col px-5 my-3">
                        <label className="text-darkBlue font-bold text-lg mx-5">Telefone(s):</label>
                        <div className="flex w-full ">
                            <input className="mx-6 w-full p-2 border-2 border-darkBlue rounded-md bg-slate-200" type="tel" {...register("phone1", { required: true })}/>
                            <input className="mx-6 w-full p-2 border-2 border-darkBlue rounded-md bg-slate-200" type="tel" {...register("phone2", { required: false })}/>
                        </div>
                        {errors.phone1 && <p className="text-primaryBlue font-bold px-7">Preencha este campo</p>}
                    </div>
                    <div className="flex flex-col px-5 my-3">
                        <label className="text-darkBlue font-bold text-lg mx-5">Data de nascimento:</label>
                        <input className="mx-6 p-2 border-2 border-darkBlue rounded-md bg-slate-200" type="date" {...register("bornDate", { required: true })}/>
                        {errors.bornDate && <p className="text-primaryBlue font-bold px-7">Preencha este campo</p>}
                    </div>
                    <div className="flex flex-col px-5 my-3">
                        <label className="text-darkBlue font-bold text-lg mx-5">Série:</label>
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
                    <div className="flex flex-col px-5 my-3">
                        <label className="text-darkBlue font-bold text-lg mx-5">CPF:</label>
                        <input className="mx-6 p-2 border-2 border-darkBlue rounded-md bg-slate-200" {...register("cpf", { required: true })}/>
                        {errors.cpf && <p className="text-primaryBlue font-bold px-7">Preencha este campo</p>}
                    </div>
                    <div className="flex flex-col px-5 my-3">
                        <label className="text-darkBlue font-bold text-lg mx-5">Observações:</label>
                        <textarea className="mx-6 p-2 border-2 border-darkBlue rounded-md bg-slate-200" {...register("obs", { required: false })} rows={4}></textarea>
                    </div>
                    <div className="flex justify-end px-4 my-5">
                        <button className="mx-10 bg-primaryBlue px-8 py-2 rounded-md text-white font-bold text-lg" type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default StudentModal;