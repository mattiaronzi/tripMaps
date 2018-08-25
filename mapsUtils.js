// global const
var markersArray = [];

var origin1 = {lat: 55.93, lng: -3.118};
var origin2 = 'Bergamo, Italy';
var destinationA = 'Stockholm, Sweden';
var destinationB = {lat: 50.087, lng: 14.421};

var destinationIcon = 'https://chart.googleapis.com/chart?' +
    'chst=d_map_pin_letter&chld=D|FF0000|000000';
var originIcon = 'https://chart.googleapis.com/chart?' +
    'chst=d_map_pin_letter&chld=O|FFFF00|000000';


function initMap(elementId, cb) {
  var map = new google.maps.Map(document.getElementById(elementId), {
    center: {lat: 55.53, lng: 10.4},
    zoom: 10
  });

  if (cb){
    cb(map);
  }
}

function deleteMarkers(markersArray) {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}

var bounds;

function addMarker(map, pos){
  var currMarker  = new google.maps.Marker({
    map: map,
    position: pos,
    icon: destinationIcon
  });
  bounds = bounds ? bounds : new google.maps.LatLngBounds;
  map.fitBounds(bounds.extend(currMarker.position));
}

exports.initMap = initMap;
exports.addMarker = addMarker;
