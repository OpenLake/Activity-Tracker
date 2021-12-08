import { ipcRenderer, contextBridge } from 'electron';

export const api = {
	/**
	 * Here you can expose functions to the renderer process
	 * so they can interact with the main (electron) side
	 * without security problems.
	 *
	 * The function below can accessed using `window.Main.sayHello`
	 * @param {string} message
	 */
	sendMessage: message => {
		ipcRenderer.send('message', message);
	},
	/**
	 * Provide an easier way to listen to events
	 * @param {string} channel
	 * @param {(data: any) => void} callback
	 */
	on: (channel, callback) => {
		ipcRenderer.on(channel, (_, data) => callback(data));
	},
};
contextBridge.exposeInMainWorld('Main', api);
/**
 * Using the ipcRenderer directly in the browser through the contextBridge ist not really secure.
 * I advise using the Main/api way !!
 */
contextBridge.exposeInMainWorld('ipcRenderer', ipcRenderer);
