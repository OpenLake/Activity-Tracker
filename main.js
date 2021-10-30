require('./packages/desktop/.babel');
require('./packages/server/.babel/app');

const path = require('path');
const express = require('express');
const app = express();

const PORT = 3001;
const STATIC_DIR = path.join(__dirname, './packages/server/.babel/static/');

app.use(express.static(STATIC_DIR));

app.use((req, res) => {
	res.sendFile(path.join(STATIC_DIR, 'index.html'));
});

app.listen(PORT, () => {
	console.log(`React build is being served on port ${PORT}`);
});
