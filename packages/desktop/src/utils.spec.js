import { describe, expect, it } from 'vitest';
import { durationToString } from './utils';

describe('durationToString', () => {
	it('should convert duration correctly', () => {
		const str = durationToString(1000 * 60 * (3 + 60 * 2));
		expect(str).toBe('2h 3m');
	});
	it('Test Case 15 sec', () => {
		const str = durationToString(1000 * 15);
		expect(str).toBe('15s');
	});
	it('Test Case 2 min', () => {
		const str = durationToString(1000 * 60 * 2);
		expect(str).toBe('2m');
	});
	it('Test Case 2 min 10 sec', () => {
		const str = durationToString(1000 * 60 * 2 + 1000 * 10);
		expect(str).toBe('2m 10s');
	});
	it('Test Case 13hr 14 min 15 sec', () => {
		const str = durationToString(13 * 60 * 60 * 1000 + 14 * 60 * 1000 + 15 * 1000);
		expect(str).toBe('13hr 14m');
	});
	it('Test Case 25hr 12min', () => {
		const str = durationToString(25 * 60 * 60 * 1000 + 12 * 60 * 1000);
		expect(str).toBe('1d 1hr');
	});
});
