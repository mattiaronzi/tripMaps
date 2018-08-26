// load packages
const db        = require('./dbUtils');
const loader    = require('./loader');
const _         = require('underscore');
const mapsUtils = require('./mapsUtils');
const display   = require('./display');

var MAP;

// load map from google API

function init(){
  console.log('initMap');
  mapsUtils.initMap('map', function(map){
    MAP = map;
  });
}

// TODO list
 // for each entry, compute lat lng object

// var inputZipPath   = process.argv[2];
// var inputStartDate = new Date(process.argv[3]); // format: 2018-08-01
// var inputEndDate   = new Date(process.argv[4]);

var inputZipPath   = '/home/mattia/Desktop/maps/tripMaps/takeout-20180823T134844Z-001.zip';
var inputStartDate = new Date('2017-08-01');
var inputEndDate   = new Date('2017-08-30');

loader.loadTripFromZip(inputZipPath, inputStartDate, inputEndDate);

// wait to google map to be loaded
setTimeout(function(){
  db.loadData(function(){
    console.log('trips stored: ');
    var list = db.getTripsList();
    console.log(list);
    var lastTrip = db.getTrip(list[0]);
    console.log(lastTrip);
    display.drawTrip(lastTrip._rawData);
  });
}, 1000);


// NOTE:
// for db functionalities, look at this https://github.com/typicaljoe/taffydb
