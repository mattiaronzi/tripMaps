// load packages
const db = require('./dbUtils');
const loader = require('./loader');
const _ = require('underscore');
const mapsUtils = require('./mapsUtils');

var MAP;

// load data from command line
// DEV: inputs from command line
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

var inputZipPath = '/home/mattia/Desktop/maps/tripMaps/takeout-20180823T134844Z-001.zip';
var inputStartDate = new Date('2017-08-01');
var inputEndDate = new Date('2017-08-30');

loader.loadTripFromZip(inputZipPath, inputStartDate, inputEndDate);

setTimeout(function(){
  db.saveData();
  console.log('trips stored: ');
  var list = db.getTripsList();
  console.log(list);
  setTimeout(function(){
    db.loadData();
    var lastTrip = db.getTrip(list[0]);
    console.log(lastTrip);

    // var lat = lastTrip.data[0].latitudeE7 / 1e7;
    // var lng = lastTrip.data[0].longitudeE7 / 1e7;
    // var pos = {lat: lat, lng: lng};
    // console.log(pos);
    //
    // mapsUtils.addMarker(MAP, pos);

    renderTrip(lastTrip.data);

  }, 5000);
}, 5000);

function renderTrip(data){
  renderLocation(data, 0, renderLocation);
}

function renderLocation(data, index, callback){
  if (data[index]){
    var lat = data[index].latitudeE7 / 1e7;
    var lng = data[index].longitudeE7 / 1e7;
    var pos = {lat: lat, lng: lng};
    mapsUtils.addMarker(MAP, pos);
    callback(data, index+=100, renderLocation);
  }
}

// NOTE:
// for db functionalities, look at this https://github.com/typicaljoe/taffydb
