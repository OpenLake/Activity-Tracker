import React from 'react';
import {
	createTheme,
	ThemeProvider,
	StyledEngineProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';

import { HomePage, AppUsagePage, UsageTimeline } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const theme = createTheme({
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
	return (
		<Router>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Switch>
						<Route path="/about"></Route>
						<Route path="/usage">
							<AppUsagePage />
						</Route>
						<Route path="/timeline">
							<UsageTimeline />
						</Route>
						<Route path="/">
							<HomePage />
						</Route>
					</Switch>
				</ThemeProvider>
			</StyledEngineProvider>
		</Router>
	);
}

export default App;
