import { Grid, Tab, Tabs, Typography } from '@mui/material';
import { Link, matchPath, useLocation } from 'react-router-dom';

/**
 * @param {readonly string[]} patterns
 */
function useRouteMatch(patterns) {
	const { pathname } = useLocation();

	for (let i = 0; i < patterns.length; i += 1) {
		const pattern = patterns[i];
		const possibleMatch = matchPath(pattern, pathname);
		if (possibleMatch !== null) {
			return possibleMatch;
		}
	}

	return null;
}

export const NavBar = () => {
	const routeMatch = useRouteMatch(['/', '/vscode']);
	const currentTab = routeMatch?.pattern?.path;

	return (
		<Grid container alignItems="center" justifyContent="space-between">
			<Typography
				variant="h5"
				component="h1"
				color="primary"
				sx={{ ml: 2, my: 1 }}
			>
				Activity Tracker
			</Typography>
			<Tabs value={currentTab}>
				<Tab label="Desktop" value="/" to="/" component={Link} />
				<Tab label="VS Code" value="/vscode" to="/vscode" component={Link} />
			</Tabs>
		</Grid>
	);
};
