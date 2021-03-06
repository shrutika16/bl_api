const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./config/database');
const mongoose = require('mongoose');
const route = require('./route/route');

// create express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use('/', route);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});