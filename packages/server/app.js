import { useLocal } from './config.js';

import mongoose from 'mongoose';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import root from './routes/root.routes.js';
import user from './routes/user.routes.js';
import activity from './routes/activity.routes.js';
import app_usage from './routes/app.routes.js';
import vscode_activity from './routes/vscodeactivity.routes.js';
import mobile_app_usage from './routes/mobileActivity.routes.js';

const app = express();

const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = process.env.PORT || 8080;
const mongoUrl = process.env.mongodb || 'mongodb://127.0.0.1:27017';

if (!useLocal) {
	// Connect to the database
	mongoose.connect(
		mongoUrl,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		err => {
			if (err) {
				console.log("Couldn't connect to MongoDB");
				return console.error(err);
			}
			console.log(`MongoDB Connected: ${mongoUrl}`);
		},
	);
}

app.use(morgan('combined'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', root);
app.use('/api/', root);
app.use('/api/users', user);
app.use('/api/activities', activity);
app.use('/api/mobile-activity', mobile_app_usage);
app.use('/api/apps', app_usage);
app.use('/api/vscodeactivities', vscode_activity);

app.listen(port, hostname, function () {
	console.log(`Nodejs server running at http://${hostname}:${port}/`);
});
