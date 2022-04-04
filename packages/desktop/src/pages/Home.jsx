import { useState } from 'react';
import { Grid, List, Typography, useMediaQuery } from '@mui/material';
import {
	HourglassFullRounded,
	HourglassEmptyRounded,
	AppsRounded,
} from '@mui/icons-material';
import dayjs from 'dayjs';

import { ActivityDonutChart } from '../components/ActivityDonut';
import { DatePicker } from '../components/DatePicker';
import { ListItemLink } from '../components/ListItemLink';
import { durationToString } from '../utils';
import { useAllAppsUsage } from '../api';

/** @type {import('react').FC<{status:string}>} */
// eslint-disable-next-line no-unused-vars
function HourGlassIcon({ status }) {
	const fontSize = 35;
	if (status === 'red') {
		return (
			<HourglassFullRounded
				sx={{
					fontSize,
					color: 'secondary',
				}}
			/>
		);
	} else if (status === 'green') {
		return (
			<HourglassFullRounded
				style={{
					fontSize,
					color: '#8bc34a',
				}}
			/>
		);
	} else {
		return <HourglassEmptyRounded style={{ fontSize, color: '#8997B1' }} />;
	}
}

/** @type {import('react').FC<{apps:any[]}>} */
const AppList = ({ apps }) => {
	return (
		<List sx={{ width: '100%', overflow: 'auto' }}>
			{apps.map((app, idx) => (
				<ListItemLink
					key={idx}
					icon={<AppsRounded />}
					to={`/usage?name=${app.name}`}
					primary={app.name}
					secondary={durationToString(app.duration)}
				/>
			))}
		</List>
	);
};

export const HomePage = () => {
	const isLarge = useMediaQuery(
		/** @param {import('@mui/material').Theme} theme */
		theme => theme.breakpoints.up('md'),
	);
	const [date, setDate] = useState(dayjs);
	const appListQuery = useAllAppsUsage({
		after: date.startOf('day').toISOString(),
		before: date.endOf('day').toISOString(),
	});
	const appList = appListQuery.data;

	if (!appList) return null;
	return (
		<Grid
			item
			container
			direction={isLarge ? 'row' : 'column'}
			alignItems="stretch"
			gap={3}
			flex={1}
			flexWrap="nowrap"
			sx={{ overflow: isLarge ? 'hidden' : 'auto', px: 2 }}
		>
			<Grid
				item
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					gap: 2,
				}}
			>
				<ActivityDonutChart data={appList} />
				<DatePicker
					label="Date"
					value={date}
					onChange={newValue => setDate(newValue)}
				/>
			</Grid>
			<Grid item xs sx={{ display: 'flex', flexDirection: 'column', pt: 1 }}>
				<Typography variant="overline" component="h2">
					Top Used
				</Typography>
				<AppList apps={appList} />
			</Grid>
		</Grid>
	);
};
