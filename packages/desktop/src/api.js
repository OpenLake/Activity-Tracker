import { useQuery } from 'react-query';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

/** @param {{before:string, after:string}} */
export function useAllAppsUsage({ before, after }) {
	const url = new URL(`${BASE_URL}/api/apps`);
	url.searchParams.append('before', before);
	url.searchParams.append('after', after);

	return useQuery(['AllAppsUsage', before, after], {
		queryFn: () => fetch(url.href).then(res => res.json()),
		keepPreviousData: true,
	});
}

export function useAppUsage(appName) {
	return useQuery(['AppUsage', appName], {
		queryFn: () =>
			fetch(`${BASE_URL}/api/apps/usage?name=${appName}`).then(res =>
				res.json(),
			),
		enabled: !!appName,
	});
}

export function useVscodeAllProjectsUsage({ before, after }) {
	const url = new URL(`${BASE_URL}/api/vscodeactivities/projects`);
	url.searchParams.append('before', before);
	url.searchParams.append('after', after);

	return useQuery(['VscodeAllProjectsUsage', before, after], {
		queryFn: () => fetch(url.href).then(res => res.json()),
		keepPreviousData: true,
	});
}

export function useVscodeProjectUsage(appName) {
	return useQuery(['ProjectUsage', appName], {
		queryFn: () =>
			fetch(`${BASE_URL}/api/vscodeactivities/usage?name=${appName}`).then(
				res => res.json(),
			),
		enabled: !!appName,
	});
}

export function useVscodeAllLanguagesUsage({ before, after }) {
	const url = new URL(`${BASE_URL}/api/vscodeactivities/languages`);
	url.searchParams.append('before', before);
	url.searchParams.append('after', after);

	return useQuery(['VscodeAllLanguagesUsage', before, after], {
		queryFn: () => fetch(url.href).then(res => res.json()),
		keepPreviousData: true,
	});
}
