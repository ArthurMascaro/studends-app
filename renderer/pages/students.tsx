import { AlertTriangle, Check, User } from "lucide-react";
import { Layout } from "../components/Layout";
import { useEffect, useState } from "react";
import StudentModal from "../components/StudentModal";
import StudentSearch from "../components/StudentSearch/StudentSearch";


/*
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

    const onEditUser = (data, phones) => {
        handleEditUser(data, phones, setStudents);
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
                    <div className="flex px-2 py-3 gap-10 items-center">
                        <div className="flex gap-6">
                            <h2 className="font-bold text-darkBlue">Telefone: {phones[0]?.number}</h2>
                            {
                                phones[1] ?
                                    <h2 className="font-bold text-darkBlue">Telefone: {phones[1]?.number}</h2>
                                :
                                    <></>
                            }
                        </div>
                        {
                                debtAmount > 0 ?
                                    <div>
                                        <h1 className="font-bold text-xl text-slate-900">Em dívida: R$ {debtAmount}</h1>
                                    </div>
                                :
                                    <></>
                            }
                    </div>
                    
                </div>
            </div>
                <StudentModal  isOpen={open} setOpen={setOpen} phones={phones} student={student}/>
        </div>
    )
}*/

export default function Students () {

    const [loading, setLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [selected, setSelected] = useState([]);

	return (
		<Layout.Root>
            <Layout.Header>
                <StudentSearch setSearchResults={setSelected} selector/>
                <div>
                        <button onClick={() => setOpen(true)}>clica</button>
                        <StudentModal isOpen={isOpen} setOpen={setOpen} student={null} phones={null}/>
                    </div>
                <div className="flex">
                    <div className="bg-primaryBlue rounded-lg py-2 px-4 shadow-xl">
                        {
                            loading ? 
                                <p>Carregando...</p>
                            :
                                <h1 className="text-white text-xl font-bold">{students?.length} Alunos cadastrados</h1>
                        }
                    </div>
                </div>
            </Layout.Header>
			<Layout.Content>
                <div>
                    <h1>Conteúdo</h1>
                </div>
            </Layout.Content>
		</Layout.Root>
	)
}