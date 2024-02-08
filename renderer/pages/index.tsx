import Content from "../components/Content";
import Header from "../components/Header";
import Layout from "../components/Layout";

import DateService from "../../utils/DateService";
import { useEffect, useState } from "react";
import { useStudentsStore } from "../store";

export default function Index () {

	const [loading, setLoading] = useState(true);
	const [weekData, setWeekdata] = useState({});

	const week = DateService.getFullWeek();
	const today = DateService.today();

	const [activeDay, setActiveDay] = useState(week[today.day()].date);

	const handleSelectDay = (item) => {
		const { day, date } = item;
		setActiveDay(week[date.day()].date);
	}

	
	const setStudents = useStudentsStore((state: any) => state.setStudents);

	useEffect(() => {
		window.main.send("find-lectures-by-week");
		window.main.send("find-all-students-with-phones-and-debt");

		window.main.receive("find-all-students-with-phones-and-debt-success", (event) => {
            setStudents(event);
        });

		window.main.receive("find-lectures-by-week-success", (event, data) => {
			setWeekdata(event);
			setLoading(false);
		});

		window.main.receive("find-lectures-by-week-error", (event, data) => {
			setWeekdata({});
			setLoading(false);
		});


		return () => {
			window.main.stop("find-lectures-by-week-success");
			window.main.stop("find-lectures-by-week-error");
			window.main.stop("find-all-students-with-phones-and-debt-success");
		}
	}, [])

	return (
		<Layout>
			<Header>
				<div>
					<h1 className="text-darkBlue text-3xl font-bold">Calendário de Aulas</h1>
					<h2 className="text-darkBlue text-lg font-bold">Semana de {week[0].date.format("DD/MM/YYYY")} - {week[6].date.format("DD/MM/YYYY")}</h2>
				</div>
				<div>
					<div className="bg-primaryBlue rounded-lg py-2 px-4 shadow-xl">
						<h1 className="text-white text-xl font-bold">4 Alulas em {activeDay.format("DD/MM")}</h1>
					</div>
				</div>
			</Header>
			<Content>
				<div className="flex h-full flex-col items-center">
					<div className="flex gap-6 rounded-md bg-white shadow-md w-fit">
						{
							week.map((item, index) => {
								return (
									<div style={{ userSelect: "none" }} onClick={() => handleSelectDay(item)} key={index} className={`${item.date.isSame(activeDay) ? "border-b-2 border-b-darkBlue" : ""} m-2 p-1 hover:bg-slate-400`}>
										<h2 className="text-lg font-bold text-darkBlue">{item.date.format("DD")} - {item.day}</h2>
									</div>
								)
							})
						}
					</div>
					<div className="flex w-full my-5 h-full justify-center">
						{
							loading ?
								<p>Carregando...</p>
							:
								<div className="flex flex-col w-11/12 h-5/6  rounded-md overflow-y-auto">
									<h1 className="p-5 m-10">Oi</h1>
									<h1 className="p-5 m-10">Oi</h1>
									<h1 className="p-5 m-10">Oi</h1>
									<h1 className="p-5 m-10">Oi</h1>
									<h1 className="p-5 m-10">Oi</h1>
								</div>
						}
					</div>
				</div>
			</Content>
		</Layout>
	)
}