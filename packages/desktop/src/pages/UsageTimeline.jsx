import React from 'react';
import { ActivityTimeline } from '../components/ActivityTimeline';
import Grid from '@mui/material/Grid';

export const UsageTimeline = () => {
	return (
        <Grid container justifyContent="center" alignItems="center">
			<Grid item>
				<ActivityTimeline />
			</Grid>
		</Grid>
    );
};
