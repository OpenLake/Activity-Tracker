import fs from 'fs';

fs.copyFileSync('dev.env', '.babel/dev.env');
fs.writeFileSync('.babel/package.json', '{"type":"commonjs"}');
