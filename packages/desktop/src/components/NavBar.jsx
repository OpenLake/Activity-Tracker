import { ArrowBack } from '@mui/icons-material';
import { Grid, IconButton, Tab, Tabs } from '@mui/material';
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom';

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
	const navigate = useNavigate();
	const routeMatch = useRouteMatch(['/', '/vscode']);
	const currentTab = routeMatch?.pattern?.path;

	return (
		<Grid item container alignItems="center" justifyContent="space-between">
			<div>
				{!currentTab && (
					<IconButton onClick={() => navigate(-1)} sx={{ m: 1 }}>
						<ArrowBack />
					</IconButton>
				)}
			</div>
			<Tabs value={currentTab}>
				<Tab label="Desktop" value="/" to="/" component={Link} />
				<Tab label="VS Code" value="/vscode" to="/vscode" component={Link} />
			</Tabs>
		</Grid>
	);
};
