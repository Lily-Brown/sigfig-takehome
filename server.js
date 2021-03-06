/* MODULE IMPORTS */

var express = require('express');
var app = express();
var router = express.Router();

app.use(express.static(__dirname + '/public'));


/* HTML ROUTES */ 

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/index.html');
});

/* SERVER SET UP */ 

app.listen(process.env.PORT || 3000, function() {
  console.log('Your server is running on port 3000');
});
