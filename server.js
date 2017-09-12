const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser  = require('body-parser');

const app = express();
var PORT = process.env.PORT || 1225;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use('/public', express.static(path.join(__dirname, 'public/')));



app.get('/', function(req, res){
	console.log('Hello world route hit ');
	res.sendFile(path.join(__dirname, './app/index.html'));
	
});

app.get('/data', function(req, res){
	res.download(path.join(__dirname, './public/grandcanyonvsyosemite.zip'));
});

app.post('/pics', function(req, res){
	console.log(req.body.url);
});


app.get('*', function(req, res){

});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
 });

