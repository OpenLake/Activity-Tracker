import { JSONStorage } from './storage/json.js';
import { ServerStorage } from './storage/server.js';
import { ActiveWindowWatcher } from './watchers/active-window.js';
import getIcon from './getIcon.js';
import { ignoreList } from './ignorelist.js';

export function startTracker() {
	const interval = 500;

	const storages = [
		new JSONStorage(),
		new ServerStorage('http://localhost:32768/api'),
	];

	const activeWindowWatcher = new ActiveWindowWatcher(interval, activity => {
		if (ignoreList.some(regex => regex.test(activity.path))) {
			return;
		}

		for (const storage of storages) {
			storage.saveActivity(activity);
		}

		console.log(getIcon(activity.name, activity.path));
	});

	activeWindowWatcher.initialize();
}
