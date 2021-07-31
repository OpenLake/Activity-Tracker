import mongoose from 'mongoose';
const schema = mongoose.Schema;

const ActivitySchema = new schema({
	name: { type: String, required: true },
	title: { type: String, required: true },
	startTime: { type: Number, required: true },
	endTime: { type: Number, required: true },
});

export default mongoose.model('Activity', ActivitySchema);
