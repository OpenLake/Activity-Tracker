import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import { durationToString } from '../utils';

export const ActivityHistogram = ({ data, name }) => {
	const defaultOptions = {
		chart: {
			height: 100,
			type: 'bar',
		},
		plotOptions: {
			bar: {
				borderRadius: 10,
				dataLabels: {
					position: 'top', // top, center, bottom
				},
			},
		},
		dataLabels: {
			enabled: false,
			formatter: function (val) {
				return val + '%';
			},
			offsetY: -20,
			style: {
				fontSize: '12px',
				colors: ['#304758'],
			},
		},

		xaxis: {
			categories: ['7', '6', '5', '4', '3', '2', '1'],
			position: 'top',
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			crosshairs: {
				fill: {
					type: 'gradient',
					gradient: {
						colorFrom: '#D8E3F0',
						colorTo: '#BED1E6',
						stops: [0, 100],
						opacityFrom: 0.4,
						opacityTo: 0.5,
					},
				},
			},
			tooltip: {
				enabled: true,
			},
		},
		yaxis: {
			axisBorder: {
				show: false,
			},
			axisTicks: {
				show: false,
			},
			labels: {
				show: false,
				formatter: function (val) {
					return val + '%';
				},
			},
		},
		title: {
			text: `Time spent on ${name}`,
			floating: true,
			offsetY: 330,
			align: 'center',
			style: {
				color: '#444',
			},
		},
	};

	const series = [,];

	useEffect(() => {}, [data]);

	return (
		<div className="histogram">
			<Chart
				options={{
					...defaultOptions,
				}}
				series={[
					{
						name: `Time spent on ${name}`,
						data: data,
					},
				]}
				type="bar"
				height={200}
			/>
		</div>
	);
};
