// Native
import { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, app, ipcMain } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";

//Controllers
import UserDAO from "../api/repositories/UserDAO";
import LessonDAO from "../api/repositories/LessonDAO";
import LectureDAO from "../api/repositories/LectureDAO";

// Prepare the renderer once the app is ready
app.on("ready", async () => {
    await prepareNext("./renderer");

    const mainWindow = new BrowserWindow({
		minHeight: 1080 * 0.7,
        minWidth: 1920 * 0.7,
      	webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: join(__dirname, "preload.js"),
		},
    });

  	const url = isDev
    	? "http://localhost:8000/"
    	: format({
        	pathname: join(__dirname, "../renderer/out/index.html"),
        	protocol: "file:",
        	slashes: true,
      	});

	mainWindow.maximize();
	//mainWindow.removeMenu();
  	mainWindow.loadURL(url);
});

// Quit the app once all windows are closed
app.on("window-all-closed", app.quit);

ipcMain.on("hi", () => console.log("hi"));

//user events 
const userDAO = new UserDAO();

const lessonDAO = new LessonDAO();

const lectureDAO = new LectureDAO();


// Manipuladores de eventos para operações de usuário
ipcMain.on("create-user", (event, data) => {
    userDAO.create(event, data).catch(error => console.error(error));
});

ipcMain.on("update-user", (event, cpf, newData) => {
    userDAO.update(event, cpf, newData).catch(error => console.error(error));
});

ipcMain.on("delete-user", (event, cpf) => {
    userDAO.delete(event, cpf).catch(error => console.error(error));
});

ipcMain.on("find-user-by-id", (event, cpf) => {
    userDAO.findById(event, cpf).catch(error => console.error(error));
});

ipcMain.on("find-all-users", (event) => {
    userDAO.findAll(event).catch(error => console.error(error));
});

ipcMain.on("find-user-by-name", (event, name) => {
	userDAO.findUserByName(event, name).catch(error => console.error(error));
});

ipcMain.on("find-user-by-mother-name", (event, motherName) => {
	userDAO.findUserByMotherName(event, motherName).catch(error => console.error(error));
});

ipcMain.on("find-user-by-grade", (event, grade) => {
	userDAO.findByGrade(event, grade).catch(error => console.error(error));
});

ipcMain.on("find-user-by-phone", (event, phone) => {
	userDAO.findUserByPhone(event, phone).catch(error => console.error(error));
});

ipcMain.on("find-user-by-born-date", (event, bornDate) => {
	userDAO.findByBornDate(event, bornDate).catch(error => console.error(error));
});

ipcMain.on("find-users-in-debt", (event) => {
	userDAO.findStudentsInDebt(event).catch(error => console.error(error));
});

ipcMain.on("find-debt-amount-by-user", (event, cpf) => {
	userDAO.findDebtAmountByUser(event, cpf).catch(error => console.error(error));
});



// Manipuladores de eventos para operações de telefone
ipcMain.on("create-phone", (event, data) => {
    userDAO.createPhone(event, data).catch(error => console.error(error));
});

ipcMain.on("update-phone", (event, id, newData) => {
    userDAO.updatePhone(event, id, newData).catch(error => console.error(error));
});

ipcMain.on("delete-phone", (event, id) => {
    userDAO.deletePhone(event, id).catch(error => console.error(error));
});

ipcMain.on("find-all-phones-by-user-cpf", (event, user_cpf) => {
    userDAO.findAllPhonesByUserCpf(event, user_cpf).catch(error => console.error(error));
});



// Manipuladores de eventos para operações de lições
ipcMain.on("create-lesson", (event, data) => {
	lessonDAO.create(event, data).catch(error => console.error(error));
});

ipcMain.on("update-lesson", (event, id, newData) => {
	lessonDAO.update(event, id, newData).catch(error => console.error(error));
});

ipcMain.on("delete-lesson", (event, id) => {
	lessonDAO.delete(event, id).catch(error => console.error(error));
});

ipcMain.on("find-lesson-by-id", (event, id) => {
	lessonDAO.findById(event, id).catch(error => console.error(error));
});

ipcMain.on("find-all-lessons", (event) => {
	lessonDAO.findAll(event).catch(error => console.error(error));
});



// Manipuladores de eventos para operações de aulas
ipcMain.on("create-lecture", (event, data) => {
	lectureDAO.create(event, data).catch(error => console.error(error));
});

ipcMain.on("update-lecture", (event, id, newData) => {
	lectureDAO.update(event, id, newData).catch(error => console.error(error));
});

ipcMain.on("delete-lecture", (event, id) => {
	lectureDAO.delete(event, id).catch(error => console.error(error));
});

ipcMain.on("find-lecture-by-id", (event, id) => {
	lectureDAO.findById(event, id).catch(error => console.error(error));
});

ipcMain.on("find-all-lectures", (event) => {
	lectureDAO.findAll(event).catch(error => console.error(error));
});