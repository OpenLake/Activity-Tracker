import fs from 'fs';
import cp from 'child_process';

fs.copyFileSync('dev.env', '.babel/dev.env');
fs.writeFileSync('.babel/package.json', '{"type":"commonjs"}');
cp.exec('cd ../ui && pnpm build');
