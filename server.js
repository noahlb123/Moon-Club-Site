var express = require('express');
var axios = require('axios');
var cheerio = require('cheerio');
var S = require('string');
var fs = require('fs');


//web scraping for the next Full Moon

//a function to reformat a date object into a string
function reformatDate(date) {
  var year = date.getYear().toString();
  year = year.substring(1, 3);
  var month = date.getMonth();
  month += 1;
  month = month.toString();
  if(month.length === 1) {
    month = "0" + month;
  }
  var day = date.getDate().toString();
  if(day.length === 1) {
    day = "0" + day;
  }
  return (month + " " + day + " " + year);
}

url = 'https://www.farmersalmanac.com/full-moon-dates-and-times';

//scraping the site
function updateDate() {
  axios(url)
    .then(response => {

      //get data from farmersalmanac
      const html = response.data;
      const $ = cheerio.load(html);
      var rawText = S($('p > strong').text()).splitRight(' ');

      //reformat html text into date object
      const month = rawText[1];
      var day = rawText[2];
      if (day.length == 1) {
        day = '0' + day;
      }
      const year = rawText[3].replace(',', '');
      var nextMoon = new Date(month + ' ' + day + ' ' + year + ' ' + '00:00:00');
      const time = rawText[6];
      if (time == 'AM' && parseInt(rawText[5].substr(0, 2)) < 10) {
        nextMoon.setDate(nextMoon.getDate() - 1)
      }

      //write date string into date.moon
      fs.writeFileSync('Public/date.moon', reformatDate(nextMoon), function (err) {
        if (err) throw err;
        console.log('date updated');
      });

      //chage the date in index.html
      var string = fs.readFileSync('Public/index.html', 'utf8');
      index = string.search('id="date">')
      string[index] = 'X';
      console.log(string);
    })
}


// running the server
var app = express();
const port = process.env.PORT || 4000;
var server = app.listen(port, listening);

function listening(){
  console.log('listening at port ' + port + '...');
}

app.use(function (req, res, next) {
  updateDate();
  next();
}, express.static('Public'));