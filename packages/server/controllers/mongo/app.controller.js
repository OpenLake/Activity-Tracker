import Activity from '../../models/activity.model.js';

export const all_apps = async (req, res) => {
	const today = new Date();
	const yesterday = new Date(today);
	yesterday.setDate(yesterday.getDate() - 1);

	const after = new Date(req.query.after ?? yesterday.toISOString());
	const before = new Date(req.query.before ?? today.toISOString());
	const name = req.query.name;

	const query = [
		{
			$match: {
				_owner: req.user._id,
			},
		},
		{
			$group: {
				_id: '$name',
				name: { $first: '$name' },
				title: { $addToSet: '$title' },
				duration: { $sum: { $subtract: ['$endTime', '$startTime'] } },
			},
		},
		{ $sort: { duration: -1, _id: 1 } },
	];

	if (name) query.unshift({ $match: { name: name } });
	if (before) query.unshift({ $match: { startTime: { $lt: before } } });
	if (after) query.unshift({ $match: { startTime: { $gte: after } } });

	const apps = await Activity.aggregate(query);

	res.json(apps);
};

export const app_usage = async (req, res) => {
	const query = [
		{
			$project: {
				dayOfWeek: {
					$dayOfWeek: {
						$toDate: '$startTime',
					},
				},
				name: '$name',
				timeSpent: {
					$subtract: ['$endTime', '$startTime'],
				},
			},
		},
		{
			$group: {
				_id: '$dayOfWeek',
				name: {
					$addToSet: '$name',
				},
				duration: {
					$sum: '$timeSpent',
				},
			},
		},
		{ $sort: { id: 1, _id: 1 } },
	];
	if (req.query.name) query.unshift({ $match: { name: req.query.name } });

	const apps = await Activity.aggregate(query);

	res.json(apps);
};
