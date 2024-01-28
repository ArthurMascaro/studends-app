import Content from "../components/Content";
import Header from "../components/Header";
import Layout from "../components/Layout";

import DataService from "../../utils/DateService";
import { useState } from "react";

const WeekTabItem = ({ item, today, index }) => {	
	return (
		<div key={index} className={`${item.date.isSame(today) ? "border-b-2 border-b-darkBlue" : ""}`}>
			<h2>{item.date.format("DD")} - {item.day}</h2>
		</div>
	)
}

const Index = () => {

	const week = DataService.getFullWeek();
	const today = DataService.today();

	const [activeDay, setActiveDay] = useState(week[today.day()].date);

	const [weekData, setWeekData] = useState([]);

	console.log(activeDay)
	
	return (
		<div>
			<Layout>
				<Header>
					<div>
						<h1 className="text-darkBlue text-2xl font-bold">Calendário de Aulas</h1>
						<h2 className="text-darkBlue text-lg font-bold">Semana de {week[0].date.format("DD/MM/YYYY")} - {week[6].date.format("DD/MM/YYYY")}</h2>
					</div>
					<div>
						<div className="bg-primaryBlue rounded-lg py-2 px-4 shadow-xl">
							<h1 className="text-white text-xl font-bold">4 Alulas em {activeDay.format("DD/MM")}</h1>
						</div>
					</div>
				</Header>
				<Content>
					<div className="flex justify-center">
						<div className="flex flex-row gap-8">
							{
								week.map((item, index) => <WeekTabItem index={index} item={item} today={today}/>)
							}
						</div>
					</div>
				</Content>
			</Layout>
		</div>
	)
}

export default Index;