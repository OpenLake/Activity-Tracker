const Activity = require('../models/activity.model');

exports.activity_create = (req, res, next) => {
	const { name, title, startTime, endTime } = req.body;
	const activity = new Activity({ name, title, startTime, endTime });

	activity.save(err => {
		if (err) return next(err);
	});

	res.send('Activity created succecssfully');
};

exports.all_activities = (req, res, next) => {
	Activity.find({}, (err, activity) => {
		if (err) return next(err);
		res.json(activity);
	});
};
