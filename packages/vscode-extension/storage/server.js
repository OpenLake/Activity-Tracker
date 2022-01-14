const axios = require('axios');
// const express = require('express');

const saveActivities = activity => {
	const {
		projectPath,
		projectName,
		fileName,
		languageId,
		gitBranch,
		remoteUrl,
		startTime,
		endTime,
	} = activity;

	axios
		.post('http://localhost:32768/api/vscodeactivities', {
			projectPath,
			projectName,
			fileName,
			languageId,
			gitBranch,
			remoteUrl,
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

module.exports = {
	saveActivities,
};
