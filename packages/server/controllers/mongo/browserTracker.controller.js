import browserActivity from '../../models/browserTracker.model.js';

export const activity_create = (req, res, next) => {
	const { title, url, favicon, startTime, endTime } = req.body;
	const browseractivity = new browserActivity({
		title,
		url,
		favicon,
		startTime,
		endTime,
	});
	browseractivity.save(err => {
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

	browserActivity.find(
		{
			startTime: { $gte: after, $lt: before },
		},
		(err, activity) => {
			if (err) return next(err);
			res.json(activity);
		},
	);
};
