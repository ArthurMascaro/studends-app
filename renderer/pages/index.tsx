import Layout from "../components/Layout";

const Index = () => {
	return (
		<Layout>
			<div className="h-28 bg-white flex items-center px-10 py-2 justify-between">
				<div>
					<h1 className="text-darkBlue text-2xl font-bold">Calendário de Aulas</h1>
					<h2 className="text-darkBlue text-lg font-bold">Semana de 09/06/2024 - 15/06/2024</h2>
				</div>
				<div>
                    <div className="bg-primaryBlue rounded-lg py-2 px-4 shadow-xl">
                        <h1 className="text-white text-xl font-bold">4 Alulas em 11/06</h1>
                    </div>
                </div>
            </div>
			<div className="bg-lightGray p-6 h-6/6">
				<h1>Index page</h1>
                
			</div>
		</Layout>
	)
}

export default Index;