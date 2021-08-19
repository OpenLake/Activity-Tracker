import fs from 'fs';
import path from 'path';
import envPaths from 'env-paths';
import pkg from 'file-icon-extractor';
const { extract } = pkg;

const defaultDir = envPaths('ActivityTracker').data;

const activityDir = path.join(defaultDir, '/icons');
fs.mkdirSync(activityDir, { recursive: true });

const getIcon = (appName, appPath) => {
	if (process.platform === 'linux') {
		const iconDirs = [
			'/usr/share/pixmaps/',
			'/usr/share/icons/Yaru/32x32/apps/',
			'/usr/share/icons/hicolor/32x32/apps/',
		];
		const iconPaths = iconDirs
			.map(path => {
				const fullPath = `${path}${appName.toLowerCase()}.png`;
				return fs.existsSync(fullPath) ? fullPath : null;
			})
			.filter(path => path !== null);

		if (iconPaths.length == 1) {
			return iconPaths[0];
		}

		return null;
	} else if (process.platform === 'win32') {
		const icon = extract(appPath, activityDir);
		return icon;
	} else {
		try {
			throw new Error('Not a supported OS currently');
		} catch (error) {
			return null;
		}
	}
};

// Extract singluar icon

export default getIcon;
