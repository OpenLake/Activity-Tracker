import fs from 'fs';
import path from 'path';
import envPaths from 'env-paths';
import dayjs from 'dayjs';

const DATA_DIR = envPaths('ActivityTracker').data;
const ACTIVITY_DIR = path.join(DATA_DIR, 'activity');

/** @param {Date} date */
const getISODateString = date => date.toISOString().slice(0, 10);

/** @param {Date} date */
const getFilePath = date => {
	const filename = `${getISODateString(date)}.json`;
	return path.join(ACTIVITY_DIR, filename);
};

export const getDataFromJson = (
	/** @type {dayjs.Dayjs} */ start,
	/** @type {dayjs.Dayjs} */ end,
) => {
	const result = [];
	for (
		let day = start.utc();
		day.isBetween(start, end, 'date', '[]');
		day = day.add(1, 'day')
	) {
		const filepath = getFilePath(day.toDate());
		try {
			const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
			result.push(
				...data.filter(a =>
					dayjs(a.startTime).isBetween(start, end, 's', '[]'),
				),
			);
		} catch (e) {
			console.log({ filepath });
			console.error(e);
		}
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
