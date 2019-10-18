// on the server side, we have no build process so we cannot use the ES6 import
// instead we use "require" in order to use functionality that is not defined in this file

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 8080;

// the data structure to save an asset is defined in /express-mongo-backend/asset.model.js


// we need cors because JavaScript could otherwise not make requests to other servers than the one that delivered the JavaScript 

app.use(cors());

//to parse the JSON string in the body of the post requests into JavaScript objects we use the bodyParser

app.use(bodyParser.json());

//we connect the mongoose object to the MongoDB database "assets" that will store and deliver our asset data

mongoose.connect('mongodb://127.0.0.1:27017/assets', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})



//connect the rest endpoints to the express server

app.use('/assets', require('./routes/asset.routes'));
app.use('/', require('./routes/auth.routes'));

//start the server and make it listen and answer to requests to the defined port

app.listen(PORT, function () {
    console.log("Server should be running on Port: " + PORT);
});
