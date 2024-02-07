import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("main", {
	send: (channel: string, ...args: any) => {
		console.log("send", channel, ...args)
		ipcRenderer.send(channel, ...args);
	},

	receive: (channel: string, func: Function) => {
		console.log("receive", "sdvsfsdf")
		ipcRenderer.on(channel, (_, ...args) => func(...args));
	},

	stop: (channel: string) => {
		ipcRenderer.removeAllListeners(channel);
	}
})