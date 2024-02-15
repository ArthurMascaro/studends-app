import { useEffect, useState } from "react";
import { Layout } from "../components/Layout"
import LessonModal from "../components/LessonModal";
import { useLecturesStore, useLessonsStore, useStudentsStore } from "../store";
import { CheckCircle, XCircle } from "lucide-react";
import LectureModal from "../components/LectureModal";
import { toast } from "react-hot-toast";
import { fetchData, sendEvent } from "../../utils/api";
import DateService from "../../utils/DateService";

const handleAddLesson = async (data, setLessons, setLectures) => {
    let { cpf, startAt, endAt, value } = data;

    startAt = new Date(startAt).toISOString();
    endAt = new Date(endAt).toISOString();
    value = parseFloat(value);

    const payed = false;
    const presence = false;

    try {
        let lesson = null;
        lesson = await sendEvent("create-lesson", { startAt, endAt, value }) ;
        if (lesson) {
            let id = lesson.id;
            try {
                await sendEvent("create-lecture", { user_cpf: cpf, lesson_id: id, payed, presence });
                toast.success("Aula criada");
                fetchData(null, null, setLessons, setLectures);
            } catch (error) {
                toast.error("Algo deu errado");
            }
        } 
    } catch (error) {
        toast.error("Algo deu errado");
    }
}

const handleEditLecture = async (data, setLessons, setLectures) => {
    let { newLesson, newLecture } = data;

    newLesson.startAt = new Date(newLesson.startAt).toISOString();
    newLesson.endAt = new Date(newLesson.endAt).toISOString();

    try {
        await sendEvent("update-lesson", newLesson.id, newLesson);
        try {
            await sendEvent("update-lecture", newLecture.id, newLecture);
            toast.success("Dados alterados");
            fetchData(null, null, setLessons, setLectures);
        } catch (error) {
            toast.error("Algo deu errado");
        }
    } catch (error) {
        toast.error("Algo deu errado");
    }
}

const LectureCard = ({ lecture }) => {
    const students = useStudentsStore((state: any) => state.students);
    const { student } = students.filter((data) => data.student.cpf === lecture.user_cpf)[0];

    const lessons = useLessonsStore((state: any) => state.lessons);
    const lesson = lessons.filter((l) => l.id === lecture.lesson_id)[0];

    const setLessons = useLessonsStore((state: any) => state.setLessons)
    const setLectures = useLecturesStore((state: any) => state.setLectures)

    const onEditLecture = (data) => {
        handleEditLecture(data, setLessons, setLectures);
    }

    const [isOpen, setOpen] = useState(false);

    const handlePresence = async (lecture) => {
        try {
            lecture.presence = !lecture.presence;
            await sendEvent("update-lecture", lecture.id, lecture);
            fetchData(null, null, null, setLectures);
        } catch (error) {
            console.log(error)
        }
    }

    const handlePayed = async (lecture) => {
        try {
            lecture.payed = !lecture.payed;
            await sendEvent("update-lecture", lecture.id, lecture);
            fetchData(null, null, null, setLectures);
        } catch (error) {
            console.log(error)
        }
    }

    const data = { lecture, lesson, student };

    return (
        <div>
            <div className="flex bg-white mx-2 my-6 items-center gap-10 rounded-md shadow-md shadow-slate-400">
               <div className="flex w-3/5 justify-between p-3 bg-primaryBlue rounded-tl-md rounded-bl-md" onClick={() => setOpen(true)}>
                    <div className="w-1/2 p-3 border-r-4 border-r-white ">
                        <h2 className="text-white font-bold text-2xl">{student.name}</h2>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg text-white">{DateService.getDay(lesson.startAt)}</h4>
                        <h4 className="font-bold text-lg text-white">{DateService.getTime(lesson.startAt)} - {DateService.getTime(lesson.endAt)}</h4>
                    </div>
                </div>
                <div className="flex items-center w-full gap-10 justify-around">
                    <div className="p-2" onClick={() => handlePresence(lecture)}>
                        <h4 style={{userSelect: "none"}} className="font-bold text-lg text-darkBlue">{lecture.presence ? "Presente" : "Ausente"}</h4>
                    </div>
                    <div>
                        <div onClick={() => handlePayed(lecture)} className="bg-darkBlue flex gap-10 px-4 py-2 rounded-md items-center" style={{userSelect: "none"}}>
                            <h3 className="text-white font-bold text-lg">Pagamento</h3>
                            {
                                lecture.payed ?
                                    <CheckCircle color="white" size={30}/>
                                :
                                    <XCircle color="white" size={30}/>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <LectureModal isOpen={isOpen} closeModal={() => setOpen(false)} onSave={onEditLecture} data={data}/>
        </div>
    )
}

export default function Lessons () {
    const [open, setOpen] = useState(false);

    const lessons = useLessonsStore((state: any) => state.lessons);
    const setLessons = useLessonsStore((state: any) => state.setLessons);

    const lectures = useLecturesStore((state: any) => state.lectures);
    const setLectures = useLecturesStore((state: any) => state.setLectures);

    const setStudents = useStudentsStore((state: any) => state.setStudents);

    const [loading, setLoading] = useState(true);

    const onAddLesson = (data) => {
        handleAddLesson(data, setLessons, setLectures);
    }

    useEffect(() => {
        fetchData(setStudents, null, setLessons, setLectures);
        if (lessons && lectures) {
            setLoading(false);
        }
    }, [])

    return (
        <Layout.Root>
            <Layout.Header>
                <h1>Lessons</h1>
            </Layout.Header>
            <Layout.Content>
                <div className="flex h-full flex-col items-center justify-center">
                    <div className="m-2">
                        <div onClick={() => setOpen(!open)}>
                            <div style={{ userSelect: "none" }}>
                                <div className="py-3 px-5 w-full bg-darkBlue rounded-md shadow-sm shadow-black">
                                    <h1 className="text-xl font-bold text-white">Agendar nova aula</h1>
                                </div>
                            </div>
                        </div>
                        <LessonModal isOpen={open} closeModal={() => setOpen(false)} onSave={onAddLesson}/>
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
                                    lectures.map((lecture, index) => {
                                        return (
                                            <LectureCard key={index} lecture={lecture}/>
                                        )
                                    })
                        }
                    </div>
				</div>
            </Layout.Content>
        </Layout.Root>
    )
}
