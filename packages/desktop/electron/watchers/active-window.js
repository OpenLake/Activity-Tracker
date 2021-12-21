import activeWin from 'active-win';

export class ActiveWindowWatcher {
	/**
	 * @param {number} interval Polling interval
	 * @param {(activity) => void} changeCallback
	 */
	constructor(interval = 1000, changeCallback) {
		this.startTime = null;
		this.app = null;
		this.changeCallback = changeCallback;
		this.interval = interval;
	}

	/**
	 * Storing the start time of the active window
	 * Collecting data of the window which will be active
	 */
	storeTime() {
		const endTime = Date.now();
		const startTime = this.startTime;

		const {
			owner: { name, path },
			title,
			url,
		} = this.app;

		const data = {
			name,
			path,
			title: title ?? 'No Title',
			url,
			startTime,
			endTime,
		};

		this.changeCallback(data);
	}

	/**
	 * Checks the active window is specific time interval
	 * and whenever the active window changes stores the time difference by calling {@link ActiveWindowWatcher.storeTime} function
	 */
	tracker() {
		setInterval(async () => {
			const activeWindow = await activeWin();

			if (activeWindow === undefined) return;

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
		this.tracker();
	}
}
