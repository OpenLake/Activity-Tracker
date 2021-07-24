import React, { useState } from 'react';
import Chart from 'react-apexcharts';

export const ActivityDonutChart = () => {
	const defaultOptions = {
		dataLabels: {
			enabled: false,
		},
		legend: {
			show: true,
			position: 'bottom',
			labels: {
				colors: undefined,
				useSeriesColors: true,
			},
		},
		plotOptions: {
			pie: {
				startAngle: 30,
				endAngle: 330,
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
							color: '#757575',
							formatter: function (val) {
								return val + ' hrs';
							},
						},
						total: {
							show: true,
							label: 'Today',
							color: '#757575',
							formatter: function (w) {
								return (
									w.globals.seriesTotals.reduce((a, b) => {
										return a + b;
									}, 0) + ' hrs'
								);
							},
						},
					},
				},
			},
		},
	};

	const [state] = useState({
		options: {
			...defaultOptions,
			labels: ['Nautilus', 'Chrome', 'Reddit', 'Vscode', 'Twitter'],
		},
		series: [30, 40, 35, 50, 20],
	});

	return (
		<div className="donut">
			<Chart
				options={state.options}
				series={state.series}
				type="donut"
				width={400}
				height={280}
			/>
		</div>
	);
};
