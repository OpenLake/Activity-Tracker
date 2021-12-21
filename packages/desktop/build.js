import esbuild from 'esbuild';
import fs from 'fs';

const prod = process.argv.includes('--prod');

esbuild
	.build({
		entryPoints: ['electron/index.js', 'electron/preload.js'],
		bundle: true,
		platform: 'node',
		outdir: 'main',
		external: ['electron', 'active-win'],
		minify: prod,
	})
	.then(() => {
		fs.writeFileSync('main/package.json', JSON.stringify({ type: 'commonjs' }));
		fs.copyFileSync('../server/dev.env', 'main/dev.env');
	})
	.catch(error => {
		error && console.error(error);
		process.exit(1);
	});
