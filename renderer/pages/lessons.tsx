import { useEffect, useState } from "react";
import Content from "../components/Content"
import Header from "../components/Header"
import Layout from "../components/Layout"
import LessonModal from "../components/LessonModal";
import { useLessonsStore } from "../store";

export default function Lessons () {
    const [open, setOpen] = useState(false);

    const lessons = useLessonsStore((state: any) => state.lessons);
    const setLessons = useLessonsStore((state: any) => state.setLessons);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.main.send("");

        window.main.receive("", (event) => {
            setLessons(event);
            setLoading(false);
        })

        window.main.receive("", (event) => {
            setLessons([]);
            setLoading(false);
        })
    })

    return (
        <Layout>
            <Header>
                <h1>Lessons</h1>
            </Header>
            <Content>
                <div className="flex h-full flex-col items-center justify-center">
                    <div className="m-2">
                        <div onClick={() => setOpen(!open)}>
                            <div style={{ userSelect: "none" }}>
                                <div className="py-3 px-5 w-full bg-darkBlue rounded-md shadow-sm shadow-black">
                                    <h1 className="text-xl font-bold text-white">Agendar nova aula</h1>
                                </div>
                            </div>
                        </div>
                        <LessonModal isOpen={open} closeModal={() => setOpen(false)} lesson={undefined}/>
                    </div>
                    <div className="my-5 w-5/6 h-1 bg-darkBlue"></div>
                    <div className="flex flex-col w-11/12 overflow-y-auto">
                        {
                            loading ?
                                <p>Carregando...</p>
                            :
                                lessons.lenght === 0 ? 
                                    <p>Nenhuma aula encontrada</p>
                                :
                                    <h1>Aulas!</h1>
                        }
                    </div>
				</div>
            </Content>
        </Layout>
    )
}
