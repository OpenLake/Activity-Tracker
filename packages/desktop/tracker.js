import activeWin from 'active-win';
import fs from 'fs-extra';
import _ from 'lodash';
import path from 'path';

//const __dirname = path.resolve();
//const filePath = path.join(__dirname, "activites.json")
//const interval = 2000

class ActiveWindowObject {
	constructor(filePath, interval) {
		(this.startTime = null), //Storing the start time of the active window
			(this.app = null); //Collecting data of the window which will be active
		this.filePath = filePath;
		this.interval = interval;
	}

	async storeTime() {
		const file = await fs.readJSON(this.filePath);
		let endTime = new Date();
		let startTime = this.startTime;

		//writing the json file
		const {
			owner: { name },
			title,
			url,
		} = this.app;
		_.defaultsDeep(file, { [name]: { [title]: { timeSpent: 0, url } } });
		const timeDifferernce =
			Math.abs(startTime.getTime() - endTime.getTime()) / 1000;
		file[name][title].timeSpent += Math.round(timeDifferernce);
		await fs.writeJSON(this.filePath, file, { spaces: 2 });
	}

	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	//    Checks the active window is specific time interval                                              ///
	// and whenever the active window changes stores the time difference by calling storeTime() function ////
	/////////////////////////////////////////////////////////////////////////////////////////////////////////
	tracker() {
		setInterval(async () => {
			const activewindow = await activeWin();

			if (!this.app) {
				this.startTime = new Date();
				this.app = activewindow;
			}

			//If the active window is changed store the used time data.
			if (activewindow.title !== this.app.title) {
				await this.storeTime();
				this.app = null;
			}
			console.log(activewindow.title);
		}, this.interval);
	}

	async initialize() {
		const isFilePresent = await fs.pathExists(this.filePath);

		if (!isFilePresent) {
			await fs.writeJSON(this.filePath, {});
		}

		this.tracker();
	}
}

export default ActiveWindowObject;
