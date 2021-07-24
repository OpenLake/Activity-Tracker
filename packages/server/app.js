const express = require('express');
const morgan = require('morgan');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const hostname = '127.0.0.1';
const port = 3000;

const url = 'mongodb://127.0.0.1:27017';

// Connect to the database
MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err, client) => {
    if (err) {
        return console.log(err);
    }
    console.log(`MongoDB Connected: ${url}`);
});

app.use(morgan('combined'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// API to store data in the database
app.post("/store", function (req, res) {
    console.log(req.body);
    res.status(200).send('OK');
});

app.listen(port, hostname, function () {
    console.log(`Nodejs server running at http://${hostname}:${port}/`);
});


