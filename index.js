// load packages
const db = require('./dbUtils');
const loader = require('./loader');
const _ = require('underscore');

// load data from command line
// DEV: inputs from command line

var inputZipPath   = process.argv[2];
var inputStartDate = new Date(process.argv[3]);
var inputEndDate   = new Date(process.argv[4]);

loader.loadTripFromZip(inputZipPath, inputStartDate, inputEndDate);
loader.loadTripFromZip(inputZipPath, new Date(inputStartDate).setMonth(inputStartDate.getMonth() -1), new Date(inputEndDate).setMonth(inputEndDate.getMonth() -1));
loader.loadTripFromZip(inputZipPath, new Date(inputStartDate).setMonth(inputStartDate.getMonth() -2), new Date(inputEndDate).setMonth(inputEndDate.getMonth() -2));

setTimeout(function(){
  console.log('trips stored: ');
  var list = db.getTripsList();
  console.log(list);
}, 10000);

// NOTE:
// for db functionalities, look at this https://github.com/typicaljoe/taffydb
