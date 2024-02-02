import { useState } from "react";
import Content from "../components/Content"
import Header from "../components/Header"
import Layout from "../components/Layout"
import MoneyChart from "../components/MoneyChart";

const Dashboard = () => {

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
                        {
                            tab === "table" ?
                                <h1>Tabela</h1>
                            :
                                <div className="p-2 flex flex-col justify-center">
                                    <div className="my-2">
                                        <h1 className="font-bold text-darkBlue text-lg">Valor recebido nos últimos 10 meses</h1>
                                        <MoneyChart/>
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default Dashboard;