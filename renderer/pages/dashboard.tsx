import Content from "../components/Content"
import Header from "../components/Header"
import Layout from "../components/Layout"

const Dashboard = () => {
    return (
        <Layout>
            <Header>
                <h1 className="text-3xl font-bold text-darkBlue">Resultados Financeiros</h1>
            </Header>
            <Content>
                <p>Oiii</p>
            </Content>
        </Layout>
    )
}

export default Dashboard;