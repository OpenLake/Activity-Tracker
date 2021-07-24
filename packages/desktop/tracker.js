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
		let endDate = new Date();
		let endTime = Date.now();
		let startTime = this.startTime;

		//writing the json file
		const {
			owner: { name },
			title,
			url,
		} = this.app;

		function appDataObject(startTime, endTime) {
			return {
				name,
				title: title ?? 'No data',
				url,
				startTime,
				endTime,
			};
		}

		let data = appDataObject(startTime, endTime);

		file.push(data);

		writeFileSync(this.filePath, JSON.stringify(file, null, 2));
	}

	/*     Checks the active window is specific time interval
	and whenever the active window changes stores the time difference by calling storeTime() function */

	tracker() {
		setInterval(async () => {
			const activewindow = await activeWin();

			if (!this.app) {
				let newdate = new Date();
				this.startTime = Date.now();
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
			writeFileSync(this.filePath, '[]');
		}
		console.log("Initializing tracker: ⌛⌚")
		this.tracker();
	}
}

export default ActiveWindowObject;
