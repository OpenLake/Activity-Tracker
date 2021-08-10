import Activity from '../models/activity.model.js';

export const all_apps = async (req, res) => {
	const query = [
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
