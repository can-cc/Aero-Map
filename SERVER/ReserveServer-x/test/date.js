require('../utils/addDate');
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
// Date.prototype.addDays = function(days)
// {
//   var date = new Date(this.valueOf());
//   date.setDate(date.getDate() + days);
//   return date;
// }

var testAddDate = new Date();
console.log(testAddDate.addDays(3).toJSON());
console.log(testAddDate.toJSON());
