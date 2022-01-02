import Chart from 'react-apexcharts';
import { durationToString } from '../utils';

export const ActivityDonutChart = ({ data }) => {
	/** @type {ApexCharts.ApexOptions} */
	const defaultOptions = {
		dataLabels: {
			enabled: false,
		},
		tooltip: {
			enabled: true,
			y: {
				formatter: val => durationToString(val),
			},
		},
		legend: { show: false },
		plotOptions: {
			pie: {
				startAngle: 0,
				endAngle: 360,
				donut: {
					size: '85%',
					background: 'transparent',
					labels: {
						show: true,
						name: {
							show: true,
						},
						value: {
							show: true,
							color: '#FFFFFF',
							formatter: val => durationToString(val),
						},
						total: {
							show: true,
							label: 'Today',
							color: '#AFBDD1',
							formatter: w =>
								durationToString(
									w.globals.seriesTotals.reduce((a, b) => a + b, 0),
								),
						},
					},
				},
			},
		},
	};

	return (
		<div className="donut">
			<Chart
				options={{
					...defaultOptions,
					labels: data.map(app => app.name),
				}}
				series={data.map(app => app.duration)}
				type="donut"
				width={300}
				height={300}
			/>
		</div>
	);
};
