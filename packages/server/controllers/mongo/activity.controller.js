import Activity from '../../models/activity.model.js';

export const activity_create = (req, res, next) => {
	const { name, title, startTime, endTime } = req.body;
	const _owner = req.user._id;
	const activity = new Activity({ _owner, name, title, startTime, endTime });

	activity.save(err => {
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

	// TODO: Paginate results
	Activity.find(
		{
			_owner: req.user._id,
			startTime: { $gte: after, $lt: before },
		},
		(err, activity) => {
			if (err) return next(err);
			res.json(activity);
		},
	);
};
