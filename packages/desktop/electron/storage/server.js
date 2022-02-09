import axios from 'axios';
import express from 'express';
import fs from 'fs';
import * as nodeMachineId from 'node-machine-id';
const { machineIdSync } = nodeMachineId;

const app = express();
const port = 7089;
export class ServerStorage {
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
				const existingToken = fs.readFileSync(this.tokenPath);
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
					axios
						.post(
							`${this.serverURL}/users/addDevice`,
							{
								fingerprint,
							},
							{ headers },
						)
						.then(res => {
							const data = res.data;
							this.jwtToken = data.token;
							// this token is newly generated(and has encrypted information about the device as well as the user)
							fs.writeFileSync(this.tokenPath, data.token);

							console.log('Generated new token from server');
						});

					this.localServer.close();
				});
			}
		}
	}

	saveActivity(activity) {
		if (!this.jwtToken) {
			console.log('User not authenticated, unable to store data on server');
			// TODO: Open authentication page in browser (and local express server)
			return;
		}
		const { name, title, path, startTime, endTime } = activity;

		axios
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
