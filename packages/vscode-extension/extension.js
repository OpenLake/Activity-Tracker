const vscode = require('vscode');
const { saveActivities } = require('./storage/server.js');

class ActivefileWatcher {
	/**
	 * @param {number} interval Polling interval
	 */
	constructor(interval = 1000, changeCallback) {
		this.startTime = null;
		this.activefile = null;
		this.activeProject = null;
		this.language = null;
		this.gitBranch = null;
		this.remoteUrl = null;
		this.projectPath = null;
		this.changeCallback = changeCallback;
		this.interval = interval;
		this.intervalId = null;
	}

	storeTime() {
		const endTime = Date.now();
		const startTime = this.startTime;
		const projectName = this.activeProject;
		const fileName = this.activefile;
		const languageId = this.language;
		const gitBranch = this.gitBranch;
		const remoteUrl = this.remoteUrl;
		const projectPath = this.projectPath;
		const data = {
			projectName,
			projectPath,
			fileName,
			languageId,
			gitBranch,
			remoteUrl,
			startTime,
			endTime,
		};

		this.changeCallback(data);
	}
	tracker() {
		this.intervalId = setInterval(() => {
			let currentProjectPath = vscode.workspace.workspaceFolders[0].uri.path;
			let currentProject = vscode.workspace.name;
			let currentFile = null;
			let currentLanguageId = null;
			if (vscode.window.activeTextEditor !== undefined) {
				currentFile = vscode.window.activeTextEditor.document.fileName;
				currentLanguageId = vscode.window.activeTextEditor.document.languageId;
			}

			// git data
			let gitExtension = vscode.extensions.getExtension('vscode.git').exports;
			let api = gitExtension.getAPI(1);
			let repo = api.repositories[0];
			let head = repo.state.HEAD;
			let { name: branch } = head;
			let gitBranch = branch;
			let remotes = repo.state.remotes;
			let remoteUrl;
			if (remotes[1]) {
				remoteUrl = remotes[1].fetchUrl;
			} else {
				remoteUrl = remotes[0].fetchUrl;
			}

			// If the active file is changed store the used time data.
			// And store the new data.
			if (currentFile !== this.activefile) {
				this.storeTime();
				this.activefile = currentFile;
				this.activeProject = currentProject;
				this.projectPath = currentProjectPath;
				this.language = currentLanguageId;
				this.gitBranch = gitBranch;
				this.remoteUrl = remoteUrl;
				this.startTime = Date.now();
			}
			// console.log(file);
		}, this.interval);
	}

	initialize() {
		!this.intervalId && this.tracker();
	}
	stop() {
		this.intervalId && clearInterval(this.intervalId);
	}
}

/** @type {ActiveFileWatcher} */
let fileWatcher = null;

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log(
		'Congratulations, your extension "activity-tracker" is now active!',
	);

	// creating a new vscode command
	context.subscriptions.push(
		vscode.commands.registerCommand(
			'activity-tracker-vscode-extension.activitytracker',
			function () {
				// The code you place here will be executed every time your command is executed

				// Display a message box to the user
				vscode.window.showInformationMessage('Activity Tracker Started');

				if (!fileWatcher) {
					fileWatcher = new ActivefileWatcher(1000, activity => {
						saveActivities(activity);
					});
				}
				fileWatcher.initialize();
			},
		),
	);

	// executing the registered command
	vscode.commands.executeCommand(
		'activity-tracker-vscode-extension.activitytracker',
	);
}

// this method is called when your extension is deactivated
function deactivate() {
	fileWatcher && fileWatcher.stop();
}

module.exports = {
	activate,
	deactivate,
};
