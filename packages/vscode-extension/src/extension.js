import vscode from 'vscode';
import { saveActivities } from './storage/server.js';

/** @param {import('./git').Remote[]} [remotes] */
function getRemoteUrl(remotes) {
	if (!remotes || remotes.length === 0) return;
	if (remotes.length > 1) {
		const upstream = remotes.find(remote => remote.name === 'upstream');
		if (upstream) return upstream.fetchUrl;
		const origin = remotes.find(remote => remote.name === 'origin');
		if (origin) return origin.fetchUrl;
	}
	return remotes[0].fetchUrl;
}

class ActiveFileWatcher {
	/**
	 * @param {number} interval Polling interval
	 * @param {(activity: any) => void} changeCallback
	 */
	constructor(interval = 1000, changeCallback) {
		this.changeCallback = changeCallback;
		this.interval = interval;
		this.reset();
	}

	reset() {
		this.intervalId = null;
		this.currentState = {
			startTime: null,
			fileName: null,
			projectName: null,
			languageId: null,
			gitBranch: null,
			remoteUrl: null,
			projectPath: null,
		};
	}

	storeTime() {
		const endTime = Date.now();
		const data = { ...this.currentState, endTime };

		this.changeCallback(data);
	}

	tracker() {
		this.intervalId = setInterval(() => {
			const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
			const { activeTextEditor } = vscode.window;
			const fileName = activeTextEditor?.document.fileName;

			// If the active file is changed store the used time data.
			// And store the new data.
			if (fileName !== this.currentState.fileName) {
				this.storeTime();

				// git data
				/** @type {import('./git').GitExtension} */
				const gitExtension =
					vscode.extensions.getExtension('vscode.git').exports;
				const api = gitExtension.getAPI(1);
				const repo = api.repositories[0];

				const newState = {
					startTime: Date.now(),
					fileName,
					projectName: vscode.workspace.name,
					languageId: activeTextEditor?.document.languageId,
					gitBranch: repo?.state.HEAD?.name,
					remoteUrl: getRemoteUrl(repo?.state.remotes),
					projectPath: workspaceFolder?.uri.path,
				};
				this.currentState = newState;
			}
		}, this.interval);
	}

	start() {
		!this.intervalId && this.tracker();
	}

	stop() {
		this.intervalId && clearInterval(this.intervalId);
		this.reset();
	}
}

/** @type {ActiveFileWatcher} */
let fileWatcher = new ActiveFileWatcher(1000, activity => {
	saveActivities(activity);
});

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Extension "activity-tracker" is now active!');

	// creating a new vscode command
	context.subscriptions.push(
		vscode.commands.registerCommand('activity-tracker.start', () =>
			fileWatcher.start(),
		),
		vscode.commands.registerCommand('activity-tracker.stop', () =>
			fileWatcher.stop(),
		),
	);

	fileWatcher.start();
}

// this method is called when your extension is deactivated
function deactivate() {
	fileWatcher.stop();
}

module.exports = {
	activate,
	deactivate,
};
