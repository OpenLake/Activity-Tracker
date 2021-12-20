'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true,
});
exports.ServerStorage = void 0;

var _axios = _interopRequireDefault(require('axios'));

var _express = _interopRequireDefault(require('express'));

var _fs = _interopRequireDefault(require('fs'));

var nodeMachineId = _interopRequireWildcard(require('node-machine-id'));

function _getRequireWildcardCache(nodeInterop) {
	if (typeof WeakMap !== 'function') return null;
	var cacheBabelInterop = new WeakMap();
	var cacheNodeInterop = new WeakMap();
	return (_getRequireWildcardCache = function (nodeInterop) {
		return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
	})(nodeInterop);
}

function _interopRequireWildcard(obj, nodeInterop) {
	if (!nodeInterop && obj && obj.__esModule) {
		return obj;
	}
	if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
		return { default: obj };
	}
	var cache = _getRequireWildcardCache(nodeInterop);
	if (cache && cache.has(obj)) {
		return cache.get(obj);
	}
	var newObj = {};
	var hasPropertyDescriptor =
		Object.defineProperty && Object.getOwnPropertyDescriptor;
	for (var key in obj) {
		if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
			var desc = hasPropertyDescriptor
				? Object.getOwnPropertyDescriptor(obj, key)
				: null;
			if (desc && (desc.get || desc.set)) {
				Object.defineProperty(newObj, key, desc);
			} else {
				newObj[key] = obj[key];
			}
		}
	}
	newObj.default = obj;
	if (cache) {
		cache.set(obj, newObj);
	}
	return newObj;
}

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

const { machineIdSync } = nodeMachineId;
const app = (0, _express.default)();
const port = 7089;

class ServerStorage {
	/**
	 * @param {string} serverURL
	 */
	constructor(serverURL) {
		this.serverURL = serverURL;
		this.jwtToken = null;
		this.localServer = null;
		this.tokenPath = 'token.txt';

		if (!this.jwtToken) {
			try {
				// FIXME: This is insecure
				// We need to securely store the token in the system.
				const existingToken = _fs.default.readFileSync(this.tokenPath);

				console.log('Found existing token');
				this.jwtToken = existingToken;
			} catch {
				this.localServer = app.listen(port, 'localhost', function () {
					console.log(
						`Local callback server running at http://localhost:${port}/`,
					);
				});
				let oldToken = null;
				app.get('/login', (req, res) => {
					// This endpoint is supposed to be hit by the register device feature in the web dashboard of the platform
					// Also the register device feature will pass a 'token' via the GET request.
					// This token would contain info about the user
					oldToken = req.query.token;
					res.send('Recieved token.');
					let headers = {};
					if (oldToken) headers['X-Auth-Token'] = oldToken;
					const fingerprint = machineIdSync();

					_axios.default
						.post(
							`${this.serverURL}/users/addDevice`,
							{
								fingerprint,
							},
							{
								headers,
							},
						)
						.then(res => {
							const data = res.data;
							this.jwtToken = data.token; // this token is newly generated(and has encrypted information about the device as well as the user)

							_fs.default.writeFileSync(this.tokenPath, data.token);

							console.log('Generated new token from server');
						});

					this.localServer.close();
				});
			}
		}
	}

	saveActivity(activity) {
		if (!this.jwtToken) {
			console.log('User not authenticated, unable to store data on server'); // TODO: Open authentication page in browser (and local express server)

			return;
		}

		const { name, title, path, startTime, endTime } = activity;

		_axios.default
			.post(`${this.serverURL}/activities`, {
				name,
				title,
				path,
				startTime,
				endTime,
			})
			.then(res => {
				console.log(`statusCode: ${res.status}`);
				console.log(res.data);
			})
			.catch(error => {
				console.error(error);
			});
	}
}

exports.ServerStorage = ServerStorage;
