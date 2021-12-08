import React from 'react';
import { DatePicker } from '.';
import renderer from 'react-test-renderer';

describe('DatePicker', () => {
	const component = renderer.create(<DatePicker />);

	it('should default to today', () => {
		const defaultDate = new Date(
			component.root.findByType('h6').children[0],
		).toDateString();
		const today = new Date().toDateString();

		expect(defaultDate).toBe(today);
	});
});
