const package_json = require("./package.json");
const { contextBridge, ipcRenderer } = require("electron");

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron", "project"]) {
    if (dependency !== "project")
      replaceText(`${dependency}-version`, process.versions[dependency]);
    else replaceText(`${dependency}-version`, package_json.version);
  }
});

contextBridge.exposeInMainWorld("electronAPI", {
  openExternal: (url) => ipcRenderer.send("open-link", url),
  setClipboard: (text) => ipcRenderer.send("set-clipboard", text),
  setDetails: (details, state) =>
    ipcRenderer.send("set-presence", details, state),
});
