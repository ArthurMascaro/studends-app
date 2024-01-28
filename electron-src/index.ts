// Native
import { join } from "path";
import { format } from "url";

// Packages
import { BrowserWindow, app, ipcMain } from "electron";
import isDev from "electron-is-dev";
import prepareNext from "electron-next";

//Controllers
import UserDAO from "../api/repositories/UserDAO";

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
ipcMain.on("create-user", userDAO.create);