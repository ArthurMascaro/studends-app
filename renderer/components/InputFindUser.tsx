const InputFindUser = () => {
    return (
        <div className="flex">
            <div className="px-10">
                <input type="text" className="border-2 border-primaryBlue h-12 p-3 w-96 rounded-md text-slate-700 placeholder-slate-700 font-bold shadow-xl" placeholder="Nome do aluno..."/>
            </div>
            <button className="bg-primaryBlue rounded-md py-2 px-4 shadow-xl">
                <h1 className="text-white text-xl font-bold">Buscar</h1>
            </button>
        </div>
    )
}

export default InputFindUser;