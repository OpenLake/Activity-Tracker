import { useSearchParams } from 'react-router-dom';
import { Grid, Typography } from '@mui/material';
import { AppsRounded } from '@mui/icons-material';

import { ActivityHistogram } from '../components/ActivityHistogram';
import { durationToString } from '../utils';
import { useAppUsage } from '../api';
import { features } from '../config';
import dayjs from 'dayjs';

const padDataToWeek = data => {
	const lastDay = dayjs(data.at(-1).date);
	const padding = Array.from(
		{ length: Math.max(0, 7 - data.length) },
		(_, i) => ({
			date: lastDay.add(i + 1, 'day').format('YYYY-MM-DD'),
			duration: 0,
		}),
	);
	return [...data, ...padding];
};

export const AppUsagePage = () => {
	const [query] = useSearchParams();
	const appName = query.get('name');

	const timeRemaining = 0;
	const data = useAppUsage(appName).data;
	if (!data) return null;
	const paddedData = padDataToWeek(data).map(d => ({
		day: dayjs(d.date).format('ddd'),
		duration: d.duration,
	}));

	return (
		<>
			<Grid
				container
				direction="column"
				alignItems="center"
				justifyContent="center"
				spacing={2}
				style={{ marginTop: 50 }}
			>
				<Grid item>
					<Grid
						container
						direction="column"
						justifyContent="center"
						alignItems="center"
					>
						<Grid item>
							<AppsRounded style={{ fontSize: 50 }} />
						</Grid>
						<Grid item>
							<Typography variant="h6">{appName}</Typography>
						</Grid>
					</Grid>
				</Grid>
				{features.timeLimit && (
					<Grid item>
						<Typography variant="h6" align="center">
							Today
						</Typography>
						<Typography variant="h6" align="center">
							{durationToString(data[data.length - 1]?.duration)}
						</Typography>
						<Typography variant="body2" align="center">
							{durationToString(timeRemaining)}{' '}
							{timeRemaining > 0 ? 'past limit' : 'remaining'}
						</Typography>
					</Grid>
				)}

				<Grid item>
					<Typography variant="h4" color="black">
						<ActivityHistogram data={paddedData} name={appName} />
					</Typography>
				</Grid>
			</Grid>
		</>
	);
};
