var express = require('express');
var app = express();
var reports = require('./operations');

app.use('/reports',reports);



module.exports = app;

