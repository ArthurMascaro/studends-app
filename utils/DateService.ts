import { Dayjs } from "dayjs";
import dayjs from "./dayjs.config";

class DateService {

    static days = "dom-seg-ter-qua-qui-sex-sab".split("-");

    static getDayName (date) {
        return this.days[date.day()];
    }

    static getFullWeek (day=dayjs()) {
        //default today
        const sunday = day.startOf("week");

        let week = [];

        for (let i = 0; i <= 6; i++) {
            let date = dayjs(sunday).add(i, "days");

            week.push({ date, day: this.getDayName(date) });
        }

        return week;
    }

    static today () {
        return dayjs().startOf("day");
    }

    static getAge (bornDate) {
        const age = dayjs().startOf("day").diff(bornDate, "years")
        return age;
    }
}

export default DateService;