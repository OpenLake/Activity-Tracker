import { existsSync } from 'fs';

const getIcon = appName => {
	if (process.platform === 'linux') {
		const iconDirs = [
			'/usr/share/pixmaps/',
			'/usr/share/icons/Yaru/32x32/apps/',
			'/usr/share/icons/hicolor/32x32/apps/',
		];
		const iconPaths = iconDirs
			.map(path => {
				const fullPath = `${path}${appName.toLowerCase()}.png`;
				return existsSync(fullPath) ? fullPath : null;
			})
			.filter(path => path !== null);

		if (iconPaths.length == 1) {
			return iconPaths[0];
		}

		return null;
	} else {
		try {
			// import { extract } from 'file-icon-extractor';
			// extract('/usr/bin/code');
			throw new Error('Not Implemented icon extractor for Non-Linux OSes');
		} catch (error) {
			return null;
		}
	}
};

export default getIcon;
