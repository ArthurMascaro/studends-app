import { useEffect, useState } from "react";
import { Layout } from "../components/Layout"

/*
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
}*/

export default function Lessons () {
    const [open, setOpen] = useState(false);

    const [loading, setLoading] = useState(true);

    return (
        <Layout.Root>
            <Layout.Header>
                <h1>Aulas</h1>
            </Layout.Header>
            <Layout.Content>
            <div className="h-full flex flex-col gap-4">
                    <h1 className="text-2xl font-bold text-slate-800 text-center">Aulas</h1>
                    <div>
                        <button>Nova aula</button>
                    </div>
                    <div className="h-5/6 w-full overflow-y-auto p-2">
                        {
                            
                        }
                    </div>
                    <div className="flex justify-center my-3">
                        
                    </div>
                </div>
            </Layout.Content>
        </Layout.Root>
    )
}

//<Pagination totalData={studentsData.length} perPage={perPage} setCurrentPage={setCurrentPage} currentPage={currentPage}/>