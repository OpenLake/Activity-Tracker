import Activity from '../models/activity.model.js';

export const activity_create = (req, res, next) => {
	const { name, title, startTime, endTime } = req.body;
	const activity = new Activity({ name, title, startTime, endTime });

	activity.save(err => {
		if (err) return next(err);
	});

	res.send('Activity created succecssfully');
};

export const all_activities = (req, res, next) => {
	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const after = req.query.after ?? today.getTime();
	const before = req.query.before ?? tomorrow.getTime();

	Activity.find(
		{ startTime: { $gte: after, $lt: before } },
		(err, activity) => {
			if (err) return next(err);
			res.json(activity);
		},
	);
};
