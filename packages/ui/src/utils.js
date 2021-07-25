export const durationToString = (duration, isInSeconds = false) => {
	if (!isInSeconds) duration = Math.floor(duration / 1000);
	return `${Math.floor(duration / 60)}h ${duration % 60}m`;
};
