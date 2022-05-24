import { getDataFromJson, groupBy } from './utils.js';
import dayjs from 'dayjs';

/**
 * @type {import('express').RequestHandler<{}, any, any, {tz: string, start: string, end: string, name?: string}>}
 */
export const all_apps = async (req, res) => {
	const tz = req.query.tz || dayjs.tz.guess();
	const start = req.query.start
		? dayjs(req.query.start).tz(tz)
		: dayjs().tz(tz).startOf('day');
	const end = req.query.end
		? dayjs(req.query.end).tz(tz)
		: dayjs().tz(tz).endOf('day');

	const { name } = req.query;

	let activities = getDataFromJson(start, end);
	console.log(activities.length);

	activities = activities.filter(a => !name || a.name === name);

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

/**
 * @type {import('express').RequestHandler<{}, any, any, {tz: string, start: string, end: string, name: string}>}
 */
export const app_usage = async (req, res) => {
	const tz = req.query.tz || dayjs.tz.guess();
	const start = req.query.start
		? dayjs(req.query.start).tz(tz)
		: dayjs().tz(tz).startOf('week');
	const end = req.query.end
		? dayjs(req.query.end).tz(tz)
		: dayjs().tz(tz).endOf('day');

	let activities = getDataFromJson(start, end); // get this list from json file as per the date

	if (req.query.name) {
		activities = activities.filter(a => a.name === req.query.name);
	}
	activities = activities.map(a => ({
		...a,
		date: dayjs(a.startTime).tz(tz).format('YYYY-MM-DD'),
	}));

	let activityByDate = groupBy(activities, 'date');
	const usageByDate = Object.keys(activityByDate).map(date => {
		const dayActivities = activityByDate[date];
		const duration = dayActivities.reduce(
			(a, curr) => a + curr.endTime - curr.startTime,
			0,
		);

		return { date, duration };
	});

	res.json(usageByDate);
};
