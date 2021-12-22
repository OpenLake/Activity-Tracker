const parseDuration = durationInSeconds => {
	const days = Math.floor(durationInSeconds / (60 * 60 * 24));
	const hours = Math.floor(durationInSeconds / (60 * 60)) % 24;
	const minutes = Math.floor((durationInSeconds % 3600) / 60);
	const seconds = durationInSeconds % 60;
	return {
		days,
		hours,
		minutes,
		seconds,
	};
};

const formatDuration = ({ days, hours, minutes, seconds }) => {
	const duration = [];
	if (days) {
		duration.push(`${days}d`);
	}
	if (hours) {
		duration.push(`${hours}h`);
	}
	if (minutes) {
		duration.push(`${minutes}m`);
	}
	if (seconds) {
		duration.push(`${seconds}s`);
	}
	return duration.splice(0, 2).join(' ');
};

export const durationToString = duration => {
	const durationInSeconds = Math.floor(duration / 1000);
	return formatDuration(parseDuration(durationInSeconds));
};
