require('./packages/desktop/.babel');
require('./packages/server/.babel/app');

const isBundled = ['/snapshot', 'C:\\snapshot'].some(prefix =>
	__dirname.startsWith(prefix),
);

if (isBundled) {
	const AutoLaunch = require('auto-launch');
	const autolauncher = new AutoLaunch({
		name: 'Activity-Tracker',
		path: process.execPath,
		isHidden: true,
	});
	autolauncher
		.isEnabled()
		.then(isEnabled => {
			if (isEnabled) {
				return;
			}
			autolauncher.enable();
			console.log('Enabled autolaunch');
		})
		.catch(err => {
			console.error("Couldn't enable autolaunch");
			console.error(err);
		});
}
