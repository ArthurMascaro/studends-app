import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("main", {
	send: (channel: string, data: Object) => {
		ipcRenderer.send(channel, data);
	},

	receive: (channel: string, func: Function) => {
		ipcRenderer.on(channel, (_, ...args) => func(...args));
	}
})