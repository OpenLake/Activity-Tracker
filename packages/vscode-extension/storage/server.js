const axios = require('axios');
// const express = require('express');

const saveActivities = activity => {
	const {
		projectname,
		projectPath,
		filename,
		languageId,
		gitBranch,
		remoteurl,
		startTime,
		endTime,
	} = activity;

	axios
		.post('http://0.0.0.0:32768/api/vscodeactivities', {
			projectname,
			projectPath,
			filename,
			languageId,
			gitBranch,
			remoteurl,
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
