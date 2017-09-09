const express = require('express');
const path = require('path');

const app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static('public'));


app.get('/', function(req, res){
	console.log('Hello world route hit ');
	res.send('Hello Bitch');
});

app.get('/data', function(req, res){
	res.download(path.join(__dirname, './public/grandcanyonvsyosemite.zip'));
});

// app.get('*', function(req, res){

// });

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
 });

