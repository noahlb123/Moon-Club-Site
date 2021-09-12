var express = require('express');
const path = require('path');
const exphbs = require("express-handlebars");
var axios = require('axios');
var cheerio = require('cheerio');
var S = require('string');
var fs = require('fs');

//reformat date object into a string
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

//server
var app = express();

//view engine setup
const hbs = exphbs.create({
  extname: "hbs",
  defaultLayout: "main"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");

//render index
app.get("/", (req, res) => {
  //get and process date
  axios(url)
    .then(response => {

      //error handeling
      try {

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
        const time = rawText[6];

        var nextMoon = new Date(month + ' ' + day + ' ' + year + ' ' + '00:00:00');
        if (time == 'AM' && parseInt(rawText[5].substr(0, 2)) < 10) {
          nextMoon.setDate(nextMoon.getDate() - 1)
        }
        res.render("index", {date: reformatDate(nextMoon)});
      }
      catch(err) {
        console.log("check farmersalmanac.com/full-moon-dates-and-times, format changed");
        res.render("index", {date: "?? ?? ??"});
      }
    })
});

//declare public folder
app.use(express.static(path.join(__dirname, "Public")));

//listen
const port = process.env.PORT || 4002;

app.listen(port, ()=> {
  console.log('listening at port ' + port + '...');
});
