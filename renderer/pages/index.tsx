import Content from "../components/Content";
import Header from "../components/Header";
import InputFindUser from "../components/InputFindUser";
import Layout from "../components/Layout";

const Index = () => {
	return (
		<div>
			<Layout>
				<Header>
					<div>
						<h1 className="text-darkBlue text-2xl font-bold">Calendário de Aulas</h1>
						<h2 className="text-darkBlue text-lg font-bold">Semana de 09/06/2024 - 15/06/2024</h2>
					</div>
					<div>
						<div className="bg-primaryBlue rounded-lg py-2 px-4 shadow-xl">
							<h1 className="text-white text-xl font-bold">4 Alulas em 11/06</h1>
						</div>
					</div>
				</Header>
				<Content>
					<h1>Index page</h1>
					<InputFindUser/>
				</Content>
			</Layout>
		</div>
	)
}

export default Index;