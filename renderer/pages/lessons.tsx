import Content from "../components/Content"
import Header from "../components/Header"
import Layout from "../components/Layout"
import LessonModal from "../components/LessonModal";
const Lessons = () => {
    return (
        <Layout>
            <Header>
                <h1>Lessons</h1>
            </Header>
            <Content>
                <div className="flex h-full flex-col items-center justify-center">
                    <div className="m-2">
                       <LessonModal/>
                    </div>
                    <div className="my-5 w-5/6 h-1 bg-darkBlue"></div>
                    <div className="flex flex-col w-11/12 overflow-y-auto">
                        <h1 className="p-5 m-10">Aluno xxx</h1>
                        <h1 className="p-5 m-10">Aluno xxx</h1>
                        <h1 className="p-5 m-10">Aluno xxx</h1>
                        <h1 className="p-5 m-10">Aluno xxx</h1>
                        <h1 className="p-5 m-10">Aluno xxx</h1>
                    </div>
				</div>
            </Content>
        </Layout>
    )
}

export default Lessons;