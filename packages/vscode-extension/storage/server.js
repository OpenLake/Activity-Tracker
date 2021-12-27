// const axios = require('axios');
// const express = require('express');
const mongoose = require('mongoose');
const VscodeActivity = require('./models/vscodeActivity');
mongoose.connect(
	'mongodb://localhost:27017/activities',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	err => {
		if (err) {
			console.log(err);
		}
		console.log('Mongodb connected');
	},
);

const saveActivities = activity => {
	const newVscodeActivity = new VscodeActivity(activity);
	newVscodeActivity.save(error => {
		if (error) {
			console.log('error');
		}
		// BlogPost
		console.log('Activity Saved');
	});
};

module.exports = {
	saveActivities,
};
