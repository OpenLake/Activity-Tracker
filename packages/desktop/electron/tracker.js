import { JSONStorage } from './storage/json.js';
import { ServerStorage } from './storage/server.js';
import { ActiveWindowWatcher } from './watchers/active-window.js';
import getIcon from './getIcon.js';

export function startTracker() {
	const interval = 2000;

	const storages = [
		new JSONStorage(),
		new ServerStorage('http://localhost:32768/api'),
	];

	const activeWindowWatcher = new ActiveWindowWatcher(interval, activity => {
		for (const storage of storages) {
			storage.saveActivity(activity);
		}

		console.log(getIcon(activity.name, activity.path));
	});

	activeWindowWatcher.initialize();
}
