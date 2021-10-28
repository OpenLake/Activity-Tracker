const { fork } = require('child_process');

const tracker = fork('packages/desktop/.babel/index.js');
const server = fork('packages/server/.babel/app.js');

process.on('exit', () => {
	server.kill('SIGINT');
	tracker.kill('SIGINT');
});
