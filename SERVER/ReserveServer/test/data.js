var today = new Date();
var tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

var halftomorrow = new Date(today);
halftomorrow.setDate(today.getDate() + 0.5);

console.log(tomorrow.toJSON());
console.log(halftomorrow.toJSON());
console.log(today.getDate() + 1 );

/*
 * Use for add days to current date time
 *
 * Usage: var dat = new Date();
 *              console.log(dat.toJSON())
 *
 */

Date.prototype.addDays = function(days)
{
  var dat = new Date(this.valueOf());
  dat.setDate(dat.getDate() + days);
  return dat;
}