import { useState } from "react";
import Content from "../components/Content"
import Header from "../components/Header"
import Layout from "../components/Layout"
import Chart from "react-apexcharts";

const MoneyChart = ({ data }) => {

    const options = {
		chart: {
			id: "money-chart",
			toolbar: {
			  	show: false
		  	},
	  	},
        stroke: {
            width: 3,
        },
        dataLabels: {
            enabled: false, // Desativa os rótulos de dados
        },
        colors: ['#D81CB3'], // Cor roxa
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            labels: {
                style: {
                  	fontWeight: 'bold',
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                  	fontWeight: 'bold',
                },
            },
        }
    }

    const series= [{
        name: "valor recebido",
        data: [1230, 1640, 1645, 1550, 1850, 1760, 2070, 1990, 1682, 1075]
    }]

    return (
        <Chart options={options} series={series} height={375} width={750} type="line"/>
    )
}

const MoneyTable = ({ data }) => {
    return (
        <div>
            <h1>Tabela</h1>
        </div>
    )
}

export default function Dashboard () {

    const [data, setData] = useState(true);
    const [loading, setLoading] = useState(false)

    const tabs = ["table", "chart"];

    const [tab, setTab] = useState(tabs[0]);

    const handleSelectTab = (item: string) => {
        setTab(item);
    }

    return (
        <Layout>
            <Header>
                <h1 className="text-3xl font-bold text-darkBlue">Resultados Financeiros</h1>
            </Header>
            <Content>
                <div className="flex h-full flex-col items-center">
                    <div className="flex gap-6 rounded-md bg-white shadow-md w-fit">
                        {
                            tabs.map((item, index) => {
                                return (
                                    <div style={{ userSelect: "none" }} onClick={() => handleSelectTab(item)} key={index} className={`${item === tab ? "border-b-2 border-b-darkBlue" : ""} m-2 p-1 hover:bg-slate-400`}>
                                        <h2 className="text-lg font-bold text-darkBlue">{ item === "table" ? "Tabela" : "Gráfico"}</h2>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div>
                        <div className="p-2 flex flex-col justify-center">
                            {
                                loading ? 
                                    <p>Loading...</p>
                                :
                                    <div className="my-2">
                                        {
                                            tab === "table" ?
                                                <div>
                                                    <MoneyTable data={data}/>
                                                </div>
                                            :
                                                <div>
                                                    <h1 className="font-bold text-darkBlue text-lg">Valor recebido nos últimos 10 meses</h1>
                                                    <MoneyChart data={data}/>
                                                </div>
                                        }
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}
