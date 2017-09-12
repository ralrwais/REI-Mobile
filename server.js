const express = require('express');
const path = require('path');
const bodyParser  = require('body-parser');
const request = require('request');

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
	res.download(path.join(__dirname, 't./public/grandcanyonvsyosemite.zip'));
});

app.post('/pics', function(req, res){
	// console.log(req.body.url);
	var options = {
    method: 'POST',
    url: 'https://api.einstein.ai/v2/vision/predict',
    headers: {
      'content-type':
        'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
      'cache-control': 'no-cache',
      authorization: 'Bearer 82d39ceaa0ef122c78ea31fed8aaa84ce9343a25'
    },
    formData: {
      sampleLocation: req.body.url,
      modelId: 'E4RA6UD3RPQBJX2MJEAEXJQM3E'
    }
  };

  request(options, function(error, response, body) {
    if (error) console.log('Error:', error);
    res.status(200).send(body);
  });
});


app.get('*', function(req, res){

});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
 });

