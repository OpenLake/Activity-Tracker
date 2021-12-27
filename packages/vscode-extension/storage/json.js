const fs = require('fs');
const path = require('path');

const defaultDir = __dirname;
const vscodeActivityDir = path.join(defaultDir, '/vscode-activity');
fs.mkdirSync(vscodeActivityDir, { recursive: true });

/**
 * Get date string of format YYYY-MM-DD
 * @param {Date} date
 */
function getISODateString(date) {
	return date.toISOString().slice(0, 10);
}

/**
 * @param {Date} date
 */
function getFilePath(date) {
	const filename = `${getISODateString(date)}.json`;
	return path.join(vscodeActivityDir, filename);
}

/**
 * Save Activites to json file
 * @param  {} activity
 */
function saveActivity(activity) {
	const filepath = getFilePath(new Date(activity.endTime));
	const data = getActivities(new Date(activity.endTime));
	data.push(activity);
	fs.writeFileSync(filepath, JSON.stringify(data, null, 4));
	console.log(activity);
}

/**
 * Get Activities for a given date
 * @param {Date} date
 * @returns {Object[]}
 */
function getActivities(date) {
	let data = [];
	try {
		data = JSON.parse(fs.readFileSync(getFilePath(date)));
	} catch (error) {
		if (error.code === 'ENOENT') {
			data = [];
		} else {
			throw error;
		}
	}
	return data;
}

module.exports = {
	saveActivity,
};
