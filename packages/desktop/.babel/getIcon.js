'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true,
});
exports.default = void 0;

var _fs = _interopRequireDefault(require('fs'));

var _path = _interopRequireDefault(require('path'));

var _envPaths = _interopRequireDefault(require('env-paths'));

var _fileIconExtractor = _interopRequireDefault(require('file-icon-extractor'));

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

const { extract } = _fileIconExtractor.default;
const defaultDir = (0, _envPaths.default)('ActivityTracker').data;

const iconsDir = _path.default.join(defaultDir, '/icons');

const filename = _path.default.join(defaultDir, '/iconmapping.json');

_fs.default.mkdirSync(iconsDir, {
	recursive: true,
}); //function to read the data of icons extracted before

function getIconsdata() {
	let data = [];

	try {
		data = JSON.parse(_fs.default.readFileSync(filename));
	} catch (error) {
		if (error.code === 'ENOENT') {
			data = [];
		} else {
			throw error;
		}
	}

	return data;
} //function to check whether the icon is extracted before or not

function containsObject(obj, list) {
	var i;

	for (i = 0; i < list.length; i++) {
		if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
			return true;
		}
	}

	return false;
} //function to extract the icons

const getIcon = (appName, appPath) => {
	//icon extraction for linux
	if (process.platform === 'linux') {
		const iconDirs = [
			'/usr/share/pixmaps/',
			'/usr/share/icons/Yaru/32x32/apps/',
			'/usr/share/icons/hicolor/32x32/apps/',
		];
		const iconPaths = iconDirs
			.map(path => {
				const fullPath = `${path}${appName.toLowerCase()}.png`;
				return _fs.default.existsSync(fullPath) ? fullPath : null;
			})
			.filter(path => path !== null);

		if (iconPaths.length == 1) {
			return iconPaths[0];
		}

		return null; //icon extraction for windows
	} else if (process.platform === 'win32') {
		let iconsData = getIconsdata();
		var iconObj = {
			[appName]: `${appName}.png`.replace('.exe', ''),
		};

		if (containsObject(iconObj, iconsData)) {
			return 'not extracted';
		} else {
			extract(appPath, iconsDir);
			iconsData.push({
				[appName]: `${appName}.png`.replace('.exe', ''),
			});

			_fs.default.writeFileSync(filename, JSON.stringify(iconsData));

			console.log(iconsDir);
			return `extracted ${appName}`;
		}
	} else {
		return null;
	}
}; // Extract singluar icon

var _default = getIcon;
exports.default = _default;
