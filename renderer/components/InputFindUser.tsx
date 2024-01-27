import { useState } from "react";

enum QueryTypeEnum {
    name = "por nome",
    phone = "por telefone",
    mother = "pelo nome da mãe",
    owing = "em dívida"
}

enum InputTypeEnum {
    name = "text",
    phone = "tel",
    mother = "text",
    owing = "text"
}

const InputFindUser = () => {

    const queries = ["name", "phone", "mother", "owing"];

    const [query, setQuery] = useState(queries[0]);

    const handleSearchUser = () => {
        console.log(`get-user-by-${query}`)
    }

    return (
        <div className="flex">
            <div className="px-5 flex flex-row">
                <select value={query} onChange={(event) => setQuery(event.target.value)} className="bg-primaryBlue h-12 rounded-tl-md rounded-bl-md text-white font-bold text-center">
                    {
                        queries.map((query) => {
                            return (
                                <option key={query} className="font-bold" value={query}>{QueryTypeEnum[query]}</option>
                            )
                        })
                    }
                </select>
                <input 
                    placeholder={`Buscar aluno(s) ${QueryTypeEnum[query]}`} 
                    readOnly={query === "owing" ? true : false} 
                    type={InputTypeEnum[query]} 
                    className="border-2 border-primaryBlue h-12 p-3 w-96 rounded-tr-md rounded-br-md text-slate-700 placeholder-slate-700 font-bold shadow-xl"
                />
            </div>
            <button className="bg-primaryBlue rounded-md py-2 px-4 shadow-xl" onClick={handleSearchUser}>
                <h1 className="text-white text-xl font-bold">Buscar</h1>
            </button>
        </div>
    )
}

export default InputFindUser;