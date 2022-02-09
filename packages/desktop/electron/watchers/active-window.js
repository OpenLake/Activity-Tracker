import activeWin from 'active-win';
import { powerMonitor } from 'electron';

const IDLE_TIME_THRESHOLD = 60;
export class ActiveWindowWatcher {
	/**
	 * @param {number} interval Polling interval
	 * @param {(activity) => void} changeCallback
	 */
	constructor(interval = 1000, changeCallback) {
		this.prevWindowStartTime = null;
		this.prevWindow = null;
		this.changeCallback = changeCallback;
		this.interval = interval;
		this.prevActive = false;
	}

	/**
	 * Storing the start time of the active window
	 * Collecting data of the window which will be active
	 */
	endPrevWindow(endTime) {
		endTime = endTime ?? Date.now();
		const startTime = this.prevWindowStartTime;

		const {
			owner: { name, path },
			title,
			url,
		} = this.prevWindow;

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
	 * and whenever the active window changes stores the time difference by calling {@link ActiveWindowWatcher.endPrevWindow} function
	 */
	tracker() {
		setInterval(async () => {
			const now = Date.now();
			const activeWindow = await activeWin();
			const idleTime = powerMonitor.getSystemIdleTime();
			// process.stdout.write(idleTime + '\n');

			const startNewActivity = () => {
				this.prevWindow = activeWindow;
				this.prevWindowStartTime = now;
				process.stdout.write('\n' + activeWindow.title);
			};

			if (!this.prevActive && idleTime == 0) {
				// System was previously idle and is now active

				// Start new activity and store that the system is now active
				startNewActivity();
				this.prevActive = true;
				return;
			} else if (
				(this.prevActive && idleTime >= IDLE_TIME_THRESHOLD) ||
				activeWindow === undefined
			) {
				// System was previously active and is now idle for a while
				// OR there's no active window at the moment.

				// End previous block and store that the system is now idle
				this.endPrevWindow(now);
				this.prevActive = false;
				return;
			}

			if (activeWindow.title !== this.prevWindow.title) {
				// If active window has changed

				// End previous activity block and start a new one
				this.endPrevWindow(now);
				startNewActivity();
			} else {
				process.stdout.write('.');
			}
		}, this.interval);
	}

	initialize() {
		this.tracker();
	}
}
