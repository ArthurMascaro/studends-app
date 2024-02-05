"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Native
const path_1 = require("path");
const url_1 = require("url");
// Packages
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const electron_next_1 = __importDefault(require("electron-next"));
//Controllers
const UserDAO_1 = __importDefault(require("../api/repositories/UserDAO"));
const LessonDAO_1 = __importDefault(require("../api/repositories/LessonDAO"));
const LectureDAO_1 = __importDefault(require("../api/repositories/LectureDAO"));
// Prepare the renderer once the app is ready
electron_1.app.on("ready", async () => {
    await (0, electron_next_1.default)("./renderer");
    const mainWindow = new electron_1.BrowserWindow({
        minHeight: 1080 * 0.7,
        minWidth: 1920 * 0.7,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: (0, path_1.join)(__dirname, "preload.js"),
        },
    });
    const url = electron_is_dev_1.default
        ? "http://localhost:8000/"
        : (0, url_1.format)({
            pathname: (0, path_1.join)(__dirname, "../renderer/out/index.html"),
            protocol: "file:",
            slashes: true,
        });
    mainWindow.maximize();
    //mainWindow.removeMenu();
    mainWindow.loadURL(url);
});
// Quit the app once all windows are closed
electron_1.app.on("window-all-closed", electron_1.app.quit);
electron_1.ipcMain.on("hi", () => console.log("hi"));
//user events 
const userDAO = new UserDAO_1.default();
const lessonDAO = new LessonDAO_1.default();
const lectureDAO = new LectureDAO_1.default();
// Manipuladores de eventos para operações de usuário
electron_1.ipcMain.on("create-user", (event, data) => {
    userDAO.create(event, data).catch(error => console.error(error));
});
electron_1.ipcMain.on("update-user", (event, cpf, newData) => {
    userDAO.update(event, cpf, newData).catch(error => console.error(error));
});
electron_1.ipcMain.on("delete-user", (event, cpf) => {
    userDAO.delete(event, cpf).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-user-by-id", (event, cpf) => {
    userDAO.findById(event, cpf).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-all-users", (event) => {
    console.log("ueopa");
    userDAO.findAll(event).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-user-by-name", (event, name) => {
    userDAO.findUserByName(event, name).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-user-by-mother-name", (event, motherName) => {
    userDAO.findUserByMotherName(event, motherName).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-user-by-grade", (event, grade) => {
    userDAO.findByGrade(event, grade).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-user-by-phone", (event, phone) => {
    userDAO.findUserByPhone(event, phone).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-user-by-born-date", (event, bornDate) => {
    userDAO.findByBornDate(event, bornDate).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-users-in-debt", (event) => {
    userDAO.findStudentsInDebt(event).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-debt-amount-by-user", (event, cpf) => {
    userDAO.findDebtAmountByUser(event, cpf).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-all-users-by-lecture-id", (event, lectureId) => {
    userDAO.findAllUserByLectureId(event, lectureId).catch(error => console.error(error));
});
electron_1.ipcMain.on("get-total-profit-by-student", (event, cpf) => {
    userDAO.getTotalProfitByStudent(event, cpf).catch(error => console.error(error));
});
electron_1.ipcMain.on("get-total-profit-by-student-and-month", (event, cpf, month, year) => {
    userDAO.getTotalProfitByStudentAndMonth(event, cpf, month, year).catch(error => console.error(error));
});
electron_1.ipcMain.on("get-total-debt-by-student", (event, cpf) => {
    userDAO.getTotalDebtByStudent(event, cpf).catch(error => console.error(error));
});
electron_1.ipcMain.on("get-total-debt-by-student-and-month", (event, cpf, month, year) => {
    userDAO.getDebtByStudentAndMonth(event, cpf, month, year).catch(error => console.error(error));
});
// Manipuladores de eventos para operações de telefone
electron_1.ipcMain.on("create-phone", (event, data) => {
    userDAO.createPhone(event, data).catch(error => console.error(error));
});
electron_1.ipcMain.on("update-phone", (event, id, newData) => {
    userDAO.updatePhone(event, id, newData).catch(error => console.error(error));
});
electron_1.ipcMain.on("delete-phone", (event, id) => {
    userDAO.deletePhone(event, id).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-all-phones-by-user-cpf", (event, user_cpf) => {
    userDAO.findAllPhonesByUserCpf(event, user_cpf).catch(error => console.error(error));
});
// Manipuladores de eventos para operações de lições
electron_1.ipcMain.on("create-lesson", (event, data) => {
    lessonDAO.create(event, data).catch(error => console.error(error));
});
electron_1.ipcMain.on("update-lesson", (event, id, newData) => {
    lessonDAO.update(event, id, newData).catch(error => console.error(error));
});
electron_1.ipcMain.on("delete-lesson", (event, id) => {
    lessonDAO.delete(event, id).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-lesson-by-id", (event, id) => {
    lessonDAO.findById(event, id).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-all-lessons", (event) => {
    lessonDAO.findAll(event).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-lesson-by-lecture-id", (event, lectureId) => {
    lessonDAO.findByLectureId(event, lectureId).catch(error => console.error(error));
});
//Manipuladores de eventos para operações de aulas
electron_1.ipcMain.on("create-lecture", (event, data) => {
    lectureDAO.create(event, data).catch(error => console.error(error));
});
electron_1.ipcMain.on("update-lecture", (event, id, newData) => {
    lectureDAO.update(event, id, newData).catch(error => console.error(error));
});
electron_1.ipcMain.on("delete-lecture", (event, id) => {
    lectureDAO.delete(event, id).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-lecture-by-id", (event, id) => {
    lectureDAO.findById(event, id).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-all-lectures", (event) => {
    lectureDAO.findAll(event).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-lectures-by-week", (event) => {
    console.log("eai");
    lectureDAO.findLecturesByWeek(event).catch(error => console.error(error));
    console.log("aefwewc");
});
electron_1.ipcMain.on("find-all-lectures-sorted-by-date", (event, skip, take) => {
    lectureDAO.findAllLecturesSortedByDate(event, skip, take).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-all-lectures-by-student-cpf", (event, user_cpf, skip, take) => {
    lectureDAO.findAllLecturesByStudentCPF(event, user_cpf, skip, take);
});
electron_1.ipcMain.on("find-all-lectures-by-month", (event, month, year) => {
    lectureDAO.findAllLecturesByMonth(event, month, year).catch(error => console.error(error));
});
electron_1.ipcMain.on("find-all-lectures-by-student-and-month", (event, month, year, user_cpf) => {
    lectureDAO.findAllLecturesByStudentAndMonth(event, user_cpf, month, year).catch(error => console.error(error));
});
electron_1.ipcMain.on("get-total-profit-by-month", (event, month, year) => {
    lectureDAO.getTotalProfitByMonth(event, month, year).catch(error => console.error(error));
});
