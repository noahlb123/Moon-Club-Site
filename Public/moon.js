var currentDate = new Date();
var nextMoon = new Date("2020-05-07T06:45:00Z");
var prevMoon = new Date("2020-05-07T06:45:00Z");
const dateDisplay = document.getElementById("date");

function iterateDay() {
  prevMoon.setDate(nextMoon.getDate());
  nextMoon.setMinutes(nextMoon.getMinutes() + 44);
  nextMoon.setHours(nextMoon.getHours() + 12);
  nextMoon.setDate(nextMoon.getDate() + 29);
}

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

function findNextMoon() {
  while (nextMoon < currentDate) {
    iterateDay();
  }
  if (currentDate.getDate() == prevMoon.getDate()) {
    return "TONIGHT";
  }
  else {
    console.log(nextMoon);
    return (reformatDate(nextMoon));
  }
}

dateDisplay.innerHTML = findNextMoon();
