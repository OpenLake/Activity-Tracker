'use strict';

var _json = require('./storage/json.js');

var _server = require('./storage/server.js');

var _tracker = require('./tracker.js');

var _getIcon = _interopRequireDefault(require('./getIcon.js'));

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

const interval = 2000;
const storages = [
	new _json.JSONStorage(),
	new _server.ServerStorage('http://localhost:3000'),
];
const activeWindowWatcher = new _tracker.ActiveWindowWatcher(
	interval,
	activity => {
		for (const storage of storages) {
			storage.saveActivity(activity);
		}

		console.log((0, _getIcon.default)(activity.name, activity.path));
	},
);
activeWindowWatcher.initialize();
