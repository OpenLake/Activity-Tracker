import React from 'react';
import {
	createTheme,
	ThemeProvider,
	StyledEngineProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material/';

import { HomePage, AppUsagePage, UsageTimeline } from './pages';
import { Routes, Route, HashRouter } from 'react-router-dom';

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
		<HashRouter>
			<StyledEngineProvider injectFirst>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="about" element={<h1>About</h1>} />
						<Route path="usage" element={<AppUsagePage />} />
						<Route path="timeline" element={<UsageTimeline />} />
					</Routes>
				</ThemeProvider>
			</StyledEngineProvider>
		</HashRouter>
	);
}

export default App;
