import fs from 'fs';
import path from 'path';
import envPaths from 'env-paths';
import { extract, groupBy } from './utils.js';

const dirname = envPaths('ActivityTracker').data;
const vscodeActivityDir = path.join(dirname, '/vscode-activity');
fs.mkdirSync(vscodeActivityDir, { recursive: true });

/**
 * Get date string of format YYYY-MM-DD
 * @param {Date} date
 */
const getISODateString = date => date.toISOString().slice(0, 10);

/**
 * @param {Date} date
 */
function getFilePath(date) {
	const filename = `${getISODateString(date)}.json`;
	return path.join(vscodeActivityDir, filename);
}

/**
 * Get Activities for a given date
 * @param {Date} date
 * @returns {Object[]}
 */
function getActivities(date) {
	let data = [];
	try {
		data = JSON.parse(fs.readFileSync(getFilePath(date), 'utf-8'));
	} catch (error) {
		if (error.code === 'ENOENT') {
			data = [];
		} else {
			throw error;
		}
	}
	return data;
}

const getDataFromJson = (start, end) => {
	start = new Date(getISODateString(new Date(start)));
	end = new Date(getISODateString(new Date(end)));

	let result = [];
	let date = start;

	while (date <= end) {
		try {
			result.push(...JSON.parse(fs.readFileSync(getFilePath(date), 'utf-8')));
		} catch (error) {
			console.log(`No data for ${getISODateString(date)}`);
		}
		date.setDate(date.getDate() + 1);
	}
	return result;
};

export const activity_create = (req, res) => {
	const packet = extract(req.body, [
		'projectPath',
		'projectName',
		'fileName',
		'gitBranch',
		'languageId',
		'remoteUrl',
		'startTime',
		'endTime',
	]);
	const filepath = getFilePath(new Date(packet.endTime));
	const data = getActivities(new Date(packet.endTime));
	data.push(packet);
	fs.writeFileSync(filepath, JSON.stringify(data, null, 4));

	res.send('Activity created succecssfully');
};

export const all_activities = (req, res) => {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	const after = req.query.after ?? yesterday.toISOString();
	const before = req.query.before ?? today.toISOString();

	const activities = getDataFromJson(after, before);
	res.json(activities);
};

export const all_projects = async (req, res) => {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	const after = new Date(req.query.after ?? yesterday.toISOString());
	const before = new Date(req.query.before ?? today.toISOString());
	const name = req.query.name;

	let activities = getDataFromJson(after, before);

	const filterActivities = a => {
		return (
			(!name || a.projectName === name) &&
			(!before || a.startTime < before) &&
			(!after || a.startTime >= after)
		);
	};

	activities = activities.filter(filterActivities);

	let apps = groupBy(activities, 'projectName');
	apps = Object.keys(apps)
		.map(appName => {
			const appActivities = apps[appName];
			const durations = appActivities.map(a => a.endTime - a.startTime);

			return {
				_id: appName,
				name: appName,
				// fileName: [...new Set(appActivities.map(a => a.fileName))],
				duration: durations.reduce((a, b) => a + b),
			};
		})
		.sort((a, b) => b.duration - a.duration);

	res.json(apps);
};

export const project_usage = async (req, res) => {
	const today = new Date();

	const after = new Date(req.query.after ?? today.toISOString());
	const before = new Date(req.query.before ?? today.toISOString());

	let activities = getDataFromJson(after, before); // get this list from json file as per the date

	if (req.query.name) {
		activities = activities.filter(a => a.projectName === req.query.name);
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

export const all_languages = async (req, res) => {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	const after = new Date(req.query.after ?? yesterday.toISOString());
	const before = new Date(req.query.before ?? today.toISOString());
	const name = req.query.name;

	let activities = getDataFromJson(after, before);

	const filterActivities = a => {
		return (
			(!name || a.languageId === name) &&
			(!before || a.startTime < before) &&
			(!after || a.startTime >= after)
		);
	};

	activities = activities.filter(filterActivities);

	let apps = groupBy(activities, 'languageId');
	apps = Object.keys(apps)
		.map(appName => {
			const appActivities = apps[appName];
			const durations = appActivities.map(a => a.endTime - a.startTime);

			return {
				_id: appName,
				name: appName,
				// fileName: [...new Set(appActivities.map(a => a.fileName))],
				duration: durations.reduce((a, b) => a + b),
			};
		})
		.sort((a, b) => b.duration - a.duration);

	res.json(apps);
};
