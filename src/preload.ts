// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  windowControls: {
    close: () => ipcRenderer.send("window-close"),
    minimize: () => ipcRenderer.send("window-minimize"),
  },
});
