import React from 'react';
import { DatePicker } from '.';
import { render } from '@testing-library/react';

describe('DatePicker', () => {
	const component = render(<DatePicker />);

	it('should default to today', () => {
		const defaultDate = new Date(
			component.getByTestId('selected-date').textContent,
		).toDateString();
		const today = new Date().toDateString();

		expect(defaultDate).toBe(today);
	});
});
