import { getDataFromJson, groupBy } from './utils.js';

export const all_apps = async (req, res) => {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	const after = new Date(req.query.after ?? yesterday.toISOString());
	const before = new Date(req.query.before ?? today.toISOString());
	const name = req.query.name;

	let activities = getDataFromJson(after, before);

	const filterActivities = a => {
		return (
			(!name || a.name === name) &&
			(!before || a.startTime < before) &&
			(!after || a.startTime >= after)
		);
	};

	activities = activities.filter(filterActivities);

	let apps = groupBy(activities, 'name');
	apps = Object.keys(apps)
		.map(appName => {
			const appActivities = apps[appName];
			const durations = appActivities.map(a => a.endTime - a.startTime);

			return {
				_id: appName,
				name: appName,
				title: [...new Set(appActivities.map(a => a.title))],
				duration: durations.reduce((a, b) => a + b),
			};
		})
		.sort((a, b) => b.duration - a.duration);

	res.json(apps);
};

export const app_usage = async (req, res) => {
	const today = new Date();

	const after = new Date(req.query.after ?? today.toISOString());
	const before = new Date(req.query.before ?? today.toISOString());

	let activities = getDataFromJson(after, before); // get this list from json file as per the date

	if (req.query.name) {
		activities = activities.filter(a => a.name === req.query.name);
	}
	activities = activities.map(a => ({
		...a,
		dayOfWeek: new Date(a.startTime).getDay(),
	}));

	let activityByDayOfWeek = groupBy(activities, 'dayOfWeek');
	const usageByDayOfWeek = Object.keys(activityByDayOfWeek).map(dayOfWeek => {
		const dayActivities = activityByDayOfWeek[dayOfWeek];
		const durations = dayActivities.map(a => a.endTime - a.startTime);

		return {
			_id: dayOfWeek,
			name: [...new Set(dayActivities.map(a => a.name))],
			duration: durations.reduce((a, b) => a + b),
		};
	});

	res.json(usageByDayOfWeek);
};
