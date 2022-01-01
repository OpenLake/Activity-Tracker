import { join } from 'path';
import { BrowserWindow, app, Tray, Menu, nativeImage } from 'electron';
import { startTracker } from './tracker';

const appName = 'Activity Tracker';
const isDev = !app.isPackaged;
const height = 600;
const width = 800;
/** @type {Tray} */
let tray;

function createWindow() {
	// Create the browser window.
	const window = new BrowserWindow({
		title: appName,
		width,
		height,
		frame: true,
		show: true,
		resizable: true,
		autoHideMenuBar: true,
		fullscreenable: true,
		webPreferences: {
			preload: join(__dirname, 'preload.js'),
		},
	});

	const port = process.env.UI_PORT || 3000;
	const url = isDev
		? `http://localhost:${port}`
		: join(__dirname, '../src/out/index.html');

	// and load the index.html of the app.
	if (isDev) {
		window?.loadURL(url);
	} else {
		window?.loadFile(url);
	}
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	const icon = nativeImage.createFromPath(
		join(__dirname, '../assets/icon.png'),
	);
	tray = new Tray(icon);
	// add click listener to tray icon
	tray.on('click', () => createWindow());
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Open', click: () => createWindow() },
		{ label: 'Close', click: () => app.quit() },
	]);

	tray.setContextMenu(contextMenu);
	tray.setToolTip(appName);
	tray.setTitle(appName);

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Empty listener to prevent closing the app when all windows are closed
app.on('window-all-closed', () => {});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
startTracker();
import '../../server/app';
import AutoLaunch from 'auto-launch';

if (app.isPackaged) {
	const autolauncher = new AutoLaunch({
		name: 'Activity-Tracker',
		path: process.execPath,
		isHidden: true,
	});
	autolauncher
		.isEnabled()
		.then(isEnabled => {
			if (isEnabled) {
				return;
			}
			autolauncher.enable();
			console.log('Enabled autolaunch');
		})
		.catch(err => {
			console.error("Couldn't enable autolaunch");
			console.error(err);
		});
}
