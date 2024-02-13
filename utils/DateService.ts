
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

    static toInputDate (date) {
        return dayjs(date).format("YYYY-MM-DD");
    }

    static format (date) {
        return dayjs(date).format("DD/MM/YYYY HH:mm");
    }

    static getDay (date) {
        return dayjs(date).format("DD/MM/YYYY");
    }

    static getTime (date) {
        return dayjs(date).format("HH:mm")
    }
}

export default DateService;