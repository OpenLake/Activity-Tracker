import Activity from '../models/activity.model.js';

export const all_apps = async (req, res) => {
	let apps = await Activity.aggregate([
		{
			$group: {
				_id: '$name',
				name: { $first: '$name' },
				title: { $addToSet: '$title' },
				duration: { $sum: { $subtract: ['$endTime', '$startTime'] } },
			},
		},
	]);

	res.json(apps);
};
