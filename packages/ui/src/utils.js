export const durationToString = (duration, isInMinutes = false) => {
	if (!isInMinutes) duration = Math.floor(duration / 1000 / 60);
	return `${Math.floor(duration / 60)}h ${duration % 60}m`;
};
