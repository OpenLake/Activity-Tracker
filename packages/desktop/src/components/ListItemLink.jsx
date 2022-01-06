import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { forwardRef, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';

/** @type {import('react').FC<{icon: import('react').ReactElement, primary:string, secondary?: string, to:string}>} */
export const ListItemLink = ({ icon, primary, secondary, to }) => {
	const renderLink = useMemo(
		() =>
			forwardRef(function Link(itemProps, ref) {
				return <RouterLink to={to} ref={ref} {...itemProps} role={undefined} />;
			}),
		[to],
	);

	return (
		<li>
			<ListItemButton component={renderLink}>
				{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
				<ListItemText primary={primary} secondary={secondary} />
			</ListItemButton>
		</li>
	);
};
