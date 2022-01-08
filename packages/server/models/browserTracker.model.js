import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Schema
const browserActivitySchema = new Schema({
	title: { type: String, required: true },
	url: { type: String, required: true },
	favicon: { type: String, required: true },
	startTime: { type: Date, required: true },
	endTime: { type: Date, required: true },
});

export default mongoose.model('browserActivity', browserActivitySchema);
