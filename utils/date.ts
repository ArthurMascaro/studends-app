import dayjs from "dayjs";

export const days = "dom-seg-ter-qua-qui-sex-sab".split("-");

export function getDayName (date) {
    return days[date.day()];
}

export function getFullWeek (day=dayjs()) {
    const sunday = day.startOf("week");

    let week = [];

    for (let i = 0; i <= 6; i++) {
        let date = dayjs(sunday).add(i, "days");

        week.push({ date, day: getDayName(date) });
    }

    return week;
}

export function getAge (bornDate) {
    const age = dayjs().startOf("day").diff(bornDate, "years");
    return age;
}

export function toInputDate (date) {
    return dayjs(date).format("YYYY-MM-DD");
}

export function format (date) {
    return dayjs(date).format("DD/MM/YYYY HH:mm");
}

export function getDay (date) {
    return dayjs(date).format("DD/MM/YYYY");
}

export function getTime (date) {
    return dayjs(date).format("HH:mm")
}

export function timeDiff (time1, time2) {
    const [hour1, min1] = time1.split(":");
    const date1 = dayjs().startOf("day").set("hour", parseInt(hour1)).set("minute", parseInt(min1));
    
    const [hour2, min2] = time2.split(":");
    const date2 = dayjs().startOf("day").set("hour", parseInt(hour2)).set("minute", parseInt(min2));

    const diff = date1.diff(date2, "hours");

    return diff;
}

export function toInputDatetime (date) {
    return dayjs(date).format("YYYY-MM-DDTHH:mm");
}

export const today = dayjs().startOf("day");