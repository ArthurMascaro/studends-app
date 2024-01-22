import { Plus } from "lucide-react";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

const ModalTriggerButton = () => {
    return (
        <div>
            <div className="flex flex-row gap-4 py-3 px-2 w-full bg-lightRed items-center rounded-md shadow-lg">
                <Plus color="white"/>
                <h1 className="text-md font-bold text-white" style={{userSelect: "none"}}>Novo Aluno</h1>
            </div>
        </div>
    )
}

enum GradeYearEnum {
    y1 = "1°",
    y2 = "2°",
    y3 = "3°",
    y4 = "4°",
    y5 = "5°",
    y6 = "6°",
    y7 = "7°",
    y8 = "8°",
    y9 = "9°"
}

enum GradeTypeEnum {
    EM = "E.M.",
    EF = "E.F."
}

interface FormData {
    student: String,
    mother: String,
    phone1: String,
    phone2: String | any,
    bornDate: Date | String,
    gradeYear: GradeYearEnum,
    gradeType: GradeTypeEnum,
    cpf: String,
    obs: String
}

const StudentModal = () => {

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const onSubmit = (data: FormData) => {
        reset();

        const { student, mother, phone1, phone2, bornDate, gradeYear, gradeType, cpf, obs } = data;

        const payload = {
            student,
            mother,
            phones: phone2 ? [phone1, phone2] : [phone1],
            bornDate,
            grade: `${GradeYearEnum[gradeYear]} Ano ${GradeTypeEnum[gradeType]}`,
            cpf,
            obs
        }

        console.log(payload);
    }

    let years = [];
    for (let i = 1; i < 10; i++) {
        years.push({ value: `y${i}`, text: `${i}°` });
    }

    return (
        <Modal trigger={<ModalTriggerButton/>} action={reset}>
            <div className="justify-center items-center w-full bg-red-400 my-2" style={{userSelect: "none"}}>
                <h1>Adicionar aluno</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Nome:</label>
                        <input {...register("student", { required: true })}/>
                        {errors.student && "Preencha esse campo"}
                    </div>
                    <div>
                        <label>Nome da maẽ:</label>
                        <input {...register("mother", { required: true })}/>
                    </div>
                    <div>
                        <label>Telefone(s):</label>
                        <input type="tel" {...register("phone1", { required: true })}/>
                        <input type="tel" {...register("phone2", { required: false })}/>
                    </div>
                    <div>
                        <label>Data de nascimento:</label>
                        <input type="date" {...register("bornDate", { required: true })}/>
                    </div>
                    <div>
                        <label>Série:</label>
                        <div>
                            <select {...register("gradeYear", { required: true })}>
                                {
                                    years.map((year) => {
                                        return (
                                            <option value={year.value}>{year.text}</option>
                                        )
                                    })
                                }
                            </select>
                            <p>Ano do</p>
                            <select {...register("gradeType", { required: true })}>
                                <option value="EF">E.F.</option>
                                <option value="EM">E.M.</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label>CPF:</label>
                        <input {...register("cpf", { required: true })}/>
                    </div>
                    <div>
                        <label>Observações:</label>
                        <textarea {...register("obs", { required: false })} rows={4}></textarea>
                    </div>
                    <div>
                        <button type="submit">Salvar</button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default StudentModal;