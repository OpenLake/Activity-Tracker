import { useState } from 'react';
import { Button, useTheme, Grid, Typography, TextField } from '@mui/material';
import { DatePicker } from '@mui/lab';
import {
	Reddit,
	HourglassFullRounded,
	HourglassEmptyRounded,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

import { ActivityDonutChart } from '../components/ActivityDonut';
import { durationToString } from '../utils';
import { useAllAppsUsage } from '../api';

export const HomePage = () => {
	const theme = useTheme();
	const [date, setDate] = useState(dayjs);
	const appListQuery = useAllAppsUsage({
		after: date.startOf('day').toISOString(),
		before: date.endOf('day').toISOString(),
	});
	const appList = appListQuery.data;

	if (!appList) return null;
	return (
		<Grid container direction="column" alignItems="center">
			<Grid item>
				<ActivityDonutChart data={appList} />
			</Grid>
			<Grid item>
				<DatePicker
					label="Date"
					value={date}
					onChange={newValue => setDate(newValue)}
					renderInput={params => <TextField {...params} />}
					disableFuture
				/>
			</Grid>
			<Grid item>
				<div className="top-used-items">
					<Typography variant="subtitle1" className="top-used-heading">
						Top Used
					</Typography>
					<Grid container direction="column" spacing={1}>
						{appList.map((app, index) => {
							let hourglassIcon;
							if (app.status == 'red') {
								hourglassIcon = (
									<HourglassFullRounded
										style={{
											fontSize: 35,
											color: theme.palette.secondary.main,
										}}
									/>
								);
							} else if (app.status == 'green') {
								hourglassIcon = (
									<HourglassFullRounded
										style={{
											fontSize: 35,
											color: '#8bc34a',
										}}
									/>
								);
							} else {
								hourglassIcon = (
									<HourglassEmptyRounded
										style={{ fontSize: 35, color: '#8997B1' }}
									/>
								);
							}

							return (
								<Grid item key={index}>
									<Link
										to={`/usage?name=${app.name}`}
										style={{ textDecoration: 'none' }}
									>
										<Button
											style={{
												textTransform: 'none',
												minWidth: 400,
											}}
										>
											<Grid
												container
												direction="row"
												justifyContent="flex-start"
												alignItems="center"
											>
												<Grid item xs={3}>
													{app.icon ?? (
														<Reddit
															style={{
																fontSize: 50,
																color: 'white',
															}}
														/>
													)}
												</Grid>
												<Grid item xs={7}>
													<div>
														<Typography
															variant="h6"
															color="initial"
															className="top-app-heading"
														>
															{app.name}
														</Typography>
														<Typography
															variant="subtitle1"
															color="initial"
															className="top-app-details"
														>
															{durationToString(app.duration)}
														</Typography>
													</div>
												</Grid>
												<Grid item xs={2}>
													{hourglassIcon}
												</Grid>
											</Grid>
										</Button>
									</Link>
								</Grid>
							);
						})}
					</Grid>
				</div>
			</Grid>
		</Grid>
	);
};
