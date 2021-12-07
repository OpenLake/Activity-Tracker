import fs from 'fs';
import path from 'path';
import envPaths from 'env-paths';

const defaultDir = envPaths('ActivityTracker').data;

/**
 * Get date string of format YYYY-MM-DD
 * @param {Date} date
 */
const getISODateString = date => date.toISOString().slice(0, 10);

export class JSONStorage {
	constructor(dir = defaultDir) {
		this.activityDir = path.join(dir, 'activity');
		fs.mkdirSync(this.activityDir, { recursive: true });
		console.log(`Storing in ${this.activityDir}`);
	}

	/**
	 * @param {Date} date
	 */
	_getFilepath(date) {
		const filename = `${getISODateString(date)}.json`;
		return path.join(this.activityDir, filename);
	}

	saveActivity(activity) {
		const filepath = this._getFilepath(new Date(activity.endTime));
		const data = this.getActivities(new Date(activity.endTime));
		data.push(activity);
		fs.writeFileSync(filepath, JSON.stringify(data));
	}

	/**
	 * Get Activities for a given date
	 * @param {Date} date
	 * @returns {Object[]}
	 */
	getActivities(date) {
		let data = [];
		try {
			data = JSON.parse(fs.readFileSync(this._getFilepath(date)));
		} catch (error) {
			if (error.code === 'ENOENT') {
				data = [];
			} else {
				throw error;
			}
		}
		return data;
	}
}
