import mongoose from 'mongoose';
const schema = mongoose.Schema;

const MobileActivitySchema = new schema({
	_owner: { type: schema.Types.ObjectId, ref: 'User' },
	_device: { type: schema.Types.ObjectId, ref: 'Device' },
	name: { type: String, required: true },
	location: { type: String, required: false },
	// title: { type: String, required: true },
	startTime: { type: Date, required: true, index: true },
	endTime: { type: Date, required: true },
});

export default mongoose.model('mobileActivity', MobileActivitySchema);
