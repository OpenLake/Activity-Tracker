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
		fetch('http://127.0.0.1:3000/apps')
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
		<div className="App d-flex flex-column justify-content-center">
			<div className="d-flex flex-column align-items-center">
				{/* <h1 className="text-white">Activity Tracker</h1> */}
				<ActivityDonutChart data={appList} />
				<div className="date-component d-flex justify-content-center align-items-center">
					<Button color="default" onClick={previousDay}>
						<NavigateBeforeIcon style={{ color: 'white' }} />
					</Button>
					<h2 className="text-white">{currentDate}</h2>
					<Button color="default" onClick={nextDay}>
						<NavigateNextIcon style={{ color: 'white' }} />
					</Button>
				</div>
			</div>
			<div className="top-used-items d-flex flex-column">
				<h1 className="top-used-heading">Top Used</h1>
				{appList.map((app, index) => {
					let hourglassIcon;
					if (app.status == 'red') {
						hourglassIcon = (
							<HourglassFullRoundedIcon
								className="hour-icon"
								style={{
									fontSize: 35,
									color: theme.palette.secondary.main,
								}}
							/>
						);
					} else if (app.status == 'green') {
						hourglassIcon = (
							<HourglassFullRoundedIcon
								className="hour-icon"
								style={{
									fontSize: 35,
									color: '#8bc34a',
								}}
							/>
						);
					} else {
						hourglassIcon = (
							<HourglassEmptyRoundedIcon
								className="hour-icon"
								style={{ fontSize: 35, color: '#8997B1' }}
							/>
						);
					}

					return (
						<div key={index}>
							<Button style={{ textTransform: 'none' }}>
								<div className="d-flex">
									{app.icon ?? (
										<RedditIcon
											style={{ fontSize: 50, color: 'white', marginRight: 10 }}
										/>
									)}
									<div>
										<h2 className="top-app-heading">{app.name}</h2>
										<p className="top-app-details">
											{durationToString(app.duration)}
										</p>
									</div>
									{hourglassIcon}
								</div>
							</Button>
						</div>
					);
				})}
			</div>
		</div>
	);
};
