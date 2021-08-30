import { getDataFromJson } from './utils.js';

export const activity_create = (req, res, next) => {
	res.send('Activity created succecssfully');
};

export const all_activities = (req, res, next) => {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	const after = req.query.after ?? yesterday.toISOString();
	const before = req.query.before ?? today.toISOString();

	const activities = getDataFromJson(after, before);
	res.json(activities);
};
