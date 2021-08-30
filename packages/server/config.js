import dotenv from 'dotenv';

dotenv.config({ path: `./dev.env` });

export const useLocal =
	process.env.LOCAL_STORAGE && process.env.LOCAL_STORAGE === 'true';
