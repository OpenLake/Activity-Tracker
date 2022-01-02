import { NavigateBefore, NavigateNext } from '@mui/icons-material';
import { IconButton, Grid, TextField } from '@mui/material';
import { DatePicker as MuiDatePicker } from '@mui/lab';
import dayjs from 'dayjs';

/**
 * @param {{value:dayjs.Dayjs, onChange:(newValue:dayjs.Dayjs)=>void, label:string}} props
 * @returns
 */
export const DatePicker = ({ value, onChange, label }) => {
	const nextDay = () => onChange(value.add(1, 'day'));
	const previousDay = () => onChange(value.subtract(1, 'day'));
	const isToday = value.isSame(dayjs(), 'day');

	return (
		<Grid container direction="row" justifyContent="center" alignItems="center">
			<IconButton onClick={previousDay}>
				<NavigateBefore />
			</IconButton>
			<MuiDatePicker
				inputFormat="DD/MM/YYYY"
				label={label}
				value={value}
				onChange={onChange}
				renderInput={params => <TextField {...params} />}
				disableFuture
			/>
			<IconButton onClick={nextDay} disabled={isToday}>
				<NavigateNext />
			</IconButton>
		</Grid>
	);
};
