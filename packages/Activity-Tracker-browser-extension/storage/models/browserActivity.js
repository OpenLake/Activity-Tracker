import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Schema
const browserActivitySchema = new Schema({
	title: String,
	url: String,
	favicon: String,
	startTime: Date,
	endTime: Date,
});

const browserActivity = mongoose.model(
	'browserActivity',
	browserActivitySchema,
);

export default browserActivity;
