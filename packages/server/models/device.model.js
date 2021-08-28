import mongoose from 'mongoose';
const schema = mongoose.Schema;

const DeviceSchema = new schema({
	fingerprint: { type: String, required: true },
	name: { type: String },
});
const Device = mongoose.model('Device', DeviceSchema);

export default Device;
