import Chart from 'react-apexcharts';
import { durationToString } from '../utils';

export const ActivityHistogram = ({ data, name }) => {
	/** @type {ApexCharts.ApexOptions} */
	const defaultOptions = {
		chart: {
			height: 100,
			type: 'bar',
			background: 'transparent',
		},
		plotOptions: {
			bar: { borderRadius: 10 },
		},
		dataLabels: { enabled: false },
		xaxis: {
			categories: data.map(d => d.day),
			axisBorder: { show: false },
			axisTicks: { show: false },
		},
		yaxis: {
			axisBorder: { show: false },
			axisTicks: { show: false },
			labels: {
				show: true,
				formatter: durationToString,
			},
		},
		theme: { mode: 'dark' },
		title: {
			text: `Time spent on ${name}`,
			floating: true,
			offsetY: 330,
			align: 'center',
		},
	};

	return (
		<div>
			<Chart
				options={defaultOptions}
				series={[
					{
						name: `Time spent on ${name}`,
						data: data.map(d => d.duration),
					},
				]}
				type="bar"
				height={200}
			/>
		</div>
	);
};
