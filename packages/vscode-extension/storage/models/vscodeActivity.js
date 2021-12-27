const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const VscodeActivitySchema = new Schema({
	projectPath: String,
	projectname: String,
	filename: String,
	languageId: String,
	gitBranch: String,
	remoteurl: String,
	startTime: Date,
	endTime: Date,
});

const VscodeActivity = mongoose.model('VscodeActivity', VscodeActivitySchema);

module.exports = VscodeActivity;
