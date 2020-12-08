var express = require('express');

var app = express();
const port = process.env.PORT || 4000;
var server = app.listen(port, listening);

function listening(){
  console.log('listening at port ' + port + '...');
}

app.use(express.static('Public'));
