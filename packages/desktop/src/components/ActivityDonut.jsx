import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { durationToString } from '../utils';

export const ActivityDonutChart = ({ data }) => {
	const defaultOptions = {
		dataLabels: {
			enabled: false,
		},
		tooltip: {
			enabled: true,
			y: {
				formatter: val => {
					return durationToString(val, true);
				},
			},
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
							formatter: val => {
								return durationToString(val, true);
							},
						},
						total: {
							show: true,
							label: 'Today',
							color: '#AFBDD1',
							formatter: w => {
								return durationToString(
									w.globals.seriesTotals.reduce((a, b) => {
										return a + b;
									}, 0),
									true,
								);
							},
						},
					},
				},
			},
		},
	};

	useEffect(() => {}, [data]);

	return (
		<div className="donut">
			<Chart
				options={{
					...defaultOptions,
					labels: data.map(app => app.name),
				}}
				series={data.map(app => Math.floor(app.duration / 1000 / 60))}
				type="donut"
				width={400}
				height={375}
			/>
		</div>
	);
};
