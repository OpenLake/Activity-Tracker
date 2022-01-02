import {
	createTheme,
	ThemeProvider,
	StyledEngineProvider,
} from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { LocalizationProvider } from '@mui/lab';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import { Routes, Route, HashRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { HomePage, AppUsagePage, UsageTimeline } from './pages';

const queryClient = new QueryClient();

const theme = createTheme({
	palette: {
		mode: 'dark',
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
			<CssBaseline />
			<HashRouter>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="about" element={<h1>About</h1>} />
					<Route path="usage" element={<AppUsagePage />} />
					<Route path="timeline" element={<UsageTimeline />} />
				</Routes>
			</HashRouter>

			<ReactQueryDevtools />
		</Providers>
	);
}

export default App;
