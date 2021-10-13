import React, { useState, useEffect } from 'react';
import RedditIcon from '@material-ui/icons/Reddit';
import { useQuery } from '../hooks/common';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ActivityHistogram } from '../components/ActivityHistogram';
import { durationToString } from '../utils';
import { DatePicker } from '../components/DatePicker';

export const AppUsagePage = () => {
	let query = useQuery();

	const timeRemaining = 0;
	const [data, setData] = useState([]);

	const onDateChange = newDate => {
		console.log(newDate);
	};

	useEffect(() => {
		fetch(`http://localhost:3000/apps/usage?name=${query.get('name')}`)
			.then(res => res.json())
			.then(res => {
				setData(res);
			});
	}, [query.get('name')]);

	return (
		<Grid
			container
			direction="column"
			alignItems="center"
			justify="center"
			spacing={2}
			style={{ marginTop: 50 }}
		>
			<Grid item>
				<Grid container direction="column" justify="center" alignItems="center">
					<Grid item>
						<RedditIcon
							style={{ fontSize: 50, color: 'white', marginRight: 10 }}
						/>
					</Grid>
					<Grid item>
						<Typography variant="h6" className="top-app-details">
							{query.get('name')}
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
