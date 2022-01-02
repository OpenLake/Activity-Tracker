import { useState } from 'react';
import dayjs from 'dayjs';
import RedditIcon from '@mui/icons-material/Reddit';
import { useSearchParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ActivityHistogram } from '../components/ActivityHistogram';
import { durationToString } from '../utils';
import { DatePicker } from '../components/DatePicker';
import { useAppUsage } from '../api';

export const AppUsagePage = () => {
	const [query] = useSearchParams();
	const appName = query.get('name');
	const [date, setDate] = useState(dayjs);

	const timeRemaining = 0;
	const data = useAppUsage(appName).data;

	if (!data) return null;
	return (
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
						<RedditIcon
							style={{ fontSize: 50, color: 'white', marginRight: 10 }}
						/>
					</Grid>
					<Grid item>
						<Typography variant="h6" className="top-app-details">
							{appName}
						</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Grid item>
				<Typography
					variant="h6"
					color="initial"
					className="top-app-heading"
					align="center"
				>
					Today
				</Typography>
				<Typography
					variant="h6"
					color="initial"
					className="top-app-heading"
					align="center"
				>
					{durationToString(data[data.length - 1]?.duration)}
				</Typography>
				<Typography
					variant="body2"
					color="initial"
					className="top-app-heading"
					align="center"
				>
					{durationToString(timeRemaining)}{' '}
					{timeRemaining > 0 ? 'past limit' : 'remaining'}
				</Typography>
			</Grid>

			<Grid item>
				<Typography variant="h4" color="initial">
					<ActivityHistogram
						data={data?.map(weekDay => weekDay.duration)}
						name={appName}
					/>
				</Typography>
			</Grid>
			<Grid item>
				<DatePicker value={date} onChange={newDate => setDate(newDate)} />
			</Grid>
		</Grid>
	);
};
