import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Button as MuiButton } from '@material-ui/core/Button';

export const Button = ({ onChange, children }) => {
	return (
		<Grid container direction="row" className="date-component" justify="center">
			<MuiButton color="default">
				<Typography variant="h6" style={{ color: 'white' }}>
					{children}
				</Typography>
			</MuiButton>
		</Grid>
	);
};
