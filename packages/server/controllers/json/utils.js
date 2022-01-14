import fs from 'fs';
import path from 'path';
import envPaths from 'env-paths';

const getISODateString = date => date.toISOString().slice(0, 10);

const getFilePath = date => {
	const dir = envPaths('ActivityTracker').data;
	const activityDir = path.join(dir, 'activity');
	const filename = `${getISODateString(date)}.json`;
	return path.join(activityDir, filename);
};

export const getDataFromJson = (start, end) => {
	start = new Date(getISODateString(new Date(start)));
	end = new Date(getISODateString(new Date(end)));

	let result = [];
	let date = start;

	while (date <= end) {
		try {
			result.push(...JSON.parse(fs.readFileSync(getFilePath(date))));
		} catch (error) {
			console.log(`No data for ${getISODateString(date)}`);
		}
		date.setDate(date.getDate() + 1);
	}
	return result;
};

export const groupBy = (array, key) => {
	return array.reduce((result, currentValue) => {
		// If an array already present for key, push it to the array. Else create an array and push the object
		(result[currentValue[key]] = result[currentValue[key]] || []).push(
			currentValue,
		);
		// Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
		return result;
	}, {}); // empty object is the initial value for result object
};

export const extract = (obj, keys) =>
	Object.fromEntries(keys.map(k => [k, obj[k]]));
