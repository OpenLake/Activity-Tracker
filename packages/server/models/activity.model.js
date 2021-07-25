const mongoose = require('mongoose');
const schema = mongoose.Schema;

const ActivitySchema = new schema({
	name: { type: String, required: true },
	title: { type: String, required: true },
	startTime: { type: Number, required: true },
	endTime: { type: Number, required: true },
});

module.exports = mongoose.model('Activity', ActivitySchema);
