// DB management

const _ = require('underscore');
const uuid = require('uuid');
const fs = require('fs-extra');

// setup storage structure

var trips = new Array();

function storeTrip(trip){
  trips.push({uuid: uuid.v4(), data: trip});
  console.log('trip stored', trips.length, trip.length)
}

function getTrip(tripId){
  return trips.find(t => {
    return t.uuid === tripId;
  });
}

function deleteTrip(tripId){
  var tripIndex = trips.indexOf(t => {
    return t.uuid === tripId;
  });
  trips.splice(tripIndex, 1);
}

function getTripsList(){
  return _.pluck(trips, 'uuid');
  // return trips
}

function saveData(){
  console.log('writing data to JSON');
  var dbFileName = 'db.json'; // TODO enable versioning (progressive db file names)
  fs.writeJSON(dbFileName, JSON.stringify(trips), function(){
    console.log('done');
  });
}

function loadData(){
  console.log('reading data from JSON');
  console.time('reading JSON')
  var dbFileName = 'db.json'; // TODO config file
  fs.readJSON(dbFileName, function(err, data){
    trips = JSON.parse(data);
    console.timeEnd('reading JSON')
    console.log('done, loaded', trips.length, 'trips');
    console.log(_.pluck(trips, 'uuid'));
  });
}

exports.storeTrip  = storeTrip;
exports.getTrip    = getTrip;
exports.getTripsList = getTripsList;
exports.deleteTrip = deleteTrip;
exports.saveData   = saveData;
exports.loadData   = loadData;
