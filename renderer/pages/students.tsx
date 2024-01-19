import InputFindUser from "../components/InputFindUser";
import Layout from "../components/Layout";
import StudentCard from "../components/StudentCard";

const Students = () => {

    const students = [{
        name: "Anne",
        mother: "Bethany", 
        phones: ["(16)12345-6789"],
        bornDate: "data em milissegundos/dayjs",
        grade: "1° Ano E.M.", 
        CPF: "",
        observation: "",
        owing: 2 
    },
    {
        name: "Charlie",
        mother: "Daiana", 
        phones: ["(16)12345-6789","(16)12345-6789"],
        bornDate: "data em milissegundos/dayjs",
        grade: "2° Ano E.M.", 
        CPF: "",
        observation: "",
        owing: 0 
    }
    ]
    
	return (
		<Layout>
            <div className="h-28 bg-white flex items-center px-10 py-2 justify-between">
                <InputFindUser/>
                <div>
                    <div className="bg-primaryBlue rounded-lg py-2 px-4 shadow-xl">
                        <h1 className="text-white text-xl font-bold">4 Alunos cadastrados</h1>
                    </div>
                </div>
            </div>
			<div className="bg-lightGray p-6 h-6/6">
				<h1>Users page</h1>
                {
                    students.map(student => <StudentCard student={student}/>)
                }
			</div>
		</Layout>
	)
}

export default Students;