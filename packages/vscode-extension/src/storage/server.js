import axios from 'axios';

export function saveActivities(activity) {
	axios
		.post('http://localhost:32768/api/vscodeactivities', activity)
		.then(res => {
			console.log(`StatusCode: ${res.status}`);
		})
		.catch(error => {
			console.log(error);
		});
}
