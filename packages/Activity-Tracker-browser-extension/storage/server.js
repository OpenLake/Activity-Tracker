import { post } from 'axios';
// const express = require('express');

const saveActivities = activity => {
	const { title, url, favicon, startTime, endTime } = activity;

	post('http://localhost:32768/api/browseractivities', {
		title,
		url,
		favicon,
		startTime,
		endTime,
	})
		.then(res => {
			console.log(`StatusCode: ${res.status}`);
		})
		.catch(error => {
			console.log(error);
		});
};

export default {
	saveActivities,
};
