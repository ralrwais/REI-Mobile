const express = require('express');
const path = require('path');
const axios = require('axios');

const app = express();
var PORT = process.env.PORT || 1225;

app.use('/public', express.static(path.join(__dirname, 'public/')));


app.get('/', function(req, res){
	console.log('Hello world route hit ');
	res.sendFile(path.join(__dirname, './app/index.html'));
	
});

app.get('/data', function(req, res){
	res.download(path.join(__dirname, './public/grandcanyonvsyosemite.zip'));
});

// app.get('/pics', function(req, res){
// 	// console.log(req.body);
// 	res.send('Works');
// });

// axios.get('/url', {
//     params: {
//       baseURL: 'https://someurl.jpg'
//     }
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

//   axios.post('/url', {
//     baseURL: 'https://someurl.jpg'
//   })
//   .then(function (response) {
//     console.log(response);
//   })
//   .catch(function (error) {
//     console.log(error);
//   });

// axios.get('https://api.github.com/')
//   .then(function(){
//     console.log('get request worked'); 
//   }); 

// axios.post('/stuff', { firstName: 'Rima', lastName: 'Alrwais' })
//   .then(function(){
//     console.log('saved successfully')
//   });  

app.get('*', function(req, res){
	
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
 });

