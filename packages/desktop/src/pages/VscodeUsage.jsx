import { useState } from 'react';
import {
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Typography,
	useMediaQuery,
} from '@mui/material';
import { AppsRounded } from '@mui/icons-material';
import dayjs from 'dayjs';

import { ActivityDonutChart } from '../components/ActivityDonut';
import { DatePicker } from '../components/DatePicker';
import { durationToString } from '../utils';
import { useVscodeAllProjectsUsage, useVscodeAllLanguagesUsage } from '../api';

/** @type {import('react').FC<{apps:any[]}>} */
const ProjectList = ({ apps }) => {
	return (
		<List sx={{ width: '100%', overflow: 'auto' }}>
			{apps.map((app, idx) => (
				<ListItem key={idx}>
					<ListItemIcon>
						<AppsRounded />
					</ListItemIcon>
					<ListItemText
						primary={app.name}
						secondary={durationToString(app.duration)}
					/>
				</ListItem>
			))}
		</List>
	);
};

export const VscodeUsage = () => {
	const isLarge = useMediaQuery(
		/** @param {import('@mui/material').Theme} theme */
		theme => theme.breakpoints.up('md'),
	);
	const [date, setDate] = useState(dayjs);
	const projectListQuery = useVscodeAllProjectsUsage({
		after: date.startOf('day').toISOString(),
		before: date.endOf('day').toISOString(),
	});
	const projectList = projectListQuery.data;

	const LanguageListQuery = useVscodeAllLanguagesUsage({
		after: date.startOf('day').toISOString(),
		before: date.endOf('day').toISOString(),
	});
	const languageList = LanguageListQuery.data;

	if (!projectList || !languageList) return null;
	return (
		<Grid
			item
			container
			direction="column"
			alignItems="stretch"
			gap={3}
			flex={1}
			flexWrap="nowrap"
			sx={{
				overflow: isLarge ? 'hidden' : 'auto',
				px: 2,
				pt: 2,
				overflowY: 'auto',
			}}
		>
			<Grid item>
				<DatePicker
					label="Date"
					value={date}
					onChange={newValue => setDate(newValue)}
				/>
			</Grid>

			<Grid item xs container direction="column" wrap="nowrap">
				<Grid container>
					<ActivityDonutChart data={projectList} />
					<Grid
						item
						xs
						sx={{ display: 'flex', flexDirection: 'column', pt: 1 }}
					>
						<Typography variant="overline" component="h2">
							Top Projects
						</Typography>
						<ProjectList apps={projectList} />
					</Grid>
				</Grid>

				<div>
					<Typography variant="overline" component="h2">
						Top Languages
					</Typography>
					<ActivityDonutChart data={languageList} />
				</div>
			</Grid>
		</Grid>
	);
};
