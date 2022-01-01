import { useQuery } from 'react-query';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

export function useAppList() {
	return useQuery('AppList', () =>
		fetch(`${BASE_URL}/api/apps`).then(res => res.json()),
	);
}

export function useAppUsage(appName) {
	return useQuery(['AppUsage', appName], {
		queryFn: () =>
			fetch(`http://localhost:32768/api/apps/usage?name=${appName}`).then(res =>
				res.json(),
			),
		enabled: appName,
	});
}
