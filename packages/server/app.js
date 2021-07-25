const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const hostname = '127.0.0.1';
const port = 3000;
const url = 'mongodb://127.0.0.1:27017';

const activity = require('./routes/activity.routes');
const app_usage = require('./routes/app.routes');

// Connect to the database
mongoose.connect(
	url,
	{ useNewUrlParser: true, useUnifiedTopology: true },
	(err, client) => {
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

app.use('/activities', activity);
app.use('/apps', app_usage);

app.listen(port, hostname, function () {
	console.log(`Nodejs server running at http://${hostname}:${port}/`);
});
