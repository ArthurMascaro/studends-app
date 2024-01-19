
const StudentCard = ({ student }) => {

    const age = "16 anos";

    return (
        <div className={`flex w-3/5 ${student.owing !== 0 ? "bg-lightRed" : "bg-lightGreen"} p-4 rounded-md flex-col my-8 shadow-2xl`}>
            <div className="flex w-4/5 bg-white rounded-md px-5 items-center justify-between">
                <div className="px-4 flex items-center">
                    <div className="w-14 h-14 bg-black"></div>
                    <div className="px-10">
                        <h1 className="text-2xl text-darkBlue font-bold my-1">{student.name}</h1>
                        <h2 className="text-darkBlue text-lg font-bold">Responsável: {student.mother}</h2>
                    </div>
                </div>

                <div className="bg-darkBlue h-fit py-2 px-3 rounded-sm">
                    <h1 className="text-lg text-white font-bold">{age} - {student.grade}</h1>
                </div>
            </div>
            <div className="pt-5">
                <h2 className={`${student.owing !== 0 ? "text-white" : "text-darkBlue"} text-lg font-bold`}>Telefone(s): {student.phones.join(" e ")}</h2>
            </div>
        </div>
    )
}

export default StudentCard;