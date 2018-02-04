const express = require('express');
const request = require('request');
const cors = require('cors');
const path = require('path');

// Spotify credentials
const client_id = '3c9642299ae843d19168eceecbc8b56f';
const client_secret = '58efc334efe14baabf78d82fae66a6fa';

// PORT
const port = process.env.PORT || 3000;

// Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // Static File
// app.use('/', express.static(path.join(__dirname, 'dist')));

// Requests Authorization
var authOptions = {
   url: 'https://accounts.spotify.com/api/token',
   headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
   },
   form: {
      grant_type: 'client_credentials'
   },
   json: true
};

// POST Request
app.get('/credentials', function (req, res) {
   request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode == 200) {
         res.json(body);
      }
   });
});

// Start Server
app.listen(port, () => {
   console.log('Server started on port ' + port);
});