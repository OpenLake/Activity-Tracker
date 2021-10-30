import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import { ActivityDonutChart } from '../components/ActivityDonut';
import RedditIcon from '@mui/icons-material/Reddit';
import HourglassFullRoundedIcon from '@mui/icons-material/HourglassFullRounded';
import HourglassEmptyRoundedIcon from '@mui/icons-material/HourglassEmptyRounded';
import { durationToString } from '../utils';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { DatePicker } from '../components/DatePicker';

export const HomePage = () => {
	const theme = useTheme();

	const [appList, setAppList] = useState([
		{
			icon: (
				<RedditIcon style={{ fontSize: 50, color: 'white', marginRight: 10 }} />
			),
			name: 'Reddit',
			duration: 3 * 60 + 46,
			status: 'red',
		},
	]);

	const dateOnChange = newDate => {
		console.log(newDate);
		fetch('http://localhost:3000/api/apps')
			.then(res => res.json())
			.then(res => {
				setAppList(res);
			});
	};

	return (
		<Grid container direction="column" alignItems="center">
			<Grid item>
				<ActivityDonutChart data={appList} />
			</Grid>
			<Grid item>
				<DatePicker onChange={dateOnChange}></DatePicker>
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
									<HourglassFullRoundedIcon
										style={{
											fontSize: 35,
											color: theme.palette.secondary.main,
										}}
									/>
								);
							} else if (app.status == 'green') {
								hourglassIcon = (
									<HourglassFullRoundedIcon
										style={{
											fontSize: 35,
											color: '#8bc34a',
										}}
									/>
								);
							} else {
								hourglassIcon = (
									<HourglassEmptyRoundedIcon
										style={{ fontSize: 35, color: '#8997B1' }}
									/>
								);
							}

							return (
								<Grid item key={index}>
									<Link
										component={Button}
										style={{ textTransform: 'none', minWidth: 400 }}
										to={`/usage?name=${app.name}`}
									>
										<Grid
											container
											direction="row"
											justifyContent="flex-start"
											alignItems="center"
										>
											<Grid item xs={3}>
												{app.icon ?? (
													<RedditIcon
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
											<Grid xs={2}>{hourglassIcon}</Grid>
										</Grid>
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
