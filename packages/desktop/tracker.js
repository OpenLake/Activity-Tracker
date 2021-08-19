import activeWin from 'active-win';
import axios from 'axios';
import { existsSync, writeFileSync, readFileSync } from 'fs';
import getIcon from './getIcon.js';

export class ActiveWindowWatcher {
	constructor(filePath, interval) {
		this.startTime = null;
		this.app = null;
		this.filePath = filePath;
		this.interval = interval;
	}

	/**
	 * Storing the start time of the active window
	 * Collecting data of the window which will be active
	 */
	storeTime() {
		const rawData = readFileSync(this.filePath);
		const file = JSON.parse(rawData);
		const endTime = Date.now();
		const startTime = this.startTime;

		//writing the json file
		const {
			owner: { name },
			owner: { path },
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

		const data = appDataObject(startTime, endTime);

		console.log(getIcon(name, path));

		// Making a post request to '/store'
		axios
			.post('http://localhost:3000/activities', {
				name: name,
				title: title,
				startTime: startTime,
				endTime: endTime,
			})
			.then(res => {
				console.log(`statusCode: ${res.status}`);
				console.log(res.data);
			})
			.catch(error => {
				console.error(error);
			});

		file.push(data);

		writeFileSync(this.filePath, JSON.stringify(file, null, 2));
	}

	/**
	 * Checks the active window is specific time interval
	 * and whenever the active window changes stores the time difference by calling {@link ActiveWindowWatcher.storeTime} function
	 */
	tracker() {
		setInterval(async () => {
			const activeWindow = await activeWin();

			if (!this.app) {
				this.startTime = Date.now();
				this.app = activeWindow;
			}

			//If the active window is changed store the used time data.
			if (activeWindow.title !== this.app.title) {
				this.storeTime();
				this.app = null;
			}
			console.log(activeWindow.title);
		}, this.interval);
	}

	initialize() {
		const isFilePresent = existsSync(this.filePath);

		if (!isFilePresent) {
			writeFileSync(this.filePath, '[]');
		}

		this.tracker();
	}
}
