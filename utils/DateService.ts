
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

    static timeDiff (time1, time2) {
        const [hour1, min1] = time1.split(":");
        const date1 = dayjs().startOf("day").set("hour", parseInt(hour1)).set("minute", parseInt(min1));
        
        const [hour2, min2] = time1.split(":");
        const date2 = dayjs().startOf("day").set("hour", parseInt(hour2)).set("minute", parseInt(min2));

        const diff = date1.diff(date2, "hours");

        return diff;
    }

    static toInputDatetime (date) {
        return dayjs(date).format("YYYY-MM-DDTHH:mm");
    }
}

export default DateService;