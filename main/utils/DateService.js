"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayjs_config_1 = __importDefault(require("./dayjs.config"));
class DateService {
    static days = "dom-seg-ter-qua-qui-sex-sab".split("-");
    static getDayName(date) {
        return this.days[date.day()];
    }
    static getFullWeek(day = (0, dayjs_config_1.default)()) {
        //default today
        const sunday = day.startOf("week");
        let week = [];
        for (let i = 0; i <= 6; i++) {
            let date = (0, dayjs_config_1.default)(sunday).add(i, "days");
            week.push({ date, day: this.getDayName(date) });
        }
        return week;
    }
    static today() {
        return (0, dayjs_config_1.default)().startOf("day");
    }
    static getAge(bornDate) {
        const age = (0, dayjs_config_1.default)().startOf("day").diff(bornDate, "years");
        return age;
    }
    static toInputDate(date) {
        return (0, dayjs_config_1.default)(date).format("YYYY-MM-DD");
    }
    static format(date) {
        return (0, dayjs_config_1.default)(date).format("DD/MM/YYYY HH:mm");
    }
    static getDay(date) {
        return (0, dayjs_config_1.default)(date).format("DD/MM/YYYY");
    }
    static getTime(date) {
        return (0, dayjs_config_1.default)(date).format("HH:mm");
    }
}
exports.default = DateService;
