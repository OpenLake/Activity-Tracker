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
	Activity.find({}, (err, activity) => {
		if (err) return next(err);
		res.json(activity);
	});
};
