import React from 'react';
import { ActivityTimeline } from '../components/ActivityTimeline';
import Grid from '@material-ui/core/Grid';

export const UsageTimeline = () => {
	return (
		<Grid container justify="center" alignItems="center">
			<Grid item>
				<ActivityTimeline />
			</Grid>
		</Grid>
	);
};
