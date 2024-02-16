import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { searchOptions, searchStudents } from "./actions";
import { toast } from "react-hot-toast";
import { sendEvent } from "../../../utils/api";

interface SearchStudentsProps {
    setSearchResults: Dispatch<SetStateAction<any[]>>
    selector: boolean
}

export default function StudentSearch ({ setSearchResults, selector }: SearchStudentsProps) {

    const [selectorType, setSelectorType] = useState("by-name");
    const [searchParam, setSearchParam] = useState("");

    useEffect(() => {
        async function fetch () {
            if (searchParam && selectorType) {
                if (searchParam.trim().length !== 0) {
                    try {
                        let data: any[] = await searchStudents(selectorType, searchParam);
                        setSearchResults(data);
                    } catch (error) {
                        toast.error("Algo deu errado");
                    }
                } 
            } else {
                try {
                    let data: any = await sendEvent("find-all-students-with-phones-and-debt");
                    setSearchResults(data);
                } catch (error) {
                    toast.error("Algo deu errado");
                }
            }
        }

        fetch();
    }, [searchParam])
    
    return (
        <div className="flex gap-10">
            <div className="flex">
                <div>
                    {
                        selector ?
                            <div>
                                <select onChange={(event) => setSelectorType(event.target.value)}>
                                    {
                                        Object.keys(searchOptions).map((key, index) => {
                                            return (
                                                <option key={index} value={key}>{searchOptions[key]}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        :
                            <></>
                    }
                </div>
                <div>
                    <input type="text" placeholder={`Buscar alunos pelo ${searchOptions[selectorType]}`} onChange={(event) => setSearchParam(event.target.value)}/>
                </div>
            </div>
        </div>

    )
}