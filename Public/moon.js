/* Old function that modeled orbit of Moon
function iterateDay() {
  prevMoon.setDate(nextMoon.getDate());
  nextMoon.setMinutes(nextMoon.getMinutes() + 44);
  nextMoon.setHours(nextMoon.getHours() + 12);
  nextMoon.setDate(nextMoon.getDate() + 29);
}*/