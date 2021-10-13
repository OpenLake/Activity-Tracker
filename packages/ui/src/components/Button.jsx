import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Button as MuiButton } from '@mui/material/Button';

export const Button = ({ children }) => {
	return (
		<Grid
			container
			direction="row"
			className="date-component"
			justifyContent="center"
		>
			<MuiButton color="default">
				<Typography variant="h6" style={{ color: 'white' }}>
					{children}
				</Typography>
			</MuiButton>
		</Grid>
	);
};
