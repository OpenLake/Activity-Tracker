const Activity = require('../models/activity.model');

exports.all_apps = async (req, res, next) => {
	let apps = await Activity.aggregate([
		{
			$group: {
				_id: '$name',
				name: { $addToSet: '$title' },
				duration: { $sum: { $subtract: ['$endTime', '$startTime'] } },
			},
		},
	]);

	res.json(apps);
};
