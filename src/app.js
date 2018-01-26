'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
var path    = require("path");
var routes = require('./routes/routes');

const DEFAULT_PORT = 3000;
app.listen(DEFAULT_PORT, function() {
});

// Express middleware
app.use(bodyParser());
app.use(bodyParser.json()); 
app.use('/',routes);

app.get('/',function (req , res){
 res.send('Its working');
});

