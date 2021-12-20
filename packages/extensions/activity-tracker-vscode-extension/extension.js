// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

// const storeTime = (projectname, filename, starttime) => {
// 	const endTime = Date.now();

// }

class ActivefileWatcher {
	/**
	 * @param {number} interval Polling interval
	 *
	 */
	constructor(interval = 1000) {
		this.startTime = null;
		this.activefile = null;
		this.activeProject = null;
		this.language = null;
		// this.changeCallback = changeCallback;
		this.interval = interval;
	}

	storeTime() {
		const endTime = Date.now();
		const startTime = this.startTime;
		const projectname = this.activeProject;
		const filename = this.activefile;
		const languageId = this.language;
		const data = {
			projectname,
			filename,
			languageId,
			startTime,
			endTime,
		};

		console.log(data);
	}
	tracker() {
		setInterval(() => {
			let currentProject = vscode.workspace.name;
			let currentFile = vscode.window.activeTextEditor.document.fileName;
			let currentLanguageId =
				vscode.window.activeTextEditor.document.languageId;

			if (currentFile === undefined) return;

			if (!this.activefile) {
				this.startTime = Date.now();
				this.activefile = currentFile;
				this.activeProject = currentProject;
				this.language = currentLanguageId;
			}

			//If the active file is changed store the used time data.
			if (currentFile !== this.activefile) {
				this.storeTime();
				this.activefile = null;
				this.activeProject = null;
				this.language = null;
			}
			// console.log(file);
		}, this.interval);
	}

	initialize() {
		this.tracker();
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log(
		'Congratulations, your extension "activity-tracker" is now active!',
	);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json

	context.subscriptions.push(
		vscode.commands.registerCommand(
			'activity-tracker-vscode-extension.activitytracker',
			function () {
				// The code you place here will be executed every time your command is executed

				// Display a message box to the user
				vscode.window.showInformationMessage('Activity Tracker Started');
				const fileWatcher = new ActivefileWatcher(1000);
				fileWatcher.initialize();
			},
		),
	);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate,
};
