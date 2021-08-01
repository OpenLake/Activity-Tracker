import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

import activity from './routes/activity.routes.js';
import app_usage from './routes/app.routes.js';
import root from './routes/root.routes.js';

const app = express();

const hostname = '127.0.0.1';
const port = 3000;
const url = 'mongodb://127.0.0.1:27017';

// Connect to the database
mongoose.connect(
	url,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	err => {
		if (err) {
			console.log("Couldn't connect to MongoDB");
			return console.error(err);
		}
		console.log(`MongoDB Connected: ${url}`);
	},
);

app.use(morgan('combined'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', root);
app.use('/activities', activity);
app.use('/apps', app_usage);

app.listen(port, hostname, function () {
	console.log(`Nodejs server running at http://${hostname}:${port}/`);
});
