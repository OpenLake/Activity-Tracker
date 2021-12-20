'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true,
});
exports.JSONStorage = void 0;

var _fs = _interopRequireDefault(require('fs'));

var _path = _interopRequireDefault(require('path'));

var _envPaths = _interopRequireDefault(require('env-paths'));

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

const defaultDir = (0, _envPaths.default)('ActivityTracker').data;
/**
 * Get date string of format YYYY-MM-DD
 * @param {Date} date
 */

const getISODateString = date => date.toISOString().slice(0, 10);

class JSONStorage {
	constructor(dir = defaultDir) {
		this.activityDir = _path.default.join(dir, 'activity');

		_fs.default.mkdirSync(this.activityDir, {
			recursive: true,
		});

		console.log(`Storing in ${this.activityDir}`);
	}
	/**
	 * @param {Date} date
	 */

	_getFilepath(date) {
		const filename = `${getISODateString(date)}.json`;
		return _path.default.join(this.activityDir, filename);
	}

	saveActivity(activity) {
		const filepath = this._getFilepath(new Date(activity.endTime));

		const data = this.getActivities(new Date(activity.endTime));
		data.push(activity);

		_fs.default.writeFileSync(filepath, JSON.stringify(data));
	}
	/**
	 * Get Activities for a given date
	 * @param {Date} date
	 * @returns {Object[]}
	 */

	getActivities(date) {
		let data = [];

		try {
			data = JSON.parse(_fs.default.readFileSync(this._getFilepath(date)));
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

exports.JSONStorage = JSONStorage;
