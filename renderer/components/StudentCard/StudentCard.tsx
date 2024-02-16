import { AlertTriangle, Check, User } from "lucide-react"
import { useState } from "react"
import { splitGrades, splitPhones } from "../StudentModal/actions"
import StudentModal from "../StudentModal"
import { toInputDate } from "../../../utils/date"

export function StudentCardIcon ({ debt }) {
    return (
        <div className={`${debt !== 0 ? "bg-lightRed" : "bg-primaryBlue"} h-5/5 w-1/12 flex items-center justify-center p-2 rounded-bl-md rounded-tl-md`}>
            {
                debt !== 0 ?
                    <AlertTriangle color="white" size={38}/>
                :
                    <Check color="white" size={38}/>
            }
        </div>
    )
}

export function StudentCardPhones ({ phones }) {
    return (
        <div className="flex gap-8">
            <h2 className="font-bold text-lg">Telefone: {phones[0]?.number}</h2>
            {
                phones[1] ?
                    <h2 className="font-bold text-lg">Telefone: {phones[1].number}</h2>
                :
                    <></>
            }
        </div>
    )
}

export function StudentCardHeader ({ student }) {
    return (
        <div className="flex px-4 py-2 items-center justify-between w-10/12 bg-slate-200 rounded-md shadow-slate-500 shadow-md">
            <div className="flex items-center gap-5">
                <User size={32} color="#00007F"/>
                <div>
                    <h1 className="font-bold text-2xl text-darkBlue">{student.name}</h1>
                    <h2 className="font-bold text-lg text-darkBlue">Responsável: {student.motherName}</h2>
                </div>
            </div>
            <div className="bg-darkBlue py-2 px-4 rounded-md w-1/5">
                <h1 className="text-lg text-white text-center font-bold">{student.grade}</h1>
            </div>
        </div>
    )
}

export function StudentCardDebtAlert ({ debt }) {
    return (
        <div className="h-5/5 flex items-center justify-center">
            <h1 className="text-xl font-bold ">DÍVIDA: R${debt}</h1>
        </div>
    )
}

export default function StudentCard ({ student, phones, debtAmout }) {

    const [isOpen, setOpen] = useState(false);

    let { name, motherName, bornDate, cpf, observation, grade } = student;

    const { gradeType, gradeYear } = splitGrades(grade);
    const [phone1, phone2] = splitPhones(phones);
    bornDate = toInputDate(bornDate);

    const payload = { name, motherName, bornDate, cpf, observation, gradeYear, gradeType, phone1, phone2 };

    return (
        <div>
            <div className="w-11/12 flex rounded-md shadow-md shadow-slate-500 my-8" onClick={() => setOpen(!isOpen)}>
                <StudentCardIcon debt={debtAmout}/>
                <div className="bg-white flex w-full rounded-tr-md rounded-br-md p-2">
                    <div className="flex w-10/12 flex-col">
                        <StudentCardHeader student={student}/>
                        <div className="flex px-4 items-center justify-between w-2/3 my-4">
                            <StudentCardPhones phones={phones}/>
                            {
                                debtAmout !== 0 ?
                                    <StudentCardDebtAlert debt={debtAmout}/>
                                :
                                    <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <StudentModal isOpen={isOpen} setOpen={setOpen} student={payload} phones={phones}/>
        </div>
    )
}
