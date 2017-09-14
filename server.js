const express = require('express');
const path = require('path');
const bodyParser  = require('body-parser');
const request = require('request');
const cloudinary = require('./utils/cloudinary.js');

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
	var imageURL = req.body.url;
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
      sampleLocation: imageURL,
      modelId: 'E4RA6UD3RPQBJX2MJEAEXJQM3E'
    }
  };

  request(options, function(error, response, body) {
    if (error) console.log('Error:', error);

    var labelTemplate = { 
      grandcanyon: "grandcanyon_template_horizontal_uhntmk", 
      yosemite: "yosemitetemp_horiz_a9y1mx"
     };
     
    var probs = JSON.parse(body).probabilities;
    var highestProb = Number.NEGATIVE_INFINITY;
    var highestProbLabel = undefined;

    for (var i = 0; i < probs.length; i++) {

      if (probs[i].probability < 0 || probs[i].probability > 1) {
        continue;
      } else { 

        if (Math.max(highestProb, probs[i].probability) === probs[i].probability) {
          highestProb = probs[i].probability;
          highestProbLabel = probs[i].label;
        }
      }
    }

    if (highestProbLabel === undefined){
      res.status(200).send({success: false, message: "Unable to identify location."})
    } else {

      cloudinary.v2.uploader.upload(imageURL,
    { width: 2000, height: 1000, crop: "limit", underlay: labelTemplate[highestProbLabel]},
    function(error, result) { 
           
      res.status(200).send({success: true, url: result.url});
    });
    }
  });
});

// {"probabilities":[{"label":"grandcanyon","probability":0.9999994},{"label":"yosemite",
// "probability":6.509897E-7}],"object":"predictresponse"}

// cloudinary.v2.uploader.upload("West-Rim2.jpg",
//     { width: 2000, height: 1000, crop: "limit", underlay: "grandcanyon_template_horizontal_uhntmk"},
//     function(error, result) { console.log(result); });

// cloudinary.v2.uploader.upload("West-Rim2.jpg",
//     { width: 2000, height: 1000, crop: "limit", underlay: "yosemitetemp_horiz_a9y1mx", gravity: "north"},
//     function(error, result) { console.log(result); });


app.get('*', function(req, res){

});


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
 });

