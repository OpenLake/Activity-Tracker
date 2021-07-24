import React from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core/';

import { HomePage, AppUsagePage } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

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
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Switch>
					<Route path="/about"></Route>
					<Route path="/usage">
						<AppUsagePage />
					</Route>
					<Route path="/">
						<HomePage />
					</Route>
				</Switch>
			</ThemeProvider>
		</Router>
	);
}

export default App;
