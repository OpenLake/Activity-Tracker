import activeWin from 'active-win';
import { existsSync, writeFileSync, readFileSync } from 'fs';

class ActiveWindowObject {
	constructor(filePath, interval) {
		(this.startTime = null), (this.app = null);
		this.filePath = filePath;
		this.interval = interval;
	}

	/*Storing the start time of the active window
  Collecting data of the window which will be active */

	storeTime() {
		let rawdata = readFileSync(this.filePath);
		const file = JSON.parse(rawdata);
		let endTime = new Date();
		let startTime = this.startTime;

		//writing the json file
		const {
			owner: { name },
			title,
			url,
		} = this.app;

		file[name] = file[name] ?? {};
		file[name][title] = file[name][title] ?? { timeSpent: 0, url };

		const timeDifferernce =
			Math.abs(startTime.getTime() - endTime.getTime()) / 1000;
		file[name][title].timeSpent += Math.round(timeDifferernce);
		writeFileSync(this.filePath, JSON.stringify(file, null, 2));
	}

	/*     Checks the active window is specific time interval
	and whenever the active window changes stores the time difference by calling storeTime() function */

	tracker() {
		setInterval(async () => {
			const activewindow = await activeWin();

			if (!this.app) {
				this.startTime = new Date();
				this.app = activewindow;
			}

			//If the active window is changed store the used time data.
			if (activewindow.title !== this.app.title) {
				this.storeTime();
				this.app = null;
			}
			console.log(activewindow.title);
		}, this.interval);
	}

	initialize() {
		const isFilePresent = existsSync(this.filePath);

		if (!isFilePresent) {
			writeFileSync(this.filePath, '{}');
		}

		this.tracker();
	}
}

export default ActiveWindowObject;
