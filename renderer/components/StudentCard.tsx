import { AlertTriangle, Check, User } from "lucide-react";

const StudentCard = ({ student }) => {

    const age = "16 anos";

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
                            <h2 className="font-bold text-lg text-darkBlue">Responsável: {student.mother}</h2>
                        </div>
                    </div>
                    <div className="p-1 mx-5 bg-darkBlue flex w-4/12 justify-center rounded-sm">
                        <h1 className="text-white text-lg font-bold">{age} - {student.grade}</h1>
                    </div>
                </div>
                <div className="px-2 py-3">
                    <h2 className="text-lg font-bold text-slate-700">Telefone(s): {student.phones.join(" e ")}</h2>
                </div>
            </div>
        </div>
    )
}

export default StudentCard;