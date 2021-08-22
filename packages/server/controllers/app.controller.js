import Activity from '../models/activity.model.js';

export const all_apps = async (req, res) => {
	const today = new Date();
	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const after = req.query.after ?? today.getTime();
	const before = req.query.before ?? tomorrow.getTime();

	const query = [
		{
			$match: {
				startTime: { $gte: after, $lt: before },
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
	if (req.query.name) query.unshift({ $match: { name: req.query.name } });

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
