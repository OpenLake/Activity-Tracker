import React from 'react';
import { useState, useEffect } from 'react';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { IconButton, Typography, Grid } from '@mui/material';

export const DatePicker = ({ onChange }) => {
	const [date] = useState(new Date());
	const [currentDate, setCurrentDate] = useState(
		date.getDate() +
			' ' +
			date.toLocaleString('default', { month: 'short' }) +
			' ' +
			date.getFullYear(),
	);

	useEffect(() => {
		onChange(date);
	}, [date]);

	const nextDay = () => {
		date.setDate(date.getDate() + 1);
		setCurrentDate(
			date.getDate() +
				' ' +
				date.toLocaleString('default', { month: 'short' }) +
				' ' +
				date.getFullYear(),
		);
	};

	const previousDay = () => {
		date.setDate(date.getDate() - 1);
		setCurrentDate(
			date.getDate() +
				' ' +
				date.toLocaleString('default', { month: 'short' }) +
				' ' +
				date.getFullYear(),
		);
	};

	return (
		<Grid
			container
			direction="row"
			className="date-component"
			justifyContent="center"
			alignItems="center"
		>
			<IconButton onClick={previousDay}>
				<NavigateBeforeIcon style={{ color: 'white' }} />
			</IconButton>
			<Typography variant="h6" style={{ color: 'white' }}>
				{currentDate}
			</Typography>
			<IconButton onClick={nextDay}>
				<NavigateNextIcon style={{ color: 'white' }} />
			</IconButton>
		</Grid>
	);
};
