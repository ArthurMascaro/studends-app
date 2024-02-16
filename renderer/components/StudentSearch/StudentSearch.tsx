import { Dispatch, SetStateAction, useState } from "react"
import { searchOptions, searchStudents } from "./actions";
import { toast } from "react-hot-toast";

interface SearchStudentsProps {
    setSearchResults: Dispatch<SetStateAction<any[]>>
    selector: boolean
}

export default function StudentSearch ({ setSearchResults, selector }: SearchStudentsProps) {

    const [selectorType, setSelectorType] = useState(searchOptions[0].value);
    const [searchParam, setSearchParam] = useState("");

    async function handleSearch () {
        if (searchParam && selectorType) {
            try {
                let data: any[] = await searchStudents(selectorType, searchParam);
                console.log(data)
                setSearchResults(data);
            } catch (error) {
                toast.error("Algo deu errado");
            }
        }
    }

    return (
        <div className="flex gap-10">
            <div className="flex">
                <div>
                    {
                        selector ?
                            <div>
                                <select onChange={(event) => setSelectorType(event.target.value)}>
                                    {
                                        searchOptions.map((option, index) => {
                                            return (
                                                <option key={index} value={option.value}>{option.label}</option>
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
                    <input type="text" value={searchParam} onChange={(event) => setSearchParam(event.target.value)}/>
                </div>
            </div>
            <div>
                <button onClick={handleSearch}>Buscar</button>
            </div>
        </div>

    )
}