import { useState } from "react";
import { Layout } from "../components/Layout";
import { getFullWeek, today } from "../../utils/date";

export default function Index () {

	const [loading, setLoading] = useState(true);

	const week = getFullWeek();

	const [activeDay, setActiveDay] = useState(week[today.day()].date);

	const handleSelectDay = (item) => {
		const { date } = item;
		setActiveDay(week[date.day()].date);
	}

	return (
		<Layout.Root>
			<Layout.Header>
				<div>
					<h1 className="text-darkBlue text-3xl font-bold">Calendário de Aulas</h1>
					<h2 className="text-darkBlue text-lg font-bold">Semana de {week[0].date.format("DD/MM/YYYY")} - {week[6].date.format("DD/MM/YYYY")}</h2>
				</div>
				<div>
					<div className="bg-primaryBlue rounded-lg py-2 px-4 shadow-xl">
						<h1 className="text-white text-xl font-bold">4 Alulas em {activeDay.format("DD/MM")}</h1>
					</div>
				</div>
			</Layout.Header>
			<Layout.Content>
				<h1>Conteudo</h1>
			</Layout.Content>
		</Layout.Root>
	)
}