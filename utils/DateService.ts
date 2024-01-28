import { Dayjs } from "dayjs";
import dayjs from "./dayjs.config";

interface IWeekDay {
    day: string,
    date: Dayjs
}

class DataService {

    static days = "dom-seg-ter-qua-qui-sex-sab".split("-");

    static getDayName (date) {
        return this.days[date.day()];
    }

    static getFullWeek (day=dayjs()) {
        //default today
        const sunday = day.startOf("week");

        let week: IWeekDay[] = [];

        for (let i = 0; i <= 6; i++) {
            let date = dayjs(sunday).add(i, "days");

            week.push({ date, day: this.getDayName(date) });
        }

        return week;
    }

    static today () {
        return dayjs().startOf("day");
    }
}

export default DataService;