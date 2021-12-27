// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const { saveActivity } = require('./storage/json.js');
const { saveActivities } = require('./storage/server.js');
// const json = require('./storage/json');

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
	}

	storeTime() {
		const endTime = Date.now();
		const startTime = this.startTime;
		const projectname = this.activeProject;
		const filename = this.activefile;
		const languageId = this.language;
		const gitBranch = this.gitBranch;
		const remoteurl = this.remoteUrl;
		const projectPath = this.projectPath;
		const data = {
			projectname,
			projectPath,
			filename,
			languageId,
			gitBranch,
			remoteurl,
			startTime,
			endTime,
		};

		this.changeCallback(data);
	}
	tracker() {
		setInterval(() => {
			let currentProject = vscode.workspace.name;
			let currentProjectPath = vscode.workspace.workspaceFolders[0].uri.path;
			let currentFile = vscode.window.activeTextEditor.document.fileName;
			let currentLanguageId =
				vscode.window.activeTextEditor.document.languageId;

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

			if (currentFile === undefined) return;

			if (!this.activefile) {
				this.startTime = Date.now();
				this.activefile = currentFile;
				this.activeProject = currentProject;
				this.projectPath = currentProjectPath;
				this.language = currentLanguageId;
				this.gitBranch = gitBranch;
				this.remoteUrl = remoteUrl;
			}

			//If the active file is changed store the used time data.
			if (currentFile !== this.activefile) {
				this.storeTime();
				this.activefile = null;
				this.activeProject = null;
				this.language = null;
				this.gitBranch = null;
				this.remoteUrl = null;
				this.projectPath = null;
			}
			// console.log(file);
		}, this.interval);
	}

	initialize() {
		this.tracker();
	}
}

// function saveActivity(activity) {
// console.log(activity);
// }

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

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
				const fileWatcher = new ActivefileWatcher(1000, activity => {
					saveActivity(activity);
					saveActivities(activity);
				});
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
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
