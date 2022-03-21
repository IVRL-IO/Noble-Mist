import {app, BrowserWindow} from 'electron';
import {Deeplink} from 'electron-deeplink';
import * as isDev from 'electron-is-dev';
import {createProtocol} from "vue-cli-plugin-electron-builder/lib";
import * as path from "path";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

let mainWindow: BrowserWindow;
const protocol = isDev ? 'dev-app' : 'prod-app';
let deeplink: Deeplink;

if (require('electron-squirrel-startup')) {
    app.quit();
}

const startUrl = process.env.ELECTRON_START_URL || url.format(
    {
        pathname: path.join(__dirname, '/dist_electron/index.js'),
        protocol: 'file:',
        slashes: true
    });

const createWindow = () => {
    mainWindow = new BrowserWindow({
                                       width: 800,
                                       height: 600,
                                       webPreferences: {
                                           nodeIntegration: true,
                                       },
                                   });

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
    deeplink = new Deeplink({app, mainWindow, protocol, isDev, debugLogging: true});

    deeplink.on('received', (link) => {
        mainWindow.webContents.send('received-link', link);
    });

    createProtocol("noble-mist");
    // Load the index.html when not in development
    mainWindow.loadURL("noble-mist://./index.html");

    // mainWindow.webContents.openDevTools();

    mainWindow.webContents.on('did-finish-load', () => {
        mainWindow.webContents.send('set-protocol', deeplink.getProtocol());
        mainWindow.webContents.send('set-logfile', deeplink.getLogfile());
    });

    if (process.env.WEBPACK_DEV_SERVER_URL) {
        // Load the url of the dev server if in development mode
        await mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
        if (!process.env.IS_TEST) mainWindow.webContents.openDevTools();
        console.log(mainWindow.webContents.session.getUserAgent());
    } else {
        // Load the index.html when not in development
        mainWindow.loadURL(startUrl);
        mainWindow.webContents.openDevTools();
    }
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});