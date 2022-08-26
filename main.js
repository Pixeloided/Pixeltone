const {
  app,
  BrowserWindow,
  ipcMain,
  Menu,
  Notification,
  shell,
  clipboard,
  session,
  dialog,
} = require("electron");
const path = require("path");
const fs = require("fs");
const RPC = require("discord-rpc");
const client = new RPC.Client({ transport: "ipc" });
const startDate = Date.now();
const activity = {
  details: "In the main menu",
  state: "Not on any server",
  timestamps: {
    start: startDate,
  },
  assets: {
    large_image: "large",
    large_text: "Pixeltone 👍",
    small_image: "small",
    small_text: "Gayming",
  },
  instance: true,
  buttons: [
    {
      label: "Download",
      url: "https://pixeloided.github.io/pixeltone/download/",
    },
    {
      label: "Creator",
      url: "https://discord.com/users/529018681775095818",
    },
  ],
};
client.on("ready", async () => {
  client.request("SET_ACTIVITY", {
    pid: process.pid,
    activity: activity,
  });
});
function setPresence(details, state) {
  client.request("SET_ACTIVITY", {
    pid: process.pid,
    activity: {
      details: details,
      state: state,
      timestamps: {
        start: startDate,
      },
      assets: {
        large_image: "large",
        large_text: "Pixeltone 👍",
        small_image: "small",
        small_text: "Gayming",
      },
      instance: true,
      buttons: [
        {
          label: "Download",
          url: "https://pixeloided.github.io/pixeltone/download/",
        },
        {
          label: "Creator",
          url: "https://discord.com/users/529018681775095818",
        },
      ],
    },
  });
}
client.login({ clientId: "1012460472571809952" });
const isMac = process.platform === "darwin";

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1372,
    minWidth: 1372,
    height: 960,
    minHeight: 960,
    icon: path.join(__dirname, "assets/icons/32x32.png"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      devTools: process.env.NODE_ENV == "production" ? "true" : "false",
    },
    nodeIntegration: false,

    // TODO: Custom frame!
    // frame: false,
  });

  ipcMain.on("open-link", (event, url) => {
    if (url.startsWith("https://")) {
      shell.openExternal(url);
    }
  });

  ipcMain.on("set-presence", (event, details, state) => {
    setPresence(details, state);
  });

  ipcMain.on("set-clipboard", (event, text) => {
    clipboard.writeText(text);
    var clipNotify = new Notification();
    clipNotify.urgency = "low";
    clipNotify.title = "Copied to clipboard!";
    clipNotify.body = text;
    clipNotify.silent = true;
    clipNotify.on("click", () => {
      mainWindow.focus();
    });
    clipNotify.show();
  });

  mainWindow.maximize();
  mainWindow.loadFile("src/pages/home.html");
}

app.whenReady().then(() => {
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "script-src 'self' https://*.google.com https://*.gstatic.com https://*.fontawesome.com 'unsafe-inline'",
          "img-src 'self' data:",
          "font-src 'self' https://*.google.com https://*.gstatic.com https://*.fontawesome.com data:",
          "connect-src 'self' https://*.fontawesome.com",
          "frame-src 'self'",
          "object-src 'self'",
          "media-src 'self'",
          "child-src 'self'",
          "form-action 'self'",
          "frame-ancestors 'self'",
          "block-all-mixed-content",
          "upgrade-insecure-requests",
        ].join("; "),
      },
    });
  });
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

if (process.env.NODE_ENV == "production") {
  Menu.setApplicationMenu(null);
}
