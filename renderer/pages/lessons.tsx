import { useState } from "react";
import Content from "../components/Content"
import Header from "../components/Header"
import Layout from "../components/Layout"
import Modal from "../components/Modal";

const AddLessonModal = () => {
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Modal title="Agendar aula" isOpen={open} closeModal={() => setOpen(false)}>
                <h1>Cadastro de aulas!</h1>
            </Modal>
            <div onClick={() => setOpen(!open)}>
                <div style={{ userSelect: "none" }}>
                    <div className="py-3 px-5 w-full bg-darkBlue rounded-md shadow-sm shadow-black">
                        <h1 className="text-xl font-bold text-white">Agendar nova aula</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Lessons () {
    return (
        <Layout>
            <Header>
                <h1>Lessons</h1>
            </Header>
            <Content>
                <div className="flex h-full flex-col items-center justify-center">
                    <div className="m-2">
                       <AddLessonModal/>
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
