import DateService from "../../utils/DateService";

export default function DayPlanner ({ lectures }) {

    console.log(lectures)

    const hours = Array.from({length: 17}, (_, index) => index+6);

    return (
        <div className="flex h-5/6 w-full overflow-y-auto gap-10">
            <div className="">
                {
                    hours.map((hour, index) => {
                        return (
                            <div className="w-full my-4 rounded-md bg-fuchsia-600" style={{height: 100}}>
                                <h3>{hour <=9 ? `0${hour}:00` : `${hour}:00`}</h3>
                            </div>
                        )
                    })
                }
            </div>
            <div className="w-full">
                {
                    hours.map((hour, index) => {
                        return (
                            <div className="w-full my-4 rounded-md" style={{height: 100}}>
                                {
                                    lectures.map((lecture) => {
                                        let lessonStart = DateService.getTime(lecture.lesson.startAt);
                                        let lessonEnd = DateService.getTime(lecture.lesson.endAt);
                                        let diff = DateService.timeDiff(lessonEnd, lessonStart);

                                        let time = hour <=9 ? `0${hour}:00` : `${hour}:00`;

                                        let size = 100 * diff;

                                        if (lessonStart === time){
                                            return (
                                                <div className="bg-red-500 mx-2" style={{height: size, backgroundColor: "red"}}>
                                                    <h1>{lecture.user.name}</h1>
                                                </div>
                                            )
                                        }
                                        return (
                                            <div className="bg-red-500 mx-2" style={{height: size, backgroundColor: "red"}}>
                                                    
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}