import dotenv from 'dotenv';
import path from 'path';

export let dirname;

try {
	dirname = __dirname;
} catch {
	dirname = path.resolve(path.dirname(''));
}

dotenv.config({ path: dirname + `/dev.env` });

export const DEBUG = process.env.DEBUG === 'true';
export const useLocal = process.env.LOCAL_STORAGE === 'true';
