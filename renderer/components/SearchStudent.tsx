import { useStudentsStore } from "../store";
import { useRef, useState } from "react";


export default function SearchStudent ({ setStudent, select }) {

    const students = useStudentsStore((state: any) => state.students);
    const [results, setResults] = useState(null);
    const [selected, setSelected] = useState(select);

    const input = useRef(null)

    const handleChange = () => {
        let value = input.current.value.trim().toLowerCase();

        if (value.length !== 0) {
            setResults(students.filter((data) => data.student.name.toLowerCase().includes(value)));
        } else {
            setResults(null);
        }

    }
    
    const handleSelect = (data) => {
        if (data.student.cpf === selected?.student.cpf) {
            setSelected(null);
            setStudent(null);
        } else {
            setSelected(data);
            setStudent(data);
            setResults(null);
            input.current.value = "";
            setStudent(data.student)
        }
    }

    return (
        <div className="p-2 w-full">
            <div>
                <input className="w-full" ref={input} type="text" onChange={handleChange} />
            </div>
            <div className="h-24 overflow-y-auto p-2">
                {
                    !results ? 
                        <p>Comece a buscar...</p>
                    :
                        results.length === 0 ?
                            <p>Nada encontrado</p>
                        :
                            results.map((result) => {
                                return (
                                    <div className={`${result.student.cpf === selected?.student.cpf ? "bg-emerald-500" : "bg-white"} m-1 p-1`} onClick={() => handleSelect(result)}>
                                        <h2 className="font-bold">{result.student.name}</h2>
                                    </div>
                                )
                            })
                }
            </div>
        </div>
    )
}