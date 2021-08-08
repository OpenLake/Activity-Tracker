import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { ActivityDonutChart } from '../Components/ActivityDonut';
import RedditIcon from '@material-ui/icons/Reddit';
import HourglassFullRoundedIcon from '@material-ui/icons/HourglassFullRounded';
import HourglassEmptyRoundedIcon from '@material-ui/icons/HourglassEmptyRounded';
import { durationToString } from '../utils';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export const HomePage = () => {
	const theme = useTheme();

	const [date] = useState(new Date());
	const [currentDate, setCurrentDate] = useState(
		date.getDate() +
			' ' +
			date.toLocaleString('default', { month: 'short' }) +
			' ' +
			date.getFullYear(),
	);

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

	useEffect(() => {
		fetch('http://192.168.43.90:3000/apps')
			.then(res => res.json())
			.then(res => {
				setAppList(res);
			});
	}, [currentDate]);

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
		<Grid container direction="column" alignItems="center">
			<Grid item>
				<ActivityDonutChart data={appList} />
			</Grid>
			<Grid item>
				<Grid
					container
					direction="row"
					className="date-component"
					justify="center"
				>
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
									<Button style={{ textTransform: 'none', minWidth: 400 }}>
										<Grid
											container
											direction="row"
											justify="flex-start"
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
									</Button>
								</Grid>
							);
						})}
					</Grid>
				</div>
			</Grid>
		</Grid>
	);
};

{
	/* <Grid container>
										<Grid item xs={9}>
											
												<Grid item>
													{app.icon ?? (
														<RedditIcon
															style={{
																fontSize: 50,
																color: 'white',
															}}
														/>
													)}
												</Grid>
												<Grid item>
													
												</Grid>
										</Grid>
										<Grid item xs={3}>
											
										</Grid>
									</Grid> */
}
