import { useEffect, useState } from "react";
import Content from "../components/Content"
import Header from "../components/Header"
import Layout from "../components/Layout"
import LessonModal from "../components/LessonModal";
import { useLecturesStore, useLessonsStore, useStudentsStore } from "../store";
import { CheckCircle, XCircle } from "lucide-react";
import LectureModal from "../components/LectureModal";
import { toast } from "react-hot-toast";

const handleAddLesson = (data) => {
    let { cpf, startAt, endAt, value } = data;

    startAt = new Date(startAt).toISOString();
    endAt = new Date(endAt).toISOString();
    value = parseFloat(value);

    const payed = false;
    const presence = false;

    window.main.send("create-lesson", { startAt, endAt, value });

    window.main.receive("create-lesson-success", (lesson) => {
        const id = lesson.id;
        
        window.main.send("create-lecture", { user_cpf: cpf, lesson_id: id, payed, presence });

        window.main.receive("create-lecture-success", (lecture) => {
            toast.success("Aula criada");
            window.main.stop("create-lecture-success");
        })

        window.main.stop("create-lesson-success");
    })

    window.main.receive("create-lesson-error", (event) => {
        toast.error("Algo deu errado")
        window.main.stop("create-lesson-error");
    })
}

const handleEditLecture = (data, setLessons, setLectures) => {

}

const LectureCard = ({ lecture }) => {
    const students = useStudentsStore((state: any) => state.students);
    const student = students.filter((s) => s.cpf === lecture.user_cpf)[0];
    console.log(students);

    const lessons = useLessonsStore((state: any) => state.lessons);
    const lesson = lessons.filter((l) => l.id === lecture.lesson_id);

    const setLessons = useLessonsStore((state: any) => state.setLessons)
    const setLectures = useLecturesStore((state: any) => state.setLectures)

    const onEditLecture = (data) => {
        handleEditLecture(data, setLessons, setLectures);
    }

    const [isOpen, setOpen] = useState(false);

    return (
        <div>
            <div className="flex p-3 bg-primaryBlue">
                <div>
                    <h2>{student.name}</h2>
                </div>
                <div className="h-5 w-1 bg-white"></div>
                <div>
                    <div>
                        <h4></h4>
                        <h4></h4>
                    </div>
                    <div>
                        <h4>{lecture.presence ? "Presente" : "Ausente"}</h4>
                    </div>
                    <div>
                        <div className="bg-darkBlue">
                            <h3>Pagamento</h3>
                            {
                                lecture.payed ?
                                    <CheckCircle/>
                                :
                                    <XCircle/>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <LectureModal isOpen={isOpen} closeModal={() => setOpen(false)} onSave={onEditLecture} lecture={undefined}/>
        </div>
    )
}

export default function Lessons () {
    const [open, setOpen] = useState(false);

    const lessons = useLessonsStore((state: any) => state.lessons);
    const setLessons = useLessonsStore((state: any) => state.setLessons);

    const lectures = useLecturesStore((state: any) => state.lectures);
    const setLectures = useLecturesStore((state: any) => state.setLectures);

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        window.main.send("find-all-lectures");
        window.main.send("find-all-lessons");
        window.main

        window.main.receive("find-all-lectures-success", (event) => {
            setLectures(event);
            setLoading(false);
        })

        window.main.receive("find-all-lessons-success", event => {
            setLessons(event);
        })

        window.main.receive("find-all-lectures-error", (event) => {
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
                        <LessonModal isOpen={open} closeModal={() => setOpen(false)} onSave={handleAddLesson}/>
                    </div>
                    <div className="my-5 w-5/6 h-1 bg-darkBlue"></div>
                    <div className="flex flex-col w-11/12 overflow-y-auto">
                        {
                            loading ?
                                <p>Carregando...</p>
                            :
                                lectures.length === 0 ? 
                                    <p>Nenhuma aula encontrada</p>
                                :
                                    lectures.map((lecture) => {
                                        return (
                                            <LectureCard lecture={lecture}/>
                                        )
                                    })
                        }
                    </div>
				</div>
            </Content>
        </Layout>
    )
}
