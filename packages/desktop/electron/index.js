import { join } from 'path';
import { BrowserWindow, app } from 'electron';
import { startTracker } from './tracker';

const isDev = !app.isPackaged;
const height = 600;
const width = 800;

function createWindow() {
	// Create the browser window.
	const window = new BrowserWindow({
		width,
		height,
		frame: true,
		show: true,
		resizable: true,
		fullscreenable: true,
		webPreferences: {
			preload: join(__dirname, 'preload.js'),
		},
	});

	const port = process.env.UI_PORT || 3001;
	const url = isDev
		? `http://localhost:${port}`
		: join(__dirname, '../src/out/index.html');

	// and load the index.html of the app.
	if (isDev) {
		window?.loadURL(url);
	} else {
		window?.loadFile(url);
	}
	window.setAutoHideMenuBar(true);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
	createWindow();

	app.on('activate', () => {
		// On macOS it's common to re-create a window in the app when the
		// dock icon is clicked and there are no other windows open.
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

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
