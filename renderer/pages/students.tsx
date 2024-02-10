import { AlertTriangle, Check, User } from "lucide-react";
import Content from "../components/Content";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import DateService from "../../utils/DateService";
import StudentModal from "../components/StudentModal";
import { useStudentsStore } from "../store";
import { toast } from "react-hot-toast";

const handleEditUser = (data, setStudents) => {
    let { name, motherName, cpf, bornDate, gradeType, gradeYear, observation, phone1, phone2 } = data;

    bornDate = new Date(bornDate).toISOString();

    const grade = `${gradeYear} Ano ${gradeType}`;

    const studentPayload = { name, motherName, cpf, bornDate, grade, observation };

    let phonesPayload = [{ user_cpf: cpf, number: phone1 }];
    if (phone2 && phone2.length !== 0) {
        phonesPayload.push({ user_cpf: cpf, number: phone2 });
    }

    window.main.send("update-user", cpf, studentPayload);

    window.main.receive("update-user-success", (event) => {
        toast.success("Dados editados");
        window.main.send("find-all-students-with-phones-and-debt");

        window.main.receive("find-all-students-with-phones-and-debt-success", (event) => {
            setStudents(event)
            window.main.stop("find-all-students-with-phones-and-debt-success");
        });
        window.main.stop("update-user-success")
    })

    window.main.receive("update-user-error", (event) => {
        toast.error("Algo deu errado");
        window.main.stop("update-user-error");
    })
}

const FindUsers = () => {
    return (
        <div className="flex">
            <div className="px-5 flex flex-row">
                <select className="bg-darkBlue h-12 rounded-tl-md rounded-bl-md text-white font-bold text-center">
                   <option value="">Teste</option>
                </select>
                <input 
                    placeholder="oiii"
                    className="border-2 border-darkBlue h-12 p-3 w-96 rounded-tr-md rounded-br-md text-slate-700 placeholder-slate-700 font-bold shadow-xl"
                />
            </div>
            <button className="bg-darkBlue rounded-md py-2 px-4 shadow-xl">
                <h1 className="text-white text-xl font-bold">Buscar</h1>
            </button>
        </div>
    )
}

const StudentCard = ({ data }) => {

    let { student, phones, debtAmount } = data;
    const setStudents = useStudentsStore((state: any) => state.setStudents);

    const age = `${DateService.getAge(student.bornDate)} anos`;

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false)
    }

    student["phone1"] = phones[0]?.number;
    student["phone2"] = "";
    if (phones[1]) {
        student["phone2"] = phones[1].number;
    }

    const onEditUser = (data) => {
        handleEditUser(data, setStudents);
    }

    return (
        <div>
            <div className="bg-white w-4/5 h-5/6 flex rounded-md shadow-md shadow-slate-400 my-4" onClick={() => setOpen(!open)}>
                <div className={`${debtAmount !== 0 ? "bg-lightRed" : "bg-primaryBlue"} h-full w-1/12 flex items-center justify-center p-2 rounded-bl-md rounded-tl-md`}>
                    {
                        debtAmount !== 0 ?
                            <AlertTriangle color="white" size={34}/>
                        :
                            <Check color="white" size={34}/>
                    }
                </div>
                <div className="p-3 flex flex-col w-10/12">
                    <div className="bg-slate-100 shadow-md shadow-slate-400 py-2 w-11/12 px-4 rounded-md flex justify-between gap-10 items-center">
                        <div className="flex items-center gap-6 w-8/12 px-2">
                            <User size={32} color="#593FD8"/>
                            <div>
                                <h1 className="font-bold text-2xl text-darkBlue">{student.name}</h1>
                                <h2 className="font-bold text-lg text-darkBlue">Responsável: {student.motherName}</h2>
                            </div>
                        </div>
                        <div className="p-1 mx-5 bg-darkBlue flex w-4/12 justify-center rounded-sm">
                            <h1 className="text-white text-lg font-bold">{age} - {student.grade}</h1>
                        </div>
                    </div>
                    <div className="px-2 py-3">
                        <h2>Telefone(s): {phones[0] ? phones[0].number : ""} {phones[1] ? phones[1].number : ""}</h2>
                    </div>
                </div>
            </div>
                <StudentModal onSave={onEditUser} isOpen={open} closeModal={handleClose} student={student}/>
        </div>
    )
}

export default function Students () {

    const students = useStudentsStore((state: any) => state.students);
    const setStudents = useStudentsStore((state: any) => state.setStudents);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.main.send("find-all-students-with-phones-and-debt");

		window.main.receive("find-all-students-with-phones-and-debt-success", (event) => {
            setStudents(event);
            setLoading(false);
        });

		window.main.receive("find-all-students-with-phones-and-debt-error", (event) => {
            setStudents([]);
            setLoading(false);
        });

		return () => {
			window.main.stop("find-all-students-with-phones-and-debt-success");
			window.main.stop("find-all-students-with-phones-and-debt-error");
		}
    }, [])
    
	return (
		<Layout>
            <Header>
                <FindUsers/>
                <div>
                    <div className="bg-primaryBlue rounded-lg py-2 px-4 shadow-xl">
                        {
                            loading ? 
                                <p>Carregando...</p>
                            :
                                <h1 className="text-white text-xl font-bold">{students.length} Alunos cadastrados</h1>
                        }
                    </div>
                </div>
            </Header>
			<Content>
                <div className="flex h-full flex-col items-center justify-center">
                    { 
                        loading ?
                            <p>Carregando...</p>
                        :
                            <div className="flex flex-col w-11/12 overflow-y-auto">
                                {
                                    students.length === 0 ?
                                        <h2>Nenhum aluno encontrado</h2>
                                    :
                                        
                                        students.map((student, index) => {
                                            return (
                                                <StudentCard data={student} key={index}/>
                                            )
                                        })
                                }
                            </div>
                    }
				</div>
            </Content>
		</Layout>
	)
}