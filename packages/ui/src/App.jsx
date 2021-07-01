import React from 'react';
import { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import DoughnutChart from './Components/DonutChart';
import RedditIcon from '@material-ui/icons/Reddit';
import HourglassFullRoundedIcon from '@material-ui/icons/HourglassFullRounded';
import HourglassEmptyRoundedIcon from '@material-ui/icons/HourglassEmptyRounded';
import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
	palette: {
		primary: {
			light: '#757ce8',
			main: '#3f50b5',
			dark: '#002884',
			contrastText: '#fff',
		},
		secondary: {
			light: '#ff7961',
			main: '#f44336',
			dark: '#ba000d',
			contrastText: '#000',
		},
	},
});

function App() {
	const [date, setDate] = useState(new Date());
	const [currentDate, setCurrentDate] = useState(
		date.getDate() +
			' ' +
			date.toLocaleString('default', { month: 'short' }) +
			' ' +
			date.getFullYear(),
	);

	useEffect(() => {}, [currentDate]);

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
				<DoughnutChart />
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
				<div>
					<Button style={{ textTransform: 'none' }}>
						<div className="d-flex">
							<RedditIcon
								style={{ fontSize: 50, color: 'white', marginRight: 10 }}
							/>
							<div>
								<h2 className="top-app-heading">Reddit</h2>
								<p className="top-app-details">3h 46m</p>
							</div>
							<HourglassFullRoundedIcon
								className="hour-icon"
								style={{ fontSize: 35, color: theme.palette.secondary.main }}
							/>
						</div>
					</Button>
				</div>
				<div>
					<Button style={{ textTransform: 'none' }}>
						<div className="d-flex">
							<RedditIcon
								style={{ fontSize: 50, color: 'white', marginRight: 10 }}
							/>
							<div>
								<h2 className="top-app-heading">Google Chrome</h2>
								<p className="top-app-details">3h 46m</p>
							</div>
							<HourglassFullRoundedIcon
								className="hour-icon"
								style={{
									fontSize: 35,
									color: '#8bc34a',
								}}
							/>
						</div>
					</Button>
				</div>
				<div>
					<Button style={{ textTransform: 'none' }}>
						<div className="d-flex">
							<RedditIcon
								style={{ fontSize: 50, color: 'white', marginRight: 10 }}
							/>
							<div className="top-app-description">
								<h2 className="top-app-heading">Reddit</h2>
								<p className="top-app-details">3h 46m</p>
							</div>
							<HourglassEmptyRoundedIcon
								className="hour-icon"
								style={{ fontSize: 35, color: 'white' }}
							/>
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
}

export default App;
