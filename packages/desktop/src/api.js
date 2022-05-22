import { useQuery } from 'react-query';
import dayjs from 'dayjs';

const BASE_URL = import.meta.env.VITE_SERVER_URL;

/** @param {{start:string, end:string}} params */
export function useAllAppsUsage({ start, end }) {
	const tz = dayjs.tz.guess();
	const url = new URL(`${BASE_URL}/api/apps`);
	url.searchParams.append('end', end);
	url.searchParams.append('start', start);
	url.searchParams.append('tz', tz);

	return useQuery(['AllAppsUsage', end, start], {
		queryFn: () => fetch(url.href).then(res => res.json()),
		keepPreviousData: true,
	});
}

export function useAppUsage(appName) {
	const tz = dayjs.tz.guess();
	return useQuery(['AppUsage', appName, tz], {
		queryFn: () =>
			fetch(`${BASE_URL}/api/apps/usage?name=${appName}&tz=${tz}`).then(res =>
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
