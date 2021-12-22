import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const dir = dirname(fileURLToPath(import.meta.url));
const srcRoot = join(dir, 'src');

export default defineConfig(({ command }) => ({
	base: command === 'serve' ? '/' : `${dir}/src/out/`,
	plugins: [react()],
	resolve: {
		alias: {
			'$/': srcRoot,
		},
	},
	build: {
		outDir: join(srcRoot, '/out'),
		emptyOutDir: true,
	},
	server: { port: 3001 },
	optimizeDeps: {
		exclude: ['path'],
	},
	test: {
		environment: 'jsdom',
	},
}));
