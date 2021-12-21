import { describe, expect, it } from 'vitest';
import { durationToString } from './utils';

describe('durationToString', () => {
	it('should convert duration correctly', () => {
		const str = durationToString(1000 * 60 * (3 + 60 * 2));
		expect(str).toBe('2h 3m');
	});
});
