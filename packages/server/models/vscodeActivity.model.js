import mongoose from 'mongoose';
const schema = mongoose.Schema;

const VscodeActivitySchema = new schema({
	projectPath: { type: String, required: true },
	projectName: { type: String, required: true },
	fileName: { type: String, required: true },
	languageId: { type: String, required: true },
	gitBranch: { type: String, required: true },
	remoteUrl: { type: String, required: true },
	startTime: { type: Date, required: true },
	endTime: { type: Date, required: true },
});
export default mongoose.model('VscodeActivity', VscodeActivitySchema);
