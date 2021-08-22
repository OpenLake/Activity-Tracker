import mongoose from 'mongoose';
const schema = mongoose.Schema;

const ActivitySchema = new schema({
	name: { type: String, required: true },
	title: { type: String, required: true },
	startTime: { type: Date, required: true, index: true },
	endTime: { type: Date, required: true },
});

export default mongoose.model('Activity', ActivitySchema);
