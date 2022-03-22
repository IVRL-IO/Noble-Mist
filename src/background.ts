import {app, BrowserWindow, ipcMain, session, shell} from "electron";
import {Deeplink} from "electron-deeplink";
import {createProtocol} from "vue-cli-plugin-electron-builder/lib";
import * as path from "path";
import {URL} from "url";

const {localStorage} = require("electron-browser-storage");

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
const isDevelopment = process.env.NODE_ENV !== "production";

let mainWindow: BrowserWindow;
const protocol = isDevelopment ? "noble-mist-dev" : "noble-mist";
app.setAsDefaultProtocolClient(protocol, process.execPath);
let deeplink: Deeplink;

// if (require("electron-squirrel-startup")) {
//   app.quit();
// }

const createWindow = () => {
  mainWindow = new BrowserWindow({
                                   width: 800,
                                   height: 600,
                                   webPreferences: {
                                     // Use pluginOptions.nodeIntegration, leave this alone
                                     // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
                                     nodeIntegration: process.env
                                         .ELECTRON_NODE_INTEGRATION as unknown as boolean,
                                     contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
                                   },
                                 });

  deeplink = new Deeplink({
                            app,
                            mainWindow,
                            protocol,
                            isDev: isDevelopment,
                            debugLogging: true,
                          });

  deeplink.on("received", (link) => {
    mainWindow.webContents.send("received-link", link);
  });

  createProtocol(protocol);

  mainWindow.webContents.on("did-finish-load", async () => {
    mainWindow.webContents.send("set-protocol", deeplink.getProtocol());
    mainWindow.webContents.send("set-logfile", deeplink.getLogfile());
    console.log(localStorage.keys);
    if (localStorage.contains) {
      let position: number[] = JSON.parse(
          await localStorage.getItem("position")
      );

      mainWindow.setPosition(position[0], position[1]);
    }
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
    if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
    console.log(mainWindow.webContents.session.getUserAgent());
  } else {
    // Load the index.html when not in development
    // mainWindow.loadURL(`{protocol}://dist/index.html`);
    mainWindow.loadURL(path.join(__dirname, "index.html"));
    mainWindow.webContents.openDevTools();
  }
};

app.on("ready", createWindow);

app.on("before-quit", () => {
  localStorage.setItem("position", JSON.stringify(mainWindow.getPosition()));
});

app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Handle window controls via IPC
ipcMain.on('shell:open', () => {
  const pageDirectory = __dirname.replace('app.asar', 'app.asar.unpacked')
  const pagePath = path.join('file://', pageDirectory, 'index.html')
  shell.openExternal(pagePath)
})
