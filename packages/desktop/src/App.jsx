import {
	createTheme,
	ThemeProvider,
	StyledEngineProvider,
} from '@mui/material/styles';
import { CssBaseline, Grid } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { HomePage, AppUsagePage, UsageTimeline } from './pages';
import { VscodeUsage } from './pages/VscodeUsage';
import { NavBar } from './components/NavBar';

const queryClient = new QueryClient();

const theme = createTheme({
	palette: {
		mode: 'dark',
		background: {
			default: '#021E48',
		},
	},
});

function Providers({ children }) {
	return (
		<QueryClientProvider client={queryClient}>
			<StyledEngineProvider injectFirst>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<ThemeProvider theme={theme}>{children}</ThemeProvider>
				</LocalizationProvider>
			</StyledEngineProvider>
		</QueryClientProvider>
	);
}

function App() {
	return (
		<Providers>
			<CssBaseline enableColorScheme />
			<HashRouter>
				<Grid
					container
					direction="column"
					alignItems="stretch"
					sx={{ height: '100vh', overflow: 'hidden' }}
				>
					<NavBar />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="about" element={<h1>About</h1>} />
						<Route path="usage" element={<AppUsagePage />} />
						<Route path="timeline" element={<UsageTimeline />} />
						<Route path="vscode" element={<VscodeUsage />} />
					</Routes>
				</Grid>
			</HashRouter>

			<ReactQueryDevtools />
		</Providers>
	);
}

export default App;
