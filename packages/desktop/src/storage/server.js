import axios from 'axios';

export class ServerStorage {
	/**
	 * @param {string} serverURL
	 */
	constructor(serverURL) {
		this.serverURL = serverURL;
	}

	saveActivity(activity) {
		const { name, path, title, startTime, endTime } = activity;

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
