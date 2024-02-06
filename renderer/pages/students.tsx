import { AlertTriangle, Check, User } from "lucide-react";
import Content from "../components/Content";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import DateService from "../../utils/DateService";

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

const StudentCard = ({ student }) => {

    const age = `${DateService.getAge(student.bornDate)} anos`;

    return (
        <div className="bg-white w-4/5 flex rounded-md shadow-md shadow-slate-400 my-4">
            <div className={`${student.owing !== 0 ? "bg-lightRed" : "bg-primaryBlue"} h-full w-1/12 flex items-center justify-center p-2 rounded-bl-md rounded-tl-md`}>
                {
                    student.owing !== 0 ?
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
                    
                </div>
            </div>
        </div>
    )
}

export default function Students () {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.main.send("find-all-users");

		window.main.receive("find-all-users-success", (event, data) => {
            setStudents(event);
            console.log(students)
            setLoading(false);
        });

		window.main.receive("find-all-users-error", (event, error) => {
            setStudents({});
            setLoading(false);
        });

		return () => {
			window.main.stop("find-all-users-success");
			window.main.stop("find-all-users-error");
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
                                    students.map((student) => {
                                        return (
                                            <StudentCard student={student}/>
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