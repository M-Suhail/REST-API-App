const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Set up Express application
const app = express();

//Connect to MongoDB
mongoose.connect('mongodb://localhost/developer');
mongoose.Promise = global.Promise;

// Set up Static files
app.use(express.static('public'));

// Use Body Parser middleware
app.use(bodyParser.json());

// Initialise the routes
app.use('/api',routes);

// Error handling middleware
app.use(function(err,req,res,next){
  res.status(422).send({error: err.message});
});

// Listen for requests
app.listen(process.env.port || 4000,function() {
  console.log('Now listening for requests!');
});
