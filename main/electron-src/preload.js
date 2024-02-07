"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
electron_1.contextBridge.exposeInMainWorld("main", {
    send: (channel, ...args) => {
        console.log("send", channel, ...args);
        electron_1.ipcRenderer.send(channel, ...args);
    },
    receive: (channel, func) => {
        console.log("receive", "sdvsfsdf");
        electron_1.ipcRenderer.on(channel, (_, ...args) => func(...args));
    },
    stop: (channel) => {
        electron_1.ipcRenderer.removeAllListeners(channel);
    }
});
