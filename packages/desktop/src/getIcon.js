import fs from 'fs';
import path from 'path';
import envPaths from 'env-paths';
import fileIconExtractor from 'file-icon-extractor';
const { extract } = fileIconExtractor;

const defaultDir = envPaths('ActivityTracker').data;

const iconsDir = path.join(defaultDir, '/icons');
const filename = path.join(defaultDir, '/iconmapping.json');
fs.mkdirSync(iconsDir, { recursive: true });

function getIconsdata() {
	let data = [];
	try {
		data = JSON.parse(fs.readFileSync(filename));
	} catch (error) {
		if (error.code === 'ENOENT') {
			data = [];
		} else {
			throw error;
		}
	}
	return data;
}

function containsObject(obj, list) {
	var i;
	for (i = 0; i < list.length; i++) {
		if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
			return true;
		}
	}

	return false;
}

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
		let iconsData = getIconsdata();
		var iconObj = {
			[appName]: `${iconsDir}\\${appName}.png`.replace('.exe', ''),
		};
		if (containsObject(iconObj, iconsData)) {
			return 'not extracted';
		} else {
			extract(appPath, iconsDir);
			iconsData.push({
				[appName]: `${iconsDir}\\${appName}.png`.replace('.exe', ''),
			});
			fs.writeFileSync(filename, JSON.stringify(iconsData));
			console.log(iconsDir);
			return `extracted ${appName}`;
		}
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
