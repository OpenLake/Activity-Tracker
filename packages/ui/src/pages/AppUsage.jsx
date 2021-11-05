import React, { useState, useEffect } from 'react';
import RedditIcon from '@mui/icons-material/Reddit';
import { useSearchParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { ActivityHistogram } from '../components/ActivityHistogram';
import { durationToString } from '../utils';
import { DatePicker } from '../components/DatePicker';

export const AppUsagePage = () => {
	const [query] = useSearchParams();
	const appName = query.get('name');

	const timeRemaining = 0;
	const [data, setData] = useState([]);

	const onDateChange = newDate => {
		console.log(newDate);
	};

	useEffect(() => {
		fetch(`http://localhost:3000/apps/usage?name=${appName}`)
			.then(res => res.json())
			.then(res => {
				setData(res);
			});
	}, [appName]);

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
						name="Brave"
					/>
				</Typography>
			</Grid>
			<Grid item>
				<DatePicker onChange={onDateChange} />
			</Grid>
			<Grid item>
				<DatePicker onChange={onDateChange} />
			</Grid>
		</Grid>
	);
};
