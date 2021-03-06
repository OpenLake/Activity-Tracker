import VscodeActivity from '../../models/vscodeActivity.model.js';
import { extract } from '../json/utils.js';

export const activity_create = (req, res, next) => {
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
	const vscodeactivity = new VscodeActivity(packet);
	vscodeactivity.save(err => {
		if (err) return next(err);
	});

	res.send('Activity created succecssfully');
};

export const all_activities = (req, res, next) => {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	const after = req.query.after ?? yesterday.toISOString();
	const before = req.query.before ?? today.toISOString();

	VscodeActivity.find(
		{
			startTime: { $gte: after, $lt: before },
		},
		(err, activity) => {
			if (err) return next(err);
			res.json(activity);
		},
	);
};
