import React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from '@material-ui/core/Button';

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
		<Grid container direction="row" className="date-component" justify="center">
			<Button color="default" onClick={previousDay}>
				<NavigateBeforeIcon style={{ color: 'white' }} />
			</Button>
			<Typography variant="h6" style={{ color: 'white' }}>
				{currentDate}
			</Typography>
			<Button color="default" onClick={nextDay}>
				<NavigateNextIcon style={{ color: 'white' }} />
			</Button>
		</Grid>
	);
};
