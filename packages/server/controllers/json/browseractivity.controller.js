import fs from 'fs';
import path from 'path';
import envPaths from 'env-paths';
import { extract } from './utils.js';

const dirname = envPaths('ActivityTracker').data;
const browserActivityDir = path.join(dirname, '/browser-activity');
fs.mkdirSync(browserActivityDir, { recursive: true });

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
	return path.join(browserActivityDir, filename);
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
		'title',
		'url',
		'favicon',
		'startTime',
		'endTime',
	]);
	const filepath = getFilePath(new Date(packet.endTime));
	const data = getActivities(new Date(packet.endTime));
	data.push(packet);
	fs.writeFileSync(filepath, JSON.stringify(data, null, 4));

	res.send('Activity created successfully');
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
