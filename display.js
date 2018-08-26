// displaying functions

const mapsUtils = require('./mapsUtils');

function drawTrip(data){
  drawLocation(data, 0, drawLocation);
}

function drawLocation(data, index, callback){
  if (data[index]){
    var lat = data[index].latitudeE7 / 1e7;
    var lng = data[index].longitudeE7 / 1e7;
    var pos = {lat: lat, lng: lng};
    mapsUtils.addMarker(MAP, pos);
    callback(data, index+=100, drawLocation); // index increment on map zoom base
  }
}

exports.drawTrip = drawTrip;
