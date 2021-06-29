var express = require('express');
const app = express();

var blController = require('../controllers/bl');

//modules
app.use(blController);


// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to british library notes."});
});
;

module.exports = app;
